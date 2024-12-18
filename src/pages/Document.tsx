import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChatWindow } from "@/components/document/ChatWindow";
import { DocumentPreview } from "@/components/document/DocumentPreview";
import { callLLMApi } from "@/utils/api";

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

        const data = await callLLMApi(modelUrl, apiKey, [
          { role: 'system', content: prompt },
          { role: 'user', content: `请根据以下信息生成文档：${JSON.stringify(formData)}` }
        ]);

        setDocumentContent(data.choices?.[0]?.message?.content || '生成失败，请检查API配置');
      } catch (error) {
        console.error('Error generating document:', error);
        toast.error(error instanceof Error ? error.message : "生成文档失败，请检查API配置");
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

      const data = await callLLMApi(modelUrl, apiKey, [
        { role: 'user', content: `请根据以下修改建议修改文档内容：${message}\n\n当前文档内容：${documentContent}` }
      ]);

      const newContent = data.choices?.[0]?.message?.content;
      
      if (newContent) {
        setDocumentContent(newContent);
        setChatHistory(prev => [...prev, `AI: 已根据您的建议修改文档内容`]);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error(error instanceof Error ? error.message : "修改文档失败，请检查API配置");
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
      <ChatWindow
        chatHistory={chatHistory}
        message={message}
        isLoading={isLoading}
        onMessageChange={setMessage}
        onMessageSubmit={handleMessageSubmit}
        onBack={handleBack}
      />
      <DocumentPreview
        documentContent={documentContent}
        isLoading={isLoading}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Document;