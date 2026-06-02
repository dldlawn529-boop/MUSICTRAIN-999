import React, { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react"

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <span className="text-3xl leading-none">🚂</span>,
      secondaryIcon: null,
      title: "공연 소개",
      description: (
        <>
          {/* Mobile Only */}
          <div className="block sm:hidden space-y-1">
            {["여름은 사람들을 쉽게 지치게",
              "하지만 동시에 평범한 일상에서",
              "벗어나고 싶은 욕구를 자극합니다.",
              "이 순간, 음악과 함께하는 여행은",
              "회복과 새로운 시작의 계기를",
              "만들어 줍니다.",
              "이번 공연에서는 그 여정을 담아,",
              "첫 발걸음을 내딛는 아티스트들과",
              "함께 여러분을 초대합니다."].map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
          {/* Desktop/Tablet Only */}
          <div className="hidden sm:block space-y-1">
            {["여름은 사람들을 쉽게 지치게 하지만",
              "동시에 평범한 일상에서 벗어나고",
              "싶은 욕구를 자극합니다.",
              "이 순간, 음악과 함께하는 여행은",
              "회복과 새로운 시작의 계기를",
              "만들어 줍니다.",
              "이번 공연에서는 그 여정을 담아,",
              "첫 발걸음을 내딛는 아티스트들과 함께",
              "여러분을 초대합니다."].map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
        </>
      ),
      position: "left",
    },
    {
      icon: <span className="text-3xl leading-none">🐾</span>,
      secondaryIcon: null,
      title: "기획팀 소개",
      description: (
        <>
          {/* Mobile Only */}
          <div className="block sm:hidden space-y-1">
            {["'낭만고양2'는 지친 일상에 낭만이라는",
              "쉼표를 찍는 공연 기획팀입니다.",
              "자유로운 꿈을 꾸는 고양이처럼",
              "한계 없는 상상을 기획하며,",
              "일상에 갇힌 관객들을 새로운",
              "공간으로 데려다주는 '음악철도'처럼",
              "늘 설레는 목적지가 있는",
              "공연을 만듭니다."].map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
          {/* Desktop/Tablet Only */}
          <div className="hidden sm:block space-y-1">
            {["'낭만고양2'는 지친 일상에 낭만이라는",
              "쉼표를 찍는 공연 기획팀입니다.",
              "자유로운 꿈을 꾸는 고양이처럼",
              "한계 없는 상상을 기획하며,",
              "일상에 갇힌 관객들을 새로운 공간으로",
              "데려다주는 '음악철도'처럼 늘 설레는",
              "목적지가 있는 공연을 만듭니다."].map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
        </>
      ),
      position: "right",
    },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-16 px-4 bg-transparent text-[#202e44] overflow-hidden relative rounded-3xl mt-8"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#88734C]/5 blur-3xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#A9BBC8]/5 blur-3xl pointer-events-none"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#88734C]/30 pointer-events-none"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#A9BBC8]/30 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-md overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img
                  src="https://i.ibb.co/LdfzfmMr/image.jpg"
                  alt="Music Train Image"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-[#298C60] rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#88734C]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#A9BBC8]/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#88734C]"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A9BBC8]"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string | React.ReactNode
  variants: any
  delay: number
  direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  return (
    <motion.div
      className="flex gap-4 items-start text-left group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="text-[#88734C] bg-[#88734C]/10 p-2.5 rounded-2xl transition-colors duration-300 group-hover:bg-[#88734C]/20 relative flex items-center justify-center w-12 h-12 flex-shrink-0"
        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {icon}
        {secondaryIcon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <motion.h3 
          className="text-2xl md:text-3xl font-black text-[#202e44] group-hover:text-[#88734C] transition-colors duration-300 mb-3"
          initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          className="text-lg md:text-xl text-[#202e44]/85 leading-relaxed text-left space-y-1 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {typeof description === 'string' ? (
            description.split('\n').map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">
                {line.trim()}
              </div>
            ))
          ) : (
            description
          )}
        </motion.div>

        {title === "공연 소개" && (
          <div className="mt-4">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="flex items-center justify-between w-full py-3 px-4 bg-white/70 hover:bg-white rounded-xl border border-dark-green/20 text-2xl md:text-3xl font-bold text-dark-green transition-all shadow-sm group/btn text-left"
            >
              <span>공연장 유의사항</span>
              <span className={`transform transition-transform duration-300 text-xs ${isAccordionOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            <AnimatePresence initial={false}>
              {isAccordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-dark-green/10 shadow-inner">
                    <div className="grid grid-cols-[1.5rem_1fr] gap-y-2 text-base md:text-lg text-[#202e44]/80 font-medium">
                      <span>🚫</span>
                      <span>공연장 내 안전 문제로</span>
                      
                      <span></span>
                      <span>스탠딩, 의탠딩 금지</span>
                      
                      <span>🚫</span>
                      <span>인화성 물질 반입금지</span>
                      
                      <span>🚫</span>
                      <span>공연장 내 주류 및</span>
                      
                      <span></span>
                      <span>음식물 반입금지</span>
                      
                      <span>💧</span>
                      <span>공연장 반입가능 음료는</span>
                      
                      <span></span>
                      <span>생수만 허용</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {title === "기획팀 소개" && (
          <div className="mt-4">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="flex items-center justify-between w-full py-3 px-4 bg-white/70 hover:bg-white rounded-xl border border-dark-green/20 text-2xl md:text-3xl font-bold text-dark-green transition-all shadow-sm group/btn text-left"
            >
              <span>낭만고양2 팀원 소개</span>
              <span className={`transform transition-transform duration-300 text-xs ${isAccordionOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            <AnimatePresence initial={false}>
              {isAccordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 bg-white/40 backdrop-blur-sm rounded-xl text-base md:text-lg text-[#202e44]/80 space-y-2 border border-dark-green/10 shadow-inner">
                    <p>이송학</p>
                    <p>이승재</p>
                    <p>이임주</p>
                    <p>최다희</p>
                    <p>최송은</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}
