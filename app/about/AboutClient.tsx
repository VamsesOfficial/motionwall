"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import profileImg from "./aku.jpeg";

const OWNER = {
  name: "Ketut Agus",
  username: "@Agus",
  role: "Full-Stack Developer & Wallpaper Aggregator",
  bio: "Halo! Saya Ketut Agus — developer di balik MotionWall. Platform ini lahir dari satu masalah sederhana: situs wallpaper yang ada itu jelek, lambat, dan penuh iklan. Jadi saya bikin sendiri — agregator wallpaper live 4K yang bersih, cepat, dan gratis.",
  bio2: "MotionWall mengumpulkan konten sinematik terbaik dari seluruh internet, lalu menyajikannya kembali dalam tampilan yang jauh lebih layak dinikmati. Dibangun dengan Next.js, Tailwind CSS, dan semangat 'kalau jelek ya bikin ulang'.",
  avatarUrl: profileImg.src,
  socials: [
    {
      name: "Instagram",
      url: "https://instagram.com/ketutaguss_",
      handle: "@ketutaguss_",
      color: "#E1306C",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ],
  stats: [
    { label: "Sumber", value: "motionbgs", desc: ".com" },
    { label: "Resolusi", value: "4K", desc: "semua konten" },
    { label: "Tampilan", value: "10x", desc: "lebih bersih" },
    { label: "Harga", value: "Gratis", desc: "selamanya" },
  ],
  techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
};

export default function AboutClient() {
  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(60px,10vh,120px) clamp(16px,4vw,32px) clamp(48px,8vh,80px)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,111,240,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{ position: "absolute", bottom: "0%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,184,255,0.1) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          {/* Orb behind avatar */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "4%", left: "50%", transform: "translateX(-50%)", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,111,240,0.2) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
        >

          {/* ===== AVATAR ===== */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginBottom: 32,
              position: "relative",
              width: "clamp(170px,26vw,210px)",
              height: "clamp(170px,26vw,210px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Outer glow pulse */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(123,111,240,0.4) 0%, transparent 70%)",
                filter: "blur(14px)",
              }}
            />

            {/* Slow outer dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: "1.5px dashed rgba(160,156,255,0.3)",
              }}
            />

            {/* Fast inner arc spinner */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                border: "2.5px solid transparent",
                borderTop: "2.5px solid #7b6ff0",
                borderRight: "2.5px solid #5bb8ff",
              }}
            />

            {/* Orbiting dot — purple */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -16, borderRadius: "50%" }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#7b6ff0",
                boxShadow: "0 0 14px #7b6ff0, 0 0 28px rgba(123,111,240,0.6)",
                transform: "translateY(-50%)",
              }} />
            </motion.div>

            {/* Orbiting dot — blue, opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -12, borderRadius: "50%" }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                right: 0,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#5bb8ff",
                boxShadow: "0 0 12px #5bb8ff, 0 0 22px rgba(91,184,255,0.5)",
                transform: "translateY(-50%)",
              }} />
            </motion.div>

            {/* Gradient border ring */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              padding: 3,
              background: "linear-gradient(135deg, #7b6ff0, #5bb8ff, #a09cff, #3d8bff)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }} />

            {/* Avatar image */}
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#0d0d12",
              position: "relative",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={OWNER.avatarUrl}
                alt={OWNER.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* OWNER crown badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 280, damping: 18 }}
              style={{
                position: "absolute",
                bottom: 6,
                right: -2,
                background: "linear-gradient(135deg, #7b6ff0, #5bb8ff)",
                borderRadius: 24,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                boxShadow: "0 4px 20px rgba(123,111,240,0.55)",
                border: "2px solid #0d0d12",
              }}
            >
              <span style={{ fontSize: 11 }}>👑</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>OWNER</span>
            </motion.div>
          </motion.div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(123,111,240,0.1)", border: "1px solid rgba(123,111,240,0.2)", borderRadius: 40, padding: "5px 14px", marginBottom: 20 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#7b6ff0", display: "inline-block", boxShadow: "0 0 8px #7b6ff0" }}
            />
            <span style={{ fontSize: 12, color: "#a09cff", fontWeight: 500, letterSpacing: "0.08em" }}>CREATOR & DEVELOPER</span>
          </motion.div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,64px)", fontWeight: 800, color: "#f0f0f5", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.1 }}>
            {OWNER.name}
          </h1>
          <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#7b6ff0", fontWeight: 500, marginBottom: 16 }}>{OWNER.username}</p>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#6b6b80" }}>{OWNER.role}</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,4vw,32px) 60px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}
        >
          {OWNER.stats.map((stat) => (
            <div key={stat.label} style={{ padding: "24px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, textAlign: "center" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, color: "#a09cff", letterSpacing: "-0.02em", marginBottom: 4 }}>{stat.value}</p>
              <p style={{ fontSize: 12, color: "#6b6b80", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{stat.label}</p>
              <p style={{ fontSize: 11, color: "#3d3d50" }}>{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Bio */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(16px,4vw,32px) 60px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "clamp(24px,4vw,40px)" }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Tentang Saya</h2>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#c0c0d0", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>{OWNER.bio}</p>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#6b6b80", lineHeight: 1.8, fontWeight: 300 }}>{OWNER.bio2}</p>
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 11, color: "#3d3d50", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Dibangun dengan</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {OWNER.techStack.map((tech) => (
                <span key={tech} style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(123,111,240,0.08)", border: "1px solid rgba(123,111,240,0.15)", fontSize: 12, color: "#a09cff", fontWeight: 500 }}>{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tentang MotionWall */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(16px,4vw,32px) 60px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "clamp(24px,4vw,40px)" }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Tentang MotionWall</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "🔍", title: "Agregator Cerdas", desc: "Mengumpulkan wallpaper live terbaik dari seluruh internet dan menyajikannya dalam satu tempat yang rapi dan mudah dijelajahi." },
              { icon: "🆓", title: "Gratis Selamanya", desc: "Tidak ada paywall, tidak ada akun wajib, tidak ada iklan tersembunyi. Unduh langsung, pakai langsung." },
              { icon: "⚡", title: "Tampilan 10x Lebih Bersih", desc: "Sumber aslinya mungkin penuh noise — tapi di sini kamu dapat pengalaman browsing yang mulus dan cepat." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: "#f0f0f5", marginBottom: 4 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "#6b6b80", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Media */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(16px,4vw,32px) clamp(60px,10vh,100px)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Temukan Saya</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {OWNER.socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, x: 4, boxShadow: `0 8px 30px ${social.color}22` }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(14px,2vw,20px) clamp(16px,3vw,24px)", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${social.color}18`, border: `1px solid ${social.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: social.color, flexShrink: 0 }}>
                    {social.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "clamp(14px,2vw,16px)", color: "#f0f0f5", marginBottom: 2 }}>{social.name}</p>
                    <p style={{ fontSize: 13, color: "#6b6b80" }}>{social.handle}</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#6b6b80", flexShrink: 0 }}>
                  <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,32px)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#6b6b80" }}>
          © {new Date().getFullYear()} <span style={{ color: "#7b6ff0", fontWeight: 600 }}>MotionWall</span> by {OWNER.name}. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#3d3d50", marginTop: 8 }}>Wallpaper 4K gratis untuk penggunaan personal. Dibuat dengan ❤️ dari Bali.</p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, padding: "10px 24px", borderRadius: 40, border: "1px solid rgba(255,255,255,0.08)", color: "#6b6b80", fontSize: 13, cursor: "pointer" }}
          >
            ← Kembali ke Gallery
          </motion.div>
        </Link>
      </div>
    </div>
  );
                }
