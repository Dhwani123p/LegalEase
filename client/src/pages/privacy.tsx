import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";

export default function Privacy() {
  const privacySections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: [
        "All conversations are encrypted using industry-standard 256-bit SSL encryption",
        "Personal information is protected according to Indian IT Act 2000 and GDPR standards",
        "We implement strict access controls and regular security audits",
        "Your data is stored securely and never shared with unauthorized parties"
      ]
    },
    {
      icon: Lock,
      title: "Information We Collect",
      content: [
        "Chat messages and queries for providing legal assistance",
        "Uploaded documents for analysis purposes only",
        "Basic usage statistics to improve our services",
        "No personal identifying information unless voluntarily provided"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Data",
      content: [
        "Provide accurate legal information and document analysis",
        "Improve our AI models for better legal assistance",
        "Maintain service quality and system performance",
        "Comply with legal obligations under Indian law"
      ]
    },
    {
      icon: Database,
      title: "Data Storage & Retention",
      content: [
        "Chat sessions are stored locally in your browser",
        "Uploaded documents are processed and deleted after analysis",
        "No long-term storage of personal conversations",
        "You can clear your data anytime by clearing browser storage"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Right to access your personal data",
        "Right to correct any inaccurate information",
        "Right to delete your data (right to be forgotten)",
        "Right to withdraw consent at any time"
      ]
    },
    {
      icon: AlertCircle,
      title: "Third-Party Services",
      content: [
        "We use secure cloud infrastructure for processing",
        "OCR processing is done using client-side libraries",
        "No third-party tracking or advertising cookies",
        "All external services comply with our privacy standards"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
        </div>

        <div className="space-y-6">
          {privacySections.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <Card className="shadow-lg mt-8 bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-amber-800">
              <AlertCircle className="w-5 h-5" />
              Legal Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800">
            <div className="space-y-4">
              <p>
                <strong>Attorney-Client Privilege:</strong> Please note that communications with our AI chatbot 
                do not establish an attorney-client relationship and are not protected by attorney-client privilege.
              </p>
              <p>
                <strong>General Information Only:</strong> The legal information provided by our AI assistant 
                is for general educational purposes only and should not be considered as legal advice for 
                specific situations.
              </p>
              <p>
                <strong>Professional Consultation:</strong> For specific legal matters, always consult with 
                a qualified legal professional who can provide personalized advice based on your circumstances.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Privacy Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button className="gradient-primary text-white">
                  Contact Us
                </Button>
              </Link>
              <Link href="/help-center">
                <Button variant="outline">
                  Help Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance & Standards</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Indian Regulations:</h3>
              <ul className="space-y-1">
                <li>• Information Technology Act, 2000</li>
                <li>• Personal Data Protection Bill</li>
                <li>• IT (Reasonable Security Practices) Rules, 2011</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">International Standards:</h3>
              <ul className="space-y-1">
                <li>• GDPR (General Data Protection Regulation)</li>
                <li>• SOC 2 Type II Compliance</li>
                <li>• ISO 27001 Security Standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}