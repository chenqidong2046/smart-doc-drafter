import { useState } from "react";
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
import { toast } from "sonner";

const Settings = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [modelType, setModelType] = useState("gpt-4");
  const [apiKey, setApiKey] = useState("");

  const handleSavePrompts = () => {
    // Here you would typically save to a backend
    localStorage.setItem("systemPrompt", systemPrompt);
    localStorage.setItem("userPrompt", userPrompt);
    toast.success("提示词保存成功");
  };

  const handleSaveModelConfig = () => {
    // Here you would typically save to a backend
    localStorage.setItem("modelType", modelType);
    localStorage.setItem("apiKey", apiKey);
    toast.success("模型配置保存成功");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">系统设置</h1>
        
        <Tabs defaultValue="prompts" className="bg-white p-6 rounded-lg shadow">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="prompts">提示词管理</TabsTrigger>
            <TabsTrigger value="model">模型配置</TabsTrigger>
          </TabsList>

          <TabsContent value="prompts" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                系统提示词
              </label>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="输入系统提示词..."
                className="h-40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户提示词
              </label>
              <Textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="输入用户提示词..."
                className="h-40"
              />
            </div>

            <Button onClick={handleSavePrompts} className="w-full">
              保存提示词设置
            </Button>
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择模型
              </label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择大语言模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入API Key..."
              />
            </div>

            <Button onClick={handleSaveModelConfig} className="w-full">
              保存模型配置
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;