import React, { useState, useEffect } from 'react';
import { User, Zap, FileText, ShoppingCart, X } from 'lucide-react';

interface Category {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  services: string[];
  color: string;
  glowColor: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Customer-facing Automations",
    icon: User,
    services: [
      "AI Chatbots – Answer FAQs, capture leads, book appointments",
      "AI Voice Agents – Handle inbound/outbound calls for bookings",
      "Social Media DMs Automation – Auto-reply to Instagram/Facebook messages",
      "Review Collection – Automatically ask customers for reviews"
    ],
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.6)"
  },
  {
    id: 2,
    title: "Sales & Marketing Automations",
    icon: Zap,
    services: [
      "Lead Nurturing – Automated emails/texts to follow up with leads",
      "Abandoned Cart Recovery – Remind customers who didn't finish checkout",
      "CRM Updates – Automatically log leads into HubSpot, Salesforce, or Notion",
      "Content Scheduling – Auto-generate and schedule social posts with AI"
    ],
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.6)"
  },
  {
    id: 3,
    title: "Back-office Automations",
    icon: FileText,
    services: [
      "Invoice & Payment Reminders – Send automatic reminders to clients",
      "Data Entry Automation – Sync data between Google Sheets, CRMs, and accounting software",
      "Employee Onboarding – Auto-send welcome emails, training materials",
      "Calendar Management – Auto-scheduling with Google Calendar/Outlook"
    ],
    color: "from-green-400 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.6)"
  },
  {
    id: 4,
    title: "E-commerce Automations",
    icon: ShoppingCart,
    services: [
      "Product Recommendation AI – Suggest items based on browsing history",
      "AI Helpdesk – Auto-resolve refund, shipping, or tracking requests",
      "Upsell/Cross-sell Automation – Suggest add-ons at checkout or after purchase"
    ],
    color: "from-purple-400 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.6)"
  }
];

export const OrbitalAutomationCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const orbitRadius = isMobile ? 120 : 180;
  const centerSize = isMobile ? 80 : 120;
  const orbiterSize = isMobile ? 60 : 80;

  return (
    <section className="py-20 relative bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">AUTOMATION CATEGORIES</h2>
          <p className="text-xl text-gray-300">COMPREHENSIVE SOLUTIONS ACROSS ALL BUSINESS FUNCTIONS</p>
        </div>

        {/* Orbital Container */}
        <div className="flex justify-center items-center min-h-[500px] relative">
          <div 
            className="relative"
            style={{ 
              width: (orbitRadius * 2) + orbiterSize + 40,
              height: (orbitRadius * 2) + orbiterSize + 40
            }}
          >
            {/* Orbit Path */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-700/30"
              style={{
                width: orbitRadius * 2,
                height: orbitRadius * 2,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)'
              }}
            />

            {/* Center Core */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
              style={{
                width: centerSize,
                height: centerSize,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(128, 128, 128, 0.8) 50%, rgba(0, 0, 0, 0.9) 100%)',
                boxShadow: `
                  0 0 40px rgba(255, 255, 255, 0.6),
                  0 0 80px rgba(128, 128, 128, 0.4),
                  0 0 120px rgba(255, 255, 255, 0.2),
                  inset 0 0 20px rgba(255, 255, 255, 0.1)
                `,
                animation: 'corePulse 3s ease-in-out infinite alternate'
              }}
            >
              <div className="text-white font-bold text-center">
                <div className={`text-${isMobile ? 'xs' : 'sm'} opacity-90 text-black`}>HER.AI</div>
                <div className={`text-${isMobile ? 'xs' : 'sm'} opacity-90 text-black`}>CORE</div>
              </div>
            </div>

            {/* Orbiting Categories */}
            {categories.map((category, index) => {
              const angle = (index * 90) - 90; // Start from top, 90 degrees apart
              const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
              const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;

              return (
                <div
                  key={category.id}
                  className="absolute top-1/2 left-1/2 cursor-pointer group"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    animation: `orbit 20s linear infinite`,
                    animationDelay: `${index * -5}s`
                  }}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Orbiter */}
                  <div 
                    className={`
                      rounded-full flex items-center justify-center transition-all duration-300
                      ${hoveredCategory === category.id ? 'scale-110' : 'scale-100'}
                    `}
                    style={{
                      width: orbiterSize,
                      height: orbiterSize,
                      background: `linear-gradient(135deg, ${category.color.replace('from-', '').replace('to-', ', ')})`,
                      boxShadow: hoveredCategory === category.id 
                        ? `0 0 30px ${category.glowColor}, 0 0 60px ${category.glowColor}`
                        : `0 0 15px ${category.glowColor}`
                    }}
                  >
                    <category.icon className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                  </div>

                  {/* Category Label */}
                  <div 
                    className={`
                      absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                      text-white text-center transition-opacity duration-300 pointer-events-none
                      ${hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'}
                      ${isMobile ? 'text-xs' : 'text-sm'}
                    `}
                    style={{ width: '120px' }}
                  >
                    {category.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            CLICK ON ANY CATEGORY TO EXPLORE AUTOMATION SERVICES
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <div 
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${selectedCategory.color.replace('from-', '').replace('to-', ', ')})`,
                    boxShadow: `0 0 20px ${selectedCategory.glowColor}`
                  }}
                >
                  <selectedCategory.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedCategory.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                {selectedCategory.services.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${selectedCategory.color.replace('from-', '').replace('to-', ', ')})`,
                        boxShadow: `0 0 10px ${selectedCategory.glowColor}`
                      }}
                    />
                    <p className="text-gray-300 leading-relaxed">{service}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  GET STARTED WITH {selectedCategory.title.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(${orbitRadius}px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(${orbitRadius}px) rotate(-360deg);
          }
        }

        @keyframes corePulse {
          0% {
            box-shadow: 
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 80px rgba(147, 51, 234, 0.4),
              0 0 120px rgba(59, 130, 246, 0.2),
              inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          100% {
            box-shadow: 
              0 0 60px rgba(59, 130, 246, 0.8),
              0 0 120px rgba(147, 51, 234, 0.6),
              0 0 180px rgba(59, 130, 246, 0.3),
              inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </section>
  );
};