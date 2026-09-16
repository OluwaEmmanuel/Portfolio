import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor-text]');
      if (projectCard) {
        const text = projectCard.getAttribute('data-cursor-text') || 'VIEW PROJECT →';
        setCursorText(text);
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('button, a, input, textarea, [role="button"]');
      if (interactive) {
        setCursorText('');
        setIsHovered(true);
        return;
      }

      setCursorText('');
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center font-mono text-[11px] font-bold tracking-wider uppercase transition-colors"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {cursorText ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 py-1.5 text-black shadow-xl backdrop-blur-sm select-none"
        >
          <span>{cursorText}</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? 'rgba(204, 255, 0, 0.4)' : 'rgba(255, 255, 255, 0.7)',
            borderColor: isHovered ? '#ccff00' : 'rgba(255, 255, 255, 0.2)',
          }}
          transition={{ duration: 0.15 }}
          className="h-3.5 w-3.5 rounded-full border border-white/40 shadow-sm"
        />
      )}
    </motion.div>
  );
};
