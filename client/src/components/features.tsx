import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Shield, Book } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const features = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Access our AI legal assistant anytime, anywhere. Get instant support with your legal queries without waiting.",
    color: "bg-blue-100 text-blue-600",
    details: {
      title: "24/7 AI Legal Support",
      content: `Our AI legal assistant is available round the clock to help you with:

• **Instant Legal Queries**: Get immediate answers to legal questions
• **Emergency Guidance**: Quick assistance for urgent legal matters
• **Multi-language Support**: Available in Hindi, English, and regional languages
• **Cross-platform Access**: Use via web, mobile, or tablet
• **No Appointment Needed**: Start chatting immediately without scheduling

**Perfect for:**
- Late-night legal emergencies
- Quick clarifications before meetings
- Legal research outside business hours
- Immediate document review needs

Our system processes over 1000+ legal queries daily and maintains 99.9% uptime.`
    }
  },
  {
    icon: TrendingUp,
    title: "Personalized Insights", 
    description: "Receive personalized legal advice based on your specific situation and Indian legal framework.",
    color: "bg-purple-100 text-purple-600",
    details: {
      title: "AI-Powered Personalized Legal Insights",
      content: `Get tailored legal advice specifically designed for your situation:

• **Context-Aware Analysis**: Understands your specific circumstances
• **Regional Law Variations**: Considers state-specific legal differences
• **Case History Integration**: Learns from similar successful cases
• **Risk Assessment**: Identifies potential legal risks and opportunities
• **Action Recommendations**: Provides specific next steps

**Specialized Areas:**
- Property disputes and documentation
- Family law matters (divorce, custody, inheritance)
- Criminal law procedures and bail applications
- Consumer protection and complaints
- Corporate law and business compliance

Our AI analyzes over 15+ legal categories with 95% accuracy in recommendations.`
    }
  },
  {
    icon: Shield,
    title: "Confidential Conversations",
    description: "Your conversations are completely secure and confidential. We prioritize your privacy and data protection.",
    color: "bg-green-100 text-green-600",
    details: {
      title: "Enterprise-Grade Security & Privacy",
      content: `Your legal matters are protected with the highest security standards:

• **End-to-End Encryption**: All conversations encrypted with 256-bit SSL
• **No Data Storage**: Conversations stored locally, not on external servers
• **GDPR Compliant**: Follows international privacy regulations
• **Attorney-Client Privilege**: Maintains confidentiality standards
• **Secure Document Upload**: Encrypted file processing and storage

**Security Features:**
- Zero-knowledge architecture
- Regular security audits
- SOC 2 Type II compliance
- Multi-factor authentication
- Automated data purging

**Privacy Guarantees:**
- No conversation sharing with third parties
- No marketing use of your legal data
- Complete conversation history control
- Right to data deletion anytime

Trusted by 10,000+ users including law firms and corporate legal departments.`
    }
  },
  {
    icon: Book,
    title: "Resource Library",
    description: "Access our comprehensive library of Indian legal documents, templates, and educational resources.",
    color: "bg-orange-100 text-orange-600",
    details: {
      title: "Comprehensive Legal Resource Library",
      content: `Access India's most extensive digital legal resource collection:

• **5000+ Legal Templates**: Ready-to-use documents for all legal needs
• **Case Law Database**: Searchable Supreme Court and High Court judgments
• **Legal Procedures Guide**: Step-by-step guides for legal processes
• **Acts & Regulations**: Complete collection of Indian laws and amendments
• **Legal Forms Collection**: Government forms and applications

**Document Categories:**
- Property: Sale deeds, lease agreements, NOCs
- Family: Divorce petitions, will templates, adoption papers
- Criminal: Bail applications, FIR formats, complaint templates
- Corporate: Partnership deeds, company incorporation, contracts
- Consumer: Complaint formats, RTI applications, insurance claims

**Educational Resources:**
- Legal awareness articles
- Know your rights guides
- Legal procedure explanations
- Court hierarchy and jurisdiction
- Legal terminology dictionary

Updated weekly with latest legal developments and court decisions.`
    }
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solution For Your Problems</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal assistance powered by AI to solve your legal queries efficiently and accurately
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 feature-card"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-primary font-semibold hover:underline p-0 h-auto">
                    Learn more →
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center`}>
                        <feature.icon className="text-sm" />
                      </div>
                      {feature.details.title}
                    </DialogTitle>
                    <DialogDescription className="text-left whitespace-pre-line pt-4 leading-relaxed">
                      {feature.details.content}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
