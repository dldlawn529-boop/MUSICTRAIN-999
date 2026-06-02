import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel: string;
  rotation: number;
  hoverStyles: { bgColor: string; textColor: string };
  onClick?: () => void;
}

export interface BubbleMenuProps {
  logo?: React.ReactNode;
  items: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

interface BubbleMenuItemProps {
  item: BubbleMenuItem;
  idx: number;
  menuBg: string;
  menuContentColor: string;
  onClick: () => void;
  getTransition: (index: number) => any;
}

function BubbleMenuItemElement({
  item,
  idx,
  menuBg,
  menuContentColor,
  onClick,
  getTransition,
}: BubbleMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 50, rotate: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: item.rotation,
      }}
      exit={{ opacity: 0, scale: 0.6, y: 50, rotate: 0 }}
      transition={getTransition(idx)}
      className="w-full"
    >
      <a
        href={item.href}
        aria-label={item.ariaLabel}
        onClick={(e) => {
          e.preventDefault();
          if (item.onClick) {
            item.onClick();
          }
          onClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block w-full text-center py-5 px-8 rounded-full border-2 border-black/10 font-black text-3xl sm:text-4xl uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer select-none"
        style={{
          backgroundColor: isHovered
            ? item.hoverStyles.bgColor
            : menuBg,
          color: isHovered
            ? item.hoverStyles.textColor
            : menuContentColor,
          transform: `rotate(${item.rotation}deg)`,
        }}
      >
        {item.label}
      </a>
    </motion.div>
  );
}

export default function BubbleMenu({
  logo,
  items,
  menuAriaLabel = "Toggle navigation",
  menuBg = "#ffffff",
  menuContentColor = "#111111",
  useFixedPosition = false,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert GSAP style back ease to cubic-bezier or custom motion transition
  const getTransition = (index: number) => {
    let easeValue: any = [0.34, 1.56, 0.64, 1]; // Elegant back.out bounce
    if (animationEase === "linear") easeValue = "linear";
    else if (animationEase === "easeOut") easeValue = "easeOut";

    return {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      delay: index * staggerDelay,
      duration: animationDuration,
    };
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        useFixedPosition ? "fixed bottom-8 right-8 z-[100]" : "relative"
      } font-sans`}
      style={{ isolation: "isolate" }}
    >
      {/* Trigger Button */}
      <motion.button
        onClick={handleToggle}
        aria-label={menuAriaLabel}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center rounded-full border border-black/10 px-6 py-3.5 shadow-lg select-none cursor-pointer text-sm font-bold tracking-wider uppercase transition-shadow hover:shadow-xl relative z-50"
        style={{
          backgroundColor: menuBg,
          color: menuContentColor,
        }}
      >
        <div className="flex items-center gap-3">
          {logo && <span className="flex items-center">{logo}</span>}
          <span>{isOpen ? "CLOSE" : "MENU"}</span>
        </div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur/shading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#18261D]/80 backdrop-blur-xl z-40 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Floating Bubble Menu items container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-5 pointer-events-auto max-w-sm w-full px-6">
                {items.map((item, idx) => (
                  <BubbleMenuItemElement
                    key={item.label}
                    item={item}
                    idx={idx}
                    menuBg={menuBg}
                    menuContentColor={menuContentColor}
                    onClick={() => setIsOpen(false)}
                    getTransition={getTransition}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
