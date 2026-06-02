import React, { useState, useEffect, useRef, useMemo, Children, CSSProperties, ReactElement, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from 'firebase/auth';
import { db, auth } from './firebase-config';
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { cn } from './lib/utils';
import { InteractiveBackground } from './components/InteractiveBackground';
import { BreakableCard } from './components/BreakableCard';
import StickyTabs from './components/StickyTabs';
import AboutUsSection from './components/AboutUsSection';
import { Casestudy5 } from './components/Casestudy5';
import { Footer } from './components/Footer';
import { 
  Train, 
  ArrowRight, 
  Ticket, 
  Music, 
  Theater, 
  Mail, 
  Camera, 
  Stamp, 
  Instagram, 
  Youtube,
  MessageCircle,
  Clock,
  Calendar,
  Award,
  Users,
  Shield,
  MapPin,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  ArrowUpRight,
  StickyNote,
  User,
  Plus,
  AtSign,
  Guitar,
  X,
  Trash2,
  Pencil,
  Lock,
  Star as StarIcon
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import StaggeredMenu from './StaggeredMenu';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = useMemo(() => Children.toArray(children), [children]);
  const isVertical = direction === "up" || direction === "down";

  return (
    <>
      <style>
        {`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes scroll-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-y-reverse {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }

        .marquee-scroller {
          display: flex;
          animation: ${
          isVertical
            ? (direction === "up" ? "scroll-y" : "scroll-y-reverse")
            : (direction === "left" ? "scroll" : "scroll-reverse")
        } ${duration}s linear infinite;
          gap: inherit;
        }

        .marquee-scroller.paused {
          animation-play-state: paused;
        }
      `}
      </style>
      <div
        ref={containerRef}
        className={cn(
          "flex w-full overflow-hidden",
          isVertical && "flex-col",
          className,
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "marquee-scroller flex shrink-0",
            isVertical && "flex-col",
            isPaused && "paused",
          )}
        >
          {items.map((item: any, index) => (
            <div
              key={`first-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item: any, index) => (
            <div
              key={`second-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the text
   * */
  as?: ReactElement;

  /**
   * @default ""
   * @type string
   * @description
   * The className of the text
   */
  className?: string;

  /**
   * @required
   * @type string
   * @description
   * The text to be displayed
   * */
  text: string;

  /**
   * @default 10
   * @type number
   * @description
   * The count of sparkles
   * */
  sparklesCount?: number;

  /**
   * @default "{first: '#4A8C61', second: '#F2A74B'}"
   * @type string
   * @description
   * The colors of the sparkles
   * */
  colors?: {
    first: string;
    second: string;
  };
}

const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150],
      }}
      transition={{ duration: 2.5, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
};

const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  colors = { first: "#4A8C61", second: "#F2A74B" },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateStar = (): Sparkle => {
      // Focus more towards the center, shifted slightly left
      const starX = `${Math.random() * 100 - 5}%`;
      // Allow spread around the center, shifted slightly up
      const starY = `${Math.random() * 140 - 35}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 4;
      const scale = Math.random() * 0.7 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale, lifespan };
    };

    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar);
      setSparkles(newSparkles);
    };

    const updateStars = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar();
          } else {
            return { ...star, lifespan: star.lifespan - 0.05 };
          }
        }),
      );
    };

    initializeStars();
    const interval = setInterval(updateStars, 400);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div
      className={cn("text-6xl font-bold", className)}
      {...props}
      style={
        {
          "--sparkles-first-color": `${colors.first}`,
          "--sparkles-second-color": `${colors.second}`,
        } as CSSProperties
      }
    >
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong>{text}</strong>
      </span>
    </div>
  );
};

// --- 3D Components ---

const InteractiveScene = () => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const debrisGroupRef = useRef<THREE.Group>(null);
  const orbitalRef = useRef<THREE.Group>(null);
  
  const debrisRefs = useMemo(() => Array.from({ length: 24 }, () => ({ 
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10
    ] as [number, number, number],
    speed: Math.random() * 0.5 + 0.1,
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number]
  })), []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const scrollProgress = Math.min(scrollY / 1000, 1);
    
    if (crystalRef.current) {
      // Rotation speed increases with scroll
      const rotationMultiplier = 1 + scrollProgress * 5;
      crystalRef.current.rotation.x += 0.005 * rotationMultiplier;
      crystalRef.current.rotation.y += 0.005 * rotationMultiplier;
      
      // Retreat backward on scroll
      crystalRef.current.position.z = -scrollProgress * 15;
    }

    if (debrisGroupRef.current) {
      debrisGroupRef.current.rotation.y += 0.002;
      // Explode outward on scroll
      debrisGroupRef.current.scale.setScalar(1 + scrollProgress * 2);
      debrisGroupRef.current.position.z = scrollProgress * 5;
    }

    // Parallax effect
    const { x, y } = state.pointer;
    state.camera.position.lerp(new THREE.Vector3(x * 2, y * 1.5, 10 + scrollProgress * 5), 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={crystalRef}>
          <icosahedronGeometry args={[2.8, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={16}
            thickness={2}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            transmission={0.98}
            roughness={0.05}
            color="#fb923c" // Orange accent
            ior={1.5}
          />
        </mesh>
      </Float>

      <group ref={debrisGroupRef}>
        {debrisRefs.map((obj, i) => (
          <mesh
            key={i}
            position={obj.position}
            rotation={obj.rotation}
          >
            <octahedronGeometry args={[0.25, 0]} />
            <MeshTransmissionMaterial 
              transmission={0.95} 
              roughness={0.1} 
              color="#fef3c7" // Cream accent
              ior={1.2}
              chromaticAberration={0.2}
            />
          </mesh>
        ))}
      </group>

      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#fb923c" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#064e3b" />
    </>
  );
};

// --- UI Components ---

const ServiceCard = ({ icon, title, description }: { icon: any, title: string, description: ReactNode }) => {
  const Icon = typeof icon === 'string' ? null : icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, rotateX: -10 },
        show: { opacity: 1, y: 0, rotateX: 0 }
      }}
      whileHover={{ y: -10, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/5 p-10 rounded-[3rem] border border-white/5 shadow-2xl shadow-orange/5 group transition-all backdrop-blur-sm hover:border-orange/50"
    >
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:rotate-12 transition-all duration-300 group-hover:bg-orange group-hover:text-white group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]">
        {Icon ? <Icon size={32} /> : <span className="text-4xl">{icon}</span>}
      </div>
      <h3 className="text-2xl font-black mb-4 text-dark-green tracking-tighter">{title}</h3>
      <div className="text-dark-green/60 leading-relaxed font-medium whitespace-pre-line text-left">{description}</div>
    </motion.div>
  );
};

const PricingCard = ({ title, price, features, tier }: { title: string, price: string, features: string[], tier: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    const glare = cardRef.current.querySelector('.glare') as HTMLDivElement;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white/5 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden transition-transform duration-200 ease-out border border-white/5 cursor-pointer h-full flex flex-col backdrop-blur-xl group"
    >
      <div className="glare absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <span className="text-orange font-black text-[10px] uppercase tracking-[0.4em] mb-6 block text-right">{tier}</span>
      <h3 className="text-4xl font-black mb-2 text-dark-green tracking-tighter text-right">{title}</h3>
      <div className="text-5xl font-black mb-10 text-dark-green tracking-tighter text-right">{price}</div>
      <div className="space-y-5 flex-1">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4 text-white/40">
            <div className="w-1.5 h-1.5 bg-orange rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            <span className="text-sm font-medium tracking-tight whitespace-nowrap">{f}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-12 py-6 bg-white text-black rounded-3xl font-black uppercase tracking-tighter hover:bg-orange hover:text-white transition-all shadow-xl">
        Select Node
      </button>
    </div>
  );
};

const DecorativeStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className="w-full h-auto fill-orange"
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
);

const NavbarShader = ({ showMenu, setShowMenu, setView, isDark, setIsDark, ImageWrapper }: { showMenu: boolean, setShowMenu: (v: boolean) => void, setView: (v: 'ticket' | 'home' | 'about' | 'program' | 'artist' | 'contact' | 'visitor') => void, isDark: boolean, setIsDark: (v: boolean) => void, ImageWrapper: any }) => {
  const menuItems = [
    { label: 'ABOUT', ariaLabel: 'Go to about page', link: '/about', onClick: () => setView('about') },
    { label: 'PROGRAM', ariaLabel: 'Learn about us', link: '/program', onClick: () => setView('program') },
    { label: 'ARTIST', ariaLabel: 'View our services', link: '/artist', onClick: () => setView('artist') },
    { label: 'TICKET & EVENT', ariaLabel: 'Get in touch', link: '/contact', onClick: () => setView('contact') },
    { label: 'Visitor', ariaLabel: 'Check out the Guestbook', link: '/visitor', onClick: () => setView('visitor') }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 py-6 bg-transparent transition-all duration-500"
    >
      <motion.div
        className="flex items-center group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => setView('home')}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden">
            <ImageWrapper imgKey="navbar-logo">
              <img src="https://i.ibb.co/60NMkkGK/image.png" alt="Main" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </ImageWrapper>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center space-x-4">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#107770', '#FF8440']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#000000"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </motion.header>
  );
};

// --- Visitor Component ---
const Visitor = () => {
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  
  // Modal states
  const [modalState, setModalState] = useState<'password' | 'edit' | null>(null);
  const [modalAction, setModalAction] = useState<'edit' | 'delete' | null>(null);
  const [targetMessage, setTargetMessage] = useState<any | null>(null);
  const [modalPassword, setModalPassword] = useState("");
  const [editContent, setEditContent] = useState("");

  const colors = ["bg-yellow-100", "bg-blue-100", "bg-pink-100", "bg-green-100", "bg-purple-100", "bg-orange-100"];
  const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-3", "-rotate-3"];

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    if (password.length !== 4) {
      alert("비밀번호 4자리를 입력해 주세요.");
      return;
    }
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    
    try {
      await addDoc(collection(db, "messages"), {
        nickname: nickname.trim() || "익명",
        content: text,
        password: password,
        date: new Date().toLocaleDateString('ko-KR').slice(0, -1),
        color: randomColor,
        rotation: randomRotation,
        createdAt: serverTimestamp()
      });
      setText("");
      setNickname("");
      setPassword("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const openActionModal = (message: any, action: 'edit' | 'delete') => {
    setTargetMessage(message);
    setModalAction(action);
    setModalState('password');
    setModalPassword("");
    setEditContent(message.content);
  };

  const handleModalConfirm = async () => {
    if (!targetMessage) return;

    if (modalState === 'password') {
      if (modalPassword !== targetMessage.password) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }

      if (modalAction === 'delete') {
        try {
          await deleteDoc(doc(db, "messages", targetMessage.id));
          closeModal();
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      } else if (modalAction === 'edit') {
        setModalState('edit');
      }
    } else if (modalState === 'edit') {
      if (!editContent.trim()) return;
      try {
        await updateDoc(doc(db, "messages", targetMessage.id), {
          content: editContent.trim(),
          updatedAt: serverTimestamp()
        });
        closeModal();
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  };

  const closeModal = () => {
    setModalState(null);
    setModalAction(null);
    setTargetMessage(null);
    setModalPassword("");
    setEditContent("");
  };

  return (
    <section className="w-full pt-32 md:pt-40 pb-0 px-8 relative overflow-hidden flex flex-col items-center">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl w-full relative z-10">
        {/* 헤더 */}
        <div className="max-w-7xl w-full mx-auto px-8 text-center mb-10">
          <div className="text-center mr-[12px]">
            <h2 className="text-orange font-black tracking-[0.5em] text-xs uppercase mb-4">05. VISITOR</h2>
            <h3 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter">방명록</h3>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="max-w-md mx-auto mt-24 mb-24">
          <div className="bg-white p-6 rounded-lg shadow-xl relative transform transition-transform hover:scale-[1.01] border border-gray-100">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-gray-300/40 backdrop-blur-sm rounded opacity-80 border border-white/50"></div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md border border-gray-100">
                <AtSign size={16} className="text-gray-400" />
                <input 
                  type="text"
                  className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-full placeholder:text-gray-300 font-medium"
                  placeholder="닉네임 입력 (미입력 시 익명)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={10}
                />
              </div>

              <div className="relative">
                <textarea
                  className="w-full h-32 p-4 pb-8 bg-yellow-50/20 rounded-md border-none focus:ring-2 focus:ring-yellow-200 resize-none text-gray-700 placeholder:text-gray-300 font-medium text-sm md:text-base"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 200))}
                  placeholder={`여기에 메시지를 작성해 주세요.\n욕설, 혐오 표현 등 부적절한 내용은\n삭제될 수 있습니다.`}
                  maxLength={200}
                />
                <div className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-medium pointer-events-none">
                  {text.length}/200
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md border border-gray-100">
                <Lock size={16} className="text-gray-400" />
                <input 
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-full placeholder:text-gray-300 font-medium"
                  placeholder="비밀번호 (숫자 4자리)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSubmit}
                className="bg-gray-800 hover:bg-black text-white px-6 py-2.5 rounded-md flex items-center gap-2 transition-all font-bold shadow-lg active:scale-95"
              >
                <Plus size={18} />
                <span>메모 붙이기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.8, rotate: msg.rotation === 'rotate-1' ? 5 : -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`${msg.color} p-6 rounded-lg shadow-lg relative transform transition-all hover:scale-105 hover:z-20 group`}
              style={{ animation: 'popIn 0.5s ease-out forwards' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-gray-300/40 backdrop-blur-sm rounded opacity-80"></div>
              <div className="flex flex-col mb-4">
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{msg.nickname}</span>
                <span className="text-[8px] text-gray-500 font-medium">{msg.date}</span>
              </div>
              <p className="text-gray-700 font-medium text-sm leading-relaxed whitespace-pre-wrap break-words mb-8">
                {msg.content}
              </p>
              
              <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openActionModal(msg, 'edit')}
                  className="p-1.5 bg-white/50 hover:bg-white rounded-full transition-all text-gray-500 hover:text-blue-500 shadow-sm"
                >
                  <Pencil size={10} />
                </button>
                <button 
                  onClick={() => openActionModal(msg, 'delete')}
                  className="p-1.5 bg-white/50 hover:bg-white rounded-full transition-all text-gray-500 hover:text-red-500 shadow-sm"
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 커스텀 모달 */}
      <AnimatePresence>
        {modalState && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xs p-6 rounded-2xl shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 장식 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-orange"></div>
              
              <div className="mb-6 text-center">
                <h4 className="text-lg font-black text-dark-green tracking-tight">
                  {modalState === 'password' ? '비밀번호 확인' : '메시지 수정'}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {modalState === 'password' 
                    ? (modalAction === 'edit' ? '수정하시려면 비밀번호를 입력하세요.' : '삭제하시려면 비밀번호를 입력하세요.')
                    : '내용을 수정해 주세요.'}
                </p>
              </div>

              {modalState === 'password' ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                  <Lock size={16} className="text-gray-400" />
                  <input 
                    type="password"
                    autoFocus
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-full font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium"
                    placeholder="숫자 4자리"
                    value={modalPassword}
                    onChange={(e) => setModalPassword(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    onKeyDown={(e) => e.key === 'Enter' && handleModalConfirm()}
                    maxLength={4}
                  />
                </div>
              ) : (
                <textarea
                  autoFocus
                  className="w-full h-32 p-4 bg-yellow-50/20 rounded-xl border border-yellow-100 focus:ring-2 focus:ring-yellow-200 resize-none text-gray-700 font-medium text-sm mb-6"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="수정할 내용을 입력하세요."
                />
              )}

              <div className="flex gap-2">
                <button 
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-sm font-bold transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={handleModalConfirm}
                  className="flex-1 px-4 py-3 bg-dark-green hover:bg-black text-white rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95"
                >
                  {modalState === 'password' ? '확인' : '수정완료'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}} />
    </section>
  );
};

// --- FlowArt and FlowSection Components ---

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <div className="w-full flex justify-center py-6 md:py-10">
    <section
      data-flow-section
      aria-label={ariaLabel}
      className={cx('relative min-h-[80vh] w-[92%] md:w-[85%] max-w-5xl overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5', className)}
    >
      <div
        data-flow-inner
        className={cx(
          'flow-art-container relative flex min-h-[80vh] w-full flex-col justify-between gap-6 px-8 md:px-12 py-10 md:py-14',
          'will-change-transform',
        )}
        style={{ transformOrigin: 'bottom left', ...style }}
      >
        {children}
      </div>
    </section>
  </div>
);

interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // Automatically find scrollable parent (scrollerRef.current in our case)
        const scroller = section.closest('.overflow-y-auto') || window;

        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              scroller: scroller,
              start: 'top bottom',
              end: 'top 25%',
              scrub: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              scroller: scroller,
              start: 'top top',
              endTrigger: containerRef.current,
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'ticket' | 'home' | 'about' | 'program' | 'artist' | 'contact' | 'visitor'>('ticket');
  const [isDark, setIsDark] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    auth.languageCode = 'ko';
    const authUnsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
          if (docSnap.exists() && docSnap.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
      } else {
        setIsAdmin(false);
      }
    });
    return () => authUnsub();
  }, []);

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll when view changes
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = 0;
    }
  }, [view]);

  const handleAdminToggle = () => {
    setShowLoginModal(true);
  };

  const LoginModal = () => (
    <AnimatePresence>
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginModal(false)}
            className="absolute inset-0 bg-dark-green/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 border border-white/20"
          >
            <div className="bg-dark-green p-8 text-cream flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase">관리자 시스템</h3>
                <p className="text-[10px] font-bold opacity-50 tracking-[0.2em] uppercase mt-1">Management Services</p>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-dark-green transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {!user ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto">
                    <User size={32} className="text-dark-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-green text-lg">본인 인증 필요</h4>
                    <p className="text-sm text-gray-500 mt-2">사이트 관리를 위해 구글 계정으로 로그인해 주세요.</p>
                  </div>
                  <button 
                    onClick={async (e) => {
                      e.preventDefault();
                      const provider = new GoogleAuthProvider();
                      provider.setCustomParameters({ prompt: 'select_account' });
                      try {
                        await signInWithPopup(auth, provider);
                      } catch (err) {
                        console.error("로그인 에러:", err);
                        alert("로그인 창을 열 수 없습니다. 브라우저의 팝업 차단 설정을 확인해주세요.");
                      }
                    }}
                    className="w-full py-4 bg-orange text-white font-black uppercase tracking-tighter rounded-2xl hover:bg-dark-green transition-all flex items-center justify-center gap-2 group"
                  >
                    <AtSign size={18} className="group-hover:rotate-12 transition-transform" />
                    구글로 로그인하기
                  </button>
                </div>
              ) : !isAdmin ? (
                <div className="space-y-6">
                  <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <User size={24} className="text-red-500" />
                    </div>
                    <h4 className="font-bold text-red-600">관리자 권한이 없습니다.</h4>
                    <p className="text-xs text-red-400 mt-2 mb-4">현재 일반 사용자로 로그인되어 있습니다. 관리자 권한이 필요하시면 시스템 관리자에게 아래의 ID를 전달해주세요.</p>
                    <div className="w-full bg-white/50 p-4 rounded-xl font-mono text-[10px] text-red-300 break-all border border-red-100/50">
                      {user.uid}
                    </div>
                  </div>
                  <button 
                    onClick={() => auth.signOut()}
                    className="w-full py-4 border border-gray-100 text-gray-400 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    다른 계정으로 로그인 / 로그아웃
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 rounded-3xl border border-green-100 flex items-center gap-4">
                    <img src={user.photoURL || ''} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-dark-green uppercase text-xs tracking-widest">관리자 인증됨</h4>
                      <p className="text-sm font-medium text-green-700">{user.displayName || '관리자'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsEditMode(!isEditMode)}
                      className={cn(
                        "w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-between px-8",
                        isEditMode ? "bg-orange text-white shadow-lg shadow-orange/30" : "bg-cream text-dark-green"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Guitar size={20} />
                        편집 모드
                      </div>
                      <div className={cn(
                        "w-10 h-6 rounded-full relative transition-all p-1",
                        isEditMode ? "bg-white" : "bg-dark-green/20"
                      )}>
                        <div className={cn(
                          "w-4 h-4 rounded-full transition-all",
                          isEditMode ? "bg-orange ml-4" : "bg-white"
                        )} />
                      </div>
                    </button>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center px-4 leading-relaxed">
                      편집 모드가 활성화되면 사이트 내 이미지를 클릭하여 새로운 이미지로 교체할 수 있습니다.
                    </p>
                  </div>

                  <button 
                    onClick={() => auth.signOut()}
                    className="w-full py-4 border border-gray-100 text-gray-400 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-cream px-8 py-4 text-center">
              <p className="text-[9px] font-bold text-dark-green/30 uppercase tracking-[0.3em]">Music Train 999 Management System</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const handleImageUpload = (key: string) => {
    console.log('Upload image for:', key);
  };

  const ImageWrapper = ({ imgKey, children, onClick }: { imgKey: string, children: ReactNode, onClick?: (e: React.MouseEvent) => void }) => (
    <div 
      className={cn("relative group w-full h-full", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      {children}
      {isAdmin && isEditMode && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            handleImageUpload(imgKey);
          }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all rounded-[inherit] z-20"
        >
          <StarIcon className="w-6 h-6 text-orange animate-pulse" />
        </div>
      )}
    </div>
  );
  const horizontalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Neural Blueprinting',
      description: 'Autonomous agents draft the structural architecture, optimizing for scale and performance.',
      color: 'from-dark-green/20'
    },
    {
      number: '02',
      title: 'Deterministic Logic',
      description: 'Engineering the granular interactions and robust backends that power the final product.',
      color: 'from-orange/20'
    },
    {
      number: '03',
      title: 'Hyper-Release',
      description: 'Global deployment across edge nodes with automated load balancing and state-sync.',
      color: 'from-dark-green/20'
    },
    {
      number: '04',
      title: 'Quantum Pulse',
      description: 'Stabilizing the frequency of harmonic resonance across all connected terminal points.',
      color: 'from-orange/20'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    
    const now = new Date();
    const formatted = now.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    }).replace(/\. /g, '. ').replace('(', '(').toUpperCase();
    setCurrentDate(formatted);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo(0, 0);
    }
  }, [view]);

  const handleEnter = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDDay = () => {
    const target = new Date('2026-05-27T00:00:00');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const diff = targetDay.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return "OPEN";
    return `TICKET OPEN\nD-${days}`;
  };

  return (
    <div className={`min-h-screen selection:bg-orange selection:text-white ${view === 'ticket' ? 'overflow-hidden h-screen' : 'pb-10'}`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 bg-dark-green flex flex-col justify-center items-center z-50 px-4 text-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="text-cream"
            >
              <Train size={64} strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-cream text-3xl mt-6 tracking-[0.1em] font-bold">
              <span className="block sm:hidden text-[20px] tracking-normal">
                KT&G 상상마당 부산<br />2026 WONDER WEEKS
              </span>
              <span className="hidden sm:block">
                KT&G 상상마당 부산<br />2026 WONDER WEEKS
              </span>
            </h1>
            <p className="text-cream/70 text-sm mt-3 font-medium">음악철도 999 : 미케닉스 X 낭만고양2</p>
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'ticket' && (
        <NavbarShader showMenu={showMenu} setShowMenu={setShowMenu} setView={setView} isDark={isDark} setIsDark={setIsDark} ImageWrapper={ImageWrapper} />
      )}

      <main className="max-w-lg mx-auto relative px-4">
        <AnimatePresence mode="wait">
          {view === 'ticket' ? (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-screen pt-0 pb-0 md:py-8 bg-cream relative"
            >
              {/* Ticket Card - Immersive Design */}
              <div className="w-full bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-dark-green/10 flex flex-col h-auto">
                <header className="bg-dark-green text-cream px-8 py-4 flex justify-between items-center text-[13px] font-bold tracking-[0.1em] whitespace-nowrap overflow-hidden">
                  <div className="flex w-full justify-between items-center">
                    <span>{currentDate}</span>
                    <span className="opacity-80">음악철도 999</span>
                  </div>
                </header>
                
                <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="mt-2">
                    <div className="mb-4">
                      <div className="flex justify-between items-center gap-2 px-2">
                        <div className="flex flex-col items-start pl-[15px]">
                          <p className="text-[9px] text-gray-400 font-sans tracking-widest uppercase mb-1">Departure</p>
                          <h2 className="text-4xl md:text-5xl font-black text-dark-green uppercase">여름</h2>
                        </div>
                        <div className="text-orange flex-shrink-0">
                          <ArrowRight size={28} />
                        </div>
                        <div className="flex flex-col items-end pr-[20px] pl-0">
                          <p className="text-[9px] text-gray-400 font-sans tracking-widest uppercase mb-1">Arrival</p>
                          <h2 className="text-4xl md:text-5xl font-black text-dark-green uppercase text-right">낭만역</h2>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                      <div className="grid grid-cols-[1.35fr_auto_0.65fr] sm:grid-cols-[1fr_auto_1fr] gap-x-2">
                        {/* First Row: Titles */}
                        <div className="text-center self-center">
                          <p className="text-[13px] text-gray-400 uppercase">Location</p>
                        </div>
                        {/* Divider spanning all 3 rows */}
                        <div className="row-span-3 w-[1px] bg-gray-200 self-stretch"></div>
                        <div className="text-center self-center">
                          <p className="text-[13px] text-gray-400 uppercase">Time</p>
                        </div>

                        {/* Second Row: Icons */}
                        <div className="text-center flex justify-center py-[6px] self-center">
                          <MapPin size={16} className="text-orange" />
                        </div>
                        <div className="text-center flex justify-center py-[6px] self-center">
                          <Clock size={16} className="text-orange" />
                        </div>

                        {/* Third Row: Content */}
                        <div className="text-center text-dark-green self-start">
                          <p className="text-[16px] font-bold leading-tight">
                            <span className="block sm:hidden">
                              KT&G 상상마당 부산<br />3층 라이브홀
                            </span>
                            <span className="hidden sm:block whitespace-pre-line">
                              KT&G 상상마당 부산{"\n"}3층 라이브홀
                            </span>
                          </p>
                        </div>
                        <div className="text-center text-dark-green self-start pt-[2px]">
                          <p className="text-[16px] font-bold leading-tight">
                            <span className="block sm:hidden">
                              PM<br />07:30
                            </span>
                            <span className="hidden sm:block whitespace-nowrap">
                              PM 07:30
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    {/* Dotted Line with Cutouts */}
                    <div className="relative h-[2px] border-t-2 border-dashed border-gray-200 my-4 -mx-8">
                      <div className="absolute left-[-15px] top-[-10px] w-6 h-6 bg-cream rounded-full"></div>
                      <div className="absolute right-[-15px] top-[-10px] w-6 h-6 bg-cream rounded-full"></div>
                    </div>

                      <div className="flex justify-between items-center gap-6 pt-6 w-full px-4 mb-2">
                        <div className="flex flex-col gap-4 pl-0 md:pl-[45px] pb-[10px]">
                          <div className="text-left">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">Date</p>
                            <p className="text-2xl font-bold flex items-center gap-2">
                               <Calendar size={20} className="text-orange" /> 06 / 24
                            </p>
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">Artist</p>
                            <p className="text-2xl font-bold text-dark-green uppercase tracking-tighter">미케닉스</p>
                          </div>
                        </div>
                        
                        <div className="text-center pr-0 md:pr-[30px] pl-0 pt-0 pb-0">
                          <button
                            onClick={handleEnter}
                            className="
                              relative w-24 h-24 flex items-center justify-center
                              text-[19px] font-extrabold 
                              text-white 
                              bg-orange 
                              border-[2px] border-orange 
                              rounded-md 
                              transition-all duration-300 ease-in-out 
                              cursor-pointer
                              hover:bg-transparent hover:text-orange
                              active:scale-95
                              text-center leading-tight
                            "
                          >
                            승차권<br/>확인
                          </button>
                          <p className="text-[8px] mt-2 text-gray-400 font-sans tracking-widest uppercase font-bold">TAP for info</p>
                        </div>
                      </div>

                    <Marquee duration={20} fade={true} className="py-2 text-dark-green/60 font-black tracking-[0.2em] text-[10px] uppercase gap-10">
                      <span>미케닉스 X 낭만고양2</span>
                      <span>•</span>
                      <span>미케닉스 X 낭만고양2</span>
                      <span>•</span>
                      <span>미케닉스 X 낭만고양2</span>
                      <span>•</span>
                    </Marquee>

                    <div className="mt-1 pt-2 border-t border-gray-50 text-center">
                      <p className="text-[8px] text-gray-300 font-sans tracking-[0.3em] uppercase font-medium whitespace-nowrap overflow-hidden">
                        Ticket No: 2026-0624-MUSICTRAIN-999
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`fixed inset-0 overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0f1712]' : 'bg-cream'}`}
            >
              <style>
                {`
                  .active-glow {
                    box-shadow: 0 0 50px rgba(251, 146, 60, 0.2);
                    border-color: rgba(251, 146, 60, 0.5) !important;
                  }
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}
              </style>
              <div 
                className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-40" 
                style={{ backgroundImage: 'url(https://i.ibb.co/C3FQf83j/1.jpg)' }}
              />

              <div ref={scrollerRef} className="h-screen overflow-y-auto no-scrollbar relative z-10 selection:bg-orange selection:text-white">
                <AnimatePresence mode="wait">
                  {view === 'home' && (
                    <motion.section 
                      key="home"
                      id="hero" 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-screen relative flex items-center justify-center px-8 md:px-12 overflow-hidden"
                    >
                      <InteractiveBackground />

                      <div className="text-center relative z-10 pointer-events-none flex flex-col justify-center items-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="mb-8"
                        >
                          <h2 className={`text-center transition-colors duration-500 mb-4 ${isDark ? 'text-white/60' : 'text-[#18261D]'}`}>
                            <span className="block sm:hidden text-[10px] font-black tracking-[0.1em] uppercase">우리 열차는 잠시 후 낭만역에 도착합니다</span>
                            <span className="hidden sm:block text-sm font-black tracking-[0.5em] uppercase">우리 열차는 잠시 후 낭만역에 도착합니다</span>
                          </h2>
                        </motion.div>
                        
                        <motion.h1
                          className="text-7xl md:text-9xl font-black text-white mb-0 leading-[0.85] tracking-tighter"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <span className="text-[#4A8C61]">음악철도</span><br />
                          <span className="text-[#F2A74B]">999</span>
                        </motion.h1>



                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="mt-8 flex justify-center items-center"
                        >
                          <ul className="flex gap-4 md:gap-6 scale-75 md:scale-100 pointer-events-auto">
                            {[
                              { title: 'PROGRAM', icon: <Award size={24} />, gradientFrom: '#298C60', gradientTo: '#FFA52D', action: () => setView('program') },
                              { title: 'LOCATION', icon: <MapPin size={24} />, gradientFrom: '#298C60', gradientTo: '#FFA52D', action: () => window.open('https://naver.me/x3jFyQzZ', '_blank') },
                              { title: 'TICKET', icon: <Ticket size={24} />, gradientFrom: '#298C60', gradientTo: '#FFA52D', action: () => window.open('https://ticket.melon.com/performance/index.htm?prodId=213274', '_blank') }
                            ].map(({ title, icon, gradientFrom, gradientTo, action }, idx) => (
                              <li
                                key={idx}
                                onClick={action}
                                style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as any}
                                className="relative w-[60px] h-[60px] bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[180px] hover:shadow-none group cursor-pointer"
                              >
                                {/* Gradient background on hover */}
                                <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                                {/* Blur glow */}
                                <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

                                {/* Icon */}
                                <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                                  <span className="text-2xl text-gray-500">{icon}</span>
                                </span>

                                {/* Title */}
                                <span className="absolute text-white uppercase font-black tracking-wide text-xs transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
                                  {title}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>


                      </div>
                    </motion.section>
                  )}

                  {view === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full pt-32 md:pt-40 pb-0"
                    >
                      <div className="max-w-7xl w-full mx-auto px-8 text-center mb-10">
                        <div className="text-center mr-[12px]">
                          <h2 className="text-orange font-black tracking-[0.5em] text-xs uppercase mb-4">01. ABOUT</h2>
                          <h3 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter">음악철도 999</h3>
                        </div>
                      </div>

                      <AboutUsSection />
                    </motion.div>
                  )}

                  {view === 'program' && (
                    <motion.section 
                      key="program" 
                      id="program" 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full pt-32 md:pt-40 pb-0 px-8 flex flex-col items-center"
                    >
                      <div className="max-w-7xl w-full mx-auto px-8 text-center mb-10">
                        <div className="text-center mr-[12px]">
                          <h2 className="text-orange font-black tracking-[0.5em] text-xs uppercase mb-4">02. PROGRAM</h2>
                          <h3 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter">스탬프 투어</h3>
                        </div>
                      </div>
                        
                      {/* Interactive Breakable Cards for Stamp Tour Destinations */}
                      <div className="max-w-7xl w-full mt-8">
                        <div className="mx-auto max-w-5xl px-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <BreakableCard 
                              title={
                                <>
                                  <span className="block sm:hidden">
                                    01. 나만의<br />음악티켓 작성
                                  </span>
                                  <span className="hidden sm:block">
                                    01. 나만의 음악티켓 작성
                                  </span>
                                </>
                              }
                              description={
                                <>
                                  <span className="block sm:hidden text-[20px]">
                                    공연 당일 배부 받은<br />
                                    스탬프 투어 용지 하단의<br />
                                    '나만의 음악 티켓'을<br />
                                    작성해 주세요.
                                  </span>
                                  <span className="hidden sm:block text-[20px]">
                                    공연 당일 배부 받은 스탬프 투어 용지 하단의<br />
                                    '나만의 음악티켓'을 작성해 주세요.
                                  </span>
                                </>
                              }
                              figText="MISSION. 01"
                              className="min-h-[320px] rounded-3xl"
                            />
                            <BreakableCard 
                              title={
                                <>
                                  <span className="block sm:hidden">
                                    02. 공연 응원<br />메세지 작성
                                  </span>
                                  <span className="hidden sm:block">
                                    02. 공연 응원 메세지 작성
                                  </span>
                                </>
                              }
                              description={
                                <>
                                  <span className="block sm:hidden text-[20px]">
                                    추억 회고역에서<br />
                                    아티스트에게 전하는<br />
                                    공연 응원 메시지 또는<br />
                                    여름 이야기를<br />
                                    작성해 주세요.
                                  </span>
                                  <span className="hidden sm:block text-[20px]">
                                    추억 회고역에서 아티스트에게 전하는<br />
                                    공연 응원 메시지 또는 여름 이야기를<br />
                                    작성해 주세요.
                                  </span>
                                </>
                              }
                              figText="MISSION. 02"
                              className="min-h-[320px] rounded-3xl"
                            />
                            <BreakableCard 
                              title={
                                <>
                                  <span className="block sm:hidden text-left uppercase">
                                    03. 인스타그램<br />스토리 업로드
                                  </span>
                                  <span className="hidden sm:block">
                                    03. 인스타그램 스토리 업로드
                                  </span>
                                </>
                              } 
                              description={
                                <>
                                  <span className="block sm:hidden text-[20px]">
                                    '음악철도999' 공연의<br />
                                    생생한 현장을 담은<br />
                                    사진과 함께 인스타그램<br />
                                    스토리를 올려주세요.
                                  </span>
                                  <span className="hidden sm:block text-[20px]">
                                    '음악철도999' 공연의 생생한 현장을 담은<br />
                                    사진과 함께 인스타그램 스토리를 올려주세요.
                                  </span>
                                </>
                              }
                              figText="MISSION. 03"
                              className="min-h-[320px] rounded-3xl"
                            />
                            <BreakableCard 
                              title={
                                <>
                                  <span className="block sm:hidden">
                                    04. 한정판<br />핀배지 GET
                                  </span>
                                  <span className="hidden sm:block">
                                    04. 한정판 핀배지 GET
                                  </span>
                                </>
                              }
                              description={
                                <>
                                  <span className="block sm:hidden text-[20px]">
                                    미션 3개를 성공한 뒤<br />
                                    공연 한정판 핀배지를<br />
                                    얻으세요.<br />
                                    <span className="text-[15px] font-medium text-[#202e44]/75 mt-1 block">* 랜덤 2종 중 1개</span>
                                    <span className="text-[15px] font-medium text-[#202e44]/75 mt-0.5 block">* 조기 소진 가능</span>
                                  </span>
                                  <span className="hidden sm:block text-[20px]">
                                    미션 3개를 성공한 뒤<br />
                                    공연 한정판 핀배지를 얻으세요.<br />
                                    <span className="text-[17px] font-medium text-[#202e44]/75 mt-1 block">* 랜덤 2종 중 1개</span>
                                    <span className="text-[17px] font-medium text-[#202e44]/75 mt-1 block">* 조기 소진 가능</span>
                                  </span>
                                </>
                              }
                              figText="MISSION. 04"
                              className="min-h-[320px] rounded-3xl"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {view === 'artist' && (
                    <motion.section 
                      key="artist" 
                      id="artist" 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full pt-32 md:pt-40 pb-0 px-8 flex flex-col items-center transition-colors duration-500"
                    >
                      <div className="max-w-7xl w-full mx-auto px-8 text-center mb-10">
                        <div className="text-center mr-[12px]">
                          <h2 className="text-orange font-black tracking-[0.5em] text-xs uppercase mb-4">03. ARTIST</h2>
                          <h3 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter">미케닉스</h3>
                        </div>
                      </div>

                      <div className="max-w-7xl w-full mt-8">
                        <Casestudy5 />
                      </div>
                    </motion.section>
                  )}

                  {view === 'contact' && (
                    <motion.section 
                      key="contact" 
                      id="contact" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full pt-32 md:pt-40 pb-0 px-8 flex flex-col items-center transition-all duration-500"
                    >
                      <div className="max-w-7xl w-full mx-auto px-8 text-center mb-10">
                        <div className="text-center mr-[12px]">
                          <h2 className="text-orange font-black tracking-[0.5em] text-xs uppercase mb-4">04. TICKET & EVENT</h2>
                          <h3 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter">승차권 구매</h3>
                        </div>
                      </div>

                      <div className="max-w-7xl w-full mt-8">
                        {/* Countdown Banner */}
                        <CountdownBanner />
                      </div>
                    </motion.section>
                  )}

                  {view === 'visitor' && (
                    <motion.section 
                      key="visitor" 
                      id="visitor" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Visitor />
                    </motion.section>
                  )}
                </AnimatePresence>

                {/* Footer and Extras */}
                {view !== 'home' && (
                  <Footer
                    brandName="음악철도999"
                    brandDescription={"KT&G 상상마당 부산 WONDERWEEKS\n미케닉스 X 낭만고양2"}
                    creatorName="낭만고양2"
                    creatorUrl="https://www.instagram.com/musictrain999/"
                    socialLinks={[]}
                    navLinks={[
                      { label: "ABOUT", href: "#about" },
                      { label: "PROGRAM", href: "#program" },
                      { label: "ARTIST", href: "#artist" },
                      { label: "TICKET & EVENT", href: "#ticket" },
                      { label: "VISITOR", href: "#visitor" }
                    ]}
                    brandIcon={<Train className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-[#FFF2C3] drop-shadow-lg" />}
                    onViewChange={(v) => setView(v)}
                  />
                )}
              </div>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
                  >
                    <button 
                      onClick={() => setShowMenu(false)}
                      className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                      CLOSE
                    </button>
                    {['ABOUT', 'PROGRAM', 'ARTIST', 'TICKET & EVENT', 'VISITOR'].map((item) => (
                      <motion.button
                        key={item}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl font-black text-white hover:text-orange transition-colors"
                        onClick={() => {
                          const target = item === 'ABOUT' ? 'about' : 
                                         item === 'PROGRAM' ? 'program' : 
                                         item === 'ARTIST' ? 'artist' : 
                                         item === 'TICKET & EVENT' ? 'contact' : 'visitor';
                          setView(target as any);
                          setShowMenu(false);
                        }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="fixed bottom-6 right-6 z-50">
                <div className="relative flex flex-col items-end">
                  <AnimatePresence>
                    {showSocials && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0 }}
                        className="flex flex-col items-center gap-4 mb-4 mr-[12px]"
                      >
                        <motion.a
                          href="https://www.instagram.com/musictrain999?igsh=MTA2c3h2b3Yydm02NA=="
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform relative group"
                        >
                          <span className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                            Instagram
                          </span>
                          <Instagram size={18} />
                        </motion.a>
                        <motion.a
                          href="https://open.kakao.com/o/szpjEcpi"
                          target="_blank"
                          rel="noreferrer"
                          transition={{ delay: 0.1 }}
                          className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform relative group"
                        >
                          <span className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                            KAKAOTALK
                          </span>
                          <MessageCircle size={18} />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div 
                    className="relative w-16 h-16 flex items-center justify-center cursor-pointer scale-90 md:scale-110" 
                    onClick={() => setShowSocials(!showSocials)}
                  >
                  <PulsingBorder
                    colors={["#064e3b", "#059669", "#fb923c", "#34d399", "#fef3c7", "#ea580c", "#ffffff"]}
                    colorBack="#00000000"
                    speed={1.5}
                    roundness={1}
                    thickness={0.1}
                    softness={0.2}
                    intensity={5}
                    spotSize={0.1}
                    pulse={0.1}
                    smoke={0.5}
                    smokeSize={4}
                    scale={0.5}
                    rotation={0}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />

                  {/* Rotating Text Around the Pulsing Border */}
                  <motion.svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{ transform: "scale(1.3)" }}
                  >
                    <defs>
                      <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="text-[9px] fill-[#4A8C61] font-bold tracking-widest uppercase">
                      <textPath href="#circle" startOffset="0%">
                        2026  WONDERWEEKS  MUSIC  TRAIN  999  •  낭만고양2
                      </textPath>
                    </text>
                  </motion.svg>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
      
      {/* Background Decorative Element */}
      <div className={`fixed inset-0 pointer-events-none -z-10 transition-colors duration-1000 ${view === 'ticket' ? 'bg-cream' : 'bg-dark-green'}`} />
    </div>
  );
}

const TARGET_DATE = new Date("2026-06-23T11:59:00+09:00")

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function AnimatedDigit({ value }: { value: number }) {
  return (
    <div className="relative h-[1em] w-[1.2em] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div className="relative flex items-center justify-center bg-dark-green/5 backdrop-blur-sm border border-dark-green/10 rounded-lg md:rounded-xl px-2 py-1.5 md:px-6 md:py-5 min-w-[52px] md:min-w-[100px] shadow-sm overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="font-mono text-xl md:text-5xl lg:text-6xl font-black tracking-tight text-dark-green">
          <AnimatedDigit value={value} />
        </span>
      </div>
      <span className="text-[8px] md:text-xs font-semibold uppercase tracking-[0.1em] md:tracking-[0.2em] text-dark-green/60">
        {label}
      </span>
    </div>
  )
}

export function CountdownBanner() {
  const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft())
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative w-full px-4 pt-0 pb-12 md:pb-24 overflow-hidden flex items-center justify-center min-h-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[800px] h-[600px] bg-orange/5 rounded-full blur-3xl -top-1/2 -left-1/4" />
        <div className="absolute w-[600px] h-[600px] bg-dark-green/10 rounded-full blur-3xl bottom-0 right-0" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] border border-dark-green/10 bg-white/40 backdrop-blur-xl p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* 공연 예매 가능 시간 badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-xs font-bold text-orange relative z-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>공연 예매 가능 시간</span>
          </motion.div>

          <div className="flex items-center gap-1 md:gap-4 relative z-10">
            <TimeUnit value={time?.days ?? 0} label="Days" />
            <div className="flex flex-col items-center justify-center pb-4 md:pb-6">
              <span className="text-lg md:text-4xl font-light text-dark-green/40 animate-pulse">:</span>
            </div>
            <TimeUnit value={time?.hours ?? 0} label="Hours" />
            <div className="flex flex-col items-center justify-center pb-4 md:pb-6">
              <span className="text-lg md:text-4xl font-light text-dark-green/40 animate-pulse">:</span>
            </div>
            <TimeUnit value={time?.minutes ?? 0} label="Minutes" />
            <div className="flex flex-col items-center justify-center pb-4 md:pb-6">
              <span className="text-lg md:text-4xl font-light text-dark-green/40 animate-pulse">:</span>
            </div>
            <TimeUnit value={time?.seconds ?? 0} label="Seconds" />
          </div>

          {/* 'BUY A TICKET' button right below the timer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 mb-6 md:mb-10 animate-pulse hover:animate-none"
          >
            <a 
              href="https://ticket.melon.com/performance/index.htm?prodId=213274"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange text-white font-bold hover:bg-orange/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange/20"
            >
              <span>BUY A TICKET</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          
          <div className="flex flex-col items-center gap-4 relative z-10 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-balance text-dark-green">
              무료 승차권 이벤트
            </h2>
            
            <div className="text-dark-green/70 text-base md:text-lg max-w-xl font-medium leading-relaxed w-full">
              <span className="block sm:hidden whitespace-pre-line text-center">
                {"'나의 음악 감상 유형 테스트'를\n진행하여 결과하면 캡쳐 사진과\n함께 @musictrain999\n태그한 뒤 스토리 게시하면\n추첨을 통해 총 3분께\n2매씩 '음악철도 999'\n승차권을 드립니다!"}
              </span>
              <span className="hidden sm:block whitespace-pre-line text-center">
                {"'나의 음악 감상 유형 테스트'를 진행하여 결과화면 캡쳐 사진과 함께 @musictrain999 태그한 뒤 스토리 게시하면 추첨을 통해\n총 3분께 2매씩 '음악철도 999' 승차권을 드립니다!"}
              </span>
            </div>
            
            <p className="text-dark-green text-sm md:text-base font-extrabold whitespace-pre-line mt-2 text-center w-full">
              <span className="block sm:hidden">
                {"📅 참여 기간 : 6월 14일까지\n✅ @musictrain999\n인스타그램 팔로우 필수"}
              </span>
              <span className="hidden sm:block">
                {"📅 참여 기간 : 6월 14일까지\n📸 @musictrain999 팔로우 필수"}
              </span>
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-10"
          >
            <a 
              href="https://smore.im/quiz/XqtALlTSiQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange text-white font-bold hover:bg-orange/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange/20"
            >
              <span className="block sm:hidden text-center leading-tight">
                나의 음악 감상<br />유형 테스트
              </span>
              <span className="hidden sm:block">나의 음악 감상 유형 테스트</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#18261D] text-white font-bold">
              <Clock className="w-4 h-4 text-[#FDF3DC] shrink-0" />
              <span>
                <span className="block sm:hidden text-center leading-tight">
                  6월 15일<br />추첨 예정
                </span>
                <span className="hidden sm:block">6월 15일 추첨 예정</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
