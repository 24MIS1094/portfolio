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
  return (
    <motion.main
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-black px-6 py-20 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
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
      <SpiderWeb />

      {/* Spider-Man Neon Ambient Glows */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[150px]"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-600/15 blur-[150px]"></div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        
        {/* Page Header Area */}
        <motion.div variants={itemVariants} className="mb-24 text-center flex flex-col items-center relative w-full h-[160px] justify-center">
          
          {/* Cinematic Massive Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1 
              style={{ 
                WebkitTextStroke: `4px #ff003c`, 
                textShadow: `0 0 120px rgba(255,0,60,0.8), 0 0 40px rgba(255,0,60,0.8)`,
                fontSize: `clamp(3rem, 15vw, 12rem)`
              }}
              className="font-black uppercase text-transparent tracking-tighter whitespace-nowrap drop-shadow-2xl opacity-30"
            >
              PROJECTS
            </h1>
          </div>

          {/* Interactive Foreground Title */}
          <div className="relative z-10 text-6xl font-black md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            PROJECTS
          </div>

          <div className="absolute -bottom-8 flex items-center justify-center gap-6 w-full opacity-60">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-red-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>

        </motion.div>

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-12 mt-12">
          
          {/* Project 1: Neon Red Theme (Job Portal) */}
          <motion.section 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[2.5rem] border border-red-500/10 bg-gradient-to-br from-red-900/[0.05] to-transparent p-8 md:p-12 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(255,0,60,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[inset_0_1px_1px_rgba(255,0,60,0.2),_0_0_80px_rgba(255,0,60,0.15)] cursor-default"
          >
            {/* Cinematic Shutter Sweep */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10">
              
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
            className="group relative overflow-hidden rounded-[2.5rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-900/[0.05] to-transparent p-8 md:p-12 backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(0,229,255,0.1),_0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[inset_0_1px_1px_rgba(0,229,255,0.2),_0_0_80px_rgba(0,229,255,0.15)] cursor-default"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10">
              
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