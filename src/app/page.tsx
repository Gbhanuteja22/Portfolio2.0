"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PhysicsIDCard from "@/components/hero/PhysicsIDCard";
import DevGreeting from "@/components/hero/DevGreeting";
import DesignerGreeting from "@/components/hero/DesignerGreeting";
import ParticleBackground from "@/components/effects/ParticleBackground";

import LogoLoop from "@/components/ui/LogoLoop";
import ProjectFolder from "@/components/ui/ProjectFolder";
import SkillsBento from "@/components/ui/SkillsBento";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

/* ── Project data ── */
const aiProjects = [
  { title: "GeminiLens" },
  { title: "CodeStory" },
  { title: "DocuMind: RAG AI Assistant" },
  { title: "MyChem Lab" },
  { title: "VisionTrack: Smart Attendance" },
  { title: "WhatsApp Chat Analyzer" },
  { title: "GestureArt" },
];

const fullStackProjects = [
  { title: "Placement Management System" },
  { title: "MediSync" },
  { title: "SwiftShare: P2P File Transfer" },
  { title: "Smart Study Planner" },
  { title: "Voice-Based Search Engine" },
  { title: "Edutube" },
];

const blockchainProjects = [
  { title: "DeFiVault" },
];
/* ── All resume skill logos for LogoLoop (devicon CDN) ── */
const allSkillLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS", title: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", alt: "Azure", title: "Azure" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg", alt: "Anaconda", title: "Anaconda" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", alt: "C", title: "C" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", alt: "CSS3", title: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", alt: "Docker", title: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynatrace/dynatrace-original.svg", alt: "Dynatrace", title: "Dynatrace" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", alt: "Figma", title: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original-wordmark.svg", alt: "Firebase", title: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg", alt: "GitHub", title: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg", alt: "Git", title: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecolab/googlecolab-original.svg", alt: "Google Colab", title: "Google Colab" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", alt: "HTML5", title: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg", alt: "Illustrator", title: "Illustrator" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/inkscape/inkscape-original-wordmark.svg", alt: "Inkscape", title: "Inkscape" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript", title: "JavaScript" },
  { src: "/logos/java.svg", alt: "Java", title: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", alt: "Jenkins", title: "Jenkins" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original-wordmark.svg", alt: "Jira", title: "Jira" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original-wordmark.svg", alt: "jQuery", title: "jQuery" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg", alt: "Jupyter", title: "Jupyter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original-wordmark.svg", alt: "Kubernetes", title: "Kubernetes" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", alt: "Linux", title: "Linux" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original-wordmark.svg", alt: "Matplotlib", title: "Matplotlib" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", alt: "MongoDB", title: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", alt: "MySQL", title: "MySQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg", alt: "Next.js", title: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", alt: "Node.js", title: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", alt: "NumPy", title: "NumPy" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original-wordmark.svg", alt: "OpenCV", title: "OpenCV" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg", alt: "Pandas", title: "Pandas" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", alt: "Photoshop", title: "Photoshop" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", alt: "PHP", title: "PHP" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg", alt: "PostgreSQL", title: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg", alt: "Python", title: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React", title: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", alt: "Scikit-learn", title: "Scikit-learn" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", alt: "Supabase", title: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS", title: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow", title: "TensorFlow" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", title: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", alt: "VS Code", title: "VS Code" },
];

