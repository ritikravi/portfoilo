import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();

  const handleSecretClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) {
      setClicks(0);
      navigate('/admin');
    }
  };

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div
          className="text-sm text-[var(--muted)] cursor-default select-none"
          onClick={handleSecretClick}
          title=""
        >
          © 2026 <span className="text-[var(--fg)] font-medium">Ritik Raushan</span> · Built with React + Node.js
        </div>
        <div className="flex items-center gap-5">
          {[
            { icon: FaGithub, href: 'https://github.com/ritikravi', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ritik-raushan-626584383/', label: 'LinkedIn' },
            { icon: FaTwitter, href: 'https://x.com/ritikravi7724', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
