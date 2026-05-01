"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import profileImg from "./aku.jpeg";

/* ─────────────────────────── DATA ─────────────────────────── */
const OWNER = {
  name: "Ketut Agus",
  username: "@Agus",
  role: "Full-Stack Developer & Wallpaper Aggregator",
  bio: "Halo! Saya Ketut Agus — developer di balik MotionWall. Platform ini lahir dari satu masalah sederhana: situs wallpaper yang ada itu jelek, lambat, dan penuh iklan. Jadi saya bikin sendiri.",
  bio2: "MotionWall mengumpulkan konten sinematik terbaik dari seluruh internet, lalu menyajikannya kembali dalam tampilan yang jauh lebih layak dinikmati. Dibangun dengan Next.js, Tailwind CSS, dan semangat 'kalau jelek ya bikin ulang'.",
  avatarUrl: profileImg.src,
  socials: [
    {
      name: "Instagram",
      url: "https://instagram.com/ketutaguss_",
      handle: "@ketutaguss_",
      color: "#E1306C",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@jlemewhite",
      handle: "@jlemewhite",
      color: "#69C9D0",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ],
  stats: [
    { label: "Source", value: "motionbgs", desc: ".com" },
    { label: "Resolusi", value: "4K", desc: "all content" },
    { label: "Experience", value: "10×", desc: "lebih bersih" },
    { label: "Harga", value: "Free", desc: "forever" },
  ],
  techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
  features: [
    { icon: "◈", title: "Agregator Cerdas", subtitle: "Smart Aggregator", desc: "Mengumpulkan wallpaper live terbaik dari seluruh internet dalam satu tempat yang rapi — no noise, pure content." },
    { icon: "◇", title: "Gratis Selamanya", subtitle: "Always Free", desc: "No paywall. No mandatory account. No hidden ads. Download langsung, pakai langsung." },
    { icon: "◉", title: "Tampilan Premium", subtitle: "Refined Experience", desc: "Sumber aslinya penuh noise — di sini kamu dapat browsing experience yang mulus, cepat, dan bersih." },
  ],
};

/* ─────────────────────── SCROLL SECTION ───────────────────── */
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function AboutClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <div
      style={{
        paddingTop: 64,
        minHeight: "100vh",
        background: "#08080f",
        color: "#f0f0f5",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >

      {/* ── Noise texture overlay ── */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(60px,10vh,120px) clamp(20px,5vw,40px) 80px",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Ambient gradients */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: 700, height: 500,
            background: "radial-gradient(ellipse, rgba(123,111,240,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }} />
          <div style={{
            position: "absolute", bottom: "5%", right: "-5%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(91,184,255,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />
          {/* Horizontal rule line art */}
          <svg style={{ position: "absolute", top: "50%", left: 0, width: "100%", opacity: 0.04 }} height="1">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 640 }}
        >
          {/* ── BADGE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(123,111,240,0.25)",
              borderRadius: 40,
              padding: "6px 18px",
              marginBottom: 48,
              backdropFilter: "blur(10px)",
              background: "rgba(123,111,240,0.06)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#7b6ff0", display: "inline-block", boxShadow: "0 0 6px #7b6ff0" }}
            />
            <span style={{ fontSize: 11, color: "#a09cff", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Creator & Developer
            </span>
          </motion.div>

          {/* ── AVATAR ── */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginBottom: 40,
              position: "relative",
              width: "clamp(140px,22vw,180px)",
              height: "clamp(140px,22vw,180px)",
            }}
          >
            {/* Glow pulse — single, subtle */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(123,111,240,0.35) 0%, transparent 70%)",
                filter: "blur(16px)",
              }}
            />

            {/* Static gradient border */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", padding: 2.5,
              background: "linear-gradient(135deg, #7b6ff0, #5bb8ff, #a09cff)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }} />

            {/* Single orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -8, borderRadius: "50%" }}
            >
              <div style={{
                position: "absolute", top: "50%", left: 0,
                width: 10, height: 10, borderRadius: "50%",
                background: "#7b6ff0",
                boxShadow: "0 0 12px #7b6ff0, 0 0 24px rgba(123,111,240,0.5)",
                transform: "translateY(-50%)",
              }} />
            </motion.div>

            {/* Photo */}
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#0d0d18" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={OWNER.avatarUrl}
                alt={OWNER.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* OWNER badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "absolute", bottom: 4, right: -4,
                background: "linear-gradient(135deg, #7b6ff0, #5bb8ff)",
                borderRadius: 24, padding: "5px 11px",
                display: "flex", alignItems: "center", gap: 5,
                boxShadow: "0 4px 20px rgba(123,111,240,0.45)",
                border: "2px solid #08080f",
              }}
            >
              <span style={{ fontSize: 10 }}>👑</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>OWNER</span>
            </motion.div>
          </motion.div>

          {/* ── NAME ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ textAlign: "center" }}
          >
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px,7vw,72px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 10,
              background: "linear-gradient(135deg, #f0f0f5 30%, #a09cff 70%, #5bb8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {OWNER.name}
            </h1>
            <p style={{ fontSize: 13, color: "#7b6ff0", fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>{OWNER.username}</p>
            <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#4d4d60", fontWeight: 400, letterSpacing: "0.01em" }}>{OWNER.role}</p>
          </motion.div>

          {/* ── Scroll cue ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
          >
            <span style={{ fontSize: 10, color: "#3d3d50", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 28, background: "linear-gradient(to bottom, #7b6ff0, transparent)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(20px,5vw,40px) 80px", position: "relative", zIndex: 1 }}>
        <FadeSection>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: "rgba(123,111,240,0.4)" }} />
            <span style={{ fontSize: 11, color: "#4d4d60", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>At a Glance</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {OWNER.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, borderColor: "rgba(123,111,240,0.3)" }}
                style={{
                  padding: "28px 24px",
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 20,
                  textAlign: "center",
                  cursor: "default",
                  transition: "border-color 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: "60%", height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(123,111,240,0.4), transparent)",
                }} />
                <p style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(20px,3vw,30px)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #a09cff, #5bb8ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                  marginBottom: 6,
                }}>{stat.value}</p>
                <p style={{ fontSize: 11, color: "#4d4d60", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{stat.label}</p>
                <p style={{ fontSize: 11, color: "#2d2d3d" }}>{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── BIO ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,40px) 80px", position: "relative", zIndex: 1 }}>
        <FadeSection delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: "rgba(123,111,240,0.4)" }} />
            <span style={{ fontSize: 11, color: "#4d4d60", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Tentang Saya — About Me</span>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 28,
            padding: "clamp(28px,4vw,48px)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Corner accent */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 160, height: 160,
              background: "radial-gradient(circle at top right, rgba(123,111,240,0.06), transparent 70%)",
            }} />
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(123,111,240,0.3), rgba(91,184,255,0.2), transparent)",
            }} />

            <p style={{ fontSize: "clamp(15px,1.6vw,17px)", color: "#c0c0d4", lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
              {OWNER.bio}
            </p>
            <p style={{ fontSize: "clamp(14px,1.4vw,15px)", color: "#5a5a72", lineHeight: 1.85, fontWeight: 300 }}>
              {OWNER.bio2}
            </p>

            {/* Tech stack */}
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontSize: 11, color: "#3d3d50", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>
                Built with
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {OWNER.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ borderColor: "rgba(123,111,240,0.5)", color: "#c0bcff" }}
                    style={{
                      padding: "5px 14px", borderRadius: 20,
                      background: "rgba(123,111,240,0.06)",
                      border: "1px solid rgba(123,111,240,0.14)",
                      fontSize: 12, color: "#8884cc", fontWeight: 500,
                      cursor: "default", transition: "all 0.2s",
                    }}
                  >{tech}</motion.span>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,40px) 80px", position: "relative", zIndex: 1 }}>
        <FadeSection delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: "rgba(123,111,240,0.4)" }} />
            <span style={{ fontSize: 11, color: "#4d4d60", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Tentang MotionWall — About the Platform</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {OWNER.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 5, background: "rgba(255,255,255,0.025)" }}
                style={{
                  display: "flex", gap: 24, alignItems: "flex-start",
                  padding: "28px 28px",
                  borderRadius: 20,
                  border: "1px solid transparent",
                  transition: "all 0.25s",
                  cursor: "default",
                  position: "relative",
                }}
              >
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  borderRadius: 14,
                  background: "rgba(123,111,240,0.08)",
                  border: "1px solid rgba(123,111,240,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "#a09cff",
                  fontFamily: "monospace",
                }}>{f.icon}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8e8f0" }}>{f.title}</p>
                    <span style={{ fontSize: 11, color: "#3d3d55", letterSpacing: "0.06em" }}>— {f.subtitle}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#4d4d62", lineHeight: 1.75, fontWeight: 300 }}>{f.desc}</p>
                </div>
                {/* Left accent line on hover */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: 2, borderRadius: 2,
                    background: "linear-gradient(to bottom, #7b6ff0, #5bb8ff)",
                    opacity: 0, transition: "opacity 0.25s",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── SOCIALS ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,40px) 80px", position: "relative", zIndex: 1 }}>
        <FadeSection delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: "rgba(123,111,240,0.4)" }} />
            <span style={{ fontSize: 11, color: "#4d4d60", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Temukan Saya — Find Me</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {OWNER.socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 5, borderColor: `${social.color}30`, boxShadow: `0 8px 40px ${social.color}12` }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "clamp(16px,2vw,22px) clamp(18px,3vw,28px)",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.018)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none", cursor: "pointer",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${social.color}20, transparent)`,
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                    background: `${social.color}10`,
                    border: `1px solid ${social.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: social.color,
                  }}>
                    {social.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: "#e0e0ec", marginBottom: 3 }}>{social.name}</p>
                    <p style={{ fontSize: 13, color: "#4d4d62" }}>{social.handle}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "#3d3d55", letterSpacing: "0.08em" }}>Visit</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "#4d4d62" }}>
                    <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "clamp(32px,5vw,56px) clamp(20px,5vw,40px)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 200, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(123,111,240,0.4), transparent)",
        }} />

        <p style={{ fontSize: 13, color: "#3d3d52", marginBottom: 8 }}>
          © {new Date().getFullYear()} <span style={{ color: "#7b6ff0", fontWeight: 600 }}>MotionWall</span> by {OWNER.name}. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#2d2d3d", marginBottom: 28 }}>
          Free 4K wallpapers for personal use. Dibuat dengan ❤️ dari Bali.
        </p>

        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ borderColor: "rgba(123,111,240,0.3)", color: "#a09cff", x: -3 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 26px", borderRadius: 40,
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#4d4d62", fontSize: 13, cursor: "pointer",
              transition: "all 0.25s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke Gallery
          </motion.div>
        </Link>
      </footer>
    </div>
  );
              }
