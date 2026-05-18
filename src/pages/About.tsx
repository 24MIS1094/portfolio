import { motion, AnimatePresence } from 'framer-motion';
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

const acronyms = [
  { letter: "A", word: "Academic", color: "from-red-500 to-red-600", glow: "rgba(255,0,60,0.8)", stroke: "#ff003c" },
  { letter: "B", word: "Behaviour", color: "from-cyan-400 to-blue-600", glow: "rgba(0,229,255,0.8)", stroke: "#00e5ff" },
  { letter: "O", word: "Of", color: "from-red-500 to-red-600", glow: "rgba(255,0,60,0.8)", stroke: "#ff003c" },
  { letter: "U", word: "Understanding", color: "from-cyan-400 to-blue-600", glow: "rgba(0,229,255,0.8)", stroke: "#00e5ff" },
  { letter: "T", word: "Thinking", color: "from-red-500 to-red-600", glow: "rgba(255,0,60,0.8)", stroke: "#ff003c" },
  { letter: "\u00A0\u00A0", word: "", color: "", glow: "", stroke: "" },
  { letter: "M", word: "Mindset", color: "from-cyan-400 to-blue-600", glow: "rgba(0,229,255,0.8)", stroke: "#00e5ff" },
  { letter: "E", word: "Experience", color: "from-red-500 to-red-600", glow: "rgba(255,0,60,0.8)", stroke: "#ff003c" }
];

const About = () => {
  const [activeWord, setActiveWord] = useState<{word: string, color: string, glow: string, letter: string, stroke: string} | null>(null);

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
        <motion.div variants={itemVariants} className="mb-32 text-center flex flex-col items-center relative w-full h-[300px] justify-center">
          
          {/* Cinematic Massive Background Watermark (Thick Border & High Visibility) */}
          <AnimatePresence mode="wait">
            {activeWord && (
              <motion.div
                key={activeWord.word}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', y: 20 }}
                animate={{ opacity: 0.35, scale: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)', y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              >
                <h1 
                  style={{ 
                    WebkitTextStroke: `4px ${activeWord.stroke}`, 
                    textShadow: `0 0 120px ${activeWord.glow}, 0 0 40px ${activeWord.glow}`,
                    fontSize: `clamp(3rem, ${110 / activeWord.word.length}vw, 14rem)`
                  }}
                  className="font-black uppercase text-transparent tracking-tighter whitespace-nowrap drop-shadow-2xl"
                >
                  {activeWord.word}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Acronym Title - Cinematic Foreground */}
          <div className="relative z-10 flex items-center justify-center gap-3 text-5xl font-black tracking-tight">
            {acronyms.map((item, i) => (
              <span
                key={i}
                onMouseEnter={() => item.word && setActiveWord(item)}
                onMouseLeave={() => setActiveWord(null)}
                style={{ '--hover-glow': item.glow } as React.CSSProperties}
                className={`cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${activeWord && activeWord.letter === item.letter && item.word
                    ? `text-transparent bg-clip-text bg-gradient-to-t ${item.color} scale-125 -translate-y-4 drop-shadow-[0_0_40px_var(--hover-glow)]`
                    : activeWord && item.word
                      ? 'text-white/20 blur-[4px] scale-90' 
                      : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hover:scale-110'
                  }
                `}
              >
                {item.letter === " " ? "\u00A0\u00A0" : item.letter}
              </span>
            ))}
          </div>

          <div className="absolute bottom-0 flex items-center justify-center gap-6 w-full opacity-60">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-red-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,1)]"></div>
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>

        </motion.div>

        <div className="flex flex-col gap-8">
          
          {/* Glass Card 1: Career Objective */}
          <motion.section 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[2rem] border border-red-500/10 bg-gradient-to-br from-red-900/[0.05] to-transparent p-8 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(255,0,60,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[inset_0_1px_1px_rgba(255,0,60,0.2),_0_0_60px_rgba(255,0,60,0.15)] cursor-default"
          >
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
            className="group relative overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-900/[0.05] to-transparent p-8 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(0,229,255,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[inset_0_1px_1px_rgba(0,229,255,0.2),_0_0_60px_rgba(0,229,255,0.15)] cursor-default"
          >
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

          {/* Glass Card 3: Education */}
          <motion.section 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[2rem] border border-blue-500/10 bg-gradient-to-br from-blue-900/[0.05] to-transparent p-8 md:p-10 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(59,130,246,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[inset_0_1px_1px_rgba(59,130,246,0.2),_0_0_60px_rgba(59,130,246,0.15)] cursor-default"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-blue-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex h-full flex-col gap-8">
              <div className="inline-flex w-fit rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-blue-400 shadow-[inset_0_1px_1px_rgba(59,130,246,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <svg className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinejoin="round" strokeWidth={1.5} />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="mb-8 text-2xl font-extrabold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-blue-100 transition-colors">Education Timeline</h2>
                  <div className="space-y-10 border-l border-blue-500/20 pl-6 ml-2 relative">
                    
                    {/* Glowing Timeline Head */}
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)]"></div>

                    {[
                      {
                        title: "Integrated M.Tech (Software Engineering)",
                        inst: "Vellore Institute of Technology, Chennai",
                        year: "2023 — 2029"
                      },
                      {
                        title: "Intermediate (MPC)",
                        inst: "Narayana Jr College, Pati Patancheruvu",
                        year: "2021 — 2023"
                      },
                      {
                        title: "10th Passed Out",
                        inst: "Sri Chaitanya English Medium School, Guntakal",
                        year: "Passed out in 2021"
                      }
                    ].map((edu, idx) => (
                      <div key={idx} className="relative group/edu">
                        <div className="absolute -left-[31px] top-2.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 transition-all duration-300 group-hover/edu:bg-blue-400 group-hover/edu:shadow-[0_0_15px_rgba(59,130,246,1)] group-hover/edu:scale-150"></div>
                        <p className="text-xl font-bold tracking-wide text-white/80 transition-colors duration-300 group-hover/edu:text-white">{edu.title}</p>
                        <p className="text-lg text-white/50 mt-2 transition-colors duration-300 group-hover/edu:text-blue-200/70">{edu.inst}</p>
                        {edu.year && <p className="text-sm tracking-widest uppercase text-blue-400/50 mt-3 font-semibold transition-colors duration-300 group-hover/edu:text-blue-400">{edu.year}</p>}
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </motion.main>
  );
};

export default About;