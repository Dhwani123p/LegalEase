import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Eye, Bot, Upload, FileText, Loader2 } from "lucide-react";

interface DocumentUploadProps {
  sessionId?: string;
  onUploadComplete?: () => void;
}

export default function DocumentUpload({ sessionId, onUploadComplete }: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('document', file);
      if (sessionId) {
        formData.append('sessionId', sessionId);
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      try {
        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        return response.json();
      } catch (error) {
        clearInterval(progressInterval);
        setUploadProgress(0);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Document Uploaded Successfully",
        description: `${data.filename} has been processed and analyzed.`,
      });
      setFiles([]);
      setUploadProgress(0);
      onUploadComplete?.();
      
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: ["/api/documents", sessionId] });
      }
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document. Please try again.",
        variant: "destructive"
      });
      setUploadProgress(0);
    }
  });

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setUploadProgress(0);
    uploadMutation.mutate(files[0]); // Upload first file
  };

  if (!sessionId) {
    // Show standalone upload section for homepage
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Document Analysis & OCR</h2>
            <p className="text-xl text-gray-600">
              Upload legal documents for AI-powered analysis and text extraction
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  files={files}
                  uploadProgress={uploadProgress}
                  isUploading={uploadMutation.isPending}
                />
                
                {files.length > 0 && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending}
                      className="gradient-primary"
                    >
                      {uploadMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      {uploadMutation.isPending ? 'Processing...' : 'Upload & Analyze'}
                    </Button>
                  </div>
                )}
                
                {/* Processing Features */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Eye className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">OCR Text Extraction</h4>
                    <p className="text-gray-600 text-sm">Extract text from scanned documents and images with high accuracy</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Bot className="text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI Summarization</h4>
                    <p className="text-gray-600 text-sm">Get intelligent summaries of legal documents with key points highlighted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Show compact upload component for chat interface
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Upload Document for Analysis</h3>
        <Badge variant="secondary" className="text-xs">
          OCR & AI Analysis
        </Badge>
      </div>
      
      <FileUpload
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        files={files}
        uploadProgress={uploadProgress}
        isUploading={uploadMutation.isPending}
        maxFiles={1}
        className="scale-90"
      />
      
      {files.length > 0 && (
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setFiles([])}
            disabled={uploadMutation.isPending}
          >
            Clear
          </Button>
          <Button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="gradient-primary"
          >
            {uploadMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploadMutation.isPending ? 'Processing...' : 'Analyze Document'}
          </Button>
        </div>
      )}
    </div>
  );
}
