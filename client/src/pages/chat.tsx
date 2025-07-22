import { useState, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Upload,
  Mic,
  ArrowLeft,
  Paperclip
} from "lucide-react";
import { Link } from "wouter";
import DocumentUpload from "@/components/document-upload";
import { ChatMessage } from "@shared/schema";

export default function Chat() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [message, setMessage] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const currentSessionId = sessionId || Date.now().toString();

  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/chat", currentSessionId, "messages"],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/chat/${currentSessionId}/messages`);
      return response.json();
    }
  });

  // Fetch welcome message if no messages
  const { data: welcomeData } = useQuery({
    queryKey: ["/api/chat/welcome"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/chat/welcome");
      return response.json();
    },
    enabled: messages.length === 0
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", `/api/chat/${currentSessionId}/message`, {
        content,
        category: null
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", currentSessionId, "messages"] });
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message.trim());
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message if no messages exist
  const displayMessages: ChatMessage[] = messages.length === 0 && welcomeData ? [
    {
      id: 0,
      sessionId: currentSessionId,
      content: welcomeData.message,
      isBot: true,
      timestamp: new Date(),
      category: "welcome"
    }
  ] : messages;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AI Legal ChatBot</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Messages */}
        <Card className="flex-1 mb-4 overflow-hidden">
          <div className="gradient-secondary p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Legal ChatBot</h3>
                <p className="text-sm opacity-90">Your AI-Powered Local Law Assistant</p>
              </div>
            </div>
          </div>

          <CardContent className="p-0 h-96 overflow-y-auto chat-scrollbar bg-gray-50">
            <div className="p-6 space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="loading-spinner w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                displayMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 message-enter ${
                      msg.isBot ? '' : 'justify-end'
                    }`}
                  >
                    {msg.isBot && (
                      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-md rounded-2xl p-4 ${
                        msg.isBot
                          ? 'bg-white rounded-tl-sm shadow-sm'
                          : 'gradient-primary text-white rounded-tr-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.content}
                      </div>
                      {msg.category && msg.category !== 'welcome' && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {msg.category}
                        </Badge>
                      )}
                    </div>

                    {!msg.isBot && (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))
              )}

              {sendMessageMutation.isPending && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowUpload(!showUpload)}
                className="text-gray-500 hover:text-primary"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your legal question here..."
                  className="pr-12 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={sendMessageMutation.isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                type="submit"
                className="gradient-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
                disabled={!message.trim() || sendMessageMutation.isPending}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Document Upload Panel */}
        {showUpload && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <DocumentUpload 
                sessionId={currentSessionId}
                onUploadComplete={() => {
                  setShowUpload(false);
                  queryClient.invalidateQueries({ queryKey: ["/api/chat", currentSessionId, "messages"] });
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
