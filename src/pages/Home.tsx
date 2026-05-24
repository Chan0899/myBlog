import { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MenuOutlined } from '@ant-design/icons';
import { Card } from '../components';
import { TocSidebar } from '../components/TocSidebar/TocSidebar';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  filePath?: string;
}

const knowledgeItems: KnowledgeItem[] = [
  {
    id: 'llm',
    title: '⚛️ LLM基础',
    description: 'LLM基础知识，了解大模型的原理、架构和应用场景',
    filePath: '/content/LLM基础.md',
  },
  {
    id: 'rag',
    title: '🔍 RAG',
    description: '检索增强生成（Retrieval-Augmented Generation），结合外部知识库提升LLM能力',
    filePath: '/content/RAG.md',
  },
  {
    id: 'code-guidelines',
    title: '📋 Code Guidelines',
    description: '写入 CLAUDE.md 的代码规范，指导 AI 辅助编码行为',
    filePath: '/content/Code Guidelines.md',
  },
  {
    id: 'prompt-engineering',
    title: '✍️ Prompt Engineering【待完善】',
    description: '提示工程技术与实践，掌握如何高效地与LLM交互',
    filePath: '/content/Prompt Engineering.md',
  },
  {
    id: 'ai-agent',
    title: '🤖 AI Agent琐碎知识【待完善】',
    description: 'AI Agent相关的零散知识点、实践经验与技巧总结',
    filePath: '/content/AI Agent琐碎知识.md',
  }, 
  {
    id: 'tbd',
    title: '📝 待扩展【待完善】',
    description: '更多内容即将上线，敬请期待',
  },
];

export function Home() {
  const [selected, setSelected] = useState<KnowledgeItem | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const touchStartX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 60 && touchStartX.current < 40) {
      setSidebarOpen(true);
    }
    if (deltaX < -60) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!selected?.filePath) {
      setContent(null);
      return;
    }

    setLoading(true);
    fetch(selected.filePath)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent('加载失败，请检查文件是否存在'))
      .finally(() => setLoading(false));
  }, [selected]);

  const slugify = useCallback((text: string) =>
    text.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, ''),
  []);

  const heading = useCallback(
    (level: number) =>
      function Heading({ children }: { children?: React.ReactNode }) {
        const text = String(children ?? '');
        const id = slugify(text);
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        return <Tag id={id}>{children}</Tag>;
      },
    [slugify],
  );

  if (selected) {
    return (
      <div
        className="p-4 lg:p-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 顶部导航行 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { setSelected(null); setSidebarOpen(false); }}
            className="
              px-4 py-2 text-sm
              text-gray-600 dark:text-gray-300
              hover:text-gray-900 dark:hover:text-white
              transition-colors cursor-pointer
            "
          >
            ← 返回
          </button>

          {content && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden
                px-3 py-1.5 text-sm
                rounded-md
                bg-gray-200 dark:bg-gray-700
                text-gray-700 dark:text-gray-200
                flex items-center gap-1.5
              "
            >
              <MenuOutlined />
              目录
            </button>
          )}
        </div>

        <div className="flex gap-6">
          {content && (
            <>
              {/* 移动端遮罩层 */}
              <div
                className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                  sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setSidebarOpen(false)}
              />

              {/* 移动端侧边抽屉 */}
              <div className={`
                lg:hidden fixed left-0 top-0 h-full z-50 w-[260px]
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}>
                <div className="
                  h-full overflow-y-auto
                  bg-white dark:bg-gray-900
                  shadow-2xl p-4
                ">
                  <TocSidebar content={content} onItemClick={() => setSidebarOpen(false)} />
                </div>
              </div>

              {/* 桌面端目录栏 */}
              <div className="hidden lg:block shrink-0">
                <TocSidebar content={content} />
              </div>
            </>
          )}

          {/* Markdown 内容区 */}
          <div className="
            flex-1 min-w-0
            bg-gray-100 dark:bg-gray-800
            rounded-lg
            min-h-[400px]
            p-4 lg:p-8
          ">
            <div className="md-content max-w-4xl mx-auto">
              {loading && <p className="text-center">加载中...</p>}
              {!loading && content && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  urlTransform={(url) => url}
                  components={{
                    h1: heading(1),
                    h2: heading(2),
                    h3: heading(3),
                    h4: heading(4),
                    h5: heading(5),
                    h6: heading(6),
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt || ''}
                        className="max-w-full h-auto rounded-lg my-4"
                      />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              )}
              {!loading && !content && (
                <p className="text-center text-gray-400 dark:text-gray-500">
                  暂无内容
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-ink-50 mb-2" />
        <p className="text-gray-600 dark:text-ink-300">
          前沿知识学习
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeItems.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            onClick={() => setSelected(item)}
          >
            <p className="text-gray-700 dark:text-ink-200">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
