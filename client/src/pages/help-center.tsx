import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, FileText, Shield, HelpCircle } from "lucide-react";

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: MessageCircle,
      title: "Chat Assistant",
      description: "Learn how to use our AI legal chatbot effectively",
      topics: [
        "How to ask legal questions",
        "Understanding AI responses",
        "Legal areas covered",
        "Chat history management"
      ]
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Guide for uploading and analyzing legal documents",
      topics: [
        "Supported file formats",
        "OCR text extraction",
        "Document categorization",
        "Analysis results interpretation"
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Information about data protection and confidentiality",
      topics: [
        "Data encryption standards",
        "Conversation privacy",
        "Document security",
        "Account protection"
      ]
    },
    {
      icon: HelpCircle,
      title: "Getting Started",
      description: "Quick start guide for new users",
      topics: [
        "Creating your first chat",
        "Navigation overview",
        "Features walkthrough",
        "Best practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions and learn how to use our AI Legal ChatBot effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    • {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my legal information kept confidential?</h3>
              <p className="text-gray-700">Yes, all conversations are encrypted and stored securely. We follow strict privacy guidelines to protect your legal information.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What types of legal documents can I upload?</h3>
              <p className="text-gray-700">Our system supports images (PNG, JPG, JPEG) and documents (PDF, DOC, DOCX) up to 10MB in size for analysis.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can the AI provide legal advice for my specific case?</h3>
              <p className="text-gray-700">Our AI provides general legal information based on Indian law. For specific legal advice, we recommend consulting with a qualified lawyer.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the legal information provided?</h3>
              <p className="text-gray-700">Our system is trained on comprehensive Indian legal knowledge, but laws can be complex. Always verify important information with legal professionals.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still need help?</p>
          <Link href="/contact">
            <Button className="gradient-primary text-white">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}