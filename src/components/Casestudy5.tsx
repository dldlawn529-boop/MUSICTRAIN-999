import { MoveRight } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

export interface CasestudyItem {
  logo: string;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

export interface Casestudy5Props {
  casestudies?: CasestudyItem[];
}

const memoriesImages = [
  "https://i.ibb.co/4RPMbngM/12-01.jpg",
  "https://i.ibb.co/Y73tstTC/12-02.jpg",
  "https://i.ibb.co/Q331kB7Y/12-03.jpg",
  "https://i.ibb.co/rKMm807n/12-09.jpg",
  "https://i.ibb.co/93B16vgk/12-13.jpg"
];

const MemoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const lastNavigationTime = React.useRef(0);
  const navigationCooldown = 400; // ms between navigations
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = React.useCallback((newDirection: number) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < navigationCooldown) return;
    lastNavigationTime.current = now;

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === memoriesImages.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? memoriesImages.length - 1 : prev - 1;
    });
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      navigate(1);
    } else if (info.offset.x > threshold) {
      navigate(-1);
    }
  };

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      if (!containerRef.current || !containerRef.current.contains(e.target as Node)) {
        return;
      }
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
      }
    },
    [navigate]
  );

  React.useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const getCardStyle = (index: number) => {
    const total = memoriesImages.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 5, rotateY: 0 };
    } else if (diff === -1) {
      return { x: isMobile ? -85 : -110, scale: isMobile ? 0.8 : 0.85, opacity: 0.6, zIndex: 4, rotateY: 10 };
    } else if (diff === -2) {
      return { x: isMobile ? -150 : -190, scale: isMobile ? 0.65 : 0.72, opacity: 0.3, zIndex: 3, rotateY: 20 };
    } else if (diff === 1) {
      return { x: isMobile ? 85 : 110, scale: isMobile ? 0.8 : 0.85, opacity: 0.6, zIndex: 4, rotateY: -10 };
    } else if (diff === 2) {
      return { x: isMobile ? 150 : 190, scale: isMobile ? 0.65 : 0.72, opacity: 0.3, zIndex: 3, rotateY: -20 };
    } else {
      return { x: diff > 0 ? (isMobile ? 220 : 300) : (isMobile ? -220 : -300), scale: 0.6, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -30 : 30 };
    }
  };

  const isVisible = (index: number) => {
    const total = memoriesImages.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  return (
    <div ref={containerRef} className="w-full mt-6 mb-2 relative flex flex-col items-center select-none overflow-hidden py-4">
      {/* 3D Coverflow stage */}
      <div className="w-full h-[180px] sm:h-[280px] relative flex items-center justify-center mb-2" style={{ perspective: "1000px" }}>
        {memoriesImages.map((src, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={index}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
                width: isCurrent 
                  ? (isMobile ? "160px" : "320px") 
                  : (isMobile ? "125px" : "250px")
              }}
            >
              <div
                className="relative h-[135px] sm:h-[230px] w-full overflow-hidden rounded-2xl bg-white border border-dark-green/10"
                style={{
                  boxShadow: isCurrent
                    ? "0 12px 24px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                    : "0 6px 15px -8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={src}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                {!isCurrent && (
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-300" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 mt-2 z-10">
        {memoriesImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-orange" : "w-2 bg-dark-green/20 hover:bg-dark-green/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const defaultCasestudies: CasestudyItem[] = [
  {
    logo: "https://i.ibb.co/60NMkkGK/image.png",
    company: "MECHANICS",
    tags: "부산대학교 밴드 중앙동아리",
    title: "미케닉스는 50년의 깊은 역사를 바탕으로\n특정 장르에 얽매이지 않고 폭넓은 음악적 시도를\n이어가는 팀입니다.\n멤버들 각자의 뚜렷한 개성을 녹여내어\n매번 새로운 무대와 에너지를 선보이며\n무엇보다 관객과 함께 즐기는\n공연을 만들어가고 있습니다.",
    subtitle: "",
    image: "https://i.ibb.co/67fGT4Vh/169.jpg",
    link: "https://www.instagram.com/mechanics_pnu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    logo: "https://i.ibb.co/60NMkkGK/image.png",
    company: "MEMORIES",
    tags: "OUR STORIES",
    title: "함께한 계절, 함께한 순간.",
    subtitle: "사진 속에 담긴 미케닉스의 기록을 만나보세요.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
    link: "https://ticket.melon.com/performance/index.htm?prodId=213274",
  },
  {
    logo: "https://i.ibb.co/60NMkkGK/image.png",
    company: "PERFORMANCE",
    tags: "SANGSANG STARTER CLASS SPECIAL",
    title: "무대 위에서 가장 빛나는 순간.",
    subtitle: "무대 위 미케닉스의 에너지를 감상해 보세요.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200",
    link: "http://www.youtube.com/@Mechanics-fm6mj",
  },
];

export const Casestudy5 = ({
  casestudies = defaultCasestudies,
}: Casestudy5Props) => {
  return (
    <section className="pt-0 pb-16 text-left">
      <div className="container mx-auto">
        <div className="border border-dark-green/10 bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            {casestudies.map((item, idx) => {
              const isMechanics = item.company === "MECHANICS";
              const isMemories = item.company === "MEMORIES";
              const isPerformance = item.company === "PERFORMANCE";
              const CardTag = (isMemories || isPerformance) ? "div" : "a";
              const cardProps = (isMemories || isPerformance) 
                ? {} 
                : {
                    href: item.link || "#",
                    target: "_blank",
                    rel: "noopener noreferrer"
                  };

              return (
                <CardTag
                  key={item.company}
                  {...cardProps}
                  className={`group flex flex-col justify-between gap-8 bg-transparent px-8 py-8 transition-colors duration-500 ease-out hover:bg-white/50 md:py-12 ${
                    isMechanics
                      ? "lg:col-span-2 border-b border-dark-green/10"
                      : idx === 1
                        ? "border-b lg:border-b-0 lg:border-r border-dark-green/10"
                        : ""
                  } ${(isMemories || isPerformance) ? "cursor-default" : "cursor-pointer"}`}
                >
                <div className={`flex items-center gap-3 text-xl font-bold text-dark-green ${isMechanics ? "lg:hidden" : ""}`}>
                  <span className="text-2xl animate-spin inline-block" style={{ animationDuration: '8s' }}>⚙️</span>
                  {item.company}
                </div>
                
                <div className={`flex-1 flex ${isMechanics ? "flex-col lg:flex-row lg:gap-12 lg:items-start" : "flex-col justify-between"}`}>
                  <div className={isMechanics ? "flex-1 flex flex-col justify-start lg:items-center lg:text-center" : ""}>
                    {isMechanics && (
                      <div className="hidden lg:flex items-center gap-3 text-xl font-bold text-dark-green mb-4">
                        <span className="text-2xl animate-spin inline-block" style={{ animationDuration: '8s' }}>⚙️</span>
                        {item.company}
                      </div>
                    )}
                    <span className="text-xs font-bold text-orange tracking-widest block mb-2">
                      {item.company === "PERFORMANCE" ? "ON THE STAGE" : item.tags}
                    </span>
                    <h2 className="text-base sm:text-lg font-medium text-dark-green tracking-tight leading-relaxed whitespace-pre-wrap">
                      {item.company === "MECHANICS" ? (
                        <>
                          {/* Mobile Only */}
                          <span className="block sm:hidden">
                            미케닉스는 <span className="font-black text-dark-green">50년의 깊은 역사</span>를<br />
                            바탕으로 특정 장르에 얽매이지 않고<br />
                            <span className="font-black text-dark-green">폭넓은 음악적 시도</span>를<br />
                            이어가는 팀입니다.<br />
                            멤버들 각자의 <span className="font-black text-dark-green">뚜렷한 개성</span>을 녹여내어<br />
                            매번 <span className="font-black text-dark-green">새로운 무대와 에너지</span>를 선보이며<br />
                            무엇보다 <span className="font-black text-dark-green">관객과 함께 즐기는 공연</span>을<br />
                            만들어가고 있습니다.
                          </span>
                          {/* Desktop Only */}
                          <span className="hidden sm:block">
                            미케닉스는 <span className="font-black text-dark-green">50년의 깊은 역사</span>를<br />
                            바탕으로 특정 장르에 얽매이지 않고<br />
                            <span className="font-black text-dark-green">폭넓은 음악적 시도</span>를 이어가는 팀입니다.<br />
                            멤버들 각자의 <span className="font-black text-dark-green">뚜렷한 개성</span>을 녹여내어<br />
                            매번 <span className="font-black text-dark-green">새로운 무대와 에너지</span>를 선보이며<br />
                            무엇보다 <span className="font-black text-dark-green">관객과 함께 즐기는 공연</span>을<br />
                            만들어가고 있습니다.
                          </span>
                        </>
                      ) : item.company === "MEMORIES" ? (
                        <>
                          함께한 <span className="font-black text-dark-green">계절</span>, 함께한 <span className="font-black text-dark-green">순간</span>.
                        </>
                      ) : item.company === "PERFORMANCE" ? (
                        <>
                          <span className="font-black text-dark-green">무대</span> 위에서 가장 <span className="font-black text-dark-green">빛</span>나는 <span className="font-black text-dark-green">순간</span>.
                        </>
                      ) : (
                        item.title
                      )}
                      {item.subtitle && (
                        <span className="font-medium text-dark-green/50 block mt-2 text-sm">
                           {item.subtitle}
                        </span>
                      )}
                    </h2>

                    {isMechanics && (
                      <div className="hidden lg:flex items-center gap-2 font-bold text-orange text-sm mt-8">
                        Our Story Continue
                        <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
                      </div>
                    )}
                  </div>

                  <div className={isMechanics ? "flex-1 flex flex-col justify-start" : "w-full"}>
                    {item.company === "MEMORIES" ? (
                      <MemoriesCarousel />
                    ) : isPerformance ? (
                      /* Embedded YouTube Video */
                      <div className="w-full mt-6 mb-6 rounded-xl overflow-hidden border border-dark-green/5 aspect-video bg-black relative">
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src="https://www.youtube.com/embed/4NYof-3Iq9g"
                          title="Mechanics Live Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      /* Compact Image */
                      <div className={`w-full mt-6 mb-6 rounded-xl overflow-hidden border border-dark-green/5 ${isMechanics ? "h-48 lg:h-[340px] lg:my-0" : "h-48"}`}>
                        <img 
                          src={item.image} 
                          alt={item.company} 
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {!isMemories && (
                      <div className={`flex items-center gap-2 font-bold text-orange text-sm ${isMechanics ? "lg:hidden" : ""}`}>
                        {isPerformance ? (
                          <a 
                            href={item.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline cursor-pointer"
                          >
                            Watch More Videos
                            <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
                          </a>
                        ) : (
                          <>
                            {item.company === "MECHANICS" ? "Our Story Continue" : "Watch More Videos"}
                            <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

