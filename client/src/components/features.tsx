import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Shield, Book } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Access our AI legal assistant anytime, anywhere. Get instant support with your legal queries without waiting.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Personalized Insights", 
    description: "Receive personalized legal advice based on your specific situation and Indian legal framework.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Shield,
    title: "Confidential Conversations",
    description: "Your conversations are completely secure and confidential. We prioritize your privacy and data protection.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Book,
    title: "Resource Library",
    description: "Access our comprehensive library of Indian legal documents, templates, and educational resources.",
    color: "bg-orange-100 text-orange-600"
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
              <Button variant="ghost" className="text-primary font-semibold hover:underline p-0 h-auto">
                Learn more →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
