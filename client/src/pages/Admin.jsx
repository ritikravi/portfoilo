import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { HiLogout, HiPlus, HiTrash, HiMail, HiEye, HiExternalLink, HiCog } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function LoginForm({ onLogin }) {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', creds);
      localStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg)]">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-black gradient-text mb-2">Admin</div>
          <p className="text-sm text-[var(--muted)]">Portfolio Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required placeholder="Email" value={creds.email}
            onChange={e => setCreds(c => ({ ...c, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] text-sm" />
          <input type="password" required placeholder="Password" value={creds.password}
            onChange={e => setCreds(c => ({ ...c, password: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] text-sm" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function ProjectForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '', tagline: '', description: '', problem: '', solution: '', impact: '',
    category: 'AI', tags: '', techStack: '', github: '', demo: '', featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      };
      await api.post('/api/projects', payload, { headers: { Authorization: `Bearer ${token}` } });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Check all required fields.');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: 'title', label: 'Title *', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'problem', label: 'Problem', type: 'textarea' },
    { key: 'solution', label: 'Solution', type: 'textarea' },
    { key: 'impact', label: 'Impact', type: 'textarea' },
    { key: 'tags', label: 'Tags (comma separated)', type: 'text' },
    { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'text' },
    { key: 'github', label: 'GitHub URL', type: 'text' },
    { key: 'demo', label: 'Demo URL', type: 'text' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map(({ key, label, type }) => (
          <div key={key} className={type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1">{label}</label>
            {type === 'textarea' ? (
              <textarea rows={3} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none" />
            ) : (
              <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]" />
            )}
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1">Category *</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]">
            {['AI', 'Web', 'IoT', 'Robotics'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3 pt-5">
          <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
          <label htmlFor="featured" className="text-sm text-[var(--fg)]">Featured project</label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Project'}
        </button>
        <button type="button" onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
          Cancel
        </button>
      </div>
      {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
    </form>
  );
}

function ChangePassword({ token, onLogout }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) { setStatus('error'); setMsg('Passwords do not match'); return; }
    if (form.newPassword.length < 6) { setStatus('error'); setMsg('Min 6 characters'); return; }
    setStatus('loading');
    try {
      await api.post('/api/auth/change-password',
        { currentPassword: form.currentPassword, newPassword: form.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('success');
      setMsg('Password updated! Logging out...');
      setTimeout(() => onLogout(), 2000);
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="font-bold text-[var(--fg)] mb-4">🔑 Change Admin Password</h3>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        {['currentPassword', 'newPassword', 'confirm'].map((key, i) => (
          <div key={key}>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1">
              {['Current Password', 'New Password', 'Confirm New Password'][i]}
            </label>
            <input type="password" required value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
          </div>
        ))}
        {msg && <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}
        <button type="submit" disabled={status === 'loading'}
          className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
          {status === 'loading' ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [tab, setTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [addingProject, setAddingProject] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjects = async () => {
    try { const { data } = await api.get('/api/projects'); setProjects(data); } catch {}
  };

  const fetchMessages = async () => {
    try { const { data } = await api.get('/api/contact', authHeaders); setMessages(data); } catch {}
  };

  useEffect(() => {
    if (!token) return;
    fetchProjects();
    fetchMessages();
  }, [token]);

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/api/projects/${id}`, authHeaders);
    fetchProjects();
  };

  const markRead = async (id) => {
    await api.patch(`/api/contact/${id}/read`, {}, authHeaders);
    fetchMessages();
  };

  const logout = () => { localStorage.removeItem('admin_token'); setToken(null); };

  if (!token) return <LoginForm onLogin={setToken} />;

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Dashboard</h1>
            <p className="text-sm text-[var(--muted)]">Manage your portfolio content</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            <HiLogout size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'projects', label: 'Projects' },
            { id: 'messages', label: 'Messages', badge: unread },
            { id: 'settings', label: 'Settings' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${tab === t.id ? 'bg-[var(--accent)] text-white' : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]'}`}>
              {t.label}
              {t.badge > 0 && <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs">{t.badge}</span>}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Projects', value: projects.length, color: 'text-violet-400' },
                { label: 'Featured', value: projects.filter(p => p.featured).length, color: 'text-amber-400' },
                { label: 'Total Messages', value: messages.length, color: 'text-blue-400' },
                { label: 'Unread', value: unread, color: 'text-red-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                  <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
                  <div className="text-xs text-[var(--muted)]">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <h3 className="font-bold text-[var(--fg)] mb-4">Quick Links</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { label: 'View Portfolio', href: '/', icon: HiExternalLink, desc: 'See how it looks live' },
                  { label: 'GitHub Profile', href: 'https://github.com/ritikravi', icon: FaGithub, desc: 'github.com/ritikravi', external: true },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ritik-raushan-626584383/', icon: FaLinkedin, desc: 'linkedin.com/in/ritik-raushan', external: true },
                  { label: 'HackAI Live', href: 'https://hackai-seven.vercel.app', icon: HiExternalLink, desc: 'hackai-seven.vercel.app', external: true },
                  { label: 'LMS System', href: 'https://lms-system-rose.vercel.app', icon: HiExternalLink, desc: 'lms-system-rose.vercel.app', external: true },
                  { label: 'Resume', href: '/resume.html', icon: HiExternalLink, desc: 'View / Download resume' },
                ].map(({ label, href, icon: Icon, desc, external }) => (
                  <a key={label} href={href} target={external ? '_blank' : '_self'} rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all group">
                    <Icon size={16} className="text-[var(--accent)] shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">{label}</div>
                      <div className="text-xs text-[var(--muted)]">{desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {unread > 0 && (
              <div className="p-6 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <h3 className="font-bold text-[var(--fg)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  {unread} unread message{unread > 1 ? 's' : ''}
                </h3>
                {messages.filter(m => !m.read).slice(0, 2).map(m => (
                  <div key={m._id} className="mb-3 p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-[var(--fg)]">{m.name}</span>
                      <span className="text-xs text-[var(--muted)]">{m.email}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] truncate">{m.message}</p>
                  </div>
                ))}
                <button onClick={() => setTab('messages')} className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
                  View all messages →
                </button>
              </div>
            )}
          </div>
        )}

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[var(--fg)]">Projects ({projects.length})</h2>
              <button onClick={() => setAddingProject(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <HiPlus size={16} /> Add Project
              </button>
            </div>
            {addingProject && (
              <div className="mb-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                <h3 className="font-bold text-[var(--fg)] mb-4">New Project</h3>
                <ProjectForm onSave={() => { setAddingProject(false); fetchProjects(); }} onCancel={() => setAddingProject(false)} />
              </div>
            )}
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p._id || p.id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div>
                    <div className="font-semibold text-[var(--fg)] text-sm">{p.title}</div>
                    <div className="text-xs text-[var(--muted)]">{p.category} · {p.featured ? 'Featured' : 'Regular'}</div>
                  </div>
                  {p._id && (
                    <button onClick={() => deleteProject(p._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <HiTrash size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div>
            <h2 className="font-bold text-[var(--fg)] mb-6">Messages ({messages.length})</h2>
            <div className="space-y-3">
              {messages.map(m => (
                <div key={m._id} className={`p-5 rounded-xl border ${m.read ? 'border-[var(--border)] bg-[var(--card)]' : 'border-[var(--accent)]/30 bg-[var(--accent)]/5'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-sm text-[var(--fg)]">{m.name}</span>
                        <span className="text-xs text-[var(--muted)]">{m.email}</span>
                        {!m.read && <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">New</span>}
                      </div>
                      {m.subject && <div className="text-xs text-[var(--muted)] mb-2">Re: {m.subject}</div>}
                      <p className="text-sm text-[var(--fg)]">{m.message}</p>
                      <div className="text-xs text-[var(--muted)] mt-2">{new Date(m.createdAt).toLocaleDateString()}</div>
                    </div>
                    {!m.read && (
                      <button onClick={() => markRead(m._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors shrink-0">
                        <HiEye size={12} /> Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-12 text-[var(--muted)]">
                  <HiMail size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No messages yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div className="space-y-6">
            <ChangePassword token={token} onLogout={logout} />
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <h3 className="font-bold text-[var(--fg)] mb-4 flex items-center gap-2"><HiCog size={16} /> Go-Live Checklist</h3>
              <div className="space-y-3">
                {[
                  { done: true,  label: 'Gmail App Password set', note: 'Contact form emails working' },
                  { done: true,  label: 'MongoDB connected', note: 'Local MongoDB running' },
                  { done: false, label: 'Switch to MongoDB Atlas', note: 'Update MONGO_URI in .env for production' },
                  { done: false, label: 'Deploy backend to Render', note: 'Free tier at render.com' },
                  { done: false, label: 'Deploy frontend to Vercel', note: 'Free tier at vercel.com' },
                  { done: false, label: 'Set VITE_API_URL on Vercel', note: 'Point to your Render backend URL' },
                  { done: false, label: 'Set CLIENT_URL on Render', note: 'Set to your Vercel domain' },
                  { done: false, label: 'Change ADMIN_PASSWORD', note: 'Use a strong password in production' },
                ].map(({ done, label, note }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${done ? 'bg-green-500/20 text-green-400' : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]'}`}>
                      {done ? '✓' : '○'}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${done ? 'text-[var(--fg)]' : 'text-[var(--muted)]'}`}>{label}</div>
                      <div className="text-xs text-[var(--muted)]">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <h3 className="font-bold text-[var(--fg)] mb-4">Deploy to Production</h3>
              <div className="space-y-5 text-xs text-[var(--muted)]">
                {[
                  { step: '1. Backend → Render.com', items: ['Push portfolio/server to GitHub', 'New Web Service → Root Dir: server', 'Build: npm install · Start: node index.js', 'Add all .env vars in Render dashboard'] },
                  { step: '2. Frontend → Vercel.com', items: ['Push portfolio/client to GitHub', 'Import on Vercel → Framework: Vite → Root Dir: client', 'Add env: VITE_API_URL=https://your-render-url.onrender.com'] },
                  { step: '3. MongoDB Atlas (free)', items: ['Create cluster at cloud.mongodb.com', 'Whitelist 0.0.0.0/0 in Network Access', 'Copy connection string → set as MONGO_URI in Render'] },
                ].map(({ step, items }) => (
                  <div key={step}>
                    <div className="text-sm font-semibold text-[var(--accent)] mb-2">{step}</div>
                    {items.map(item => <p key={item} className="mb-1">• {item}</p>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
