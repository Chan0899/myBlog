import { useState } from 'react';
import { Card } from '../components';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const projectItems: ProjectItem[] = [
  {
    id: 'langchain',
    title: 'Langchain项目',
    subtitle: '基于 LangChain 框架的 LLM 应用开发实践',
    image: '/images/langchain.png',
  },
];

export function Dashboard() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  if (selected) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelected(null)}
          className="
            mb-4
            px-4
            py-2
            text-sm
            text-gray-600
            dark:text-gray-300
            hover:text-gray-900
            dark:hover:text-white
            transition-colors
            cursor-pointer
          "
        >
          ← 返回
        </button>

        <div className="
          bg-gray-100
          dark:bg-gray-800
          rounded-lg
          min-h-[400px]
          p-8
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
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-ink-50 mb-2">
          项目分享
        </h1>
        <p className="text-gray-600 dark:text-ink-300">
          项目经验与技术分享
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectItems.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            onClick={() => setSelected(item)}
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