export default function HomePage() {
  const [isDesigner, setIsDesigner] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFlip = useCallback((flipped: boolean) => {
    setIsDesigner(flipped);
  }, []);

  // ── Cross-page hash scroll: when redirected from sub-pages via /#section ──
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      // Wait for DOM to render, then scroll
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("bhanutejagummadevelli@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <ParticleBackground />

      {/* ─── HERO — comfortable spacing below header ─── */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-start px-8 sm:px-12 md:px-20 lg:px-28 pt-28 pb-12"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-start gap-8 md:gap-6 lg:gap-12 mt-4">
          {/* LEFT — Dynamic Greeting — wider to fill space */}
          <div className="w-full md:w-[60%] lg:w-[62%] flex flex-col justify-start py-2 mt-8">
            <AnimatePresence mode="wait">
              {!isDesigner ? (
                <motion.div key="dev" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }}>
                  <DevGreeting />
                </motion.div>
              ) : (
                <motion.div key="designer" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }}>
                  <DesignerGreeting />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Physics ID Card — pulled up to anchor lanyard to header */}
          <div className="w-full md:w-[40%] lg:w-[38%] flex justify-center -mt-24 relative z-[60]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <PhysicsIDCard onFlipChange={handleFlip} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT — Graphic LEFT, Text RIGHT ─── */}
      <section
        id="about"
        className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 py-28 bg-black text-white"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24"
          >
            {/* LEFT — Floating typographic card */}
            <motion.div
              className="flex-shrink-0 w-72 lg:w-80"
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative rounded-2xl p-8 bg-white/[0.05] border border-white/[0.08] shadow-xl shadow-blue-500/5 overflow-hidden">
                {/* Background glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--accent-blue)] opacity-[0.08] blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[var(--accent-indigo)] opacity-[0.05] blur-3xl" />

                <div className="relative space-y-4">
                  <motion.span
                    className="block text-5xl lg:text-6xl font-black text-gradient pb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                    animate={{ y: [0, -12, 0], rotate: [0, -2, 0], scale: [1, 1.03, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Design.
                  </motion.span>
                  <motion.span
                    className="block text-5xl lg:text-6xl font-black text-white/90"
                    style={{ fontFamily: "var(--font-heading)" }}
                    animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  >
                    Code.
                  </motion.span>
                  <motion.span
                    className="block text-4xl lg:text-5xl font-black text-white/20"
                    style={{ fontFamily: "var(--font-heading)" }}
                    animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  >
                    Create.
                  </motion.span>
                </div>

                {/* Decorative bracket */}
                <div className="absolute top-6 right-6 text-blue-500 text-7xl font-mono leading-none drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">{`{`}</div>
                <div className="absolute bottom-6 right-6 text-blue-500 text-7xl font-mono leading-none drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">{`}`}</div>
              </div>
            </motion.div>

            {/* RIGHT — Text */}
            <div className="flex-1 max-w-xl">
              <h2
                className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-white">Engineering logic.</span>
                <br />
                <span className="text-gradient">Designing experiences.</span>
              </h2>

              <div className="space-y-5 text-[15px] text-white/50 leading-relaxed text-justify">
                <p>
                  I am a <span className="text-white/80 font-medium">Computer Science undergrad at MGIT</span>, specializing
                  in <span className="text-white/80 font-medium">full-stack development</span> and <span className="text-white/80 font-medium">Generative AI</span>.
                  Beyond writing clean code, I have a strong foundation in <span className="text-white/80 font-medium">UI/UX design</span>,
                  allowing me to bridge the gap between technical architecture and intuitive user experiences.
                </p>
                <p>
                  Whether I&apos;m training machine learning models or prototyping seamless interfaces,
                  my goal is to build <span className="text-white/80 font-medium">scalable, user-centric products</span> that
                  solve real problems.
                </p>
              </div>

              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-medium
                  bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Explore My Work
                <span className="text-[var(--accent-blue)]">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section
        id="projects"
        className="relative z-10 min-h-screen flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-28 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* All 4 elements as siblings in a single grid row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Projects Title — first grid cell */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start w-full"
            >
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-gradient">Projects</span>
              </h2>
            </motion.div>

            {/* AI & ML Folder */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex flex-col items-center gap-4">
                <ProjectFolder title="AI & ML Projects" count={aiProjects.length} color="#3b82f6" href="/projects/ai-ml" icon="" />
                <p className="text-sm font-semibold text-slate-500 mt-2" style={{ fontFamily: "var(--font-heading)" }}>AI & ML Projects</p>
              </div>
            </motion.div>

            {/* Full Stack Folder */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex flex-col items-center gap-4">
                <ProjectFolder title="Full Stack Projects" count={fullStackProjects.length} color="#8b5cf6" href="/projects/full-stack" icon="" />
                <p className="text-sm font-semibold text-slate-500 mt-2" style={{ fontFamily: "var(--font-heading)" }}>Full Stack Projects</p>
              </div>
            </motion.div>

            {/* Blockchain Folder */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="flex flex-col items-center gap-4">
                <ProjectFolder title="Blockchain Projects" count={blockchainProjects.length} color="#10b981" href="/projects/blockchain" icon="" />
                <p className="text-sm font-semibold text-slate-500 mt-2" style={{ fontFamily: "var(--font-heading)" }}>Blockchain Projects</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── LOGO LOOP — between Projects and Technical Arsenal ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8 bg-black">
        <LogoLoop logos={allSkillLogos} speed={60} logoHeight={64} gap={64} />
      </div>

      {/* ─── SKILLS — "Technical Arsenal" ─── */}
      <section id="skills" className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-gradient">Technical Arsenal</span>
            </h2>
          </motion.div>
          <SkillsBento />
        </div>
      </section>

      {/* ─── CONTACT — Distinctive two-column layout ─── */}
      <section id="contact" className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 py-24 pb-40">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

            {/* LEFT — Heading + Social Links */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-slate-800">Let&apos;s build</span>
                <br />
                <span className="text-slate-800">something </span>
                <span className="text-gradient">great.</span>
              </h2>

              <p className="text-[15px] text-slate-400 max-w-md mb-12" style={{ lineHeight: '2' }}>
                Have a project in mind, a question, or just want to say hi?
                I&apos;m always open to new conversations and collaborations.
              </p>

              {/* Social Links — prominent, side by side */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="https://github.com/Gbhanuteja22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-black/[0.06] bg-white
                    hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <SiGithub className="text-2xl text-slate-400 group-hover:text-slate-800 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>GitHub</p>
                    <p className="text-[11px] text-slate-300" style={{ fontFamily: "var(--font-mono)" }}>@Gbhanuteja22</p>
                  </div>
                  <span className="ml-4 text-slate-200 group-hover:text-slate-500 transition-colors">↗</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/bhanuteja-gummadevelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-black/[0.06] bg-white
                    hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <SiLinkedin className="text-2xl text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>LinkedIn</p>
                    <p className="text-[11px] text-slate-300" style={{ fontFamily: "var(--font-mono)" }}>@bhanuteja-gummadevelli</p>
                  </div>
                  <span className="ml-4 text-slate-200 group-hover:text-slate-500 transition-colors">↗</span>
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT — Say Hello card only */}
            <motion.div
              className="w-full lg:w-[460px] flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Say Hello Card */}
              <div className="relative rounded-2xl p-10 bg-white border border-black/[0.06] shadow-xl shadow-blue-500/5 overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--accent-blue)] opacity-[0.05] blur-3xl" />

                <h3
                  className="text-2xl font-bold text-slate-800 mb-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Say Hello
                </h3>
                <p className="text-[14px] text-slate-400 mb-8" style={{ lineHeight: '2.2' }}>
                  Reach out via email &mdash; click to open your mail client, or copy the address.
                </p>

                {/* Email row: mailto link + copy icon */}
                <div className="flex items-center gap-3 w-full">
                  <a
                    href="mailto:bhanutejagummadevelli@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-medium text-sm
                      bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-light)] transition-colors shadow-lg shadow-[var(--accent-blue)]/20"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <HiOutlineMail className="text-lg" />
                    bhanutejagummadevelli@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex items-center justify-center w-12 h-12 rounded-xl
                      bg-slate-50 border border-black/[0.08] text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer flex-shrink-0"
                    title="Copy email"
                  >
                    {copied ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-green-400 text-center mt-3 animate-pulse" style={{ fontFamily: "var(--font-mono)" }}>Copied!</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
