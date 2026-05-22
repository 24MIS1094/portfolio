import { motion } from 'framer-motion';
import { useState } from 'react';
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

const educationEras = [
  {
    era: "ERA I",
    title: "Integrated M.Tech (Software Engineering)",
    inst: "Vellore Institute of Technology, Chennai",
    year: "2023 — 2029",
    status: "PURSUING DEGREE",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
    glow: "rgba(6, 182, 212, 0.2)",
    sheen: "rgba(6, 182, 212, 0.1)",
    summary: "Developing rigorous competencies in modular system design, enterprise databases, clean logic layers, and low-latency architectural routing."
  },
  {
    era: "ERA II",
    title: "Intermediate (MPC)",
    inst: "Narayana Jr College, Pati Patancheruvu",
    year: "2021 — 2023",
    status: "GRADUATED WITH DISTINCTION",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/5",
    glow: "rgba(168, 85, 247, 0.2)",
    sheen: "rgba(168, 85, 247, 0.1)",
    summary: "Solidifying fundamental logic structures, scientific workflows, mathematical analysis, and structured problem-solving modules."
  },
  {
    era: "ERA III",
    title: "Secondary School (10th Grade)",
    inst: "Sri Chaitanya English Medium School, Guntakal",
    year: "Passed out in 2021",
    status: "COMPLETED WITH EXCELLENCE",
    color: "text-pink-500 border-pink-500/30 bg-pink-500/5",
    glow: "rgba(236, 72, 153, 0.2)",
    sheen: "rgba(236, 72, 153, 0.1)",
    summary: "Acquiring core cognitive frameworks, initial coding introductions, computational concepts, and analytical foundational paths."
  }
];

