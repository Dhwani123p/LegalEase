import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  files: File[];
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  uploadProgress?: number;
  isUploading?: boolean;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  files,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  className,
  disabled = false,
  uploadProgress,
  isUploading = false
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      return;
    }
    onFileSelect(acceptedFiles);
  }, [files, maxFiles, onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled: disabled || isUploading,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    }
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 upload-area",
          isDragActive || dragActive ? "border-primary bg-primary/5" : "border-gray-300",
          disabled || isUploading ? "opacity-50 cursor-not-allowed" : "hover:border-primary hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Upload className={cn(
            "w-8 h-8",
            isDragActive || dragActive ? "text-primary" : "text-gray-500"
          )} />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isDragActive ? "Drop files here" : "Upload Legal Document"}
        </h3>
        
        <p className="text-gray-600 mb-4">
          Drag and drop your document here, or click to browse
        </p>
        
        <p className="text-sm text-gray-500 mb-6">
          Supports PDF, PNG, JPG, DOC formats (Max {formatFileSize(maxSize)})
        </p>
        
        {!isDragActive && (
          <Button 
            type="button" 
            className="gradient-primary"
            disabled={disabled || isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && uploadProgress !== undefined && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="loading-spinner w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-sm font-medium">Uploading and processing document...</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </CardContent>
        </Card>
      )}

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Selected Files</h4>
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file)}
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {file.type.split('/')[0]}
                    </Badge>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onFileRemove(index)}
                    className="text-gray-500 hover:text-red-500"
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* File Limits Info */}
      <div className="text-xs text-gray-500 text-center">
        {files.length} of {maxFiles} files selected
      </div>
    </div>
  );
}
