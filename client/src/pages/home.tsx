import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Features from "@/components/features";
import ChatInterface from "@/components/chat-interface";
import DocumentUpload from "@/components/document-upload";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleStartChat = () => {
    const sessionId = Date.now().toString();
    setLocation(`/chat/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <main className="pt-16">
        <Hero onStartChat={handleStartChat} />
        <Features />
        <ChatInterface onStartChat={handleStartChat} />
        <DocumentUpload />
        
        {/* Legal Disclaimer */}
        <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed">
                  This AI chatbot provides general legal information based on Indian legal documents and should not be considered as professional legal advice. 
                  For specific legal matters, please consult with a qualified attorney. The information provided is for educational purposes only and may not reflect 
                  the most current legal developments. We do not guarantee the accuracy, completeness, or reliability of the information provided.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Chat Button */}
      <Button
        onClick={handleStartChat}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 gradient-primary"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
