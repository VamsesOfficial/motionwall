"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import profileImg from "./aku.jpeg";


const OWNER = {
  name: "Ketut Agus", 
  username: "@Agus",
  role: "Full-Stack Developer & Wallpaper Curator",
  bio: "Halo! Saya adalah developer dan kurator di balik MotionWall — platform live wallpaper 4K gratis. Passion saya adalah menghadirkan wallpaper sinematik berkualitas tinggi yang bisa dinikmati semua orang, gratis.",
  bio2: "MotionWall dibangun dengan Next.js, Tailwind, dan banyak ☕ kopi. Semua konten bersumber dari komunitas dan tersedia bebas untuk penggunaan personal.",
  // Ganti dengan URL foto asli kamu, atau gunakan avatar placeholder
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
    { label: "Wallpapers", value: "8.950+" },
    { label: "Kategori", value: "50+" },
    { label: "Downloads", value: "∞" },
    { label: "License", value: "Free" },
  ],
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
        }}
      >
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,111,240,0.1) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{ position: "absolute", bottom: "0%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,184,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", marginBottom: 28 }}
          >
            <div
              style={{
                width: "clamp(100px,20vw,140px)",
                height: "clamp(100px,20vw,140px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7b6ff0, #5bb8ff)",
                padding: 3,
                display: "inline-block",
                boxShadow: "0 0 60px rgba(123,111,240,0.35)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#0d0d12",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Gunakan img src asli di sini — atau avatar SVG */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={OWNER.avatarUrl}
                  alt={OWNER.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    // Fallback emoji jika gambar gagal load
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span style={{ fontSize: "clamp(36px,8vw,56px)", position: "absolute" }}></span>
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(123,111,240,0.1)", border: "1px solid rgba(123,111,240,0.2)", borderRadius: 40, padding: "5px 14px", marginBottom: 20 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7b6ff0", display: "inline-block", boxShadow: "0 0 8px #7b6ff0" }} />
            <span style={{ fontSize: 12, color: "#a09cff", fontWeight: 500, letterSpacing: "0.08em" }}>CREATOR & DEVELOPER</span>
          </motion.div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,64px)", fontWeight: 800, color: "#f0f0f5", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.1 }}>
            {OWNER.name}
          </h1>
          <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#7b6ff0", fontWeight: 500, marginBottom: 16 }}>{OWNER.username}</p>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#6b6b80", marginBottom: 0 }}>{OWNER.role}</p>
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
            <div
              key={stat.label}
              style={{ padding: "24px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, textAlign: "center" }}
            >
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#a09cff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 12, color: "#6b6b80", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{stat.label}</p>
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
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Tentang
          </h2>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#c0c0d0", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
            {OWNER.bio}
          </p>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#6b6b80", lineHeight: 1.8, fontWeight: 300 }}>
            {OWNER.bio2}
          </p>
        </motion.div>
      </section>

      {/* Social Media */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(16px,4vw,32px) clamp(60px,10vh,100px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Temukan Saya
          </h2>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "clamp(14px,2vw,20px) clamp(16px,3vw,24px)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: `${social.color}18`,
                      border: `1px solid ${social.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: social.color,
                      flexShrink: 0,
                    }}
                  >
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

      {/* Copyright Footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(24px,4vw,40px) clamp(16px,4vw,32px)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "#6b6b80" }}>
          © {new Date().getFullYear()} <span style={{ color: "#7b6ff0", fontWeight: 600 }}>MotionWall</span> by {OWNER.name}. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#3d3d50", marginTop: 8 }}>
          Konten wallpaper bersumber dari komunitas open-source untuk penggunaan personal.
        </p>
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
