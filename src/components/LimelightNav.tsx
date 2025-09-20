import React, { useState, useRef, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
  glowColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourhandle',
    icon: Instagram,
    hoverColor: 'hover:text-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.8)'
  },
  {
    name: 'X',
    url: 'https://x.com/yourhandle',
    icon: FaXTwitter,
    hoverColor: 'hover:text-gray-300',
    glowColor: 'rgba(255, 255, 255, 0.8)'
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@yourhandle',
    icon: FaTiktok,
    hoverColor: 'hover:text-red-500',
    glowColor: 'rgba(239, 68, 68, 0.8)'
  }
];

export const LimelightNav: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({
    left: '20%',
    opacity: 0,
    glowColor: 'rgba(255, 255, 255, 0.8)'
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateSpotlight = (index: number | null) => {
    if (index === null) {
      setSpotlightStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const linkElement = linkRefs.current[index];
    const containerElement = containerRef.current;
    
    if (linkElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();
      
      // Calculate the center position of the link relative to the container
      const linkCenter = linkRect.left + linkRect.width / 2 - containerRect.left;
      const containerWidth = containerRect.width;
      const leftPercentage = (linkCenter / containerWidth) * 100;
      
      setSpotlightStyle({
        left: `${leftPercentage}%`,
        opacity: 1,
        glowColor: socialLinks[index].glowColor
      });
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    updateSpotlight(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    updateSpotlight(null);
  };

  // Update spotlight position on resize
  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== null) {
        updateSpotlight(activeIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  return (
    <div 
      ref={containerRef}
      className="bg-neutral-900/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg flex gap-8 relative overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Spotlight */}
      <div 
        className="absolute bottom-full w-10 h-2 rounded-full bg-white transition-all duration-500 ease-out transform -translate-x-1/2"
        style={{
          left: spotlightStyle.left,
          opacity: spotlightStyle.opacity,
          boxShadow: `
            0 0 20px ${spotlightStyle.glowColor}, 
            0 0 40px ${spotlightStyle.glowColor},
            0 0 60px ${spotlightStyle.glowColor}
          `,
          background: `radial-gradient(ellipse, ${spotlightStyle.glowColor} 0%, white 50%, ${spotlightStyle.glowColor} 100%)`
        }}
      />

      {/* Ambient Glow Behind Active Icon */}
      {activeIndex !== null && (
        <div 
          className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(circle at ${spotlightStyle.left} 50%, ${spotlightStyle.glowColor}15 0%, transparent 70%)`,
            opacity: spotlightStyle.opacity * 0.6
          }}
        />
      )}
      
      {socialLinks.map((social, index) => (
        <button
          key={social.name}
          ref={el => linkRefs.current[index] = el}
          onClick={() => handleSocialClick(social.url)}
          onMouseEnter={() => handleMouseEnter(index)}
          className={`
            text-gray-400 hover:text-white text-2xl relative transition-all duration-300
            group z-10 transform hover:scale-110
            ${activeIndex === index ? 'text-white scale-110' : ''}
          `}
          style={{
            filter: activeIndex === index ? `drop-shadow(0 0 8px ${spotlightStyle.glowColor})` : 'none',
            textShadow: activeIndex === index ? `0 0 10px ${spotlightStyle.glowColor}` : 'none'
          }}
          aria-label={`Follow us on ${social.name}`}
        >
          <social.icon className="w-6 h-6" />
          
          {/* Enhanced Tooltip with Glow */}
          <div 
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-gray-700"
            style={{
              boxShadow: activeIndex === index ? `0 0 15px ${spotlightStyle.glowColor}` : '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            Follow us on {social.name}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"
            />
          </div>

          {/* Icon Glow Ring */}
          {activeIndex === index && (
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                boxShadow: `0 0 20px ${spotlightStyle.glowColor}, inset 0 0 20px ${spotlightStyle.glowColor}20`
              }}
            />
          )}
        </button>
      ))}

      {/* Subtle Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 animate-pulse" />
    </div>
  );
};