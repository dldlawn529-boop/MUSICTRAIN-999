import React, { useEffect, useRef, useState } from 'react';

// --- Cute SVG Sticker Assets (Hand-drawn effect with die-cut white borders) ---

const StickerMusicNote1 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outline */}
    <g stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Beam */}
      <path d="M38 28 L78 18" strokeWidth="16" />
      {/* Stem 1 */}
      <path d="M38 72 L38 28" />
      {/* Stem 2 */}
      <path d="M78 62 L78 18" />
      {/* Note Head 1 (slanted ellipse) */}
      <path d="M18 72 C18 64, 30 58, 38 64 C46 70, 46 80, 38 80 C30 80, 18 80, 18 72 Z" fill="white" />
      {/* Note Head 2 (slanted ellipse) */}
      <path d="M58 62 C58 54, 70 48, 78 54 C86 60, 86 70, 78 70 C70 70, 58 70, 58 62 Z" fill="white" />
    </g>
    {/* Fill */}
    <g stroke="#1A5135" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#1A5135">
      {/* Beam */}
      <path d="M38 28 L78 18" strokeWidth="6" />
      {/* Stem 1 */}
      <path d="M38 72 L38 28" strokeWidth="6" />
      {/* Stem 2 */}
      <path d="M78 62 L78 18" strokeWidth="6" />
      {/* Note Head 1 */}
      <path d="M18 72 C18 64, 30 58, 38 64 C46 70, 46 80, 38 80 C30 80, 18 80, 18 72 Z" />
      {/* Note Head 2 */}
      <path d="M58 62 C58 54, 70 48, 78 54 C86 60, 86 70, 78 70 C70 70, 58 70, 58 62 Z" />
    </g>
  </svg>
);

const Sticker6PointStar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M50 8 L60 35 L88 30 L70 52 L85 78 L58 70 L50 92 L42 70 L15 78 L30 52 L12 30 L40 35 Z"
      fill="none"
      stroke="white"
      strokeWidth="12"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M50 8 L60 35 L88 30 L70 52 L85 78 L58 70 L50 92 L42 70 L15 78 L30 52 L12 30 L40 35 Z"
      fill="#9363FF"
      stroke="#9363FF"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const Sticker4PointSparkle = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M50 10 C50 35, 35 50, 10 50 C35 50, 50 65, 50 90 C50 65, 65 50, 90 50 C65 50, 50 35, 50 10 Z"
      fill="none"
      stroke="white"
      strokeWidth="12"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M50 10 C50 35, 35 50, 10 50 C35 50, 50 65, 50 90 C50 65, 65 50, 90 50 C65 50, 50 35, 50 10 Z"
      fill="#FF7BB0"
      stroke="#FF7BB0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const StickerTwinStars = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Big Star Outline */}
    <path
      d="M45 15 C45 35, 30 45, 10 45 C30 45, 45 55, 45 75 C45 55, 60 45, 80 45 C60 45, 45 35, 45 15 Z"
      fill="none"
      stroke="white"
      strokeWidth="12"
      strokeLinejoin="round"
    />
    {/* Small Star Outline */}
    <path
      d="M75 55 C75 65, 68 70, 58 70 C68 70, 75 75, 75 85 C75 75, 82 70, 92 70 C82 70, 75 65, 75 55 Z"
      fill="none"
      stroke="white"
      strokeWidth="10"
      strokeLinejoin="round"
    />
    {/* Big Star fill */}
    <path
      d="M45 15 C45 35, 30 45, 10 45 C30 45, 45 55, 45 75 C45 55, 60 45, 80 45 C60 45, 45 35, 45 15 Z"
      fill="#FFA52D"
    />
    {/* Small Star fill */}
    <path
      d="M75 55 C75 65, 68 70, 58 70 C68 70, 75 75, 75 85 C75 75, 82 70, 92 70 C82 70, 75 65, 75 55 Z"
      fill="#FFA52D"
    />
  </svg>
);

