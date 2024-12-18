import { Input } from "@/components/ui/input";

interface ModelConfigProps {
  modelUrl: string;
  modelName: string;
  apiKey: string;
  isEditing: boolean;
  onModelUrlChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
}

export const ModelConfig = ({
  modelUrl,
  modelName,
  apiKey,
  isEditing,
  onModelUrlChange,
  onModelNameChange,
  onApiKeyChange,
}: ModelConfigProps) => {
  const modelOptions = {
    "通义千问": ["qwen-long", "qwen72b", "qwen32b"],
    "讯飞星火": ["v3.5", "v3.0", "v2.0"],
    "字节豆包": ["doupo-01", "doupo-02", "doupo-03"],
    "百度文心": ["ernie-4.0", "ernie-3.5", "ernie-3.0"]
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          模型接口地址
        </label>
        <Input
          value={modelUrl}
          onChange={(e) => onModelUrlChange(e.target.value)}
          placeholder="输入模型API接口地址..."
          disabled={!isEditing}
          className="font-mono"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          模型名称
        </label>
        <Input
          value={modelName}
          onChange={(e) => onModelNameChange(e.target.value)}
          placeholder="输入模型名称..."
          disabled={!isEditing}
          className="font-mono"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="输入API Key..."
          disabled={!isEditing}
          className="font-mono"
        />
      </div>
    </div>
  );
};