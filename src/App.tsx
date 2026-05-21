import { useState, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import VideoPlayer from './components/VideoPlayer';

// Custom high-contrast water flow loop video played in the main application shell after transition
const GLOBAL_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4';

// --- STAR STRUCTURE FOR 3D ENGINE ---
interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  color: string;
}

// --- ULTRA-CINEMATIC 3D STARFIELD HYPERSPACE WARP CANVAS ENGINE ---
const StarfieldCanvas = ({ isWarping }: { isWarping: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 }); // Butter smooth interpolation coordinates

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor between -1 and 1
      mouseRef.current.tx = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.ty = (e.clientY - height / 2) / (height / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.tx = (e.touches[0].clientX - width / 2) / (width / 2);
        mouseRef.current.ty = (e.touches[0].clientY - height / 2) / (height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Coordinate mapping & particle setup
    const maxDepth = 1000;
    const starCount = 220;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2.8,
      y: (Math.random() - 0.5) * height * 2.8,
      z: Math.random() * maxDepth,
      px: 0,
      py: 0,
      color: ['#00f0ff', '#ff007f', '#ab00ff', '#ffffff', '#00f0ff'][Math.floor(Math.random() * 5)]
    }));

    const draw = () => {
      // Premium long-tail canvas fade motion blur (creates gorgeous trails at warp speeds)
      ctx.fillStyle = isWarping ? 'rgba(2, 1, 8, 0.04)' : 'rgba(2, 1, 8, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Interpolate parallax offsets for buttery smooth camera swings
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;

      const fov = 390;
      const speed = isWarping ? 55 : 2.5;

      const centerX = width / 2 + mouseRef.current.x * 45;
      const centerY = height / 2 + mouseRef.current.y * 45;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        
        // Dynamic Radial Suction & Z-movement
        s.z -= speed;

        if (s.z <= 0) {
          s.z = maxDepth;
          s.x = (Math.random() - 0.5) * width * 2.8;
          s.y = (Math.random() - 0.5) * height * 2.8;
          s.px = 0;
          s.py = 0;
          continue;
        }

        // Project 3D coordinate map down into 2D cartesian space
        const sx = (s.x / s.z) * fov + centerX;
        const sy = (s.y / s.z) * fov + centerY;

        // If star has valid previous coordinates, render the line streak
        if (s.px !== 0 && s.py !== 0 && sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(sx, sy);
          
          // Glowing elements grow brighter and thicker as they fly closer
          const alpha = 1 - s.z / maxDepth;
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = alpha * (isWarping ? 1.0 : 0.8);
          ctx.lineWidth = (1 - s.z / maxDepth) * (isWarping ? 4.5 : 2.2) + 0.5;
          ctx.stroke();
        }

        s.px = sx;
        s.py = sy;
      }

      // Add a subtle central glow to represent the core singularity portal
      const singularityGlow = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, isWarping ? 250 : 120
      );
      singularityGlow.addColorStop(0, isWarping ? 'rgba(255, 0, 127, 0.18)' : 'rgba(0, 240, 255, 0.12)');
      singularityGlow.addColorStop(0.5, 'rgba(171, 0, 255, 0.03)');
      singularityGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = singularityGlow;
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.arc(centerX, centerY, isWarping ? 250 : 120, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [isWarping]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block bg-[#020108]" />;
};

// --- DYNAMIC OSCILLOSCOPE FREQUENCY ANALYZER COMPONENT (Right Panel) ---
const OscilloscopePanel = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid line mesh
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw mathematical fluctuating sine wave
      ctx.beginPath();
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 1.25;
      ctx.globalAlpha = 0.75;
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.sin(x * 0.05 + phase) * 11 + 
          Math.sin(x * 0.12 - phase * 1.6) * 4;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary mirror cyan wave
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 0.85;
      ctx.globalAlpha = 0.55;
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.cos(x * 0.06 - phase * 1.2) * 9 + 
          Math.sin(x * 0.09 + phase * 0.8) * 3;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.065;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={180} height={50} className="w-full h-[50px] border border-white/[0.06] bg-black/55 rounded-lg" />;
};

