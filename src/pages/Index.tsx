import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DocumentForm } from "@/components/form/DocumentForm";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documentType: "",
    topic: "",
    keywords: "",
    subject: "",
    audience: "",
    wordCount: "",
    additionalInfo: "",
    referenceDoc: undefined as File | undefined,
  });
  const [docTypes, setDocTypes] = useState<string[]>([]);
  const [wordCounts, setWordCounts] = useState<string[]>([]);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    const savedSettings = localStorage.getItem('settings');
    
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      // Don't restore the file input from localStorage
      delete parsedData.referenceDoc;
      setFormData(prev => ({...prev, ...parsedData}));
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDocTypes(settings.docTypes || []);
      setWordCounts(settings.wordCounts || []);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Don't store the file in localStorage
    const formDataForStorage = {...formData};
    delete formDataForStorage.referenceDoc;
    localStorage.setItem('formData', JSON.stringify(formDataForStorage));
    navigate("/document", { state: formData });
  };

  const handleChange = (field: string, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/lovable-uploads/49046c77-03e3-4c67-9692-06d8036ca0db.png" 
            alt="华中师范大学" 
            className="h-12 object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="rounded-full hover:bg-blue-50"
          >
            <Settings className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 kaiti">智能公文起草专家</h1>
          <p className="text-gray-600">填写以下信息，开始智能文档起草</p>
        </div>

        <DocumentForm
          formData={formData}
          docTypes={docTypes}
          wordCounts={wordCounts}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Index;