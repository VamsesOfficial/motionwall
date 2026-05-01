"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleExplore = () => {
    const grid = document.getElementById("grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 68,
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "15%",
            left: "15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,111,240,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91,184,255,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 760,
          padding: "0 clamp(16px,4vw,32px)",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(123,111,240,0.1)",
            border: "1px solid rgba(123,111,240,0.2)",
            borderRadius: 40,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#7b6ff0",
              display: "inline-block",
              boxShadow: "0 0 8px #7b6ff0",
            }}
          />
          <span style={{ fontSize: 12, color: "#a09cff", fontWeight: 500, letterSpacing: "0.08em" }}>
            8950+ FREE WALLPAPERS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c4beff 50%, #5bb8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            Cinematic Walls
          </span>
          <span style={{ color: "#f0f0f5" }}>For Every Screen</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 18,
            color: "#6b6b80",
            lineHeight: 1.7,
            marginBottom: 48,
            fontWeight: 300,
          }}
        >
          Ultra-high definition live wallpapers. Anime, nature, games — all free, all stunning.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          {/* Explore Wallpapers — scroll ke grid */}
          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(123,111,240,0.4)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #7b6ff0, #5bb8ff)",
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(123,111,240,0.25)",
            }}
          >
            Explore Wallpapers
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* View Anime — navigasi ke /?q=anime via Link */}
          <Link href="/?q=anime" style={{ textDecoration: "none" }}>
            <motion.span
              whileHover={{ scale: 1.02 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#c0c0d0",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              View Anime →
            </motion.span>
          </Link>
        </motion.div>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          {[
            { label: "Anime", q: "anime" },
            { label: "4K", q: "nature" },
            { label: "Games", q: "games" },
            { label: "Nature", q: "nature" },
            { label: "Space", q: "space" },
            { label: "Cars", q: "car" },
            { label: "Cyberpunk", q: "cyberpunk-2077" },
            { label: "Fantasy", q: "fantasy" },
          ].map((tag) => (
            <Link key={tag.label} href={`/?q=${tag.q}`} style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ borderColor: "rgba(123,111,240,0.4)", color: "#a09cff" }}
                style={{
                  padding: "5px 14px",
                  borderRadius: 40,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12,
                  color: "#6b6b80",
                  cursor: "pointer",
                  display: "inline-block",
                  transition: "all 0.2s",
                  fontWeight: 500,
                }}
              >
                {tag.label}
              </motion.span>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 20,
            height: 32,
            border: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 3,
              height: 6,
              borderRadius: 2,
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
