import { useState } from 'react';
import { Card, Button } from '../components';
import { Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  EyeOutlined,
  DollarOutlined,
} from '@ant-design/icons';

/**
 * 仪表板页面 - 展示数据统计和图表示例
 */
export function Dashboard() {
  // 示例数据状态
  const [stats, setStats] = useState({
    users: 1234,
    orders: 567,
    pageViews: 89012,
    revenue: 123456,
  });

  // 刷新数据示例
  const handleRefresh = () => {
    setStats({
      users: Math.floor(Math.random() * 10000),
      orders: Math.floor(Math.random() * 1000),
      pageViews: Math.floor(Math.random() * 100000),
      revenue: Math.floor(Math.random() * 1000000),
    });
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            仪表板
          </h1>
          <p className="text-gray-600">
            实时数据统计和分析
          </p>
        </div>
        <Button variant="primary" onClick={handleRefresh}>
          刷新数据
        </Button>
      </div>

      {/* 统计卡片 - 使用 Ant Design Statistic */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card title="用户总数">
            <Statistic
              title="累计用户"
              value={stats.users}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card title="订单统计">
            <Statistic
              title="总订单数"
              value={stats.orders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card title="浏览数据">
            <Statistic
              title="页面浏览"
              value={stats.pageViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card title="收入统计">
            <Statistic
              title="总收入"
              value={stats.revenue}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 详细数据表 */}
      <Card title="近期数据" className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-900">
                日期
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                用户
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                订单
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                收入
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((day) => (
              <tr key={day} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">
                  2024-05-{String(day).padStart(2, '0')}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {Math.floor(Math.random() * 100)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {Math.floor(Math.random() * 50)}
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  ¥{Math.floor(Math.random() * 10000)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 功能演示 */}
      <Card title="功能演示">
        <div className="space-y-4">
          <p className="text-gray-700">
            这个页面演示了如何在 React 应用中集成数据统计和交互功能。
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>使用 Ant Design Statistic 组件展示统计数据</li>
            <li>集成 React Hooks（useState）管理数据状态</li>
            <li>支持数据动态更新和交互</li>
            <li>响应式布局适配不同屏幕尺寸</li>
            <li>复用公共 Card 组件保持风格统一</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
