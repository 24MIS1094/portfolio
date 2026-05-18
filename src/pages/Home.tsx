import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';

const VIDEO_SRC = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

const skills = [
  { name: "Full Stack Developer", color: "hover:border-red-500/50 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:text-red-100" },
  { name: "Java", color: "hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:text-cyan-100" },
  { name: "Python", color: "hover:border-red-500/50 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:text-red-100" },
  { name: "DSA", color: "hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:text-cyan-100" }
];

const Home = () => {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-black text-white">
      
      {/* 4K Video Background */}
      <div className="fixed inset-0 z-0">
        <VideoPlayer src={VIDEO_SRC} className="h-full w-full object-cover" />
      </div>

      {/* Cinematic Shutter Reveal Entrance */}
      <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center">
        {/* Top Shutter */}
        <motion.div 
          className="absolute top-0 w-full bg-black h-1/2"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Bottom Shutter */}
        <motion.div 
          className="absolute bottom-0 w-full bg-black h-1/2"
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Aggressive Neon Strike Line */}
        <motion.div
          className="h-[2px] bg-cyan-400 shadow-[0_0_30px_rgba(0,229,255,1),_0_0_60px_rgba(0,229,255,0.8)] z-50 absolute top-1/2 -translate-y-1/2"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center px-4">
        
        {/* Ultra-Premium Glassmorphic HUD Visor */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-black/40 p-8 py-14 backdrop-blur-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_30px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center"
        >
          {/* Internal HUD Ambient Glows */}
          <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[100px]"></div>
          <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-600/20 blur-[100px]"></div>
          
          <div className="text-center relative w-full z-10">
            
            <div className="relative inline-block group cursor-pointer mb-10">
              {/* Hyper-Modern Neon Spider-Man Bloom Aura */}
              <div className="absolute top-1/2 left-1/2 h-32 w-full max-w-96 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 bg-white/0 blur-[80px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-gradient-to-r group-hover:from-red-600/50 group-hover:to-cyan-500/50 group-hover:scale-125"></div>

              {/* The Name - Ultra Sharp, Cinematic Aesthetic */}
              <motion.h1 
                className="relative z-20 text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:tracking-widest group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-white group-hover:to-cyan-400 group-hover:drop-shadow-[0_0_40px_rgba(255,0,60,0.6)]"
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
              >
                Arjun Yn
              </motion.h1>
            </div>

            {/* Interactive Floating Glass Pills (Mobile Friendly Wrap) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1.2, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-3 mt-2"
            >
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 ${skill.color}`}
                >
                  <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/70 transition-colors duration-500">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
            
          </div>
        </motion.div>

      </section>
    </main>
  );
};

export default Home;