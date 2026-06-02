import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  onClick?: () => void;
}

export interface StaggeredSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items: StaggeredMenuItem[];
  socialItems?: StaggeredSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  position = 'right',
  items,
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = true,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#ffffff',
  changeMenuColorOnOpen = true,
  colors = ['#107770', '#FF8440'],
  logoUrl,
  accentColor = '#5227FF',
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      if (onMenuOpen) onMenuOpen();
    } else {
      if (onMenuClose) onMenuClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onMenuClose) onMenuClose();
  };

  // Outer button color
  const currentButtonColor = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  // Background style based on colors array
  const backdropBackground = colors && colors.length > 1
    ? `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
    : colors && colors.length === 1
      ? colors[0]
      : '#1a1a1a';

  // Menu slide direction
  const slideVariants = {
    closed: {
      x: position === 'right' ? '100%' : '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  // Nav item variants
  const itemVariants = {
    closed: {
      opacity: 0,
      y: 30,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  return (
    <>
      {/* Menu Trigger Button */}
      <motion.button
        id="staggered-menu-toggle-btn"
        onClick={handleToggle}
        className="relative z-[90] p-2 md:p-3 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer shadow-md border border-white/10"
        style={{
          backgroundColor: currentButtonColor,
          color: currentButtonColor === '#ffffff' || currentButtonColor === '#fff' ? '#111111' : '#ffffff',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] stroke-[2.5]" />
        ) : (
          <Menu className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] stroke-[2.5]" />
        )}
      </motion.button>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[70] bg-black/5 backdrop-blur-md cursor-pointer"
            />

            {/* Main Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={slideVariants}
              className={`fixed top-0 ${
                position === 'right' ? 'right-0' : 'left-0'
              } h-full w-full max-w-lg z-[80] flex flex-col justify-between p-12 overflow-y-auto select-none bg-white/5 backdrop-blur-2xl border-l border-white/10 text-dark-green`}
            >
              {/* Header inside Panel */}
              <div className="flex items-center justify-between">
                {logoUrl ? (
                  <div className="flex items-center max-w-[150px]">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="h-8 w-auto object-contain animate-pulse"
                      onError={(e) => {
                        // fallback to text if image fails or path is not found
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="font-extrabold text-xl tracking-wider uppercase text-dark-green/90">
                    Navigation
                  </div>
                )}
                {/* Visual anchor / spacing */}
                <div className="w-6" />
              </div>

              {/* Menu Links List */}
              <div className="flex flex-col gap-6 my-auto pt-12 pb-8">
                {items.map((item, index) => {
                  const numberPrefix = displayItemNumbering
                    ? String(index + 1).padStart(2, '0')
                    : '';

                  return (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      className="group flex items-baseline gap-4 cursor-pointer text-dark-green hover:text-orange transition-colors"
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        }
                        handleClose();
                      }}
                    >
                      {displayItemNumbering && (
                        <span
                          className="font-mono text-sm font-bold tracking-widest opacity-80 select-none text-dark-green group-hover:text-orange transition-colors whitespace-nowrap"
                        >
                          {numberPrefix} .
                        </span>
                      )}
                      
                      <a
                        href={item.link}
                        aria-label={item.ariaLabel}
                        className="text-4xl md:text-5xl font-black uppercase tracking-wider transition-all relative group text-dark-green group-hover:text-orange"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.onClick) {
                            item.onClick();
                          }
                          handleClose();
                        }}
                      >
                        <span className="relative z-10 transition-colors">
                          {item.label}
                        </span>
                        
                        {/* Hover underline slide-in effect */}
                        <span
                          className="absolute bottom-0 left-0 w-0 h-1 bg-orange transition-all duration-300 group-hover:w-full"
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
