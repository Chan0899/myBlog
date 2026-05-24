# 基于 LangChain-Chatchat 的工业场景 RAG 知识库问答系统

## 项目概述

本项目基于开源框架 **Langchain-Chatchat**（v0.3.1.3），构建了一套面向**工业智能制造领域**的本地化 RAG（Retrieval-Augmented Generation）知识库问答系统。系统以离线部署、数据安全为前提，通过持续的技术选型迭代和架构重构，实现了从"可用"到"好用"的完整演进，最终在 RAGAS 五项核心指标上取得 **88.08 分（良好级）综合加权得分**。

### 技术栈一览

| 分层 | 技术选型 |
|------|----------|
| 框架 | LangChain + Langchain-Chatchat |
| LLM | Qwen2.5-7B（量化版，Ollama 部署） |
| Embedding | qwen3-embedding:0.6b（Ollama 部署） |
| 文档处理 | Docling（多类型文档 → 结构化 Markdown） |
| 文本分割 | MarkdownHeaderTextSplitter（结构化分割） |
| 向量数据库 | FAISS（本地持久化） |
| 混合检索 | FAISS 向量检索 + BM25 关键词检索（权重 0.5/0.5） |
| 重排序 | bge-reranker-v2-m3（CrossEncoder） |
| 评估框架 | RAGAS（评估模型用 DeepSeek-V4-Pro API） |
| 可观测性 | JSONL 结构化日志（query / ingest 双通道） |
| 前端 | Streamlit WebUI |
| API 服务 | FastAPI + Uvicorn |

---

## 一、项目背景与目标

### 1.1 应用场景

面向工业智能制造场景，知识来源包括西门子官方技术手册、已出版工控书籍、设备运维文档等，典型问答涵盖：

- CNC 设备点检流程与故障排查
- 上位机与车间数据库对接方案（OPC UA 协议）
- MES 系统集成与工艺流程
- 工控设备参数配置与运维规范

### 1.2 核心需求

1. **本地私有化部署** — 工业数据不出内网，不依赖云端 API
2. **多类型文档兼容** — PDF 技术手册、Word 规范文档、Excel 参数表
3. **专业术语准确** — 工控术语不可随意改写或编造
4. **回答可溯源** — 每个回答都能追溯到知识库原文
5. **全流程可评估** — 可量化各环节质量，指导持续优化

---

## 二、系统架构

### 2.1 总体架构

```
┌─────────────────────────────────────────────────────────┐
│                    Streamlit WebUI                       │
│  多功能对话 │ RAG对话 │ 知识库管理 │ 系统配置 │ MCP管理    │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP API
┌─────────────────────▼───────────────────────────────────┐
│                   FastAPI Server                         │
│  /chat  │  /knowledge_base  │  /v1 (OpenAI兼容)          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   RAG Pipeline                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Document │→│Preprocess│→│ Splitter │→│Embedding│ │
│  │  Loader  │  │ (Docling)│  │(Markdown)│  │(Qwen3)  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────┬────┘ │
│                                                  │       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │       │
│  │  Answer  │←│ Reranker │←│  Hybrid   │←──────┘       │
│  │ (Qwen2.5)│  │(bge-m3)  │  │ Retrieval │              │
│  └──────────┘  └──────────┘  │FAISS+BM25 │              │
│                               └──────────┘              │
└─────────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│               Evaluation Layer (RAGAS)                   │
│  faithfulness │ relevancy │ precision │ recall │ correct │
└─────────────────────────────────────────────────────────┘
```

### 2.2 导入知识库 — 解耦式流水线

导入知识库功能经过重构，采用**面向对象多态**设计，将处理流程解耦为三个独立阶段：

```
原始文件
    │
    ▼
┌──────────────┐
│  Preprocess  │  FilePreprocessor ABC
│  (预处理)     │  ├─ DoclingPreprocessor   (PDF/Word/Excel → Markdown)
│              │  ├─ PdfplumberPreprocessor (PDF文本+表格)
│              │  └─ PyMuPDFPreprocessor    (轻量PDF文本)
└──────┬───────┘
       │ 结构化 Markdown
       ▼
┌──────────────┐
│   Splitter   │  TextSplitterInterface ABC
│  (分割)      │  ├─ MarkdownHeaderTextSplitter (结构化分割)
│              │  ├─ ChineseRecursiveTextSplitter (递归分割)
│              │  └─ SemanticTextSplitter     (语义分割)
└──────┬───────┘
       │ Document Chunks
       ▼
┌──────────────┐
│  Embedding   │  Embeddings 接口
│  (向量化)     │  └─ qwen3-embedding:0.6b
└──────┬───────┘
       │
       ▼
   FAISS 向量库
```

每个阶段通过抽象基类定义接口，新增处理器只需继承对应基类并实现抽象方法，符合**开闭原则**。

### 2.3 混合检索 + 重排序

检索阶段采用**双路召回 + 精排**策略：

