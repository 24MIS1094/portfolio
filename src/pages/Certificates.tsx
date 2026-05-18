import { motion } from 'framer-motion';

import forageCyberPdf from '../../certificates/forage-cyber.pdf';
import deloitteCyberPdf from '../../certificates/deloitte-cyber.pdf';
import deloitteTechPdf from '../../certificates/deloitte-tech.pdf';

const Certificates = () => {
  return (
    <motion.main
      className="min-h-[calc(100vh-5rem)] bg-[#010101] px-6 py-16 text-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/20 bg-black/30 p-6 md:p-10">
        <h1 className="text-3xl font-semibold md:text-4xl">Certificates</h1>

        <ul className="mt-6 list-disc space-y-4 pl-5 text-white/85">
          <li>
            <a 
              href="https://www.skills.google/public_profiles/390b49e5-1357-4a2e-a6b0-a95fdd9c6e07/badges/21035098" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 hover:underline transition-colors block"
            >
              Google Cloud - Develop Serverless Applications on Cloud Run
            </a>
          </li>
          <li>
            <a 
              href="https://www.skills.google/public_profiles/390b49e5-1357-4a2e-a6b0-a95fdd9c6e07/badges/21082632" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 hover:underline transition-colors block"
            >
              Google Cloud - Cloud Functions: 3 Ways
            </a>
          </li>
          <li>
            <a 
              href={forageCyberPdf} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 hover:underline transition-colors block"
            >
              Cybersecurity Analyst Job Simulation - Forage
            </a>
          </li>
          <li>
            <a 
              href={deloitteCyberPdf} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 hover:underline transition-colors block"
            >
              Deloitte Cyber & Data Analytics Job Simulation - Forage
            </a>
          </li>
          <li>
            <a 
              href={deloitteTechPdf} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 hover:underline transition-colors block"
            >
              Deloitte Technology Job Simulation - Forage
            </a>
          </li>
        </ul>

      </div>
    </motion.main>
  );
};

export default Certificates;