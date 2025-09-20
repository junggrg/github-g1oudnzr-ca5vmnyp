import React, { useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import * as THREE from 'three';

type Card = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    id: "1",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    alt: "AI Chatbots",
    title: "AI Chatbots",
    description: "Answer FAQs, capture leads, and book appointments 24/7."
  },
  {
    id: "2",
    imageUrl: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    alt: "AI Voice Agents",
    title: "AI Voice Agents",
    description: "Handle inbound/outbound calls for bookings and reminders."
  },
  {
    id: "3",
    imageUrl: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    alt: "Sales & Marketing Automations",
    title: "Sales & Marketing Automations",
    description: "Recover carts, nurture leads, and schedule content automatically."
  },
  {
    id: "4",
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    alt: "Back-office Automations",
    title: "Back-office Automations",
    description: "Automate invoices, data entry, and employee onboarding."
  },
  {
    id: "5",
    imageUrl: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    alt: "E-commerce Automations",
    title: "E-commerce Automations",
    description: "Upsell, cross-sell, and resolve support requests instantly."
  }
];

function CardMesh({
  card,
  position,
  onClick,
}: {
  card: Card;
  position: [number, number, number];
  onClick: () => void;
}) {
  const texture = useLoader(THREE.TextureLoader, card.imageUrl);

  return (
    <mesh position={position} onClick={onClick} scale={[1, 1, 1]}>
      <planeGeometry args={[2, 3]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function Scene({ cards, onCardClick }: { cards: Card[]; onCardClick: (card: Card) => void }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />

      {cards.map((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <CardMesh
            key={card.id}
            card={card}
            position={[x, y, 0]}
            onClick={() => onCardClick(card)}
          />
        );
      })}
    </>
  );
}

export default function StellarCardGallery() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <section className="py-20 relative bg-black">
      <div className="relative h-screen w-full bg-black">
        {/* Overlay Instructions */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4 gradient-text">
              AUTOMATION SHOWCASE
            </h2>
            <p className="text-white/80 text-lg">
              Click on any card to explore our automation services
            </p>
          </div>
        </div>

        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene cards={cards} onCardClick={setSelectedCard} />
          </Suspense>
        </Canvas>

        {/* Modal */}
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{selectedCard.title}</h2>
              <p className="text-gray-600 mt-2">{selectedCard.description}</p>
              <button
                onClick={() => {
                  setSelectedCard(null);
                  document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 mt-4"
              >
                GET STARTED WITH {selectedCard.title.toUpperCase()}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}