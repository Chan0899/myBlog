import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogItem {
  id: string;
  title: string;
  subtitle: string;
  filePath: string;
}

const blogItems: BlogItem[] = [
  {
    id: 'rag-coref',
    title: 'RAG系统"硬指代"痛点该怎么解决？',
    subtitle: '技术 | RAG',
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
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
            <p className="text-gray-500 dark:text-ink-300 text-sm">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
