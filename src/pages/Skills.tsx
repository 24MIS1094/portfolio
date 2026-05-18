import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <motion.main
      className="min-h-[calc(100vh-5rem)] bg-[#010101] px-6 py-16 text-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/20 bg-black/30 p-6 md:p-10">
        <h1 className="text-3xl font-semibold md:text-4xl">Skills</h1>

        <div className="mt-6 space-y-2 text-white/85">
          <p><span className="font-medium text-white">Languages:</span> Java, Python</p>
          <p><span className="font-medium text-white">Backend Frameworks:</span> Flask, Django</p>
          <p><span className="font-medium text-white">Web Technologies:</span> HTML, CSS, JavaScript, JSP</p>
          <p><span className="font-medium text-white">Databases:</span> MySQL, SQLite, MongoDB</p>
          <p><span className="font-medium text-white">Tools:</span> Git, GitHub</p>
        </div>

      </div>
    </motion.main>
  );
};

export default Skills;