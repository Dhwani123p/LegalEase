import { Button } from "@/components/ui/button";
import { Bot, Play, User, CheckCircle, FileText, MessageSquare, Shield, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HeroProps {
  onStartChat: () => void;
}

export default function Hero({ onStartChat }: HeroProps) {
  const [showDemo, setShowDemo] = useState(false);

  const demoFeatures = [
    {
      icon: MessageSquare,
      title: "Interactive Chat Interface",
      description: "Natural conversation flow with intelligent legal responses",
      highlight: "Ask questions in plain English and get detailed legal guidance"
    },
    {
      icon: FileText,
      title: "Document Analysis & OCR",
      description: "Upload images of legal documents for instant text extraction and analysis",
      highlight: "Supports PNG, JPG, PDF up to 10MB with intelligent categorization"
    },
    {
      icon: Shield,
      title: "Comprehensive Legal Coverage",
      description: "15+ Indian legal areas including property, criminal, family, and civil law",
      highlight: "Step-by-step procedures, required documents, and court processes"
    },
    {
      icon: CheckCircle,
      title: "Privacy & Security",
      description: "End-to-end encryption with no data sharing to third parties",
      highlight: "Your legal conversations remain completely confidential"
    }
  ];
  return (
    <section id="home" className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="text-white">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="text-white text-2xl" />
            </div>
            <span className="text-xl font-semibold">LegalEase</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your AI-Powered Local Law Assistant
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            An innovative chatbot application designed to provide users with instant access to local law information and assistance in drafting legal documents.
          </p>
          
          <p className="text-lg text-white/80 mb-10">
            Utilizing advanced artificial intelligence, it offers personalized legal guidance, simplifies the complexity of legal terminology, and generates legal documents tailored to users' specific needs, making legal information accessible and understandable for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onStartChat}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Bot className="mr-2 h-5 w-5" />
              Start Chat Now
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowDemo(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 bg-transparent"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Right Content - Bot Preview */}
        <div className="relative">
          <div className="glass-effect rounded-3xl p-8 border border-white/20">
            <div className="legal-primary rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">LegalEase</h3>
                  <p className="text-white/70 text-sm">For local law inquiries and legal documents</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm">📋 Property Law</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm">⚖️ Criminal Law</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm">👨‍👩‍👧‍👦 Family Law</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm">📑 Documentation</p>
                </div>
              </div>
            </div>
            
            {/* Sample Chat Interface */}
            <div className="bg-white rounded-xl p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-800">Hello! I'm your AI legal assistant. How can I help you today?</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 justify-end">
                <div className="gradient-primary rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-white">I need help with property documentation</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-gray-600 text-sm" />
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              LegalEase Platform Demo
            </DialogTitle>
            <DialogDescription>
              Discover how our AI-powered legal assistant can help you with Indian law queries and document analysis
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {demoFeatures.map((feature, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                      <p className="text-blue-800 font-medium text-sm">✨ {feature.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-4">
                Experience the power of AI-driven legal assistance. Start a conversation with our intelligent legal chatbot 
                and get instant answers to your Indian law questions.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => {
                    setShowDemo(false);
                    onStartChat();
                  }}
                  className="gradient-primary text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowDemo(false)}
                >
                  Close Demo
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
