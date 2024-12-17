import { useNavigate, useLocation } from "react-router-dom";
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
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    documentType: "",
    topic: "",
    keywords: "",
    subject: "",
    audience: "",
    wordCount: "800",
    additionalInfo: "",
  });

  // Load form data from localStorage or location state when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (location.state) {
      setFormData(location.state);
    } else if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data to localStorage before navigating
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate("/document", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/lovable-uploads/a0ea2d20-6785-41ab-b3d0-cb12d1676761.png" 
            alt="华中师范大学" 
            className="h-12 object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="rounded-full hover:bg-blue-50"
          >
            <Settings className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 kaiti">智能公文起草专家</h1>
          <p className="text-gray-600">填写以下信息，开始智能文档起草</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                文档类型
              </label>
              <Select
                value={formData.documentType}
                onValueChange={(value) =>
                  setFormData({ ...formData, documentType: value })
                }
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="选择文档类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="讲话稿">讲话稿</SelectItem>
                  <SelectItem value="总结报告">总结报告</SelectItem>
                  <SelectItem value="工作方案">工作方案</SelectItem>
                  <SelectItem value="心得体会">心得体会</SelectItem>
                  <SelectItem value="通知">通知</SelectItem>
                  <SelectItem value="通报">通报</SelectItem>
                  <SelectItem value="调研报告">调研报告</SelectItem>
                </SelectContent>
              </Select>
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
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="选择字数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="800以内">800字以内</SelectItem>
                  <SelectItem value="800">800字</SelectItem>
                  <SelectItem value="1000">1000字</SelectItem>
                  <SelectItem value="1500">1500字</SelectItem>
                  <SelectItem value="2000">2000字</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
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
              className="h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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