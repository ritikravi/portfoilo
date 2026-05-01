import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';

const links = ['About', 'Projects', 'Skills', 'Experience', 'Blog', 'Contact'];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="font-bold text-lg tracking-tight">
          <span className="gradient-text">RR</span>
          <span className="text-[var(--muted)] font-light ml-1 text-sm">/ dev</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors duration-200 font-medium"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--card)] transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            Resume
          </a>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--muted)]"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(link => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left text-[var(--muted)] hover:text-[var(--fg)] transition-colors font-medium"
                >
                  {link}
                </button>
              ))}
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-2 rounded-full text-sm font-medium bg-[var(--accent)] text-white"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
