import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiClock } from 'react-icons/hi';
import { blogs } from '../data/portfolio';

const fullContent = {
  'hackai-agentic-ai': {
    sections: [
      {
        heading: 'The Problem I Was Trying to Solve',
        body: `Every student I knew was preparing for placements the same way — grinding LeetCode randomly, sending out generic resumes, and hoping for the best. There was no intelligence in the process. No feedback loop. No personalization.\n\nI wanted to build something that actually thinks — not just a dashboard that shows data, but a system that acts on it.`,
      },
      {
        heading: 'Why "Agentic AI" and Not Just a Chatbot',
        body: `Most AI tools are reactive. You ask, they answer. HackAI is different — it runs on a cron schedule every morning at 7AM, scans every student's profile, detects risk, and takes action without anyone pressing a button.\n\nIf a student has fewer than 3 skills, zero applications, and hasn't logged in for 5 days — the system classifies them as HIGH RISK and automatically assigns urgent tasks, sends alerts to both the student and admin, and logs the intervention. No human needed.`,
      },
      {
        heading: 'The Tech Stack Decision',
        body: `I chose Groq's LLaMA 3.3 70B over OpenAI for one reason: it's free at 14,400 requests/day and blazing fast. For a hackathon project that needs to run parallel LLM calls (resume generation fires 3 simultaneous Groq calls), this was the right call.\n\nFor real job data, I integrated JSearch via RapidAPI — it pulls live listings from LinkedIn, Indeed, Glassdoor, and ZipRecruiter. The trending skills on the market insights page aren't hardcoded — they're calculated dynamically by counting skill keyword frequency across all fetched job descriptions.`,
      },
      {
        heading: 'The Resume Generator — The Hardest Feature',
        body: `This took the most time. The idea: give it your GitHub username and LeetCode handle, and it generates a complete ATS-friendly resume tailored to a specific job.\n\nGitHub REST API fetches your repos, languages, stars, and top projects. LeetCode GraphQL API (unofficial, no key needed) fetches problems solved, ranking, and topic breakdown. Then 3 parallel Groq calls generate the resume, suggestions, and a 4-week roadmap simultaneously.\n\nThe job-aware mode was the killer feature — search real jobs, select a target role, and the system calculates your match score and auto-assigns learning tasks to your dashboard for the missing skills.`,
      },
      {
        heading: 'What I Learned',
        body: `Ship the core loop first. The autonomous agent was the last thing I built but the most impressive thing in the demo. I almost didn't build it because it felt complex — but it took only 2 hours once the foundation was solid.\n\nAlso: real data beats mock data every time. Using actual GitHub repos and live job listings made the demo feel real in a way that seeded data never could.`,
      },
    ],
  },
  'esp32-lecture-ai': {
    sections: [
      {
        heading: 'Why I Built a Physical Microphone',
        body: `Browser recording works fine for demos. But I wanted to push further — what if the microphone was a dedicated IoT device that automatically streams to the server whenever you walk into a lecture hall?\n\nThat's the ESP32 Smart Mic. You power it on, it connects to WiFi, and it starts streaming raw PCM audio to the Node.js server in 32KB chunks. No app, no button, no friction.`,
      },
      {
        heading: 'The Hardware Setup',
        body: `The INMP441 is an I2S MEMS microphone — cheap (~$2), accurate, and perfect for ESP32. Wiring is straightforward: VDD to 3.3V, GND to GND, SD to GPIO 32, SCK to GPIO 14, WS to GPIO 15, and L/R to GND for mono.\n\nThe firmware reads I2S audio in 32KB chunks and POSTs each chunk as binary (application/octet-stream) to /api/audio with a stream ID header. The server buffers chunks in memory, and on the final chunk, assembles a proper WAV file (16kHz, 16-bit mono).`,
      },
      {
        heading: 'The Server-Side Pipeline',
        body: `Node.js receives the binary chunks, buffers them per stream ID in a Map, and on finalization writes the WAV header + PCM data to disk. Then Groq Whisper (whisper-large-v3-turbo) transcribes it — fast, multilingual, handles accents well.\n\nThe transcript goes to LLaMA 3.3 70B which generates 12+ study outputs in one prompt: summary, key concepts, formulas, mind map, glossary, flashcards, quiz, action items, related topics, study questions, ELI5, and a RAG-style chat context.`,
      },
      {
        heading: 'Live Lecture Mode',
        body: `The browser recording mode chunks audio every 30 seconds via MediaRecorder. Every 5 minutes (10 chunks), the server generates a mini-summary and pushes it to the frontend via Socket.io. When you end the lecture, a final comprehensive summary is generated from the full transcript.\n\nThis means you get real-time feedback during a 2-hour lecture — not just a wall of text at the end.`,
      },
      {
        heading: 'What I Would Do Differently',
        body: `The ESP32 streaming works but has one weakness: if WiFi drops mid-lecture, the stream is lost. Next version would buffer chunks to SD card on the device and retry uploads. Also, adding speaker diarization (who said what) would make the transcripts significantly more useful for group discussions.`,
      },
    ],
  },
  'blockchain-evoting': {
    sections: [
      {
        heading: 'Why Blockchain for Voting?',
        body: `Traditional digital voting systems have a fundamental problem: you have to trust the server. The database can be modified, logs can be deleted, and results can be manipulated without any public audit trail.\n\nBlockchain solves this with immutability. Once a vote is recorded on-chain, it cannot be changed — not by the admin, not by the developer, not by anyone. Every vote is publicly verifiable.`,
      },
      {
        heading: 'The Architecture',
        body: `The system has three layers: Ethereum smart contract (Solidity + Hardhat) for immutable vote storage, Node.js + MongoDB backend for voter authentication and registration, and React + ethers.js frontend for the voting interface.\n\nThe smart contract stores candidates and vote counts. Only registered voters (verified by the backend) can call the vote() function. MetaMask signs the transaction — the voter's wallet is the proof of identity.`,
      },
      {
        heading: 'The Voter Flow',
        body: `Register with Voter ID → Login with OTP (simulated as 123456 for the prototype) → Connect MetaMask wallet → Select candidate → Sign transaction → Vote recorded on-chain.\n\nResults are fetched directly from the blockchain — not from a database. This means even if the entire backend goes down, the results are still publicly accessible on-chain.`,
      },
      {
        heading: 'What I Learned About Solidity',
        body: `Solidity is unforgiving. There's no "undo" on a deployed contract — if there's a bug, you redeploy and lose all state. I learned to write thorough tests with Hardhat before any deployment.\n\nThe biggest gotcha: gas costs. Every state-changing function costs ETH. For a real election system, you'd want to use a Layer 2 solution (Polygon, Arbitrum) or a private chain to make voting free for users.`,
      },
      {
        heading: 'Limitations of the Prototype',
        body: `This was built for a hackathon — it runs on a local Hardhat chain, not mainnet. For production, you'd need: a deployed contract on a public testnet, proper OTP via email/SMS (not hardcoded), MetaMask mobile support, and a more robust voter registration system with government ID verification.\n\nBut as a proof of concept demonstrating the full Web3 + Web2 integration, it works exactly as intended.`,
      },
    ],
  },
  'lms-mern': {
    sections: [
      {
        heading: 'Why Build Another Library System?',
        body: `LPU's central library portal is functional but dated. I wanted to rebuild it from scratch using modern tooling — not as a clone, but as a learning exercise in building a real multi-role system with proper auth, cron jobs, and deployment.\n\nThe goal was to ship something that could actually be used by a real institution, not just a portfolio demo.`,
      },
      {
        heading: 'JWT Refresh Tokens — Why They Matter',
        body: `Most tutorials use a single JWT with a long expiry. That's a security risk — if the token is stolen, the attacker has access until it expires.\n\nI implemented a proper access + refresh token system: access tokens expire in 15 minutes, refresh tokens in 7 days. The frontend uses TanStack Query with an axios interceptor that automatically refreshes the access token on 401 responses. Seamless for the user, secure under the hood.`,
      },
      {
        heading: 'Cron Jobs for Automatic Fine Calculation',
        body: `The fine system was the most interesting backend feature. Every day at midnight, a node-cron job runs through all active issues, checks if the due date has passed, and adds ₹2 per overdue day to the student's fine balance.\n\nThe tricky part was idempotency — making sure the cron doesn't double-charge if it runs twice. I solved this by storing the last fine calculation date on each issue record and only charging for days not yet accounted for.`,
      },
      {
        heading: 'TanStack Query + Zustand — The Right State Split',
        body: `I used TanStack Query for all server state (books, issues, fines) and Zustand for client state (auth, UI preferences). This is the right split — TanStack handles caching, background refetching, and loading states automatically, while Zustand stays lean for things that don't need to hit the server.\n\nThe result: the UI feels instant. Book searches are cached, admin dashboards update in the background, and there's no prop drilling anywhere.`,
      },
      {
        heading: 'Deploying on Vercel + Render',
        body: `Frontend on Vercel, backend on Render's free tier. The main gotcha with Render free tier: the server spins down after 15 minutes of inactivity and takes ~30 seconds to cold start.\n\nFor a production system, you'd want a paid tier or a keep-alive ping. For a portfolio project, it's fine — and it taught me to always show a loading state rather than assuming instant responses.`,
      },
    ],
  },
  'smart-attendance-flutter': {
    sections: [
      {
        heading: 'Why Flutter for a School System?',
        body: `React Native was the obvious choice given my JS background, but I chose Flutter for one reason: a single codebase that compiles to Android, iOS, and Web with near-native performance. For a school system that needs to run on cheap Android phones, Flutter's rendering engine is a significant advantage.\n\nIt also forced me to learn Dart — which turned out to be a clean, strongly-typed language that I actually enjoy writing.`,
      },
      {
        heading: 'Role-Based Architecture',
        body: `The system has four roles: Admin, Teacher, Student, and Parent. Each role sees a completely different app — different navigation, different data, different permissions.\n\nOn the backend, every route is protected by two middleware layers: JWT verification (are you logged in?) and role guard (are you allowed to do this?). On the frontend, Flutter's Navigator checks the user's role on login and routes to the correct home screen.`,
      },
      {
        heading: 'Per-School Deployment Model',
        body: `This was the most interesting architectural decision. Rather than a multi-tenant SaaS model (one database, multiple schools), I went with isolated deployments — each school gets its own VPS and MongoDB Atlas cluster.\n\nThe Flutter APK is built with --dart-define=API_URL=https://api.schoolname.com so each school's app points to their own backend. More operational overhead, but complete data isolation — important for schools that are sensitive about student data.`,
      },
      {
        heading: 'Auto-Generated Student Credentials',
        body: `When an admin adds a student, the system auto-generates a login ID in the format STU-CLASS-ROLLNO (e.g., STU-10A-1) and a temporary password shown once to the admin. The student must change it on first login.\n\nThis mirrors how real school systems work — students don't register themselves, the institution provisions their accounts. Small detail, but it makes the system feel production-ready rather than demo-ready.`,
      },
    ],
  },
  'attendx-prediction': {
    sections: [
      {
        heading: 'The Problem Every LPU Student Has',
        body: `LPU has a strict 75% attendance requirement. Fall below it and you're detained — can't sit for exams. Every student mentally tracks "how many classes can I skip?" but the math is surprisingly non-trivial when you have different subjects with different totals.\n\nI built AttendX to answer that question precisely, per subject, in real time.`,
      },
      {
        heading: 'The Prediction Math',
        body: `Two core formulas power the engine:\n\nMax skippable classes: floor((attended × 100 / threshold) - total)\n\nClasses needed to recover: ceil((threshold × total / 100 - attended) / (1 - threshold / 100))\n\nThe first tells you how many more classes you can miss without falling below threshold. The second tells you how many consecutive classes you must attend to get back above threshold if you've already fallen below.\n\nBoth update in real time as you mark attendance.`,
      },
      {
        heading: 'Status System: Safe / Warning / Danger',
        body: `Three states per subject:\n\nSafe: you're above threshold with room to spare.\nWarning: you're above threshold but have ≤2 skips remaining — one bad week and you're in trouble.\nDanger: you're already below threshold — recovery mode activated.\n\nThe warning state was the key insight. Most apps just show a red/green indicator. The warning state gives students a heads-up before it's too late — which is the whole point.`,
      },
      {
        heading: 'OTP Auth — Why Not Just Password?',
        body: `Students forget passwords constantly. OTP-based email registration means no password to forget — just verify your email and you're in. JWT handles session persistence via shared_preferences on the device.\n\nI used Brevo (formerly Sendinblue) for email delivery — free tier, reliable, and easy to integrate with Node.js via Nodemailer.`,
      },
      {
        heading: 'Collaborating with Nilesh',
        body: `AttendX was my first real collaboration. Nilesh Gupta handled parts of the Flutter UI while I built the backend and prediction engine. Working with another developer taught me to write cleaner API contracts — when someone else is consuming your endpoints, vague responses aren't acceptable.\n\nWe used GitHub branches and PRs for the first time on this project. Small thing, but it changed how I think about code organization.`,
      },
    ],
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.slug === slug);
  const content = fullContent[slug];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="text-4xl mb-4">404</div>
          <p className="text-[var(--muted)] mb-6">Post not found</p>
          <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/#blog')}
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-10"
        >
          <HiArrowLeft size={16} /> Back to blog
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--fg)] leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-8 pb-8 border-b border-[var(--border)]">
            <span className="flex items-center gap-1.5"><HiClock size={14} /> {blog.readTime} min read</span>
            <span>{blog.date}</span>
            <span>by <span className="text-[var(--fg)] font-medium">Ritik Raushan</span></span>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 italic">
            {blog.excerpt}
          </p>
        </motion.div>

        {/* Content */}
        {content ? (
          <div className="space-y-10">
            {content.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h2 className="text-xl font-bold text-[var(--fg)] mb-3">{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-[var(--muted)] leading-relaxed mb-4">{para}</p>
                ))}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">Full post coming soon.</p>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <button onClick={() => navigate('/#blog')} className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            <HiArrowLeft size={14} /> All posts
          </button>
          <a href="mailto:ritikravi7724@gmail.com" className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
            Discuss this post →
          </a>
        </div>
      </div>
    </div>
  );
}
