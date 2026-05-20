import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

// --- SYNTHESIZED SOUND EFFECTS ENGINE USING WEB AUDIO API ---
const playClickSound = (type: 'hover' | 'click' | 'sync') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'sync') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(150, now);
      osc1.frequency.exponentialRampToValueAtTime(600, now + 0.4);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(250, now);
      osc2.frequency.exponentialRampToValueAtTime(900, now + 0.4);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    }
  } catch (e) {
    console.warn("Audio Context deactivated.", e);
  }
};

// --- DATA DEFINITIONS ---
const skillsData = [
  { name: "Full Stack Developer", code: "SYS.DEV", query: "what is full stack developer" },
  { name: "Java", code: "LANG.JV", query: "why is java" },
  { name: "Python", code: "LANG.PY", query: "why is python" },
  { name: "DSA", code: "ALGO.DS", query: "why is dsa" }
];

// --- HIGH PERFORMANCE STARDUST PARTICLE BACKGROUND ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  distanceFromCenter: number;
}

interface ClickCircle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  gravityMode: 'FREE_FLOW' | 'SOLAR_ORBIT' | 'SPIRAL_GALAXY';
}

const ParticleBackground = ({ gravityMode }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, px: 0, py: 0 });
  const clickCirclesRef = useRef<ClickCircle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particleCount = 200;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = e.clientX - mouse.px;
      mouse.vy = e.clientY - mouse.py;
      mouse.px = mouse.x = e.clientX;
      mouse.py = mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleCanvasClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.closest('.cursor-pointer')
      ) {
        return;
      }
      clickCirclesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 180,
        opacity: 0.8
      });
      playClickSound('sync');
    };
    window.addEventListener('click', handleCanvasClick);

    const colors = ["#8a9597", "#cbd5e1", "#ff5f1f", "#00f0ff"];
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distanceFromCenter = 50 + Math.random() * Math.min(width, height) * 0.45;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        baseX: width / 2 + Math.cos(angle) * distanceFromCenter,
        baseY: height / 2 + Math.sin(angle) * distanceFromCenter,
        size: Math.random() * 2 + 0.8,
        color,
        angle,
        speed: 0.003 + Math.random() * 0.006,
        distanceFromCenter
      };
    });

    const drawFrame = () => {
      ctx.fillStyle = "rgba(2, 2, 5, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const clickCircles = clickCirclesRef.current;

      // Draw click shockwaves
      for (let i = clickCircles.length - 1; i >= 0; i--) {
        const circle = clickCircles[i];
        circle.radius += 8;
        circle.opacity -= 0.04;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 95, 31, ${circle.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (circle.opacity <= 0) {
          clickCircles.splice(i, 1);
        }
      }

      // Physics stardust updates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (gravityMode === "FREE_FLOW") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 250) {
            const force = (250 - dist) / 2500;
            p.vx += (dx / dist) * force * 0.75;
            p.vy += (dy / dist) * force * 0.75;
            p.vx *= 0.96;
            p.vy *= 0.96;
          }
        } else if (gravityMode === "SOLAR_ORBIT") {
          p.angle += p.speed;
          const targetX = centerX + Math.cos(p.angle) * p.distanceFromCenter;
          const targetY = centerY + Math.sin(p.angle) * p.distanceFromCenter;
          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;
        } else if (gravityMode === "SPIRAL_GALAXY") {
          p.angle += p.speed * 2.5;
          const orbitRadius = p.distanceFromCenter * (1 - Math.sin(p.angle * 0.15) * 0.2);
          const targetX = centerX + Math.cos(p.angle) * Math.log(1 + p.angle) * (orbitRadius * 0.45);
          const targetY = centerY + Math.sin(p.angle) * Math.log(1 + p.angle) * (orbitRadius * 0.45);
          p.x += (targetX - p.x) * 0.07;
          p.y += (targetY - p.y) * 0.07;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw stardust links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p2.x - p.x, p2.y - p.y);
          if (dist < 90) {
            const alpha = ((90 - dist) / 90) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(138, 149, 151, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animFrameId);
    };
  }, [gravityMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block bg-[#020205]" />;
};

// --- INITIALS NAME PART REVEAL CARD ---
interface NamePartProps {
  letter: string;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  hoverColor: string;
}

const NamePart = ({ letter, active, onActivate, onDeactivate, hoverColor }: NamePartProps) => {
  const triggerHover = () => playClickSound('hover');

  return (
    <motion.div
      onMouseEnter={() => {
        onActivate();
        triggerHover();
      }}
      onMouseLeave={onDeactivate}
      className="group relative inline-flex items-center justify-center cursor-pointer select-none"
    >
      <span
        className={`relative z-10 inline-flex h-16 md:h-20 w-16 md:w-20 items-center justify-center border font-mono font-black uppercase text-2xl md:text-4xl transition-all duration-500 rounded-none ${
          active
            ? "bg-white/10 text-white"
            : "border-white/30 bg-transparent text-white/40 group-hover:text-white font-mono"
        }`}
        style={{
          borderColor: active ? hoverColor : "rgba(255, 255, 255, 0.3)",
          boxShadow: active ? `0 0 25px ${hoverColor}40` : "none"
        }}
      >
        <span>{letter}</span>
        {!active && (
          <span className="absolute bottom-1 right-1.5 text-[5.5px] text-white/35 tracking-normal group-hover:text-white/50 font-bold font-mono select-none">
            {`0x${letter.charCodeAt(0).toString(16).toUpperCase()}`}
          </span>
        )}
        <span
          className="absolute top-0.5 left-0.5 w-1 h-[1px] bg-white/40 transition-colors duration-300"
          style={{ backgroundColor: active ? hoverColor : undefined }}
        />
        <span
          className="absolute top-0.5 left-0.5 w-[1px] h-1 bg-white/40 transition-colors duration-300"
          style={{ backgroundColor: active ? hoverColor : undefined }}
        />
        <span
          className="absolute bottom-0.5 right-0.5 w-1 h-[1px] bg-white/40 transition-colors duration-300"
          style={{ backgroundColor: active ? hoverColor : undefined }}
        />
        <span
          className="absolute bottom-0.5 right-0.5 w-[1px] h-1 bg-white/40 transition-colors duration-300"
          style={{ backgroundColor: active ? hoverColor : undefined }}
        />
      </span>
    </motion.div>
  );
};

// --- DYNAMIC FREE DRAGGABLE HUD CLOCK WIDGET ---
interface HUDClockProps {
  constraintsRef: React.RefObject<HTMLDivElement>;
}

const HUDClock = ({ constraintsRef }: HUDClockProps) => {
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    let animId: number;
    const update = () => {
      setTime(new Date());
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("hud-clock-pos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        x.set(parsed.x);
        y.set(parsed.y);
      } catch (err) {
        console.error("Failed to load saved clock position:", err);
      }
    }
  }, [x, y]);

  const hrs = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();
  const ms = time.getMilliseconds();

  const hrs12 = hrs % 12 === 0 ? 12 : hrs % 12;
  const ampm = hrs >= 12 ? "PM" : "AM";

  const secDeg = secs * 6 + ms * 0.006;
  const minDeg = mins * 6 + secs * 0.1;
  const hrDeg = (hrs % 12) * 30 + mins * 0.5;

  const pad = (num: number, size = 2) => {
    let s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
  };

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayName = days[time.getDay()];
  const dateVal = time.getDate();
  const monthName = months[time.getMonth()];
  const yearVal = time.getFullYear();
  const dateStr = `${dayName} ${pad(dateVal)} ${monthName} ${yearVal}`;

  return (
    <motion.div
      drag={true}
      dragConstraints={constraintsRef}
      dragMomentum={true}
      dragElastic={0.22}
      style={{ x, y }}
      onDragEnd={() => {
        localStorage.setItem("hud-clock-pos", JSON.stringify({
          x: x.get(),
          y: y.get()
        }));
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.22, // Enhanced micro-interactive hover zoom!
        borderColor: "rgba(0, 240, 255, 0.85)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-[calc(100%-15rem)] md:left-[calc(100%-16.5rem)] top-[30%] md:top-[40%] z-30 group flex flex-col items-center gap-4 bg-zinc-950/95 border-2 border-zinc-700 p-5 rounded-none shadow-[0_15px_45px_rgba(0,0,0,0.85)] select-none w-56 pointer-events-auto backdrop-blur-md cursor-grab active:cursor-grabbing hover:shadow-[0_0_35px_rgba(0,240,255,0.25)] transition-all duration-300"
    >
      {/* Analog clock dial face - "Simply Empty" (No dots or markers) */}
      <div className="relative w-28 h-28 rounded-full border-[4px] border-zinc-900 flex items-center justify-center bg-[#09090b] shadow-[inset_0_0_18px_rgba(0,0,0,0.95),_0_0_12px_rgba(0,0,0,0.5)]">
        {/* Hour Hand */}
        <div
          style={{ transform: `rotate(${hrDeg}deg)` }}
          className="absolute bottom-1/2 left-1/2 w-[3.5px] h-7 bg-white origin-bottom -ml-[1.75px] rounded-t-sm shadow-[0_0_4px_rgba(255,255,255,0.4)]"
        />
        {/* Minute Hand */}
        <div
          style={{ transform: `rotate(${minDeg}deg)` }}
          className="absolute bottom-1/2 left-1/2 w-[2px] h-10 bg-white/90 origin-bottom -ml-[1px] rounded-t-sm shadow-[0_0_4px_rgba(255,255,255,0.3)]"
        />
        {/* Second Hand (Neon Cyber Orange Sweep) */}
        <div
          style={{ transform: `rotate(${secDeg}deg)` }}
          className="absolute bottom-1/2 left-1/2 w-[1px] h-11 bg-[#ff5f1f] origin-bottom -ml-[0.5px] shadow-[0_0_5px_rgba(255,95,31,0.55)]"
        />
        {/* Pivot Center Point */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] border-2 border-zinc-950" />
      </div>

      {/* Digital clock & badge readouts */}
      <div className="flex flex-col items-center gap-3 w-full font-mono">
        <div
          className={`flex items-baseline font-extrabold tracking-widest text-white justify-center transition-all duration-300 ${
            isHovered ? "text-[24px]" : "text-[20px]"
          }`}
        >
          <span className="text-white">{pad(hrs12)}</span>
          <span className="text-white/40 px-[0.5px] animate-pulse">:</span>
          <span className="text-white/95">{pad(mins)}</span>
          <span className="text-white/40 px-[0.5px] animate-pulse">:</span>
          <span className="text-cyan-300">{pad(secs)}</span>
          <span className="text-white/45 px-[0.5px]">:</span>
          <span
            className="text-cyan-400 w-7 text-left transition-all duration-300"
            style={{ fontSize: isHovered ? "15px" : "12px" }}
          >
            {pad(ms, 3)}
          </span>
        </div>

        {/* Date badge */}
        <div
          className={`font-extrabold text-cyan-300 bg-cyan-300/10 px-4 py-1.5 border border-cyan-300/35 uppercase text-center transition-all duration-300 ${
            isHovered ? "text-[12.5px] tracking-[0.14em] px-4.5" : "text-[11.5px] tracking-wider"
          }`}
        >
          {dateStr}
        </div>

        {/* AM/PM indicator */}
        <div className="text-[10px] font-extrabold tracking-widest text-[#ff5f1f] bg-[#ff5f1f]/10 px-4 py-1 border border-[#ff5f1f]/35 uppercase">
          {ampm}
        </div>

        <div className="h-px w-full bg-white/10 mt-1.5" />
        <div className="text-[6px] text-white/25 uppercase tracking-widest mt-0.5 group-hover:text-white/60 transition-colors">
          [DRAG TO MOVE]
        </div>
      </div>
    </motion.div>
  );
};

// --- CORE HOME COMPONENT ---
const Home = () => {
  const [activeReveal, setActiveReveal] = useState<'yadavaram' | 'neraniki' | null>(null);
  const [gravityMode, setGravityMode] = useState<'FREE_FLOW' | 'SOLAR_ORBIT' | 'SPIRAL_GALAXY'>("FREE_FLOW");
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const vectorElement = document.getElementById("hud-mouse-vector");
    
    const handleMouseMove = (e: MouseEvent) => {
      if (vectorElement) {
        vectorElement.textContent = `VECTOR: [X_${e.clientX} // Y_${e.clientY}]`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleGravity = () => {
    setGravityMode(prev => 
      prev === "FREE_FLOW" ? "SOLAR_ORBIT" : 
      prev === "SOLAR_ORBIT" ? "SPIRAL_GALAXY" : "FREE_FLOW"
    );
  };

  const handleSkillCardClick = (query: string) => {
    playClickSound("click");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <main
      ref={mainRef}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#020205] text-white"
    >
      {/* Particle Swarm Background */}
      <ParticleBackground gravityMode={gravityMode} />

      {/* Clock HUD Widget */}
      {mounted && mainRef.current && (
        <HUDClock constraintsRef={mainRef} />
      )}

      {/* Border HUD Diagnostic Framing */}
      <div className="absolute inset-x-8 inset-y-6 pointer-events-none z-10 hidden md:block">
        {/* Top telemetry line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/20 flex items-center justify-between text-[7px] font-mono font-bold tracking-[0.25em] text-white/45 uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEM_NODE // RENDER_ACTIVE</span>
          </div>
          <div className="text-cyan-400">GRAVITY_SYNC: {gravityMode}</div>
          <div id="hud-mouse-vector">VECTOR: [X_0 // Y_0]</div>
        </div>

        {/* Left vertical border */}
        <div className="absolute left-0 top-10 bottom-10 w-px bg-white/20 flex flex-col justify-between items-center py-6 text-white/35">
          <div className="text-[6px] font-mono tracking-widest -rotate-90 whitespace-nowrap mb-6">
            PHYSICS.ENERGY.SYS
          </div>
          <div className="relative h-10 w-10 border border-white/25 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }}>
            <div className="absolute top-0.5 h-1.5 w-[1px] bg-cyan-400" />
            <div className="absolute h-px w-2 bg-white/30" />
          </div>
          <div className="text-[6px] font-mono tracking-widest rotate-90 whitespace-nowrap mt-6">
            SECTOR_026
          </div>
        </div>

        {/* Right vertical border */}
        <div className="absolute right-0 top-10 bottom-10 w-px bg-white/20 flex flex-col justify-between items-center py-6 text-white/35">
          <span className="text-[6px] font-mono select-none">SCALE: [1.2]</span>
          <span className="text-[6px] font-mono select-none">FPS: 60Hz</span>
        </div>

        {/* Bottom telemetry line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 flex items-center justify-between text-[7px] font-mono font-bold tracking-[0.2em] text-white/50 uppercase">
          <div>[HOVER INITIAL NODES FOR FULL REVEAL]</div>
          <div>ESTABLISHED SECURE SECTOR NODE PORTAL</div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center px-6 py-14">
        <div className="w-full flex flex-col items-center gap-14">
          
          {/* Header & Initial Hover reveal block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 relative z-30"
          >
            <div className="relative text-center flex items-center justify-center w-full min-h-[160px] md:min-h-[220px]">
              {/* Massive blur backdrops */}
              <AnimatePresence mode="wait">
                {activeReveal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(15px)", y: 15 }}
                    animate={{ opacity: 0.65, scale: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)", y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    key={activeReveal}
                  >
                    <h1
                      style={{
                        WebkitTextStroke: activeReveal === "yadavaram" ? "5px #ff5f1f" : "5px #00f0ff",
                        textShadow: activeReveal === "yadavaram"
                          ? "0 0 60px rgba(255, 95, 31, 0.7), 0 0 20px rgba(255, 95, 31, 0.4)"
                          : "0 0 60px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.4)",
                        fontSize: "clamp(2.5rem, 11vw, 8.5rem)",
                        letterSpacing: "0.15em",
                        color: activeReveal === "yadavaram" ? "#ff5f1f" : "#00f0ff"
                      }}
                      className="font-black uppercase tracking-widest whitespace-nowrap drop-shadow-2xl font-sans"
                    >
                      {activeReveal === "yadavaram" ? "YADAVARAM" : "NERANIKI"}
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arjun and initials brackets */}
              <h1 className="relative z-10 editorial-title text-6xl md:text-8xl lg:text-[104px] font-black uppercase leading-none tracking-tight flex flex-wrap items-center justify-center gap-x-6 gap-y-2 select-none">
                <span className="arjun-title-glow pr-2">Arjun</span>
                <span className="inline-flex gap-2">
                  <NamePart
                    letter="Y"
                    active={activeReveal === "yadavaram"}
                    onActivate={() => setActiveReveal("yadavaram")}
                    onDeactivate={() => setActiveReveal(null)}
                    hoverColor="#ff5f1f"
                  />
                  <NamePart
                    letter="N"
                    active={activeReveal === "neraniki"}
                    onActivate={() => setActiveReveal("neraniki")}
                    onDeactivate={() => setActiveReveal(null)}
                    hoverColor="#00f0ff"
                  />
                </span>
              </h1>
            </div>

            <div className="h-[1px] w-24 bg-white/20 mt-4" />
            
            <div className="text-[10px] font-mono font-bold tracking-[0.45em] text-white/50 uppercase mt-2">
              Generative Art Portfolio
            </div>
          </motion.div>

          {/* Interactive gravity switcher pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col items-center gap-3 select-none z-20 cursor-pointer"
            onClick={toggleGravity}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-4 border border-white/30 bg-black/60 px-6 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:border-cyan-400/40 transition-colors"
            >
              <div className="flex flex-col font-mono text-[9px] font-bold text-left tracking-widest gap-0.5">
                <span className="text-white/30 text-[7.5px]">GRAVITY_sync_ENGINE</span>
                <span className="text-cyan-300">ACTIVE: {gravityMode}</span>
              </div>
              <div className="h-6 w-[1.5px] bg-white/25" />
              
              <div className="flex items-center gap-1.5">
                <div
                  className={`h-2 w-2 rounded-full ${
                    gravityMode === "FREE_FLOW" ? "bg-cyan-400 shadow-[0_0_8px_#00f0ff]" : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-2 w-2 rounded-full ${
                    gravityMode === "SOLAR_ORBIT" ? "bg-[#ff5f1f] shadow-[0_0_8px_#ff5f1f]" : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-2 w-2 rounded-full ${
                    gravityMode === "SPIRAL_GALAXY" ? "bg-cyan-400 shadow-[0_0_8px_#00f0ff]" : "bg-white/20"
                  }`}
                />
              </div>
            </motion.div>
            <span className="text-[7.5px] font-mono tracking-widest text-white/30 uppercase">
              [TAP CONTROLLER TO SWITCH SYSTEM GRAVITY]
            </span>
          </motion.div>

          {/* Skill card nodes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="z-30 w-full max-w-4xl px-4 mt-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsData.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkillCardClick(skill.query);
                  }}
                  className="group relative rounded-none border border-white/20 bg-[#07070d]/65 p-4 flex flex-col justify-between h-[105px] cursor-pointer hover:border-cyan-400/40 hover:bg-black/90 shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-all duration-300 select-none"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 group-hover:opacity-100"
                      style={{
                        animation: "laserSweep 2s linear infinite"
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[7px] font-mono font-bold tracking-wider text-white/25">
                    <span>{skill.code}</span>
                    <span className="text-cyan-400/60 group-hover:text-cyan-400">[SEARCH_SYS]</span>
                  </div>
                  <div className="text-sm font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition-colors">
                    {skill.name}
                  </div>
                  <div className="mt-2.5 flex flex-col gap-1">
                    <div className="h-[3px] w-full bg-white/5 rounded-none overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: "84%" }}
                        transition={{ delay: 0.1 * i, duration: 1.1 }}
                      />
                    </div>
                    <span className="text-[6px] font-mono text-white/20 select-none group-hover:text-pink-500/60 transition-colors uppercase">
                      CLICK FOR DICTIONARY SEARCH
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Home;