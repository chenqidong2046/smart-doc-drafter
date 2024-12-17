import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PromptEditorProps {
  systemPrompt: string;
  selectedFields: string[];
  formFields: string[];
  isEditing: boolean;
  onPromptChange: (value: string) => void;
  onFieldClick: (field: string) => void;
  onRemoveField: (field: string) => void;
}

export const PromptEditor = ({
  systemPrompt,
  selectedFields,
  formFields,
  isEditing,
  onPromptChange,
  onFieldClick,
  onRemoveField,
}: PromptEditorProps) => {
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">系统提示词</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {formFields.map((field) => (
          <Button
            key={field}
            variant={selectedFields.includes(field) ? "default" : "outline"}
            onClick={() => onFieldClick(field)}
            disabled={!isEditing}
            className="transition-all"
          >
            {field}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        <Textarea
          value={systemPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="输入系统提示词..."
          className="h-40 resize-none"
          disabled={!isEditing}
        />
        <div className="flex flex-wrap gap-2">
          {selectedFields.map((field) => (
            <Badge key={field} variant="secondary" className="text-sm py-1 px-3">
              {field}
              <button
                onClick={() => onRemoveField(field)}
                className="ml-1 hover:text-red-500"
                disabled={!isEditing}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};