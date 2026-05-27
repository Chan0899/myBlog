import { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MenuOutlined } from '@ant-design/icons';
import { Card } from '../components';
import { TocSidebar } from '../components/TocSidebar/TocSidebar';
import { RainBackground } from '../components/RainBackground/RainBackground';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  filePath: string;
}

const projectItems: ProjectItem[] = [
  {
    id: 'langchain',
    title: 'Langchain项目',
    subtitle: '基于 LangChain 框架的 LLM 应用开发实践',
    image: '/projects/langchain/langchain.png',
    filePath: '/projects/langchain/PROJECT_INTRO.md',
  },
];

export function Dashboard() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-ink-50 mb-2">
              {selected.title}
            </h2>
            <p className="text-gray-600 dark:text-ink-300 mb-6">
              {selected.subtitle}
            </p>

            <img
              src={selected.image}
              alt={selected.title}
              className="max-w-full h-auto rounded-lg mb-8"
            />

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
          项目案例与经验分享
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectItems.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            onClick={() => setSelected(item)}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="text-gray-600 dark:text-ink-300 text-sm">
              {item.subtitle}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