// --- DYNAMIC CASCADING LOG DIAGNOSTICS (Left Panel) ---
const DiagnosticsPanel = () => {
  const [logs, setLogs] = useState<string[]>([
    "BOOT.SYS: VERIFYING ENGINES",
    "MEM.SECTOR: READY ON PORT 026",
    "SINGULARITY HYPERDRIVE: ONLINE",
    "QUANTUM CORE LOCK: SECURED"
  ]);

  useEffect(() => {
    const list = [
      "CORE FREQ: STABLE AT 5.9GHz",
      "SYS.STACK: ALLOCATED 0x7FFF",
      "NET.LATENCY: 0.18ms SECURE",
      "WARP.ENGINE: ACCEL READY",
      "CONSOLE STATE: SECTOR_026",
      "EST.BDG: STABLE NODE",
      "CYBER.LOCK: ENCRYPTED CORE"
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1), list[Math.floor(Math.random() * list.length)]];
        return next;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 text-[7px] md:text-[8px] font-mono leading-relaxed">
      {logs.map((log, index) => (
        <div key={index} className="flex items-center gap-1.5 justify-between">
          <span className="text-cyan-400/85 truncate">{log}</span>
          <span className="text-white/30 text-[6px]">OK</span>
        </div>
      ))}
    </div>
  );
};

