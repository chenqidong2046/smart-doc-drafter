import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Document = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    const generateInitialDocument = async () => {
      setIsLoading(true);
      try {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        const { modelUrl, apiKey, systemPrompt } = settings;
        
        if (!modelUrl || !apiKey) {
          toast.error("请先在设置页面配置模型接口地址和API Key");
          return;
        }

        const formData = location.state;
        const prompt = systemPrompt.replace(/\{([^}]+)\}/g, (match, field) => {
          return formData[field.toLowerCase()] || '';
        });

        const response = await fetch(modelUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: prompt },
              { role: 'user', content: `请根据以下信息生成文档：${JSON.stringify(formData)}` }
            ]
          })
        });

        if (!response.ok) {
          throw new Error('API调用失败');
        }

        const data = await response.json();
        setDocumentContent(data.choices?.[0]?.message?.content || '生成失败，请检查API配置');
      } catch (error) {
        console.error('Error generating document:', error);
        toast.error("生成文档失败，请检查API配置");
        setDocumentContent("生成失败，请检查API配置");
      } finally {
        setIsLoading(false);
      }
    };

    generateInitialDocument();
  }, [location.state, navigate]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setChatHistory([...chatHistory, `用户: ${message}`]);

    try {
      const settings = JSON.parse(localStorage.getItem('settings') || '{}');
      const { modelUrl, apiKey } = settings;

      const response = await fetch(modelUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: `请根据以下修改建议修改文档内容：${message}\n\n当前文档内容：${documentContent}` }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API调用失败');
      }

      const data = await response.json();
      const newContent = data.choices?.[0]?.message?.content;
      
      if (newContent) {
        setDocumentContent(newContent);
        setChatHistory(prev => [...prev, `AI: 已根据您的建议修改文档内容`]);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error("修改文档失败，请检查API配置");
      setChatHistory(prev => [...prev, `AI: 修改失败，请检查API配置`]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const handleDownload = () => {
    const element = window.document.createElement("a");
    const file = new Blob([documentContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    element.href = URL.createObjectURL(file);
    element.download = "generated-document.docx";
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const handleBack = () => {
    navigate('/', { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      <div className="w-1/3 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">对话窗口</h2>
        </div>
        
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  chat.startsWith("用户:") ? "bg-blue-50 text-blue-900" : "bg-gray-50"
                }`}
              >
                {chat}
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleMessageSubmit} className="mt-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入修改建议..."
            className="mb-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "处理中..." : "发送"}
          </Button>
        </form>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">文档预览</h2>
          <Button onClick={handleDownload} disabled={isLoading}>下载文档</Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 min-h-full">
            <div className="prose max-w-none">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                documentContent.split("\n").map((line, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Document;