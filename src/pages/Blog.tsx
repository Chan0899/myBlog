import { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MenuOutlined } from '@ant-design/icons';
import { TocSidebar } from '../components/TocSidebar/TocSidebar';
import { RainBackground } from '../components/RainBackground/RainBackground';

interface BlogItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  filePath: string;
}

const blogItems: BlogItem[] = [
  {
    id: 'multi-agent-arch',
    title: '落地实现：通用平民化多智能体团队架构（可工程落地）',
    summary:
      '基于多智能体框架痛点复盘，设计一套通用平民化六层团队架构——从人类管控、零代码可视化交互、AI统筹调度、专业化执行集群，到智能质控进化与统一资源持久层，彻底告别伪协作与高门槛，让普通人也能一键搭建、单人管理专属AI智能体团队。',
    date: '2026-5-28',
    filePath: '/blogs/multi-agent-arch/index.md',
  },
  {
    id: 'multi-agent-2026',
    title: '告别伪协作与高门槛：2026多智能体框架对比、痛点剖析与平民化真团队架构革新方案',
    summary:
      '传统单智能体能力有限，而早期多智能体方案普遍存在"伪协作"——框架预设流程、Agent间无动态协商，加上高代码门槛，将多数团队挡在门外。本文对比2026年主流多智能体框架，深度剖析伪协作与高门槛两大痛点，并给出平民化"真团队"架构的革新落地方案。',
    date: '2026-5-27',
    filePath: '/blogs/multi-agent-2026/index.md',
  },
  {
    id: 'rag-coref',
    title: 'RAG系统"硬指代"痛点该怎么解决？',
    summary:
      '当前垂直领域技术文档中存在大量"硬指代"——通过章节号、条款序号等明确位置指向特定文本，传统RAG因缺乏结构认知而频繁出现定位失效、答非所问。本文分析人类解析硬指代的两大隐性认知系统，并给出AI工程化落地方案：全局路径ID + 指代定位模型双模块架构。',
    date: '2026-5-23',
    filePath: '/blogs/rag-coref/index.md',
  },
];

export function Blog() {
  const [selected, setSelected] = useState<BlogItem | null>(null);
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
        className="relative p-4 lg:p-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <RainBackground />

        {/* 顶部导航行 */}
        <div className="relative z-10 flex items-center justify-between mb-4">
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

        <div className="relative z-10 flex gap-6">
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
                  bg-white/80 dark:bg-gray-900/80
                  backdrop-blur-md
                  shadow-2xl p-4
                ">
                  <TocSidebar content={content} onItemClick={() => setSidebarOpen(false)} />
                </div>
              </div>

              {/* 桌面端目录栏 */}
              <div className="hidden lg:block shrink-0 lg:sticky lg:top-[80px] lg:self-start">
                <div className="
                  bg-white/60 dark:bg-gray-900/60
                  backdrop-blur-md
                  rounded-lg p-4
                ">
                  <TocSidebar content={content} />
                </div>
              </div>
            </>
          )}

          {/* Markdown 内容区 */}
          <div className="
            flex-1 min-w-0
            bg-white/60 dark:bg-gray-900/60
            backdrop-blur-md
            rounded-lg
            min-h-[400px]
            p-4 lg:p-8
          ">
            <div className="md-content max-w-4xl mx-auto">
              {loading && <p className="text-center text-gray-500">加载中...</p>}
              {!loading && content && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  urlTransform={(url) => {
                    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('#')) {
                      return url;
                    }
                    const dir = selected.filePath.substring(0, selected.filePath.lastIndexOf('/') + 1);
                    return dir + url;
                  }}
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
      </div>
    );
  }

  return (
    <div className="relative space-y-6 p-4 lg:p-8">
      <RainBackground />

      <div className="relative z-10 mb-8">
        <p className="text-gray-600 dark:text-ink-300">
          技术 | 生活
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {blogItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
              w-full max-w-5xl
              bg-white/60 dark:bg-gray-900/60
              backdrop-blur-md
              rounded-lg border border-gray-200/50 dark:border-gray-700/50
              pt-6 px-6 pb-3 cursor-pointer
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
