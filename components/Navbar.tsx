"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasTyped) return;
    const t = setTimeout(() => {
      if (query.trim()) {
        router.push(`/?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/");
      }
    }, 350);
    return () => clearTimeout(t);
  }, [query, router, hasTyped]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          background: scrolled || mobileMenuOpen ? "rgba(5,5,7,0.92)" : "transparent",
          backdropFilter: scrolled || mobileMenuOpen ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled || mobileMenuOpen ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled || mobileMenuOpen ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 20px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #7b6ff0, #5bb8ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(123,111,240,0.4)",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#f0f0f5", letterSpacing: "0.02em" }}>
                MotionWall
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div id="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
            {["Trending", "4K", "Anime", "Nature", "Games"].map((item) => (
              <Link key={item} href={`/?q=${item.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <motion.span
                  whileHover={{ color: "#f0f0f5" }}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: 14, fontWeight: 400, color: "#6b6b80", cursor: "pointer", transition: "color 0.2s", display: "block" }}
                >
                  {item}
                </motion.span>
              </Link>
            ))}
            <Link href="/about" style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ color: "#a09cff" }}
                style={{ padding: "6px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#7b6ff0", cursor: "pointer", transition: "color 0.2s", display: "block" }}
              >
                Owner ✦
              </motion.span>
            </Link>
          </div>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "clamp(160px, 30vw, 260px)", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden", marginRight: 8 }}
                  >
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => { setHasTyped(true); setQuery(e.target.value); }}
                      onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setQuery(""); } }}
                      placeholder="Search wallpapers..."
                      style={{
                        width: "100%",
                        height: 40,
                        background: "rgba(13,13,18,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        padding: "0 16px",
                        color: "#f0f0f5",
                        fontSize: 14,
                        outline: "none",
                        backdropFilter: "blur(12px)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) { setQuery(""); setHasTyped(false); router.push("/"); } }}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(123,111,240,0.12)", border: "1px solid rgba(123,111,240,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#7b6ff0", flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* Hamburger Mobile */}
            <motion.button
              id="hamburger-btn"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#f0f0f5", flexShrink: 0, display: "none",
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                {mobileMenuOpen ? (
                  <>
                    <line x1="2" y1="2" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="16" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="1" y1="1" x2="17" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div style={{ padding: "12px 16px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
                {["Trending", "4K", "Anime", "Nature", "Games"].map((item) => (
                  <Link key={item} href={`/?q=${item.toLowerCase()}`} style={{ textDecoration: "none" }} onClick={() => setMobileMenuOpen(false)}>
                    <div style={{ padding: "11px 16px", borderRadius: 10, fontSize: 15, fontWeight: 500, color: "#c0c0d0", cursor: "pointer" }}>
                      {item}
                    </div>
                  </Link>
                ))}
                <Link href="/about" style={{ textDecoration: "none" }} onClick={() => setMobileMenuOpen(false)}>
                  <div style={{ padding: "11px 16px", borderRadius: 10, fontSize: 15, fontWeight: 600, color: "#a09cff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <span>✦</span> Owner / Tentang
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
