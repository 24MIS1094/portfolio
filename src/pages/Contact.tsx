import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    
    // Smooth chime/flute envelope structure
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

const playContactSound = (type: 'sa' | 'ri' | 'ga' | 'ma' | 'pa' | 'dha' | 'chord' | 'scale' | 'error') => {
  switch (type) {
    case 'sa':
      playSwaraTone(SWARAS.sa, 'sine', 0.45);
      break;
    case 'ri':
      playSwaraTone(SWARAS.ri, 'sine', 0.45);
      break;
    case 'ga':
      playSwaraTone(SWARAS.ga, 'sine', 0.45);
      break;
    case 'ma':
      playSwaraTone(SWARAS.ma, 'sine', 0.45);
      break;
    case 'pa':
      playSwaraTone(SWARAS.pa, 'sine', 0.45);
      break;
    case 'dha':
      playSwaraTone(SWARAS.dha, 'sine', 0.45);
      break;
    case 'chord':
      // Gorgeous Sa-Ga-Pa chord roll
      playSwaraTone(SWARAS.sa, 'sine', 0.65, 0.00, 0.04);
      playSwaraTone(SWARAS.ga, 'sine', 0.65, 0.08, 0.04);
      playSwaraTone(SWARAS.pa, 'sine', 0.65, 0.16, 0.04);
      break;
    case 'scale':
      // Ascending Sa-Ri-Ga-Ma-Pa-Dha-Ni-Sa' scales
      playSwaraTone(SWARAS.sa, 'sine', 0.35, 0.00, 0.05);
      playSwaraTone(SWARAS.ri, 'sine', 0.35, 0.07, 0.05);
      playSwaraTone(SWARAS.ga, 'sine', 0.35, 0.14, 0.05);
      playSwaraTone(SWARAS.ma, 'sine', 0.35, 0.21, 0.05);
      playSwaraTone(SWARAS.pa, 'sine', 0.35, 0.28, 0.05);
      playSwaraTone(SWARAS.dha, 'sine', 0.35, 0.35, 0.05);
      playSwaraTone(SWARAS.ni, 'sine', 0.35, 0.42, 0.05);
      playSwaraTone(SWARAS.sa2, 'sine', 0.50, 0.49, 0.06);
      break;
    case 'error':
      // Deep resonant warning tone
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(115, now);
        osc.frequency.linearRampToValueAtTime(65, now + 0.38);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      } catch (e) {}
      break;
  }
};

