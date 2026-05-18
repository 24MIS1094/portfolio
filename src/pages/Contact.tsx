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
          <p>
            Phone:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="tel:+919391143279">
              +91 93911 43279
            </a>
          </p>
          <p>
            WhatsApp:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://wa.me/919391143279" target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://github.com/24MIS1094" target="_blank" rel="noreferrer">
              github.com/24MIS1094
            </a>
          </p>
          <p>
            LinkedIn:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://www.linkedin.com/in/arjun-yn-420bb731a" target="_blank" rel="noreferrer">
              /in/arjun-yn-420bb731a
            </a>
          </p>
          <p>
            Instagram:{' '}
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="https://www.instagram.com/iam_always_arjun" target="_blank" rel="noreferrer">
              @iam_always_arjun
            </a>
          </p>
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