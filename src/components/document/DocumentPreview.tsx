import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

interface DocumentPreviewProps {
  documentContent: string;
  isLoading: boolean;
  onDownload: () => void;
}

export const DocumentPreview = ({
  documentContent,
  isLoading,
  onDownload
}: DocumentPreviewProps) => {
  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">文档预览</h2>
        <Button onClick={onDownload} disabled={isLoading}>下载文档</Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 min-h-full">
          <div className="prose max-w-none">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ReactMarkdown>{documentContent}</ReactMarkdown>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};