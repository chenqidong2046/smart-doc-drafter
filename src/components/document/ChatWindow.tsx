import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatWindowProps {
  chatHistory: string[];
  message: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onMessageSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ChatWindow = ({
  chatHistory,
  message,
  isLoading,
  onMessageChange,
  onMessageSubmit,
  onBack
}: ChatWindowProps) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700" 
          onClick={onBack}
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

      <form onSubmit={onMessageSubmit} className="mt-auto">
        <Input
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="输入修改建议..."
          className="mb-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "处理中..." : "发送"}
        </Button>
      </form>
    </div>
  );
};