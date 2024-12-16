import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documentType: "",
    topic: "",
    keywords: "",
    subject: "",
    audience: "",
    wordCount: "800",
    additionalInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/document", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">智能公文起草专家</h1>
          <p className="mt-2 text-gray-600">填写以下信息，开始智能文档起草</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              文档类型
            </label>
            <Input
              required
              value={formData.documentType}
              onChange={(e) =>
                setFormData({ ...formData, documentType: e.target.value })
              }
              placeholder="请输入文档类型，如：报告、通知、总结等"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              主题
            </label>
            <Input
              required
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              placeholder="请输入文档主题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              关键词
            </label>
            <Input
              required
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
              placeholder="请输入关键词，多个关键词请用逗号分隔"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              主体
            </label>
            <Input
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="请输入文档主体"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              受众
            </label>
            <Input
              required
              value={formData.audience}
              onChange={(e) =>
                setFormData({ ...formData, audience: e.target.value })
              }
              placeholder="请输入目标受众"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              字数
            </label>
            <Select
              value={formData.wordCount}
              onValueChange={(value) =>
                setFormData({ ...formData, wordCount: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择字数" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="800">800字</SelectItem>
                <SelectItem value="1000">1000字</SelectItem>
                <SelectItem value="1500">1500字</SelectItem>
                <SelectItem value="2000">2000字</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              其他信息
            </label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({ ...formData, additionalInfo: e.target.value })
              }
              placeholder="请输入其他补充信息"
              className="h-32"
            />
          </div>

          <Button type="submit" className="w-full">
            开始生成文档
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;