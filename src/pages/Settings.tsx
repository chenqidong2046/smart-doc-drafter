import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { PromptEditor } from "@/components/settings/PromptEditor";
import { ModelConfig } from "@/components/settings/ModelConfig";

const Settings = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [modelUrl, setModelUrl] = useState("");
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

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSystemPrompt(settings.systemPrompt || "");
      setSelectedFields(settings.selectedFields || []);
      setModelUrl(settings.modelUrl || "");
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
      modelUrl,
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
        <SettingsHeader />
        
        <div className="space-y-6">
          <PromptEditor
            systemPrompt={systemPrompt}
            selectedFields={selectedFields}
            formFields={formFields}
            isEditing={isEditing || !hasSubmitted}
            onPromptChange={setSystemPrompt}
            onFieldClick={handleFieldClick}
            onRemoveField={handleRemoveField}
          />

          <ModelConfig
            modelUrl={modelUrl}
            modelName={modelName}
            apiKey={apiKey}
            isEditing={isEditing || !hasSubmitted}
            onModelUrlChange={setModelUrl}
            onModelNameChange={setModelName}
            onApiKeyChange={setApiKey}
          />

          <div className="flex justify-end gap-4">
            {hasSubmitted && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "取消编辑" : "编辑"}
              </Button>
            )}
            <Button onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;