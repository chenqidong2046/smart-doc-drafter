import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

const Document = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  useEffect(() => {
    // If there's no state, redirect to the form page
    if (!location.state) {
      navigate('/');
      return;
    }

    // Simulate initial document generation
    const { topic, keywords, subject, audience, wordCount, additionalInfo } = location.state;
    const initialDoc = `关于${topic}的报告\n\n主要内容：${subject}\n目标受众：${audience}\n关键词：${keywords}\n\n这里是生成的文档内容...`;
    setDocumentContent(initialDoc);
  }, [location.state, navigate]);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add message to chat history
    setChatHistory([...chatHistory, `用户: ${message}`]);
    // Simulate AI response
    setChatHistory((prev) => [...prev, `AI: 已根据您的要求调整文档内容`]);
    // Update document based on message (in real app, this would be AI-generated)
    setDocumentContent((prev) => prev + "\n\n[根据用户反馈添加的新内容]");
    setMessage("");
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
    // Navigate back with the original form data
    navigate('/', { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Chat */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-2" 
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
                  chat.startsWith("用户:") ? "bg-blue-50" : "bg-gray-50"
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
            className="mb-2"
          />
          <Button type="submit" className="w-full">
            发送
          </Button>
        </form>
      </div>

      {/* Right side - Document Preview */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">文档预览</h2>
          <Button onClick={handleDownload}>下载文档</Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="bg-white p-8 rounded-lg shadow min-h-full">
            <div className="prose max-w-none">
              {documentContent.split("\n").map((line, index) => (
                <p key={index} className="mb-4">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Document;