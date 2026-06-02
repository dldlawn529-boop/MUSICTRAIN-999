import React from "react";
import { cn } from "../lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
  onViewChange?: (view: "about" | "program" | "artist" | "ticket" | "visitor") => void;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
  onViewChange,
}: FooterProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/10 bg-[#003F4B] mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full animate-fade-in">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-4 flex flex-col items-center flex-1">
                {/* Logo photo - Removed frames and increased image size */}
                <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 flex items-center justify-center z-10 mb-6">
                  <img src="https://i.ibb.co/JFwnd7SP/1.png" alt="Icon" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <p className="text-white font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 leading-relaxed whitespace-pre-line">
                  {brandDescription === "KT&G 상상마당 부산 WONDERWEEKS\n미케닉스 X 낭만고양2" ? (
                    "KT&G 상상마당 부산\n2026 WONDER WEEKS\n미케닉스 X 낭만고양2"
                  ) : (
                    brandDescription
                  )}
                </p>
              </div>

              {/* Exact same height and margin as social icons to keep the gap identical */}
              <div className="flex mb-8 mt-6 gap-4 h-6 invisible" />

              {navLinks.length > 0 && (
                <>
                  {/* On Mobile (ABOUT, PROGRAM, ARTIST on one line; TICKET & EVENT, VISITOR on the next) */}
                  <div className="flex flex-col items-center gap-3 w-full md:hidden text-sm font-bold text-white/70">
                    <div className="flex justify-center gap-6">
                      {navLinks.filter(l => ['ABOUT', 'PROGRAM', 'ARTIST'].includes(l.label.toUpperCase())).map((link, index) => {
                        const isHash = link.href.startsWith("#");
                        return (
                          <a
                            key={index}
                            className="hover:text-white duration-300 hover:font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange hover:after:w-full after:transition-all"
                            href={link.href}
                            onClick={(e) => {
                              if (isHash && onViewChange) {
                                e.preventDefault();
                                const target = link.href.replace("#", "") as any;
                                onViewChange(target);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                    <div className="flex justify-center gap-6">
                      {navLinks.filter(l => !['ABOUT', 'PROGRAM', 'ARTIST'].includes(l.label.toUpperCase())).map((link, index) => {
                        const isHash = link.href.startsWith("#");
                        return (
                          <a
                            key={index}
                            className="hover:text-white duration-300 hover:font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange hover:after:w-full after:transition-all"
                            href={link.href}
                            onClick={(e) => {
                              if (isHash && onViewChange) {
                                e.preventDefault();
                                const target = link.href.replace("#", "") as any;
                                onViewChange(target);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* On Desktop/Tablet */}
                  <div className="hidden md:flex flex-wrap justify-center gap-6 text-sm font-bold text-white/70 max-w-full px-4">
                    {navLinks.map((link, index) => {
                      const isHash = link.href.startsWith("#");
                      return (
                        <a
                          key={index}
                          className="hover:text-white duration-300 hover:font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange hover:after:w-full after:transition-all"
                          href={link.href}
                          onClick={(e) => {
                            if (isHash && onViewChange) {
                              e.preventDefault();
                              const target = link.href.replace("#", "") as any;
                              onViewChange(target);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 z-10">
            <p className="text-sm text-white/60 text-center md:text-left font-semibold">
              <span className="block sm:inline">© 상상스타터클래스 : 콘서트 기획 낭만고양2팀.</span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </p>
            {creatorName && (
              <div className="text-sm text-white/60 font-semibold">
                Crafted by {creatorName}
              </div>
            )}
          </div>
        </div>

        {/* Large background text - FIXED */}
        <div 
          className={cn(
            "bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-black tracking-tight pointer-events-none select-none text-center whitespace-nowrap",
            isMobile ? "px-0" : "px-4"
          )}
          style={{
            fontSize: isMobile ? '12.3vw' : 'clamp(2.2rem, 8.5vw, 10rem)',
            maxWidth: '100vw',
            width: '100%',
            fontFamily: 'sans-serif'
          }}
        >
          {"MUSICTRAIN999"}
        </div>
      </footer>
    </section>
  );
};
