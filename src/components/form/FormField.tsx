import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField = ({ label, children, required }: FormFieldProps) => {
  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-1">
        {required && <span className="text-red-500 mr-1">※</span>}
        {label}
      </Label>
      {children}
    </div>
  );
};