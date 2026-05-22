import { Card } from '../components';

/**
 * 设置页面 - 预留功能扩展空间
 */
export function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">设置</h1>
        <p className="text-gray-600">系统配置与偏好管理</p>
      </div>

      <Card title="基本设置">
        <p className="text-gray-500">此页面为预留扩展空间，可根据业务需求添加设置项。</p>
      </Card>
    </div>
  );
}

export default Settings;
