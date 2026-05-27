import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  filePath: string;
}

const blogItems: BlogItem[] = [
  {
    id: 'multi-agent-2026',
    title: '从代码开发到人人可用：2026 多智能体框架对比与平民化革新方案',
    subtitle: '技术 | 多智能体',
    summary:
      '随着AI应用从单一对话走向企业级复杂自动化，传统单智能体能力局限凸显，而早期多智能体方案高度依赖代码开发、专业运维。本文对比2026年主流多智能体框架，聚焦去代码化、平民化、轻量化的革新方向，详解普通人可一键搭建、单人管理智能体团队的落地方案。',
    date: '2026-5-27',
    filePath: '/blogs/从代码开发到人人可用：2026 多智能体框架对比与平民化革新方案.md',
  },
  {
    id: 'rag-coref',
    title: 'RAG系统"硬指代"痛点该怎么解决？',
    subtitle: '技术 | RAG',
    summary:
      '当前垂直领域技术文档中存在大量"硬指代"——通过章节号、条款序号等明确位置指向特定文本，传统RAG因缺乏结构认知而频繁出现定位失效、答非所问。本文分析人类解析硬指代的两大隐性认知系统，并给出AI工程化落地方案：全局路径ID + 指代定位模型双模块架构。',
    date: '2026-5-23',
    filePath: '/blogs/RAG系统硬指代痛点.md',
  },
];

export function Blog() {
  const [selected, setSelected] = useState<BlogItem | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '');

  const heading = (level: number) =>
    function Heading({ children }: { children?: React.ReactNode }) {
      const text = String(children ?? '');
      const id = slugify(text);
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return <Tag id={id}>{children}</Tag>;
    };

  if (selected) {
    return (
      <div className="p-4 lg:p-8">
        <button
          onClick={() => setSelected(null)}
          className="
            mb-4 px-4 py-2 text-sm
            text-gray-600 dark:text-gray-300
            hover:text-gray-900 dark:hover:text-white
            transition-colors cursor-pointer
          "
        >
          ← 返回
        </button>

        <div className="
          bg-gray-100 dark:bg-gray-800
          rounded-lg min-h-[400px]
          p-4 lg:p-8
        ">
          <div className="md-content max-w-4xl">
            {loading && <p className="text-center text-gray-500">加载中...</p>}
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="mb-8">
        <p className="text-gray-600 dark:text-ink-300">
          技术 | 生活
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {blogItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
              w-full max-w-5xl
              bg-white dark:bg-ink-800
              rounded-lg border border-gray-200 dark:border-ink-600
              p-6 cursor-pointer
              transition-shadow duration-300
              hover:shadow-lg
            "
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-ink-50 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 dark:text-ink-300 text-sm leading-relaxed mb-4">
              {item.summary}
            </p>
            <p className="text-gray-400 dark:text-ink-400 text-xs text-right">
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