const About = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-black px-6 py-20 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Cinematic Glass Shutter Intro */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-[100px]"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      >
        <div className="h-[1px] w-1/3 bg-white shadow-[0_0_30px_rgba(255,255,255,1)]"></div>
      </motion.div>

      {/* Spider-Man Interactive Canvas Web */}
      <SpiderWeb />

      {/* Spider-Man Neon Ambient Glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[150px]"></div>
      <div className="pointer-events-none absolute right-0 top-2/3 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-cyan-600/15 blur-[150px]"></div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        
        {/* Title Header */}
        <motion.div variants={itemVariants} className="mb-20 text-center flex flex-col items-center relative w-full justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/35 bg-red-500/10 px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-red-400 uppercase mb-4">
            Get to Know Me
          </span>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              Me
            </span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-6 w-full opacity-60">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-red-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,1)]"></div>
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          
          {/* Glass Card 1: Career Objective */}
          <motion.section 
            variants={itemVariants}
            onMouseEnter={() => setHoveredCard('objective')}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={(e) => {
              handleCardMouseLeave(e);
              setHoveredCard(null);
            }}
            className="group relative overflow-hidden rounded-[2rem] border border-red-500/10 bg-gradient-to-br from-red-900/[0.05] to-transparent p-8 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(255,0,60,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-red-500/30 cursor-default"
            style={{
              transform: hoveredCard === 'objective' ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              boxShadow: hoveredCard === 'objective' 
                ? 'inset 0 1px 2px rgba(255,255,255,0.15), 0 0 45px rgba(255,0,60,0.15), 0 20px 45px rgba(0,0,0,0.6)' 
                : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 12px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* Radial specular sheen glare */}
            {hoveredCard === 'objective' && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-100 z-0"
                style={{
                  background: 'radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), rgba(255,0,60,0.12), transparent 85%), radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)'
                }}
              />
            )}

            {/* Cinematic Shutter Sweep */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-8">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-500 shadow-[inset_0_1px_1px_rgba(255,0,60,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-red-500/10 group-hover:shadow-[0_0_30px_rgba(255,0,60,0.4)]">
                <svg className="h-10 w-10 drop-shadow-[0_0_10px_rgba(255,0,60,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-extrabold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-red-100 transition-colors">Career Objective</h2>
                <p className="text-xl leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/90">
                  Motivated Integrated M.Tech Software Engineering student seeking a Backend Developer
                  internship to build scalable backend systems and database-driven applications using
                  Java and Python while gaining real-world industry experience.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Glass Card 2: Profile Summary */}
          <motion.section 
            variants={itemVariants}
            onMouseEnter={() => setHoveredCard('summary')}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={(e) => {
              handleCardMouseLeave(e);
              setHoveredCard(null);
            }}
            className="group relative overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-900/[0.05] to-transparent p-8 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(0,229,255,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30 cursor-default"
            style={{
              transform: hoveredCard === 'summary' ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              boxShadow: hoveredCard === 'summary' 
                ? 'inset 0 1px 2px rgba(255,255,255,0.15), 0 0 45px rgba(0,229,255,0.15), 0 20px 45px rgba(0,0,0,0.6)' 
                : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 12px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* Radial specular sheen glare */}
            {hoveredCard === 'summary' && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-100 z-0"
                style={{
                  background: 'radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), rgba(0,229,255,0.12), transparent 85%), radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)'
                }}
              />
            )}

            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
              <div className="inline-flex w-fit rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-cyan-400 shadow-[inset_0_1px_1px_rgba(0,229,255,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                <svg className="h-10 w-10 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="mb-6 text-2xl font-extrabold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-cyan-100 transition-colors">Profile Summary</h2>
                <ul className="space-y-6 text-lg text-white/50">
                  {['Backend-focused developer with strong project experience', 'Hands-on experience in role-based and database-driven systems', 'Strong understanding of backend workflows and data handling', 'Actively learning industry-standard backend practices'].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 transition-colors duration-500 group-hover:text-white/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                      <span className="leading-relaxed tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Education section - Elegant Vertical Timeline */}
          <motion.section 
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2rem] border border-blue-500/10 bg-zinc-950/20 p-8 md:p-10 backdrop-blur-[60px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-default"
          >
            <div className="absolute inset-0 -z-10 bg-radial-gradient(400px circle at 50% 50%, rgba(59,130,246,0.06), transparent 80%) pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.2)]">
                  <svg className="h-8 w-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinejoin="round" strokeWidth={1.5} />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth={1.5} />
                  </svg>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                    Academic Journey
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Education</h2>
                </div>
              </div>

              {/* Vertical Timeline Wrapper */}
              <div className="relative pl-6 md:pl-10 border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-12">
                {educationEras.map((era, index) => {
                  const cardId = `education-${index}`;
                  return (
                    <div key={index} className="relative group/item">
                      {/* Timeline node point */}
                      <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-blue-500 bg-black transition-all duration-300 group-hover/item:scale-125 group-hover/item:border-cyan-400 group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                        <div className="h-2 w-2 rounded-full bg-blue-500 transition-colors group-hover/item:bg-cyan-400 animate-pulse" />
                      </div>

                      {/* Card */}
                      <div
                        onMouseEnter={() => setHoveredCard(cardId)}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={(e) => {
                          handleCardMouseLeave(e);
                          setHoveredCard(null);
                        }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300"
                        style={{
                          transform: hoveredCard === cardId ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                          borderColor: hoveredCard === cardId ? '#3b82f6' : undefined,
                          boxShadow: hoveredCard === cardId 
                            ? 'inset 0 1px 2px rgba(255,255,255,0.1), 0 0 35px rgba(59,130,246,0.15), 0 10px 30px rgba(0,0,0,0.5)'
                            : 'inset 0 1px 1px rgba(255,255,255,0.03)',
                          transition: 'transform 0.05s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
                        }}
                      >
                        {/* Radial specular sheen glare */}
                        {hoveredCard === cardId && (
                          <div 
                            className="absolute inset-0 pointer-events-none opacity-100 z-0"
                            style={{
                              background: 'radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.12), transparent 85%), radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 75%)'
                            }}
                          />
                        )}

                        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 font-mono">
                              {era.year}
                            </span>
                            <h3 className="text-xl font-bold tracking-wide text-white mt-1 group-hover/item:text-blue-100 transition-colors">
                              {era.title}
                            </h3>
                            <p className="text-base text-white/50 mt-1">
                              {era.inst}
                            </p>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-lg font-mono text-[9px] font-bold tracking-wider shrink-0 self-start md:self-auto ${era.color}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                            {era.status}
                          </span>
                        </div>

                        <p className="relative z-10 text-sm leading-relaxed text-white/60 mt-4 border-t border-white/5 pt-4">
                          {era.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>



        </div>
      </div>
    </motion.main>
  );
};

export default About;