# Ritik Raushan — Developer Portfolio

> Full Stack Developer · AI Enthusiast · IoT Builder  
> Built with React + Node.js + MongoDB

🌐 **Live:** Coming soon  
📧 **Contact:** ritikravi7724@gmail.com  
🔗 **LinkedIn:** [ritik-raushan-626584383](https://www.linkedin.com/in/ritik-raushan-626584383/)  
🐙 **GitHub:** [ritikravi](https://github.com/ritikravi)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Email | Nodemailer (Gmail) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Features

- **Hero** — animated headline, stats, social links
- **About** — story, values, vision
- **Projects** — 6 real projects with case studies (Problem → Solution → Impact), filter by AI / Web / IoT / Robotics
- **Skills** — categorized: AI/ML, MERN, IoT/Embedded, Tools
- **Experience** — hackathon wins, achievements, RISC Club
- **Blog** — 6 full technical posts
- **Contact** — form with email notification to owner + auto-reply to sender
- **AI Chatbot** — knows all projects and skills
- **Admin Dashboard** — manage projects, read messages, change password, deploy guide
- **Dark / Light mode** — persisted to localStorage
- **Resume** — downloadable HTML resume at `/resume.html`

---

## Projects Showcased

| Project | Category | Live |
|---------|----------|------|
| [HackAI](https://github.com/ritikravi/hackAI) | AI / MERN | [hackai-seven.vercel.app](https://hackai-seven.vercel.app) |
| [LectureAI](https://github.com/ritikravi/SMART-MIC) | AI / IoT | — |
| [Smart Attendance System](https://github.com/ritikravi/smart_attendance_system_2) | Flutter / MERN | — |
| [Secure E-Voting](https://github.com/ritikravi/secure-e-voting-system) | Blockchain | — |
| [AttendX](https://github.com/ritikravi/AttendX-backend) | Flutter / Node.js | [Render](https://attendx-backend-gsvi.onrender.com) |
| [LMS System](https://github.com/ritikravi/lms-system) | MERN | [lms-system-rose.vercel.app](https://lms-system-rose.vercel.app) |

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone
```bash
git clone https://github.com/ritikravi/portfoilo.git
cd portfoilo
```

### 2. Backend
```bash
cd server
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm install
npm run dev
# Runs on http://localhost:5001
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5175
```

---

## Environment Variables

### Server (`server/.env`)
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your_password
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5175
```

### Client (`client/.env`) — production only
```env
VITE_API_URL=https://your-render-url.onrender.com
```

---

## Deploy to Production

**Backend → [Render.com](https://render.com)**
- Root Dir: `server`
- Build: `npm install`
- Start: `node index.js`
- Add all env vars in Render dashboard

**Frontend → [Vercel.com](https://vercel.com)**
- Root Dir: `client`
- Framework: Vite
- Add env: `VITE_API_URL=https://your-render-url.onrender.com`

**Database → [MongoDB Atlas](https://cloud.mongodb.com)**
- Free tier, whitelist `0.0.0.0/0`
- Set connection string as `MONGO_URI` on Render

---

## Admin Dashboard

Access at `/admin` — or triple-click the copyright text in the footer.

- **Overview** — stats + quick links
- **Projects** — add / delete projects dynamically
- **Messages** — all contact form submissions
- **Settings** — change password + deploy guide

---

## Achievements

- 🏆 **2nd Place — SemiXthon'26** @ Delhi Technological University
- 🏆 **Intelligent Document AI Hackathon** @ IIT Guwahati
- ⚡ **7+ Hackathons** participated
- 🔬 **RISC Club** — Active Member @ LPU

---

## License

MIT — free to use and modify.

---

*Built by [Ritik Raushan](https://github.com/ritikravi)*
