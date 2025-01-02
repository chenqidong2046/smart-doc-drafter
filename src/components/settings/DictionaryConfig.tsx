import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DictionaryConfigProps {
  docTypes: string[];
  wordCounts: string[];
  isEditing: boolean;
  onDocTypesChange: (types: string[]) => void;
  onWordCountsChange: (counts: string[]) => void;
}

export const DictionaryConfig = ({
  docTypes,
  wordCounts,
  isEditing,
  onDocTypesChange,
  onWordCountsChange,
}: DictionaryConfigProps) => {
  const [newDocType, setNewDocType] = useState("");
  const [newWordCount, setNewWordCount] = useState("");

  const handleAddDocType = () => {
    if (newDocType && !docTypes.includes(newDocType)) {
      onDocTypesChange([...docTypes, newDocType]);
      setNewDocType("");
    }
  };

  const handleAddWordCount = () => {
    if (newWordCount && !wordCounts.includes(newWordCount)) {
      onWordCountsChange([...wordCounts, newWordCount]);
      setNewWordCount("");
    }
  };

  const handleRemoveDocType = (type: string) => {
    onDocTypesChange(docTypes.filter((t) => t !== type));
  };

  const handleRemoveWordCount = (count: string) => {
    onWordCountsChange(wordCounts.filter((c) => c !== count));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">字典配置</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文档类型
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value)}
                placeholder="输入文档类型..."
                disabled={!isEditing}
              />
              <Button 
                onClick={handleAddDocType}
                disabled={!isEditing}
                variant="outline"
              >
                添加
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {docTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-sm py-1 px-3">
                  {type}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveDocType(type)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              字数选项
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newWordCount}
                onChange={(e) => setNewWordCount(e.target.value)}
                placeholder="输入字数..."
                disabled={!isEditing}
              />
              <Button 
                onClick={handleAddWordCount}
                disabled={!isEditing}
                variant="outline"
              >
                添加
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {wordCounts.map((count) => (
                <Badge key={count} variant="secondary" className="text-sm py-1 px-3">
                  {count}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveWordCount(count)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};