```
用户问题
    │
    ├──→ FAISS 向量检索 (语义匹配) ──→ top_k=10
    │
    └──→ BM25 关键词检索 (精确匹配) ─→ top_k=10
                │
                ▼
         EnsembleRetriever
         权重 [0.5, 0.5]
                │
                ▼
         LangchainReranker
         (bge-reranker-v2-m3)
         CrossEncoder 精排
                │
                ▼
           Top-3 文档
```

- **FAISS** 负责语义级相似匹配，捕捉同义表述
- **BM25** 负责关键词级精确匹配，捕捉专业术语
- **Reranker** 将问题与候选文档逐对送入 CrossEncoder 计算真实相关性，从 10 条中精选 3 条

---

## 三、技术选型演进（按时间线）

以下记录了项目从启动到成熟的关键选型决策及背后的技术判断。

### 阶段一：基础跑通

| 决策点 | 选择 | 原因 |
|--------|------|------|
| 基础框架 | Langchain-Chatchat | 开源成熟，社区活跃，支持离线部署 |
| LLM | qwen2-1.5b → **Qwen2.5-7B 量化版** | 1.5b 回答质量不足；7B 量化版在本地硬件可接受的推理速度下显著提升召回率和定位准确性 |
| Embedding | bge-m3 → nomic-embed-text-v2-moe → **qwen3-embedding:0.6b** | bge-m3 对专业 PDF 切割有限；nomic 中文支持弱；qwen3-embedding 中文支持更好，上下文窗口更大 |
| 向量库 | **FAISS** | 轻量级，本地持久化，无需额外服务进程 |

### 阶段二：分割策略探索

**问题**：回答出现"截止"现象，追溯到知识库匹配结果，发现**表格标题和内容被分割为两个独立向量索引**，导致上下文断裂。

| 尝试方案 | 结论 |
|----------|------|
| SemanticChunker（语义分割） | 效果尚可，但语义模型吃 GPU，配合普通 Embedding 模型速度慢 |
| MinerU + SemanticChunker | MinerU 解析效果好但部署复杂，语义分割效率瓶颈仍在 |
| **Docling + MarkdownHeaderTextSplitter（最终方案）** | Docling 将多类型文档统一输出为结构化 Markdown，保留标题层级、表格结构；MarkdownHeaderTextSplitter 按标题层级分割，标题和内容不再被切断。速度快且效果稳定 |

**关键认知**：工业技术文档结构清晰（分级标题、表格、参数列表），**结构化分割远比语义分割更适合**，且效率高出数倍。

### 阶段三：文档处理方案收敛

**问题**：pdfplumber 专攻文本+表格型 PDF，无法处理扫描件；RapidOCR 处理扫描件耗时长（~5秒/页）。项目主要处理文本型技术文档，扫描件极少。

**最终方案**：**Docling 统一处理**
- PDF（文本型）：~1秒/页，输出结构化 Markdown
- Word/Excel：<0.1秒/页
- 暂不支持扫描件 PDF（本地硬件不足以在合理时间内完成 OCR）

### 阶段四：提示词工程与回答优化

将通用 RAG prompt 改造为工业场景专用 prompt：

```
【系统设定】资深工业智能制造领域技术顾问
【Few-Shot 示例】CNC点检流程、上位机对接等标准回答格式
【严格规则】
  - 只能依据知识库内容回答
  - 禁止编造专业参数、工艺步骤、故障代码
  - 无匹配时如实回复"暂无相关本地工业知识库资料"
  - 专业术语保持原文不变
```

支持按角色切换 prompt 模板，实现定制化问答风格。

### 阶段五：RAGAS 评估体系搭建

**设计原则**：问答模型、测试集生成模型、评估模型三者分离，避免"自己考自己"。

| 角色 | 模型 |
|------|------|
| RAG 问答 | Qwen2.5-7B 量化版（本地） |
| 测试集生成 | RAGAS 自动生成 + 人工标注 ground_truth |
| 评估模型 | DeepSeek-V4-Pro（API）— 更大模型保证评估公正性 |

评估流程全自动化：
1. 从 `observe_logs` 读取 JSONL 问答日志
2. 匹配测试集 CSV 中的 question/ground_truth
3. 调用 RAGAS 计算 5 项指标
4. 输出评估结果 CSV + 加权综合分

---

## 四、可观测性设计

为支撑评估和调试，搭建了结构化日志系统：

```
data/observe_logs/
├── query/query_logs_YYYYMMDD.jsonl     # 每次问答记录
└── ingest/ingest_logs_YYYYMMDD.jsonl   # 每次文档导入记录
```

**单次问答关键字段**：
- `user_input` — 用户问题
- `retrieved_contexts` — 检索召回的文档列表
- `response` — 最终回答
- `timestamp` / `model_name` / `kb_name` 等元信息

**单次导入关键字段**：
- `file_name` / `file_type`
- `preprocessor` / `splitter` 名称
- `chunk_count` / `avg_chunk_size`
- `processing_time`

这些字段直接作为 RAGAS 评估的输入，也为性能分析和异常监控提供了数据基础。

---

## 五、评估结果

### 5.1 最终评估数据