const StickerThickPlus = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M32 15 C32 15 68 15 68 15 C68 15 68 32 68 32 C68 32 85 32 85 32 C85 32 85 68 85 68 C85 68 68 68 68 68 C68 68 68 85 68 85 C68 85 32 85 32 85 C32 85 32 68 32 68 C32 68 15 68 15 68 C15 68 15 32 15 32 C15 32 32 32 32 32 Z"
      fill="none"
      stroke="white"
      strokeWidth="12"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M32 15 C32 15 68 15 68 15 C68 15 68 32 68 32 C68 32 85 32 85 32 C85 32 85 68 85 68 C85 68 68 68 68 68 C68 68 68 85 68 85 C68 85 32 85 32 85 C32 85 32 68 32 68 C32 68 15 68 15 68 C15 68 15 32 15 32 C15 32 32 32 32 32 Z"
      fill="#FF7BB0"
      stroke="#FF7BB0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const StickerBrownEyedSmiley = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="12" />
    <circle cx="50" cy="50" r="38" fill="#FFA52D" />
    {/* Left Eye */}
    <path d="M38 38 L34 46" stroke="#4d2f13" strokeWidth="6" strokeLinecap="round" />
    {/* Right Eye */}
    <path d="M62 42 L68 42" stroke="#4d2f13" strokeWidth="6" strokeLinecap="round" />
    {/* Smiling mouth */}
    <path
      d="M32 54 C 35 68, 65 68, 68 54"
      fill="none"
      stroke="#E11D48"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

const StickerOrangeSwirl = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M30 45 C30 25, 60 20, 65 38 C70 56, 40 68, 38 52 C36 36, 68 36, 75 58 C80 75, 48 85, 32 72"
      fill="none"
      stroke="white"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 45 C30 25, 60 20, 65 38 C70 56, 40 68, 38 52 C36 36, 68 36, 75 58 C80 75, 48 85, 32 72"
      fill="none"
      stroke="#EA7640"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StickerDogPaw = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outline */}
    <g stroke="white" strokeWidth="12" strokeLinejoin="round" fill="none">
      <circle cx="28" cy="30" r="10" />
      <circle cx="48" cy="22" r="10" />
      <circle cx="68" cy="28" r="10" />
      <circle cx="50" cy="62" r="22" />
    </g>
    {/* Fill */}
    <g fill="#FF9F80">
      <circle cx="28" cy="30" r="10" />
      <circle cx="48" cy="22" r="10" />
      <circle cx="68" cy="28" r="10" />
      <circle cx="50" cy="62" r="22" />
    </g>
  </svg>
);

const StickerBlueEyedSmiley = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="12" />
    <circle cx="50" cy="50" r="38" fill="#FFC233" />
    {/* Blue hand-drawn eyes */}
    <circle cx="38" cy="42" r="5" fill="#1C3F60" />
    <circle cx="62" cy="42" r="5" fill="#1C3F60" />
    {/* Smiling mouth */}
    <path
      d="M34 56 C 40 66, 60 66, 66 56"
      fill="none"
      stroke="#1C3F60"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

const StickerMusicNote2 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outline */}
    <g stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Stem */}
      <path d="M58 70 L58 25" />
      {/* Flag */}
      <path d="M58 25 C58 25, 76 34, 76 46 C76 56, 68 54, 68 54" />
      {/* Note Head (slanted ellipse) */}
      <path d="M38 70 C38 62, 50 56, 58 62 C66 68, 66 78, 58 78 C50 78, 38 78, 38 70 Z" fill="white" />
    </g>
    {/* Fill */}
    <g stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#38BDF8">
      {/* Stem */}
      <path d="M58 70 L58 25" strokeWidth="6" />
      {/* Flag */}
      <path d="M58 25 C58 25, 76 34, 76 46 C76 56, 68 54, 68 54" strokeWidth="6" />
      {/* Note Head */}
      <path d="M38 70 C38 62, 50 56, 58 62 C66 68, 66 78, 58 78 C50 78, 38 78, 38 70 Z" />
    </g>
  </svg>
);

// List of available sticker templates
const stickerTemplates = [
  StickerMusicNote1,
  Sticker6PointStar,
  Sticker4PointSparkle,
  StickerTwinStars,
  StickerDogPaw,
  StickerBlueEyedSmiley,
  StickerMusicNote2,
];

interface PhysicsObject {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  size: number;
  mass: number;
  isDragging: boolean;
  Component: React.ComponentType;
}

