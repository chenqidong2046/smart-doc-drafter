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
  };
  docTypes: string[];
  wordCounts: string[];
  onSubmit: (e: FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

export const DocumentForm = ({
  formData,
  docTypes,
  wordCounts,
  onSubmit,
  onChange,
}: DocumentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <FormField label="文档类型">
        <Select
          value={formData.documentType}
          onValueChange={(value) => onChange("documentType", value)}
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

      <FormField label="主题">
        <Input
          required
          value={formData.topic}
          onChange={(e) => onChange("topic", e.target.value)}
          placeholder="请输入文档主题"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <FormField label="关键词">
        <Input
          required
          value={formData.keywords}
          onChange={(e) => onChange("keywords", e.target.value)}
          placeholder="请输入关键词，多个关键词请用逗号分隔"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="主体">
          <Input
            required
            value={formData.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            placeholder="请输入文档主体"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="受众">
          <Input
            required
            value={formData.audience}
            onChange={(e) => onChange("audience", e.target.value)}
            placeholder="请输入目标受众"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <FormField label="字数">
        <Select
          value={formData.wordCount}
          onValueChange={(value) => onChange("wordCount", value)}
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

      <FormField label="其他信息">
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => onChange("additionalInfo", e.target.value)}
          placeholder="请输入其他补充信息"
          className="h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </FormField>

      <Button type="submit" className="w-full">
        开始生成文档
      </Button>
    </form>
  );
};