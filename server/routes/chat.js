const router = require('express').Router();

// Static AI chatbot responses about the portfolio
const knowledge = {
  projects: [
    { name: 'HackAI', desc: 'AI-powered placement intelligence system built with MERN + OpenAI. Helps students prepare smarter for placements by analyzing job descriptions and generating personalized roadmaps.' },
    { name: 'AI Lecture Assistant', desc: 'Converts speech to structured, topic-wise notes using NLP. Helps students never miss key concepts from lectures.' },
    { name: 'MediVue', desc: 'IoT healthcare monitoring system for elderly using ESP32. Tracks vitals in real-time and sends alerts to caregivers.' },
    { name: 'Line Follower Robot', desc: 'Autonomous robot using IR sensors and PID control. Built from scratch with Arduino.' },
    { name: 'Bluetooth RC Car', desc: 'Remote-controlled car via Bluetooth using ESP32 and a custom mobile app.' },
  ],
  skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'OpenAI API', 'ESP32', 'Arduino', 'TailwindCSS', 'Machine Learning', 'IoT'],
  achievements: ['2nd place at SemiXthon\'26 Hackathon at DTU', 'Full Stack Developer with AI + IoT expertise', 'Community leader and mentor'],
};

function generateResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('hackai') || msg.includes('placement') || msg.includes('agentic')) {
    return `HackAI is an autonomous placement intelligence system — not just a chatbot. It uses Groq LLaMA 3.3 70B to predict placement probability, run mock interviews, generate personalized daily tasks via cron agents, and auto-intervene when a student is at risk. It also generates ATS-friendly resumes from real GitHub + LeetCode data, matched to live job listings. Live at hackai-seven.vercel.app`;
  }
  if (msg.includes('lectureai') || msg.includes('lecture') || msg.includes('smart mic') || msg.includes('whisper') || msg.includes('notes')) {
    return `LectureAI records or uploads lecture audio, transcribes it with Groq Whisper, then uses LLaMA 3.3 to generate summaries, flashcards, quizzes, mind maps, glossaries, and a RAG-style chat. It also supports an ESP32 smart mic that streams PCM audio over WiFi directly to the server. GitHub: github.com/ritikravi/SMART-MIC`;
  }
  if (msg.includes('attendance') || msg.includes('smart attendance') || msg.includes('school')) {
    return `Smart Attendance System is a production-ready school management platform — Flutter mobile app + Node.js + MongoDB backend. Role-based auth (Admin, Teacher, Student, Parent), daily attendance tracking, marks, fees, leave requests, Cloudinary study materials, and PDF reports. Built for real per-school deployment with PM2.`;
  }
  if (msg.includes('voting') || msg.includes('blockchain') || msg.includes('evoting') || msg.includes('solidity')) {
    return `Secure E-Voting System is a decentralized voting platform on Ethereum. Solidity smart contracts store votes immutably on-chain. React + ethers.js + MetaMask for transaction signing. JWT + OTP auth ensures one-voter-one-vote. Built as a hackathon prototype. GitHub: github.com/ritikravi/secure-e-voting-system`;
  }
  if (msg.includes('attendx') || msg.includes('detention') || msg.includes('predictor')) {
    return `AttendX is a Flutter app that predicts attendance percentage and warns students before they hit detention thresholds. Custom prediction engine calculates max skippable classes and recovery plan. OTP email auth, per-subject tracking, dark/light theme. Backend live on Render. GitHub: github.com/ritikravi/AttendX-backend`;
  }
  if (msg.includes('lms') || msg.includes('library') || msg.includes('lpu library')) {
    return `LMS System is a full-stack Library Management System inspired by LPU's central library. Student portal (search, issue, renew, fines, e-resources) + Admin panel. Auto daily fine calculation via cron (₹2/day), email notifications, JWT refresh tokens. Live at lms-system-rose.vercel.app`;
  }
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
    return `Skills span: AI/ML (Groq, LLaMA 3.3, Whisper, Agentic AI), MERN Stack (React 18, Node.js, Express, MongoDB), IoT & Embedded (ESP32, Arduino, Raspberry Pi, I2S audio), and tools like Flutter, Solidity, Hardhat, Vercel, Render, PM2.`;
  }
  if (msg.includes('hackathon') || msg.includes('achievement') || msg.includes('dtu') || msg.includes('semixthon')) {
    return `Won 2nd place at SemiXthon'26 at DTU. Also participated in the Intelligent Document AI Hackathon at IIT Guwahati. Overall 7+ hackathons participated — always shipped a working product. Active member of RISC Club at LPU.`;
  }
  if (msg.includes('community') || msg.includes('club') || msg.includes('risc') || msg.includes('lpu')) {
    return `Active member of RISC Club (Research, Innovation & Science Club) at Lovely Professional University. Participated in 7+ hackathons and working toward GDSC Lead role to build a stronger developer community on campus.`;
  }
  if (msg.includes('contact') || msg.includes('hire') || msg.includes('reach') || msg.includes('email')) {
    return `Reach out at ritikravi7724@gmail.com or connect on LinkedIn: linkedin.com/in/ritik-raushan-626584383. Open to AI/Full Stack internships, GDSC Lead opportunities, and interesting collaborations.`;
  }
  if (msg.includes('about') || msg.includes('who') || msg.includes('introduce') || msg.includes('ritik')) {
    return `Ritik Raushan — Full Stack Developer and AI enthusiast at Lovely Professional University, Punjab. Builds across AI, Web, and Hardware. 6 production projects shipped, 2nd place at DTU hackathon, mentored 100+ students. GitHub: github.com/ritikravi`;
  }
  if (msg.includes('github')) {
    return `GitHub: github.com/ritikravi — 6 pinned projects including HackAI, LectureAI, Smart Attendance System, Secure E-Voting, AttendX, and LMS System.`;
  }
  if (msg.includes('blog') || msg.includes('writing')) {
    return `The blog covers real project learnings — building agentic AI systems, connecting ESP32 to Node.js, and lessons from blockchain development. Check the Blog section for the latest posts.`;
  }

  return `I can tell you about Ritik's projects (HackAI, LectureAI, Smart Attendance, E-Voting, AttendX, LMS), skills, achievements, or how to get in touch. What would you like to know?`;
}

router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });
  const response = generateResponse(message);
  res.json({ response });
});

module.exports = router;