// --- REAL OFFICIAL BRAND ICON RENDERER ---
const renderIcon = (id: string, isHovered: boolean) => {
  switch (id) {
    case 'tel':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'transmit':
      return (
        <svg className="w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    default:
      return null;
  }
};

type FormState = { name: string; email: string; message: string };

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Focus tracking for sound synthesis
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 3D rotation offsets
    const rx = (x - rect.width / 2) / (rect.width / 2);
    const ry = (y - rect.height / 2) / (rect.height / 2);
    const rotateY = rx * 12;
    const rotateX = -ry * 12;
    
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
    if (field === 'name') {
      playSwaraTone(SWARAS.sa, 'sine', 0.25, 0, 0.04);
    } else if (field === 'email') {
      playSwaraTone(SWARAS.ga, 'sine', 0.25, 0, 0.04);
    } else if (field === 'message') {
      playSwaraTone(SWARAS.pa, 'sine', 0.25, 0, 0.04);
    }
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in all fields.');
      playContactSound('error');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg('Please enter a valid email address.');
      playContactSound('error');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus('idle');
    playContactSound('chord');

    try {
      const res = await fetch('https://formsubmit.co/ajax/ajayarjun727@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Portfolio Review from ${form.name}`
        }),
      });
      if (res.ok) {
        setStatus('success');
        playContactSound('scale');
        setForm({ name: '', email: '', message: '' });
        // Auto close modal after a brief delay so they can hear the success scale
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 2200);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.message || data?.error || 'Uplink transmission error. Try again.');
        setStatus('error');
        playContactSound('error');
      }
    } catch (err) {
      setErrorMsg('Network gateway offline. Please try again later.');
      setStatus('error');
      playContactSound('error');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      id: 'tel',
      name: 'Direct Call',
      handle: '+91 93911 43279',
      href: 'tel:+919391143279',
      color: '#ff5f1f',
      bgGlow: 'rgba(255, 95, 31, 0.22)',
      iconClass: 'hover-ring-phone',
      swara: 'sa'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Secure',
      handle: 'Chat Online',
      href: 'https://wa.me/919391143279',
      color: '#25D366',
      bgGlow: 'rgba(37, 211, 102, 0.22)',
      iconClass: 'hover-bounce-whatsapp',
      swara: 'ri'
    },
    {
      id: 'github',
      name: 'GitHub Repository',
      handle: '@24MIS1094',
      href: 'https://github.com/24MIS1094',
      color: '#cbd5e1',
      bgGlow: 'rgba(203, 213, 225, 0.18)',
      iconClass: 'hover-float-github',
      swara: 'ga'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Portal',
      handle: 'Arjun Y N',
      href: 'https://www.linkedin.com/in/arjun-yn-420bb731a',
      color: '#0A66C2',
      bgGlow: 'rgba(10, 102, 194, 0.22)',
      iconClass: '',
      swara: 'ma'
    },
    {
      id: 'instagram',
      name: 'Instagram Network',
      handle: '@iam_always_arjun',
      href: 'https://www.instagram.com/iam_always_arjun',
      color: '#ec4899',
      bgGlow: 'rgba(236, 72, 153, 0.22)',
      iconClass: '',
      swara: 'pa'
    },
    {
      id: 'transmit',
      name: 'Transmit Message',
      handle: 'Leave Review',
      href: '#',
      color: '#ab00ff',
      bgGlow: 'rgba(171, 0, 255, 0.25)',
      iconClass: 'hover-pulse-transmit',
      swara: 'dha'
    }
  ];

  return (
    <motion.main
      className="relative min-h-[calc(100vh-5rem)] bg-[#020205] px-4 md:px-12 py-16 text-white overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Moving 3D Cyber Grid Background */}
      <div className="cyber-grid-3d z-0" />

      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      {/* Cybernetic Accent Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-pink-500/5 blur-[130px] pointer-events-none z-0" />

      <section className="relative z-10 w-full max-w-5xl">
        {/* Clean Contact Page Header */}
        <div className="mb-12 text-center border-b border-white/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            Get in Touch
          </h1>
        </div>

        {/* Swara-Driven Center Grid of 3D-Tilting brand cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {socialLinks.map((link, idx) => {
            const isTransmit = link.id === 'transmit';
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={isTransmit ? undefined : "_blank"}
                rel={isTransmit ? undefined : "noreferrer"}
                onClick={(e) => {
                  if (isTransmit) {
                    e.preventDefault();
                    setIsModalOpen(true);
                    playContactSound('chord');
                  }
                }}
                onMouseEnter={() => {
                  setHoveredCard(idx);
                  playContactSound(link.swara as any);
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={(e) => {
                  handleCardMouseLeave(e);
                  setHoveredCard(null);
                }}
                whileHover={{ 
                  scale: 1.04,
                  y: -5
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="group relative rounded-[2rem] border border-white/10 bg-zinc-950/40 backdrop-blur-[30px] p-8 flex flex-col items-start gap-6 cursor-pointer overflow-hidden perspective-glow-card transition-all duration-300 min-h-[190px]"
                style={{
                  borderColor: hoveredCard === idx ? `${link.color}35` : undefined,
                  boxShadow: hoveredCard === idx 
                    ? `inset 0 1px 2px rgba(255,255,255,0.2), 0 0 50px ${link.bgGlow}, 0 20px 40px rgba(0,0,0,0.6)` 
                    : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 15px 30px rgba(0,0,0,0.4)',
                  transform: hoveredCard === idx ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
                }}
              >
                {/* Dynamic Specular Gloss Sheen - follows cursor */}
                {hoveredCard === idx && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      background: `radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), ${link.color}15, transparent 80%), radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.07), transparent 70%)`
                    }}
                  />
                )}

                {/* Luxury Colored Ambient Back-glow Mesh */}
                <div 
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                  style={{
                    background: `radial-gradient(180px circle at 50% 50%, ${link.color}08, transparent 75%), linear-gradient(135deg, ${link.color}03 0%, transparent 100%)`
                  }}
                />

                {/* Live Node Badge in top-right corner */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded-full px-2.5 py-1 backdrop-blur-md z-10 transition-colors group-hover:bg-white/[0.06] group-hover:border-white/10">
                  <span className={`h-1.5 w-1.5 rounded-full ${link.id === 'whatsapp' || link.id === 'tel' ? 'animate-pulse' : ''}`}
                        style={{
                          backgroundColor: link.id === 'whatsapp' || link.id === 'tel' ? '#4ade80' : link.color,
                          boxShadow: `0 0 8px ${link.id === 'whatsapp' || link.id === 'tel' ? '#4ade80' : link.color}`
                        }}
                  />
                  <span className="text-[8px] font-mono font-black tracking-widest text-white/40 group-hover:text-white/70 transition-colors uppercase">
                    {link.id === 'whatsapp' || link.id === 'tel' ? 'ONLINE' : 'CONNECT'}
                  </span>
                </div>

                {/* Icon Wrapper with Dynamic Halos */}
                <div className="flex w-full items-center justify-between z-10 relative">
                  <div className="relative">
                    {/* Phone Pulse Ripple */}
                    {link.id === 'tel' && hoveredCard === idx && (
                      <div className="absolute -inset-3 rounded-full border border-orange-500/20 animate-ping pointer-events-none" style={{ animationDuration: '1.5s' }} />
                    )}

                    {/* GitHub Concentric Spinning Halos */}
                    {link.id === 'github' && hoveredCard === idx && (
                      <>
                        <div className="absolute -inset-2 rounded-2xl border border-dashed border-slate-400/20 animate-spin-cw pointer-events-none" style={{ animationDuration: '8s' }} />
                        <div className="absolute -inset-4 rounded-2xl border border-dashed border-slate-400/10 animate-spin-ccw pointer-events-none" style={{ animationDuration: '12s' }} />
                      </>
                    )}

                    {/* Transmit Message Pulsing Breathing Rings */}
                    {link.id === 'transmit' && hoveredCard === idx && (
                      <>
                        <div className="absolute -inset-2 rounded-2xl border border-purple-500/20 animate-pulse pointer-events-none" style={{ animationDuration: '2s' }} />
                        <div className="absolute -inset-4 rounded-2xl border border-purple-500/10 animate-pulse pointer-events-none" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
                      </>
                    )}

                    {/* Main Icon Container */}
                    <div
                      className={`p-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 flex items-center justify-center relative overflow-hidden group-hover:scale-110 ${
                        link.id === 'instagram' && hoveredCard === idx ? 'insta-rainbow-sweep border-none' : ''
                      } ${link.iconClass}`}
                      style={{
                        borderColor: hoveredCard === idx && link.id !== 'instagram' ? `${link.color}50` : undefined,
                        color: hoveredCard === idx ? (link.id === 'instagram' ? '#fff' : link.color) : 'rgba(255,255,255,0.65)',
                        boxShadow: hoveredCard === idx && link.id !== 'instagram' ? `0 0 25px ${link.bgGlow}, inset 0 1px 1.5px rgba(255,255,255,0.2)` : 'inset 0 1px 1px rgba(255,255,255,0.08)'
                      }}
                    >
                      {renderIcon(link.id, hoveredCard === idx)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-left mt-auto z-10 relative">
                  <span className="text-[10px] font-sans font-extrabold text-white/40 tracking-widest group-hover:text-white/60 transition-colors uppercase">
                    {link.name}
                  </span>
                  <span className="text-sm font-sans font-black text-white group-hover:text-white transition-colors tracking-wide mt-0.5">
                    {link.handle}
                  </span>
                </div>

                {/* Subtly animated holographic glass wireframe overlay */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/[0.03] group-hover:border-white/10 transition-all duration-500 pointer-events-none z-10" />
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Cybernetic Direct Uplink Transmission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => {
              setIsModalOpen(false);
              playContactSound('error');
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xl rounded-[2.5rem] border border-white/10 bg-[#09090f]/95 p-8 md:p-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Real-time laser sweep scanner */}
              <div className="laser-scanner z-0" />
              
              {/* Corner Cyber Brackets */}
              <div className="hud-bracket-tl" style={{ top: '8px', left: '8px', borderTopLeftRadius: '2rem' }} />
              <div className="hud-bracket-tr" style={{ top: '8px', right: '8px', borderTopRightRadius: '2rem' }} />
              <div className="hud-bracket-bl" style={{ bottom: '8px', left: '8px', borderBottomLeftRadius: '2rem' }} />
              <div className="hud-bracket-br" style={{ bottom: '8px', right: '8px', borderBottomRightRadius: '2rem' }} />

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  playContactSound('error');
                }}
                className="absolute top-5 right-5 text-white/40 hover:text-red-400 font-mono text-[9px] uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 transition-all duration-300 z-10 rounded-full cursor-pointer"
              >
                Close
              </button>

              <div className="mb-8 select-none mt-4 text-left">
                <span className="font-sans text-[10px] font-black tracking-[0.2em] text-cyan-400 block mb-1.5 uppercase">
                  TRANSMISSION TUNNEL
                </span>
                <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-white mb-2">
                  Leave a Review
                </h2>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Your thoughts and feedback are incredibly valuable. Submit this secure capsule to forward your message directly to my inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name field */}
                <div className="relative flex flex-col gap-2">
                  <div className="text-[10px] font-sans font-black tracking-widest text-white/50 text-left uppercase">
                    <label htmlFor="name-input">Name</label>
                  </div>
                  <div className="relative">
                    <input
                      id="name-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className="w-full rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:bg-black/95 px-5 py-4 text-sm text-white focus:outline-none transition-all duration-300 font-sans shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]"
                      style={{
                        boxShadow: focusedField === 'name' ? '0 0 25px rgba(0, 240, 255, 0.12), inset 0 1px 1px rgba(0, 240, 255, 0.1)' : 'none',
                      }}
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="relative flex flex-col gap-2">
                  <div className="text-[10px] font-sans font-black tracking-widest text-white/50 text-left uppercase">
                    <label htmlFor="email-input">Email</label>
                  </div>
                  <div className="relative">
                    <input
                      id="email-input"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className="w-full rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:bg-black/95 px-5 py-4 text-sm text-white focus:outline-none transition-all duration-300 font-sans shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]"
                      style={{
                        boxShadow: focusedField === 'email' ? '0 0 25px rgba(0, 240, 255, 0.12), inset 0 1px 1px rgba(0, 240, 255, 0.1)' : 'none',
                      }}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="relative flex flex-col gap-2">
                  <div className="text-[10px] font-sans font-black tracking-widest text-white/50 text-left uppercase">
                    <label htmlFor="message-textarea">Message</label>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message-textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows={5}
                      className="w-full rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:bg-black/95 px-5 py-4 text-sm text-white focus:outline-none transition-all duration-300 font-sans resize-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]"
                      style={{
                        boxShadow: focusedField === 'message' ? '0 0 25px rgba(0, 240, 255, 0.12), inset 0 1px 1px rgba(0, 240, 255, 0.1)' : 'none',
                      }}
                      placeholder="Write your review or feedback..."
                      required
                    />
                  </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-sans font-semibold text-red-400 border border-red-500/20 bg-red-500/5 p-4 rounded-xl flex items-center gap-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                  <div className="flex flex-col">
                    <AnimatePresence mode="wait">
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-xs font-sans font-bold text-green-400 flex items-center gap-1.5 text-left"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#22c55e] animate-pulse" />
                          Message sent successfully!
                        </motion.div>
                      )}
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-xs font-sans font-bold text-red-400 flex items-center gap-1.5 text-left"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          Failed to send message. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                     type="submit"
                     disabled={loading}
                     whileHover={{ scale: 1.03, y: -2 }}
                     whileTap={{ scale: 0.97 }}
                     className="relative overflow-hidden font-sans font-extrabold tracking-widest text-xs uppercase bg-gradient-to-r from-[#00f0ff] via-[#ab00ff] to-[#ff007f] text-white px-10 py-4.5 transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-2.5 rounded-full shadow-[0_4px_25px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(171,0,255,0.4)] self-end md:self-auto min-w-[180px] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="text-[10px]">▲</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Contact;