// --- CORE APP SHELL ---
const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const location = useLocation();

  // Cinema framing and forced-portrait lock removed to restore normal responsive mobile behavior

  // Track cursor position dynamically for custom targeting cursor reticle
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Premium synthesized spatial/hyperspace-warp sound sweep via Web Audio API
  const playEpicSynth = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Master compression glue (for physical loudness)
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, now);
      compressor.knee.setValueAtTime(8, now);
      compressor.ratio.setValueAtTime(12, now);
      compressor.attack.setValueAtTime(0.003, now);
      compressor.release.setValueAtTime(0.24, now);
      compressor.connect(ctx.destination);

      // Cinema loop delay and stereo space
      const delayNode = ctx.createDelay();
      delayNode.delayTime.setValueAtTime(0.25, now);
      const delayFeedback = ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.44, now);
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1300, now);
      
      delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayFeedback.connect(compressor);

      // PHASE 1: HYPERDRIVE TURBOCHARGE ENGINE WHINE (Exponential Pitch Sweep UP)
      const pitchOsc = ctx.createOscillator();
      const pitchGain = ctx.createGain();
      const pitchFilter = ctx.createBiquadFilter();
      
      pitchOsc.type = 'sawtooth';
      pitchOsc.frequency.setValueAtTime(75, now);
      // Sweeps rapidly to simulate warp drive spooling up
      pitchOsc.frequency.exponentialRampToValueAtTime(5800, now + 0.75);
      
      pitchFilter.type = 'lowpass';
      pitchFilter.frequency.setValueAtTime(320, now);
      pitchFilter.frequency.exponentialRampToValueAtTime(4500, now + 0.7);

      pitchGain.gain.setValueAtTime(0.001, now);
      pitchGain.gain.linearRampToValueAtTime(0.26, now + 0.35);
      pitchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      pitchOsc.connect(pitchFilter);
      pitchFilter.connect(pitchGain);
      pitchGain.connect(compressor);

      pitchOsc.start(now);
      pitchOsc.stop(now + 0.85);

      // PHASE 2: THUNDERING SUB-BASS IMPACT DROPDOWN
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(140, now + 0.32);
      subOsc.frequency.exponentialRampToValueAtTime(22, now + 2.5); // Warm sub-bass rumble

      subGain.gain.setValueAtTime(0.001, now + 0.32);
      subGain.gain.linearRampToValueAtTime(0.85, now + 0.42); // massive thump impact
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0); // smooth release

      subOsc.connect(subGain);
      subGain.connect(compressor);

      subOsc.start(now + 0.32);
      subOsc.stop(now + 3.1);

      // PHASE 3: DETUNED IMAX STELLAR CHORD SWELL (E-Major 9th Spatial Pad)
      const chordFrequencies = [82.41, 164.81, 246.94, 329.63, 493.88, 659.25, 987.77];
      chordFrequencies.forEach((baseFreq, index) => {
        [-5, 5].forEach((detuneVal) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = index < 3 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(baseFreq, now + 0.22);
          osc.detune.setValueAtTime(detuneVal, now + 0.22);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(110, now + 0.22);
          filter.frequency.exponentialRampToValueAtTime(index < 4 ? 1100 : 2600, now + 1.1);
          filter.frequency.exponentialRampToValueAtTime(200, now + 2.8);

          gainNode.gain.setValueAtTime(0.001, now + 0.22);
          gainNode.gain.linearRampToValueAtTime(0.24 / chordFrequencies.length, now + 0.6);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.9);

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(compressor);

          if (index > 3) {
            gainNode.connect(delayNode);
          }

          osc.start(now + 0.22);
          osc.stop(now + 3.0);
        });
      });

      // PHASE 4: SPARKLING SPACE CHIMES (Falling stellar crystals)
      const chimes = [1500, 1800, 2200, 2600, 3100, 3700, 4200];
      chimes.forEach((freq, idx) => {
        const dropOsc = ctx.createOscillator();
        const dropGain = ctx.createGain();
        const delay = 0.45 + idx * 0.07 + Math.random() * 0.03;
        const dur = 0.5 + Math.random() * 0.3;

        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(freq, now + delay);
        dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.86, now + delay + dur); // falling star slide

        dropGain.gain.setValueAtTime(0.001, now + delay);
        dropGain.gain.linearRampToValueAtTime(0.08, now + delay + 0.03);
        dropGain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

        dropOsc.connect(dropGain);
        dropGain.connect(compressor);
        dropGain.connect(delayNode);

        dropOsc.start(now + delay);
        dropOsc.stop(now + delay + dur);
      });

    } catch (e) {
      console.warn("Epic Web Audio synth API not supported on this browser.", e);
    }
  };

  const handleEnter = async () => {
    if (isWarping) return; // Prevent double taps during portal sequence
    
    setIsWarping(true);
    playEpicSynth();

    // Trigger full screen modes if allowed
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen();
      }
    } catch {
      // Fullscreen bypassed silently
    }

    // Sequence timing (Accelerated for rapid, energetic warp jump)
    setTimeout(() => {
      setShowShutter(true);
    }, 200);

    setTimeout(() => {
      setHasEntered(true);
    }, 850);

    setTimeout(() => {
      setShowShutter(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#020108] text-white overflow-hidden font-sans app-shell">
      {/* 1. GLOBAL BACKGROUND VIDEO STREAM - ONLY RENDERED ONCE ENTERED (Zero visual leak during preloader!) */}
      {hasEntered && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <VideoPlayer src={GLOBAL_VIDEO} className="h-full w-full object-cover opacity-[0.78]" />
          
          {/* Animated CRT Scanline mesh overlay */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]" 
            style={{ 
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))', 
              backgroundSize: '100% 4px, 6px 100%' 
            }}
          ></div>
          
          {/* Ambient Vignette Shadow */}
          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_220px_rgba(0,0,0,0.92)] bg-gradient-to-t from-black/55 via-transparent to-black/35"></div>
        </div>
      )}

      {/* 2. ULTIMATE CINEMATIC 3D HYPERSPACE PRELOADER SCREEN */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020108] select-none cursor-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={handleEnter}
          >
            {/* The high-performance 3D star projection canvas */}
            <StarfieldCanvas isWarping={isWarping} />

            {/* Cyber target lock laser scanline */}
            <motion.div 
              className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              animate={{
                top: ["0%", "100%", "0%"]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />

            {/* Viewport Tech Framing HUD Brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 pointer-events-none rounded-tl-xl"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20 pointer-events-none rounded-tr-xl"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20 pointer-events-none rounded-bl-xl"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 pointer-events-none rounded-br-xl"></div>

            {/* LEFT HUD TERMINAL: Diagnostics checks */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 w-[220px] border border-white/[0.06] bg-black/60 p-5 rounded-2xl backdrop-blur-md pointer-events-none text-cyan-400 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              <div className="text-[9px] text-white/80 border-b border-white/10 pb-1.5 uppercase font-mono tracking-widest font-bold flex items-center justify-between">
                <span>SYS.DIAGNOSTICS</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              </div>
              <DiagnosticsPanel />
              <div className="h-1 w-full bg-cyan-950/80 rounded-full overflow-hidden relative mt-1">
                <motion.div className="h-full bg-cyan-400 absolute left-0" animate={{ width: ["20%", "90%", "30%", "85%", "20%"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
              </div>
            </div>

            {/* RIGHT HUD TERMINAL: Interactive Oscilloscope */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 w-[220px] border border-white/[0.06] bg-black/60 p-5 rounded-2xl backdrop-blur-md pointer-events-none text-pink-500 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              <div className="text-[9px] text-white/80 border-b border-white/10 pb-1.5 uppercase font-mono tracking-widest font-bold flex items-center justify-between">
                <span>PORTAL.METRICS</span>
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-ping"></span>
              </div>
              <div className="flex justify-between text-[8px] font-mono tracking-wider text-pink-400/70">
                <span>SINGULARITY:</span>
                <span className="text-white font-black">100M.NODE</span>
              </div>
              <OscilloscopePanel />
              <div className="h-1 w-full bg-pink-950/80 rounded-full overflow-hidden relative mt-1">
                <motion.div className="h-full bg-pink-500 absolute left-0" animate={{ width: ["80%", "15%", "70%", "95%", "80%"] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
              </div>
            </div>

            {/* Cyber Telemetry Info Labels */}
            <div className="absolute top-8 left-24 hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-white/45 uppercase pointer-events-none">
              <span>SYS.LOC // CONSOLE.026</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-cyan-400">ONLINE</span>
            </div>
            <div className="absolute top-8 right-24 hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-white/45 uppercase pointer-events-none">
              <span>EST. BDG // 100,000,000 INR</span>
            </div>
            <div className="absolute bottom-8 left-24 hidden md:flex flex-col text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase pointer-events-none gap-0.5">
              <span>3D STARFIELD HYPERSPACE ENGINES READY</span>
              <span>GRID SYSTEM LOCK: ACTIVE</span>
            </div>
            <div className="absolute bottom-8 right-24 hidden md:flex flex-col text-[8px] font-bold tracking-[0.2em] text-white/30 text-right uppercase pointer-events-none gap-0.5">
              <span>CLICK CORE TO COMMENCE WARP TRANSITION</span>
              <span>ESTABLISHED SECURE NEON GATEWAY</span>
            </div>

            {/* Concentric Rotating Vector Dial Systems */}
            <div className="absolute flex items-center justify-center pointer-events-none">
              {/* Outer Dashed ring */}
              <motion.div 
                className="h-[430px] w-[430px] rounded-full border border-dashed border-cyan-400/10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 36 }}
              />
              
              {/* Mid dotted ring */}
              <motion.div 
                className="absolute h-[360px] w-[360px] rounded-full border border-dotted border-white/10"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 48 }}
              />

              {/* Vector Ring accents */}
              <motion.div 
                className="absolute h-[280px] w-[280px] rounded-full border-2 border-dashed border-pink-500/20"
                animate={{ rotate: 180 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              />

              {/* Inner ring */}
              <motion.div 
                className="absolute h-[180px] w-[180px] rounded-full border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>

            {/* Concentric SVG Text Rings rotating in opposite directions */}
            <div className="relative flex items-center justify-center">
              
              {/* Ring 1: Outer Rotating Circular Text (Clockwise) */}
              <svg viewBox="0 0 300 300" className="absolute w-[440px] h-[440px] pointer-events-none z-10 select-none animate-spin" style={{ animationDuration: '30s' }}>
                <defs>
                  <path id="outerCirclePath" d="M 150, 150 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0" />
                  
                  <linearGradient id="cyanTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#ab00ff" />
                  </linearGradient>
                </defs>
                <text fill="url(#cyanTextGradient)" className="text-[6px] font-black uppercase tracking-[0.45em] opacity-80">
                  <textPath href="#outerCirclePath" startOffset="0%">
                    • CONSOLE BOOT IN PROGRESS • SECTOR 026 INITIALIZED • SYSTEM ACCESS GRANTED • SECURE HYPERDRIVE CONNECTION
                  </textPath>
                </text>
              </svg>

              {/* Ring 2: Inner Rotating Circular Text (Counter-Clockwise) */}
              <svg viewBox="0 0 300 300" className="absolute w-[360px] h-[360px] pointer-events-none z-10 select-none animate-spin" style={{ animationDuration: '22s', animationDirection: 'reverse' }}>
                <defs>
                  <path id="innerCirclePath" d="M 150, 150 m -102, 0 a 102,102 0 1,1 204,0 a 102,102 0 1,1 -204,0" />
                  
                  <linearGradient id="pinkTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff007f" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <text fill="url(#pinkTextGradient)" className="text-[7.5px] font-black uppercase tracking-[0.42em] opacity-80">
                  <textPath href="#innerCirclePath" startOffset="0%">
                    • TAP FOR EXPERIENCE • TAP FOR EXPERIENCE • TAP FOR EXPERIENCE
                  </textPath>
                </text>
              </svg>

              {/* Interactive Core Reactor Button */}
              <motion.div 
                className="group relative z-20 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/40 bg-black/85 shadow-[0_0_45px_rgba(6,182,212,0.35),inset_0_0_20px_rgba(6,182,212,0.15)] transition-all duration-700 hover:scale-110 hover:border-pink-500 hover:shadow-[0_0_75px_rgba(236,72,153,0.7),inset_0_0_25px_rgba(236,72,153,0.25)]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Internal dynamic hover overlay */}
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-cyan-950/60 to-pink-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Cyber Singularity SVG Vector */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-cyan-400 transition-all duration-700 group-hover:text-pink-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.75)]">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor" opacity="0.45"/>
                  <path d="M12 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M17 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                {/* Concentric pulsating shock ring */}
                <span className="absolute inset-0 rounded-full border-2 border-cyan-400/20 group-hover:border-pink-500/40 animate-ping opacity-60"></span>
              </motion.div>
            </div>

            {/* 3. DYNAMIC HOLOGRAPHIC TARGETING CURSOR (Only shown in preloader on desktop!) */}
            {mousePos.x !== -1000 && (
              <div 
                className="hidden lg:block fixed pointer-events-none z-[1002] -translate-x-1/2 -translate-y-1/2 select-none"
                style={{ left: mousePos.x, top: mousePos.y }}
              >
                {/* Spinning crosshair circle */}
                <div className="w-9 h-9 border border-dashed border-cyan-400/60 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                
                {/* Horizontal targeting ticks */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[1px] bg-cyan-400/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-cyan-400/30" />
                
                {/* Vector coordinate readouts */}
                <div className="absolute left-6 top-6 flex flex-col font-mono text-[7px] text-cyan-400 font-extrabold tracking-wider bg-black/75 px-1.5 py-0.5 rounded border border-cyan-400/20 shadow-md">
                  <span>TARGET LOCK // ON</span>
                  <span>X: {mousePos.x}</span>
                  <span>Y: {mousePos.y}</span>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. GLOBAL DOUBLE VERTICAL SHUTTER DOORS REVEAL */}
      <AnimatePresence>
        {showShutter && (
          <motion.div 
            className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Shutter Gate */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#020108] border-b border-[#00f0ff]/15"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Bottom Shutter Gate */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020108] border-t border-[#00f0ff]/15"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Horizontal neon cutting laser sweep */}
            <motion.div
              className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent z-[1001] shadow-[0_0_30px_rgba(0,240,255,1)]"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: [0, 1.2, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MAIN NAVIGATION & ROUTER PORTAL LAYOUT */}
      {hasEntered && (
        <div className="relative z-20">
          <Navbar />
          
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;