export const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objects, setObjects] = useState<PhysicsObject[]>([]);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const isDraggingAnyRef = useRef<boolean>(false);

  // Drag tracking refs
  const dragInfoRef = useRef<{
    objectId: number | null;
    pointerId: number | null;
    offsetX: number;
    offsetY: number;
    lastPointerX: number;
    lastPointerY: number;
    lastTime: number;
  }>({
    objectId: null,
    pointerId: null,
    offsetX: 0,
    offsetY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastTime: 0,
  });

  // Initialize objects once container size is known
  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const size = isMobile ? 70 : 100;

    const initialObjects: PhysicsObject[] = stickerTemplates.map((Template, idx) => {
      // Randomly space objects across the screen, away from the extreme boundaries
      const padding = size;
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + Math.random() * (height - padding * 2);

      // Random starting velocities
      const speed = isMobile ? 0.7 : 1.1;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        id: idx,
        x,
        y,
        vx,
        vy,
        angle: Math.random() * 360,
        angularVelocity: (Math.random() - 0.5) * 1.5,
        size,
        mass: size * size, // Mass proportional to area/size
        isDragging: false,
        Component: Template,
      };
    });

    objectsRef.current = initialObjects;
    setObjects([...initialObjects]);
  }, []);

  // Responsive boundary correction on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const newSize = isMobile ? 70 : 100;

      objectsRef.current = objectsRef.current.map((obj) => {
        const radius = newSize / 2;
        // Keep inside bounds
        const x = Math.max(radius, Math.min(width - radius, obj.x));
        const y = Math.max(radius, Math.min(height - radius, obj.y));
        return {
          ...obj,
          x,
          y,
          size: newSize,
          mass: newSize * newSize,
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main physics loop
  useEffect(() => {
    let animationId: number;

    const updatePhysics = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const time = Date.now() * 0.001;

      const items = [...objectsRef.current];

      // 1. Position and interaction force updates
      items.forEach((obj, i) => {
        if (obj.isDragging) {
          // Handled directly via pointer events to keep responsiveness perfect
          return;
        }

        // Add a small, natural floating buoyancy force (low-frequency wave)
        const fx = Math.sin(time + obj.id * 1.5) * 0.008;
        const fy = Math.cos(time + obj.id * 1.5) * 0.008;
        obj.vx += fx;
        obj.vy += fy;

        // Apply a gentle air-fricton/damping
        obj.vx *= 0.985;
        obj.vy *= 0.985;
        obj.angularVelocity *= 0.97;

        // Limit speed to keep it natural
        const speed = Math.hypot(obj.vx, obj.vy);
        const maxSpeed = 4.2;
        if (speed > maxSpeed) {
          obj.vx = (obj.vx / speed) * maxSpeed;
          obj.vy = (obj.vy / speed) * maxSpeed;
        }

        // Apply velocities to positions
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.angle += obj.angularVelocity;

        // Bouncing restitution coefficient from walls
        const restitution = 0.8;
        const radius = obj.size / 2;

        // Left Boundary
        if (obj.x - radius < 0) {
          obj.x = radius;
          obj.vx = -obj.vx * restitution;
          obj.angularVelocity += obj.vy * 0.05; // Spin naturally on impact
        }
        // Right Boundary
        else if (obj.x + radius > width) {
          obj.x = width - radius;
          obj.vx = -obj.vx * restitution;
          obj.angularVelocity -= obj.vy * 0.05;
        }

        // Top Boundary (leave some room for sticky layout navigation heights)
        if (obj.y - radius < 0) {
          obj.y = radius;
          obj.vy = -obj.vy * restitution;
          obj.angularVelocity -= obj.vx * 0.05;
        }
        // Bottom Boundary
        else if (obj.y + radius > height) {
          obj.y = height - radius;
          obj.vy = -obj.vy * restitution;
          obj.angularVelocity += obj.vx * 0.05;
        }
      });

      // 2. Resolve elastic collisions between stickers (Physics-based interaction)
      const restitution = 0.82; // standard bouncy collisions
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = (a.size + b.size) / 2;

          if (dist < minDist && dist > 1) {
            // Collision normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate overlapping elements gently
            const overlap = minDist - dist;
            // If one is being dragged, only move the non-dragged one
            if (a.isDragging && !b.isDragging) {
              b.x += nx * overlap;
              b.y += ny * overlap;
            } else if (b.isDragging && !a.isDragging) {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
            } else {
              // Share displacement equally
              a.x -= nx * overlap * 0.5;
              a.y -= ny * overlap * 0.5;
              b.x += nx * overlap * 0.5;
              b.y += ny * overlap * 0.5;
            }

            // Relative velocity
            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;

            // Relative velocity along normal
            const velAlongNormal = rvx * nx + rvy * ny;

            // Only bounce if they are moving towards each other
            if (velAlongNormal < 0) {
              const impulseScalar = -(1 + restitution) * velAlongNormal / (1 / a.mass + 1 / b.mass);

              // Apply impulse to velocities
              if (!a.isDragging) {
                a.vx -= nx * (impulseScalar / a.mass) * a.mass;
                a.vy -= ny * (impulseScalar / a.mass) * a.mass;
                a.angularVelocity -= rvy * 0.02;
              }
              if (!b.isDragging) {
                b.vx += nx * (impulseScalar / b.mass) * b.mass;
                b.vy += ny * (impulseScalar / b.mass) * b.mass;
                b.angularVelocity += rvy * 0.02;
              }
            }
          }
        }
      }

      setObjects([...items]);
      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Laser-sharp Drag Handlers using modern React pointer events (fully responsive)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, obj: PhysicsObject) => {
    e.preventDefault();
    const element = e.currentTarget;
    element.setPointerCapture(e.pointerId);

    // Track state of dragging element
    isDraggingAnyRef.current = true;
    dragInfoRef.current = {
      objectId: obj.id,
      pointerId: e.pointerId,
      offsetX: e.clientX - obj.x,
      offsetY: e.clientY - obj.y,
      lastPointerX: e.clientX,
      lastPointerY: e.clientY,
      lastTime: Date.now(),
    };

    // Update state inside reference list
    objectsRef.current = objectsRef.current.map((item) => {
      if (item.id === obj.id) {
        return { ...item, isDragging: true, vx: 0, vy: 0 };
      }
      return item;
    });
    setObjects([...objectsRef.current]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfoRef.current;
    if (info.objectId === null || info.pointerId !== e.pointerId) return;

    e.preventDefault();

    const now = Date.now();
    const dt = Math.max(1, now - info.lastTime); // Prevent divide-by-zero

    const targetX = e.clientX - info.offsetX;
    const targetY = e.clientY - info.offsetY;

    // Track instant velocity during drag to apply as inertia on drop
    const instantVx = ((e.clientX - info.lastPointerX) / dt) * 16.67; // normalize to ~60fps frames
    const instantVy = ((e.clientY - info.lastPointerY) / dt) * 16.67;

    // Update position and compute real-time trailing velocity
    objectsRef.current = objectsRef.current.map((item) => {
      if (item.id === info.objectId) {
        // Limit damping of fast dragged throws
        const vx = instantVx * 0.6 + item.vx * 0.4;
        const vy = instantVy * 0.6 + item.vy * 0.4;
        
        return {
          ...item,
          x: targetX,
          y: targetY,
          vx: Math.max(-18, Math.min(18, vx)),
          vy: Math.max(-18, Math.min(18, vy)),
          angularVelocity: vx * 0.05, // Spin directly match movement
        };
      }
      return item;
    });

    dragInfoRef.current.lastPointerX = e.clientX;
    dragInfoRef.current.lastPointerY = e.clientY;
    dragInfoRef.current.lastTime = now;

    setObjects([...objectsRef.current]);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfoRef.current;
    if (info.objectId === null || info.pointerId !== e.pointerId) return;

    e.preventDefault();
    const element = e.currentTarget;
    element.releasePointerCapture(e.pointerId);

    // End drag session, element preserves its trails/velocities computed on pointer move!
    objectsRef.current = objectsRef.current.map((item) => {
      if (item.id === info.objectId) {
        return { ...item, isDragging: false };
      }
      return item;
    });

    dragInfoRef.current = {
      objectId: null,
      pointerId: null,
      offsetX: 0,
      offsetY: 0,
      lastPointerX: 0,
      lastPointerY: 0,
      lastTime: 0,
    };
    isDraggingAnyRef.current = false;
    setObjects([...objectsRef.current]);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none z-20 pointer-events-none"
      style={{ touchAction: 'none' }}
    >
      {objects.map((obj) => (
        <div
          key={obj.id}
          onPointerDown={(e) => handlePointerDown(e, obj)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
          style={{
            width: obj.size,
            height: obj.size,
            left: obj.x - obj.size / 2,
            top: obj.y - obj.size / 2,
            transform: `rotate(${obj.angle}deg) scale(${obj.isDragging ? 1.05 : 1})`,
            zIndex: obj.isDragging ? 50 : 10 + obj.id,
            touchAction: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            filter: obj.isDragging 
              ? 'drop-shadow(8px 12px 6px rgba(15,23,18,0.22))' 
              : 'drop-shadow(4px 6px 3px rgba(15,23,18,0.15))',
            transition: obj.isDragging ? 'transform 0.05s ease-out' : 'transform 0s',
          }}
        >
          <obj.Component />
        </div>
      ))}
    </div>
  );
};
