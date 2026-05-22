import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpiderWeb from '../components/SpiderWeb';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.8 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 20 }
  }
};

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Gentle 3D tilt physics offsets
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

  const playSwaraTone = (freq: number, duration: number = 0.5) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {}
  };

  const playProjectChime = (index: number) => {
    if (index === 0) {
      // Gorgeous red chime (Sa-Ga progression)
      playSwaraTone(261.63, 0.45); // Sa
      setTimeout(() => playSwaraTone(329.63, 0.55), 70); // Ga
    } else {
      // Gorgeous cyan chime (Pa-Sa2 progression)
      playSwaraTone(392.00, 0.45); // Pa
      setTimeout(() => playSwaraTone(523.25, 0.55), 70); // Sa2
    }
  };

  return (
    <motion.main
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#050505] px-6 py-20 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.11),transparent_22%),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_100%,100%_22px,22px_100%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_38%,rgba(0,0,0,0.62)_78%,rgba(0,0,0,0.96)_100%)]" />
        <motion.div
          className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full border border-red-400/18 bg-red-500/5 shadow-[0_0_90px_rgba(255,0,60,0.18)]"
          animate={{ scale: [1, 1.03, 1], opacity: [0.48, 0.82, 0.48] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-5 rounded-full border border-white/30" />
          <div className="absolute inset-12 rounded-full border border-red-200/25" />
          <div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,0,60,0.42),rgba(0,0,0,0.08))] opacity-90 blur-sm" />
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ opacity: [0.12, 0.8, 0.12], scaleX: [0.94, 1, 0.94] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Cinematic Glass Shutter Intro */}
      <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center">
        {/* Top Shutter */}
        <motion.div 
          className="absolute top-0 w-full bg-black h-1/2"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Bottom Shutter */}
        <motion.div 
          className="absolute bottom-0 w-full bg-black h-1/2"
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Aggressive Neon Strike Line */}
        <motion.div
          className="h-[2px] bg-red-500 shadow-[0_0_30px_rgba(255,0,60,1),_0_0_60px_rgba(255,0,60,0.8)] z-50 absolute top-1/2 -translate-y-1/2"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      {/* Spider-Man Interactive Canvas Web */}
      <SpiderWeb theme="spiderman" />

      {/* Spider-Man Neon Ambient Glows */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/24 blur-[160px]"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-[170px]"></div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_38%,rgba(0,0,0,0.68)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        
        {/* Page Header Area */}
        <motion.div variants={itemVariants} className="mb-24 text-center flex flex-col items-center relative w-full h-[200px] justify-center">
          
          {/* Cinematic Massive Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1 
              style={{ 
                WebkitTextStroke: `4px #ff003c`, 
                textShadow: `0 0 120px rgba(255,0,60,0.82), 0 0 45px rgba(255,255,255,0.45)`,
                fontSize: `clamp(3rem, 15vw, 12rem)`
              }}
              className="font-black uppercase text-transparent tracking-tighter whitespace-nowrap drop-shadow-2xl opacity-30"
            >
              PROJECTS
            </h1>
          </div>

          {/* Interactive Foreground Title */}
          <div className="relative z-10 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <span className="inline-block bg-gradient-to-r from-red-600 via-white to-white bg-clip-text text-transparent">PROJECTS</span>
          </div>

          <div className="absolute -bottom-10 flex items-center justify-center gap-6 w-full opacity-70">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-white/70"></div>
            <motion.div
              className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1),_0_0_45px_rgba(255,0,60,0.9)]"
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-red-500/80"></div>
          </div>

        </motion.div>

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-12 mt-12">
          
          {/* Project 1: Neon Red Theme (Job Portal) */}
          <motion.section 
            variants={itemVariants}
            onMouseEnter={() => {
              setHoveredCard(0);
              playProjectChime(0);
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={(e) => {
              handleCardMouseLeave(e);
              setHoveredCard(null);
            }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-red-500/10 bg-zinc-950/40 backdrop-blur-[30px] p-8 md:p-10 cursor-default transition-all duration-300 perspective-glow-card"
            style={{
              borderColor: hoveredCard === 0 ? 'rgba(239, 68, 68, 0.3)' : undefined,
              boxShadow: hoveredCard === 0 
                ? 'inset 0 1px 2px rgba(255,255,255,0.15), 0 0 50px rgba(239, 68, 68, 0.15), 0 20px 45px rgba(0,0,0,0.6)' 
                : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 15px 30px rgba(0,0,0,0.4)',
              transform: hoveredCard === 0 ? 'perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
              transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* Dynamic Specular Gloss Sheen - follows cursor */}
            {hoveredCard === 0 && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), rgba(239,68,68,0.1), transparent 80%), radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)'
                }}
              />
            )}

            {/* Luxury Colored Ambient Back-glow Mesh */}
            <div 
              className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
              style={{
                background: 'radial-gradient(250px circle at 50% 50%, rgba(239,68,68,0.06), transparent 80%), linear-gradient(135deg, rgba(239,68,68,0.02) 0%, transparent 100%)'
              }}
            />

            {/* Cinematic Shutter Sweep */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-10">
              
              {/* Project Icon */}
              <div className="shrink-0 rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-red-500 shadow-[inset_0_1px_1px_rgba(255,0,60,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-red-500/10 group-hover:shadow-[0_0_40px_rgba(255,0,60,0.4)]">
                <svg className="h-14 w-14 drop-shadow-[0_0_15px_rgba(255,0,60,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="flex-1 w-full">
                <h2 className="mb-6 text-3xl md:text-4xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-red-100 transition-colors">
                  Online Job Portal Management System
                </h2>
                
                <ul className="mb-10 space-y-4 text-lg text-white/50">
                  {[
                    "Designed backend logic for robust job posting and application workflows.",
                    "Implemented secure user authentication and strict role-based access control.",
                    "Integrated MySQL for efficient, scalable data storage and fast retrieval.",
                    "Focused heavily on complex backend operations and database performance optimization."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 transition-colors duration-500 group-hover:text-white/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_10px_rgba(255,0,60,0.8)]"></span>
                      <span className="leading-relaxed tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Glass Pills */}
                <div className="flex flex-wrap gap-3">
                  {["Java", "MySQL", "Authentication", "Role-Based Access"].map((tech, i) => (
                    <div key={i} className="rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,0,60,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]">
                      <span className="text-xs font-bold tracking-widest uppercase text-red-200">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 2: Neon Cyan Theme (Temple System) */}
          <motion.section 
            variants={itemVariants}
            onMouseEnter={() => {
              setHoveredCard(1);
              playProjectChime(1);
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={(e) => {
              handleCardMouseLeave(e);
              setHoveredCard(null);
            }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-cyan-500/10 bg-zinc-950/40 backdrop-blur-[30px] p-8 md:p-10 cursor-default transition-all duration-300 perspective-glow-card"
            style={{
              borderColor: hoveredCard === 1 ? 'rgba(6, 182, 212, 0.3)' : undefined,
              boxShadow: hoveredCard === 1 
                ? 'inset 0 1px 2px rgba(255,255,255,0.15), 0 0 50px rgba(6, 182, 212, 0.15), 0 20px 45px rgba(0,0,0,0.6)' 
                : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 15px 30px rgba(0,0,0,0.4)',
              transform: hoveredCard === 1 ? 'perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
              transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* Dynamic Specular Gloss Sheen - follows cursor */}
            {hoveredCard === 1 && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), rgba(6,182,212,0.1), transparent 80%), radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)'
                }}
              />
            )}

            {/* Luxury Colored Ambient Back-glow Mesh */}
            <div 
              className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
              style={{
                background: 'radial-gradient(250px circle at 50% 50%, rgba(6,182,212,0.06), transparent 80%), linear-gradient(135deg, rgba(6,182,212,0.02) 0%, transparent 100%)'
              }}
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-10">
              
              {/* Project Icon */}
              <div className="shrink-0 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-cyan-400 shadow-[inset_0_1px_1px_rgba(0,229,255,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]">
                <svg className="h-14 w-14 drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <div className="flex-1 w-full">
                <h2 className="mb-6 text-3xl md:text-4xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-cyan-100 transition-colors">
                  Govt Endowment Temple Management
                </h2>
                
                <ul className="mb-10 space-y-4 text-lg text-white/50">
                  {[
                    "Developed an end-to-end management system for temples and priests across multiple states.",
                    "Engineered complex role-based access for Admins, Government Officials, Departments, and Priests.",
                    "Enabled highly scalable photo uploads and a portal for public temple submissions.",
                    "Built a fully responsive, secure frontend and robust backend infrastructure."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 transition-colors duration-500 group-hover:text-white/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                      <span className="leading-relaxed tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Glass Pills */}
                <div className="flex flex-wrap gap-3">
                  {["Flask", "Python", "MongoDB", "HTML5", "CSS3", "Bootstrap"].map((tech, i) => (
                    <div key={i} className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,229,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                      <span className="text-xs font-bold tracking-widest uppercase text-cyan-200">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </motion.main>
  );
};

export default Projects;