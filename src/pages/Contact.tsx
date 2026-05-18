import { motion } from 'framer-motion';
import React, { useState } from 'react';

type FormState = { name: string; email: string; message: string };

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg('Please enter a valid email address.');
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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again later.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="min-h-[calc(100vh-5rem)] bg-[#010101] px-6 py-20 text-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Contact</h1>
        <p className="text-sm text-white/60 mb-4">Send me a message — I usually reply within a few days.</p>

        <div className="mb-6 space-y-2 text-white/85">
          <div className="mb-6 flex flex-col gap-3">
            {/* Phone */}
            <a href="tel:+919391143279" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V21a1 1 0 0 1-1.09 1 19 19 0 0 1-8.63-3.07 19 19 0 0 1-6-6A19 19 0 0 1 2 3.09 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.64.33 1.58.62 2.69a1 1 0 0 1-.24 1l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a1 1 0 0 1 1-.24c1.11.29 2.05.5 2.69.62a1 1 0 0 1 .75 1V22z" fill="currentColor" />
                </svg>
              </span>
              <span className="text-sm">+91 93911 43279</span>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/919391143279" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#25D366' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.36.01 12c0 2.11.55 4.16 1.6 5.95L0 24l6.3-1.65A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.18-3.48-8.52zM12 21.5c-1.9 0-3.77-.5-5.38-1.44l-.38-.22-3.73.98.99-3.63-.24-.37A9.5 9.5 0 1 1 21.5 12 9.49 9.49 0 0 1 12 21.5z" fill="#fff"/>
                  <path d="M17.1 14.3c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-0.2.2-.8.9-1 1.1-.2.2-.3.3-.6.1-0.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.6.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-.6-1.3-.8-1.8-.2-.5-.4-.4-.6-.4-.2 0-.4 0-.6 0-.2 0-.5.1-.7.3-.2.2-.7.7-.7 1.7 0 1.1.8 2.4.9 2.6.1.2 1.5 2.4 3.6 3.4 2.4 1.2 2.4.8 2.9.7.4-.1 1.3-.6 1.5-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z" fill="#fff"/>
                </svg>
              </span>
              <span className="text-sm">Chat on WhatsApp</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/24MIS1094" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#181717' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.03 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.57.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.41-2.7 5.39-5.28 5.67.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" fill="#fff"/>
                </svg>
              </span>
              <span className="text-sm">github.com/24MIS1094</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/arjun-yn-420bb731a" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#0A66C2' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.05h.07c.66-1.25 2.28-2.56 4.7-2.56 5.03 0 5.96 3.31 5.96 7.61V24h-5v-7.63c0-1.82-.03-4.17-2.55-4.17-2.56 0-2.95 2-2.95 4.05V24h-5V8.98z" fill="#fff"/>
                </svg>
              </span>
              <span className="text-sm">/in/arjun-yn-420bb731a</span>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/iam_always_arjun" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'linear-gradient(45deg,#feda75,#d62976,#962fbf,#4f5bd5)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-2.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" fill="#fff"/>
                </svg>
              </span>
              <span className="text-sm">@iam_always_arjun</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b0b0b] border border-white/8 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0b0b0b] border border-white/8 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-md bg-[#0b0b0b] border border-white/8 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Tell me about your project or opportunity"
              required
            />
          </div>

          {errorMsg && <div className="text-sm text-red-400">{errorMsg}</div>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-black font-semibold hover:brightness-95 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && <div className="text-sm text-green-400">Message sent — thank you!</div>}
            {status === 'error' && <div className="text-sm text-red-400">Failed to send message.</div>}
          </div>
        </form>
      </section>
    </motion.main>
  );
};

export default Contact;