import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [modelType, setModelType] = useState("");
  const [modelName, setModelName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formFields = [
    "文档类型",
    "主题",
    "关键词",
    "主体",
    "受众",
    "字数",
    "其他信息"
  ];

  const modelOptions = {
    "通义千问": ["qwen-long", "qwen72b", "qwen32b"],
    "讯飞星火": ["v3.5", "v3.0", "v2.0"],
    "字节豆包": ["doupo-01", "doupo-02", "doupo-03"],
    "百度文心": ["ernie-4.0", "ernie-3.5", "ernie-3.0"]
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSystemPrompt(settings.systemPrompt || "");
      setSelectedFields(settings.selectedFields || []);
      setModelType(settings.modelType || "");
      setModelName(settings.modelName || "");
      setApiKey(settings.apiKey || "");
      setHasSubmitted(true);
    }
  }, []);

  const handleFieldClick = (field: string) => {
    if (!isEditing && hasSubmitted) return;
    
    if (selectedFields.includes(field)) {
      setSystemPrompt(systemPrompt.replace(`{${field}}`, "").trim());
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSystemPrompt(`${systemPrompt} {${field}}`.trim());
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleRemoveField = (field: string) => {
    if (!isEditing && hasSubmitted) return;
    
    setSystemPrompt(systemPrompt.replace(`{${field}}`, "").trim());
    setSelectedFields(selectedFields.filter(f => f !== field));
  };

  const handleSubmit = () => {
    const settings = {
      systemPrompt,
      selectedFields,
      modelType,
      modelName,
      apiKey
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    setHasSubmitted(true);
    setIsEditing(false);
    toast.success("设置保存成功");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">系统设置</h1>
        
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">系统提示词</h2>
              {hasSubmitted && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "取消编辑" : "编辑"}
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {formFields.map((field) => (
                <Button
                  key={field}
                  variant={selectedFields.includes(field) ? "default" : "outline"}
                  onClick={() => handleFieldClick(field)}
                  disabled={!isEditing && hasSubmitted}
                >
                  {field}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Textarea
                value={systemPrompt}
                onChange={(e) => isEditing || !hasSubmitted ? setSystemPrompt(e.target.value) : null}
                placeholder="输入系统提示词..."
                className="h-40"
                disabled={!isEditing && hasSubmitted}
              />
              <div className="flex flex-wrap gap-2">
                {selectedFields.map((field) => (
                  <Badge key={field} variant="secondary" className="text-sm">
                    {field}
                    <button
                      onClick={() => handleRemoveField(field)}
                      className="ml-1 hover:text-red-500"
                      disabled={!isEditing && hasSubmitted}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                模型类型
              </label>
              <Select
                value={modelType}
                onValueChange={(value) => {
                  if (isEditing || !hasSubmitted) {
                    setModelType(value);
                    setModelName("");
                  }
                }}
                disabled={!isEditing && hasSubmitted}
              >
                <SelectTrigger>
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
                onValueChange={(value) => isEditing || !hasSubmitted ? setModelName(value) : null}
                disabled={!modelType || (!isEditing && hasSubmitted)}
              >
                <SelectTrigger>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => isEditing || !hasSubmitted ? setApiKey(e.target.value) : null}
              placeholder="输入API Key..."
              disabled={!isEditing && hasSubmitted}
            />
          </div>

          {(!hasSubmitted || isEditing) && (
            <Button onClick={handleSubmit} className="w-full">
              提交
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;