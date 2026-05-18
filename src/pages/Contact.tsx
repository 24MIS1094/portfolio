import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.main
      className="min-h-[calc(100vh-5rem)] bg-[#010101] px-6 py-16 text-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/20 bg-black/30 p-6 md:p-10">
        <h1 className="text-3xl font-semibold md:text-4xl">Contact</h1>

        <div className="mt-6 space-y-3 text-white/85">
          <p>
            Phone:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="tel:+919391143279">
              +91 93911 43279
            </a>
          </p>
          <p><a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://wa.me/919391143279" target="_blank" rel="noreferrer">WhatsApp</a></p>
          <p><a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://github.com/24MIS1094" target="_blank" rel="noreferrer">GitHub</a></p>
          <p><a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://www.linkedin.com/in/arjun-yn-420bb731a" target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p><a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://www.instagram.com/iam_always_arjun" target="_blank" rel="noreferrer">Instagram</a></p>
        </div>

      </div>
    </motion.main>
  );
};

export default Contact;