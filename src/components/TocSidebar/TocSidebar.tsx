import { useMemo } from 'react';

interface TocItem {
  level: number;
  text: string;
  id: string;
}

interface TocSidebarProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function TocSidebar({ content }: TocSidebarProps) {
  const items = useMemo(() => {
    // 去掉代码块中的内容，避免 # 注释被误识别为标题
    const withoutCode = content.replace(/```[\s\S]*?```/g, '');
    const re = /^(#{1,6})\s*(.+)$/gm;
    const result: TocItem[] = [];
    let match: RegExpExecArray | null;
    while ((match = re.exec(withoutCode)) !== null) {
      result.push({
        level: match[1].length,
        text: match[2].replace(/[`*_~]/g, ''),
        id: slugify(match[2]),
      });
    }
    return result;
  }, [content]);

  if (items.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="toc-sidebar">
      <h4 className="toc-title">目录</h4>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="toc-item"
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className="toc-link"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TocSidebar;
