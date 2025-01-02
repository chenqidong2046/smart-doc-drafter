import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentFormProps {
  formData: {
    documentType: string;
    topic: string;
    keywords: string;
    subject: string;
    audience: string;
    wordCount: string;
    additionalInfo: string;
    referenceDoc?: File;
  };
  docTypes: string[];
  wordCounts: string[];
  onSubmit: (e: FormEvent) => void;
  onChange: (field: string, value: string | File) => void;
}

export const DocumentForm = ({
  formData,
  docTypes,
  wordCounts,
  onSubmit,
  onChange,
}: DocumentFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        onChange("referenceDoc", file);
      } else {
        alert("请上传.doc或.docx格式的文件");
        e.target.value = '';
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <FormField label="主题" required>
        <Input
          required
          value={formData.topic}
          onChange={(e) => onChange("topic", e.target.value)}
          placeholder="请输入文档主题"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="文档类型" required>
          <Select
            value={formData.documentType}
            onValueChange={(value) => onChange("documentType", value)}
            required
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder="选择文档类型" />
            </SelectTrigger>
            <SelectContent>
              {docTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="字数" required>
          <Select
            value={formData.wordCount}
            onValueChange={(value) => onChange("wordCount", value)}
            required
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder="选择字数" />
            </SelectTrigger>
            <SelectContent>
              {wordCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="关键词" required>
        <Input
          required
          value={formData.keywords}
          onChange={(e) => onChange("keywords", e.target.value)}
          placeholder="请输入关键词，多个关键词请用逗号分隔"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="主体" required>
          <Input
            required
            value={formData.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            placeholder="请输入文档主体"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="受众" required>
          <Input
            required
            value={formData.audience}
            onChange={(e) => onChange("audience", e.target.value)}
            placeholder="请输入目标受众"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <FormField label="背景信息">
        <div className="relative">
          <Textarea
            value={formData.additionalInfo}
            onChange={(e) => onChange("additionalInfo", e.target.value)}
            placeholder="请输入背景信息"
            maxLength={200}
            className="h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-16"
          />
          <span className="absolute bottom-2 right-2 text-sm text-gray-500">
            {formData.additionalInfo.length}/200字
          </span>
        </div>
      </FormField>

      <FormField label="参考范文">
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".doc,.docx"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <Button type="submit" className="w-full">
        开始生成文档
      </Button>
    </form>
  );
};