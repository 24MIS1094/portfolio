import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- INDIAN CLASSICAL SWARAS FREQUENCIES ---
const SWARAS = {
  sa: 261.63,   // Shadj (C4)
  ri: 293.66,   // Rishabh (D4)
  ga: 329.63,   // Gandhar (E4)
  ma: 349.23,   // Madhyam (F4)
  pa: 392.00,   // Pancham (G4)
  dha: 440.00,  // Dhaivat (A4)
  ni: 493.88,   // Nishad (B4)
  sa2: 523.25   // High Shadj (C5)
};

// --- INDIAN CLASSICAL SWARA SOUND EFFECTS SYNTHESIS ENGINE ---
const playSwaraTone = (freq: number, type: OscillatorType = 'sine', duration: number = 0.35, delay: number = 0, volume: number = 0.08) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    
    // Smooth chime envelope structure
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration + 0.05);
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
};

const playSkillChime = (index: number) => {
  // Play beautiful rising Swara dyads depending on index
  if (index === 0) {
    playSwaraTone(SWARAS.sa, 'sine', 0.42, 0.00, 0.06);
    playSwaraTone(SWARAS.ga, 'sine', 0.48, 0.07, 0.06);
  } else if (index === 1) {
    playSwaraTone(SWARAS.ri, 'sine', 0.42, 0.00, 0.06);
    playSwaraTone(SWARAS.ma, 'sine', 0.48, 0.07, 0.06);
  } else if (index === 2) {
    playSwaraTone(SWARAS.ga, 'sine', 0.42, 0.00, 0.06);
    playSwaraTone(SWARAS.pa, 'sine', 0.48, 0.07, 0.06);
  } else if (index === 3) {
    playSwaraTone(SWARAS.ma, 'sine', 0.42, 0.00, 0.06);
    playSwaraTone(SWARAS.dha, 'sine', 0.48, 0.07, 0.06);
  } else {
    playSwaraTone(SWARAS.pa, 'sine', 0.42, 0.00, 0.06);
    playSwaraTone(SWARAS.ni, 'sine', 0.48, 0.07, 0.06);
  }
};

const skillsCategories = [
  {
    title: "Languages",
    skills: ["Java", "Python"],
    code: "LANG.SYS",
    color: "rgba(6, 182, 212, 0.4)", // Cyan
    glow: "rgba(6, 182, 212, 0.15)",
    sheen: "rgba(6, 182, 212, 0.12)",
    icon: (
      <svg className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "Backend Frameworks",
    skills: ["Flask", "Django"],
    code: "BACK.SYS",
    color: "rgba(249, 115, 22, 0.4)", // Orange
    glow: "rgba(249, 115, 22, 0.15)",
    sheen: "rgba(249, 115, 22, 0.12)",
    icon: (
      <svg className="h-8 w-8 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript", "JSP"],
    code: "FRONT.WEB",
    color: "rgba(236, 72, 153, 0.4)", // Pink
    glow: "rgba(236, 72, 153, 0.15)",
    sheen: "rgba(236, 72, 153, 0.12)",
    icon: (
      <svg className="h-8 w-8 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "Databases",
    skills: ["MySQL", "SQLite", "MongoDB"],
    code: "DATA.SYS",
    color: "rgba(34, 197, 94, 0.4)", // Green
    glow: "rgba(34, 197, 94, 0.15)",
    sheen: "rgba(34, 197, 94, 0.12)",
    icon: (
      <svg className="h-8 w-8 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub"],
    code: "TOOL.SYS",
    color: "rgba(168, 85, 247, 0.4)", // Purple
    glow: "rgba(168, 85, 247, 0.15)",
    sheen: "rgba(168, 85, 247, 0.12)",
    icon: (
      <svg className="h-8 w-8 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth 3D tilt coordinates mapping
    const rx = (x - rect.width / 2) / (rect.width / 2);
    const ry = (y - rect.height / 2) / (rect.height / 2);
    const rotateY = rx * 7;
    const rotateX = -ry * 7;
    
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <motion.main
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#020205] px-6 py-20 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative Grid Background and Glow System */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(171,0,255,0.06),transparent_40%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_100%,100%_30px,30px_100%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_38%,rgba(2,2,5,0.72)_78%,rgba(2,2,5,0.98)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header telemetry blocks */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-500/10 px-4 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-purple-300 uppercase mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>SYS.MATRIX // CAPABILITIES</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-3">
            Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Dashboard</span>
          </h1>
        </div>

        {/* 3x2 / 2-column customizable Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {skillsCategories.map((cat, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => {
                setHoveredCard(i);
                playSkillChime(i);
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={(e) => {
                handleCardMouseLeave(e);
                setHoveredCard(null);
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/30 backdrop-blur-[20px] p-6 cursor-default transition-all duration-300 flex flex-col justify-between h-[230px]"
              style={{
                transform: hoveredCard === i ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                borderColor: hoveredCard === i ? cat.color : undefined,
                boxShadow: hoveredCard === i 
                  ? `inset 0 1px 2px rgba(255,255,255,0.15), 0 0 45px ${cat.glow}, 0 20px 45px rgba(0,0,0,0.6)` 
                  : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 12px 24px rgba(0,0,0,0.4)',
                transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
              }}
            >
              {/* Radial specular sheen reflection overlay */}
              {hoveredCard === i && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-100 z-0"
                  style={{
                    background: `radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), ${cat.sheen}, transparent 85%), radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)`
                  }}
                />
              )}

              {/* Luxury colored ambient backglow */}
              <div 
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                style={{
                  background: `radial-gradient(220px circle at 50% 50%, ${cat.glow}, transparent 80%)`
                }}
              />

              {/* Laser sweeps */}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]" />

              <div className="relative z-10 flex items-start justify-between w-full">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7.5px] font-mono font-bold tracking-widest text-white/30 uppercase">{cat.code}</span>
                  <h3 className="text-xl font-extrabold uppercase text-white tracking-wider group-hover:text-white transition-colors">{cat.title}</h3>
                </div>
                
                {/* Category Icon */}
                <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20">
                  {cat.icon}
                </div>
              </div>

              {/* Dynamic Skills capsules */}
              <div className="relative z-10 flex flex-wrap gap-2.5 mt-6 w-full">
                {cat.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300 rounded-xl"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Skills;