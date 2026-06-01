import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import goldDropImg from '../assets/gold-drop.png';

function generateDroplets(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    return {
      id: i,
      angle,
      distance: 60 + Math.random() * 180,
      size: 4 + Math.random() * 10,
      duration: 0.6 + Math.random() * 0.6,
      delay: Math.random() * 0.15,
      gravity: 40 + Math.random() * 120,
    };
  });
}

export default function GoldDrop() {
  const [hasExploded, setHasExploded] = useState(false);
  const [showDroplets, setShowDroplets] = useState(false);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const dropRef = useRef(null);
  const triggerRef = useRef(null);

  const droplets = useMemo(() => generateDroplets(18), []);

  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

  const dropY = useTransform(
    scrollY,
    [heroHeight * 0.2, heroHeight * 0.85],
    [0, heroHeight * 0.5]
  );

  const dropOpacity = useTransform(
    scrollY,
    [0, heroHeight * 0.15, heroHeight * 0.8, heroHeight * 0.85],
    [0, 1, 1, 0]
  );

  const dropScale = useTransform(
    scrollY,
    [heroHeight * 0.2, heroHeight * 0.6, heroHeight * 0.85],
    [0.7, 1, 1.15]
  );

  const dropRotate = useTransform(
    scrollY,
    [heroHeight * 0.2, heroHeight * 0.85],
    [0, 8]
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > heroHeight * 0.82 && !hasExploded) {
      setHasExploded(true);
      setShowDroplets(true);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.7;
      setDropPosition({ x: centerX, y: centerY });

      setTimeout(() => {
        setShowDroplets(false);
      }, 1800);
    }

    if (latest < heroHeight * 0.3 && hasExploded) {
      setHasExploded(false);
      setShowDroplets(false);
    }
  });

  if (isMobile) return null;

  return (
    <>
      {/* The main gold drop */}
      <AnimatePresence>
        {!hasExploded && (
          <motion.div
            ref={dropRef}
            className="fixed z-30 pointer-events-none"
            style={{
              left: '50%',
              top: '35%',
              x: '-50%',
              y: dropY,
              opacity: dropOpacity,
              scale: dropScale,
              rotate: dropRotate,
            }}
            exit={{
              scale: 1.8,
              opacity: 0,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <img
              src={goldDropImg}
              alt=""
              className="w-16 h-auto drop-shadow-[0_8px_24px_rgba(201,168,76,0.5)]"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion droplets */}
      <AnimatePresence>
        {showDroplets && (
          <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
            {droplets.map((droplet) => {
              const endX = Math.cos(droplet.angle) * droplet.distance;
              const endY = Math.sin(droplet.angle) * droplet.distance + droplet.gravity;

              return (
                <motion.div
                  key={droplet.id}
                  initial={{
                    x: dropPosition.x,
                    y: dropPosition.y,
                    scale: 1.2,
                    opacity: 1,
                  }}
                  animate={{
                    x: dropPosition.x + endX,
                    y: dropPosition.y + endY,
                    scale: 0,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: droplet.duration,
                    delay: droplet.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    position: 'fixed',
                    width: droplet.size,
                    height: droplet.size * 1.3,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    background: `radial-gradient(ellipse at 30% 25%, #f5e6a3, #d4a843 40%, #C9A84C 70%, #b8941f)`,
                    boxShadow: `0 2px 8px rgba(201, 168, 76, 0.5), inset 0 -2px 4px rgba(184, 148, 31, 0.4), inset 0 2px 3px rgba(245, 230, 163, 0.6)`,
                    transformOrigin: 'center center',
                  }}
                />
              );
            })}

            {/* Central flash */}
            <motion.div
              initial={{
                x: dropPosition.x - 40,
                y: dropPosition.y - 40,
                scale: 0,
                opacity: 0.8,
              }}
              animate={{
                scale: 3,
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
              style={{
                position: 'fixed',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)',
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
