import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      {children}
    </div>
  );
};