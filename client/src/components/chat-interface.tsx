import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send, Paperclip, Mic } from "lucide-react";

interface ChatInterfaceProps {
  onStartChat: () => void;
}

export default function ChatInterface({ onStartChat }: ChatInterfaceProps) {
  return (
    <section className="py-20 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Try Our AI Legal Assistant</h2>
          <p className="text-xl text-white/90">
            Experience intelligent legal guidance powered by Indian legal documents and FAQs
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="gradient-secondary p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">AI Legal ChatBot</h3>
                  <p className="text-white/80 text-sm">Your AI-Powered Local Law Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm">Online</span>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50 chat-scrollbar">
              {/* Bot Message */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md shadow-sm">
                  <p className="text-gray-800">Welcome! I'm your AI legal assistant trained on Indian legal documents. I can help you with:</p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li>• Civil and criminal law queries</li>
                    <li>• Property and family law guidance</li>
                    <li>• Legal document analysis</li>
                    <li>• General legal information</li>
                  </ul>
                  <p className="mt-3 text-gray-800">How can I assist you today?</p>
                </div>
              </div>
              
              {/* User Message */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="gradient-primary rounded-2xl rounded-tr-sm p-4 max-w-md">
                  <p className="text-white">I need help understanding property registration process in India</p>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-gray-600" />
                </div>
              </div>
              
              {/* Bot Response */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md shadow-sm">
                  <p className="text-gray-800">Property registration in India involves several key steps:</p>
                  <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>Document verification and stamp duty payment</li>
                    <li>Visit to Sub-Registrar's office</li>
                    <li>Biometric verification of parties</li>
                    <li>Registration fee payment</li>
                    <li>Document registration and receipt</li>
                  </ol>
                  <p className="mt-3 text-gray-800">Would you like detailed information about any specific step?</p>
                </div>
              </div>
              
              {/* Typing Indicator */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                  <Paperclip className="text-xl" />
                </Button>
                <div className="flex-1 relative">
                  <Input 
                    placeholder="Type your legal question here..." 
                    className="w-full pr-12 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                    <Mic />
                  </Button>
                </div>
                <Button 
                  onClick={onStartChat}
                  className="gradient-primary text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
