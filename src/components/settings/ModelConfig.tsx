import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ModelConfigProps {
  modelType: string;
  modelName: string;
  apiKey: string;
  isEditing: boolean;
  onModelTypeChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
}

export const ModelConfig = ({
  modelType,
  modelName,
  apiKey,
  isEditing,
  onModelTypeChange,
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
          模型类型
        </label>
        <Select
          value={modelType}
          onValueChange={onModelTypeChange}
          disabled={!isEditing}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择模型类型" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(modelOptions).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          模型名称
        </label>
        <Select
          value={modelName}
          onValueChange={onModelNameChange}
          disabled={!modelType || !isEditing}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择模型名称" />
          </SelectTrigger>
          <SelectContent>
            {modelType && modelOptions[modelType as keyof typeof modelOptions].map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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