- **测试集**：15 条（覆盖设备运维、工艺参数、系统集成等工业场景）
- **评估集**：5 条
- **评估模型**：DeepSeek-V4-Pro (API)

| 指标 | 得分 | 说明 |
|------|------|------|
| **faithfulness**（忠实度） | 1.0000 | 回答完全基于检索到的文档，未编造 |
| **answer_relevancy**（回答相关性） | 0.8846 | 回答与问题高度相关 |
| **context_precision**（上下文精确度） | 0.822 | 检索到的文档精确匹配问题 |
| **context_recall**（上下文召回率） | 0.8000 | 检索覆盖了回答所需的全部信息 |
| **answer_correctness**（回答正确性） | 0.853 | 回答与标准答案一致性良好 |
| **综合加权得分** | **88.08** | 良好级 |

加权公式：
```
综合分 = faithfulness×0.30 + context_recall×0.25 + context_precision×0.20
        + answer_correctness×0.15 + answer_relevancy×0.10
```

### 5.2 得分解读

- **faithfulness 满分**说明 prompt 约束和 Few-Shot 设计有效，模型严格在知识库范围内作答
- **context_recall 0.80** 是主要提升空间 — 混合检索召回率仍有优化余地
- **context_precision 0.822** 说明检索到的文档噪声较少，Reranker 精排发挥作用
- 综合来看，系统已在工业场景达到**可用且可靠**的水平

---

## 六、工程实践亮点

### 6.1 架构设计

1. **解耦式流水线** — 预处理 / 分割 / 嵌入三阶段独立，可自由组合
2. **面向接口编程** — 每个阶段定义抽象基类（`FilePreprocessor`、`TextSplitterInterface`），新增实现无需修改调用方
3. **环境隔离** — 测试系统虚拟环境与主项目隔离，防止依赖版本冲突

### 6.2 配置驱动

所有关键参数通过 YAML 配置文件管理，支持热加载：

- `kb_settings.yaml` — 向量库、分割器、检索参数、重排序配置
- `model_settings.yaml` — 模型平台、LLM/Embedding 模型选择
- `prompt_settings.yaml` — prompt 模板，支持多角色模板切换
- WebUI 系统配置页面 — 分割器参数动态调整，无需重启服务

### 6.3 WebUI 功能矩阵

| 页面 | 功能 |
|------|------|
| 多功能对话 | LLM 对话、Agent 工具调用、文件对话 |
| RAG 对话 | 知识库问答、top_k/阈值/重排序/prompt 模板可配 |
| 知识库管理 | KB CRUD、文件上传/下载/删除、预处理器和分割器选择 |
| 系统配置 | 各类型 splitter 参数动态修改、重排序参数配置 |
| MCP 管理 | Model Context Protocol 外部工具连接 |

---

## 七、经验总结与最佳实践

### 7.1 选型经验

1. **结构化分割 > 语义分割**（对技术文档而言）：工业文档结构清晰，按标题层级分割既快又准，语义分割反而引入不必要的 GPU 开销和不确定性
2. **小 Embedding 模型 + 大 LLM 模型**：Embedding 负责"找到"，LLM 负责"理解"，Embedding 对中文支持程度比模型大小更重要
3. **混合检索必备**：纯向量检索对专业术语（如 "OPC UA"、"CNC G代码"）匹配效果差，BM25 关键词检索可在不牺牲速度的前提下补齐短板
4. **评估模型独立**：评估必须使用比问答模型更强的模型（如 DeepSeek/Claude/GPT-4），否则评估结果不可信

### 7.2 开发流程

1. **先跑通，再优化** — 第一版用最简单方案（RecursiveCharacterTextSplitter + FAISS）跑通全流程
2. **以评估驱动迭代** — 每次更换分割器/检索策略/Embedding 模型后，重新跑 RAGAS 评估对比
3. **从真实案例找问题** — 回答"截止"问题不是从日志发现的，而是从用户实际使用反馈追溯到的
4. **环境隔离** — 测试系统用独立 venv，避免依赖冲突影响主服务稳定性

### 7.3 待改进方向

- **context_recall 提升**：可尝试引入查询改写（Query Rewriting）或 HyDE（假设文档嵌入）提升召回
- **扫描件支持**：本地硬件资源受限时，考虑外挂 OCR 微服务
- **在线评估**：将 RAGAS 评估集成到 CI/CD，每次代码变更自动跑评估
- **多轮对话**：当前 RAG 以单轮为主，多轮上下文管理有待加强

---

## 八、快速启动

```bash
# 进入项目目录
cd Langchain-Chatchat

# 激活虚拟环境
source venv/bin/activate

# 初始化项目（首次运行）
chatchat init

# 启动 API 服务 + WebUI
chatchat start -a

# 访问 WebUI：http://localhost:8501
# API 文档：http://localhost:7861/docs
```

---

*项目基于 [Langchain-Chatchat](https://github.com/chatchat-space/Langchain-Chatchat) v0.3.1.3，针对工业智能制造场景深度定制。*
