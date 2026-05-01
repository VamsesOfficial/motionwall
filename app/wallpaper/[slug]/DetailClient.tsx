"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { WallpaperDetail } from "@/lib/scraper";
import { proxiedImg, proxiedVideo } from "@/lib/utils";

interface Props {
  slug: string;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; detail: WallpaperDetail };

function Skeleton({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        animation: "pulse 1.6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default function DetailClient({ slug }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    const doFetch = async (attempt: number): Promise<void> => {
      try {
        const res = await fetch(`/api/detail/${slug}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? `HTTP ${res.status}`);
        }
        const detail = await res.json() as WallpaperDetail;
        if (!cancelled) setState({ status: "ok", detail });
      } catch (err: unknown) {
        if (cancelled) return;
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 600));
          if (!cancelled) return doFetch(attempt + 1);
        }
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Gagal memuat wallpaper.",
        });
      }
    };

    doFetch(1);
    return () => { cancelled = true; };
  }, [slug]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((m) => !m);
  };

  if (state.status === "loading") {
    return (
      <div style={{ paddingTop: 64 }}>
        <div style={{ position: "relative", width: "100%", height: "calc(100vh - 64px)", background: "#0a0a0f" }}>
          <Skeleton style={{ position: "absolute", inset: 0, borderRadius: 0 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 48px" }}>
            <Skeleton style={{ width: 120, height: 14, marginBottom: 24 }} />
            <Skeleton style={{ width: "min(55%, 400px)", height: 48, marginBottom: 16 }} />
            <Skeleton style={{ width: "min(38%, 280px)", height: 16 }} />
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(32px,5vw,60px) clamp(16px,4vw,48px) 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr min(320px,100%)", gap: "clamp(24px,5vw,60px)" }}>
            <div>
              <Skeleton style={{ width: 60, height: 11, marginBottom: 16 }} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
                {[80, 100, 70, 90, 75].map((w, i) => <Skeleton key={i} style={{ width: w, height: 32, borderRadius: 40 }} />)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[0, 1, 2, 3].map((i) => <Skeleton key={i} style={{ height: 76, borderRadius: 16 }} />)}
              </div>
            </div>
            <div>
              <Skeleton style={{ width: 60, height: 11, marginBottom: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Skeleton style={{ height: 72, borderRadius: 16 }} />
                <Skeleton style={{ height: 72, borderRadius: 16 }} />
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div
        style={{
          paddingTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          gap: 24,
          color: "#6b6b80",
          textAlign: "center",
          padding: "64px 24px 24px",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M24 14V26M24 32V34" stroke="#6b6b80" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p style={{ fontSize: 15 }}>{state.message}</p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 24px", borderRadius: 40, border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5", fontSize: 14, cursor: "pointer" }}
          >
            ← Back to Gallery
          </motion.div>
        </Link>
      </div>
    );
  }

  const { detail } = state;

  return (
    <div style={{ paddingTop: 64 }}>
      {/* HERO VIDEO */}
      <section style={{ position: "relative", width: "100%", height: "calc(100svh - 64px)", overflow: "hidden", background: "#000" }}>
        {detail.videoUrl ? (
          <video
            ref={videoRef}
            src={proxiedVideo(detail.videoUrl)}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : detail.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={proxiedImg(detail.thumbnail)} alt={detail.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : null}

        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #050507 0%, rgba(5,5,7,0.5) 40%, rgba(5,5,7,0.1) 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {detail.videoUrl && (
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="4" height="10" fill="white" rx="1" />
                  <rect x="8" y="2" width="4" height="10" fill="white" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 2L12 7L3 12V2Z" fill="white" />
                </svg>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 5H1V11H3L8 14V2L3 5Z" fill="white" />
                  <line x1="12" y1="5" x2="16" y2="9" stroke="white" strokeWidth="1.5" />
                  <line x1="16" y1="5" x2="12" y2="9" stroke="white" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 5H1V11H3L8 14V2L3 5Z" fill="white" />
                  <path d="M11 5.5C12 6.5 12 9.5 11 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13 3.5C15.5 5.5 15.5 10.5 13 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </motion.button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(16px,4vw,48px) clamp(32px,5vh,60px)", maxWidth: 900 }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ x: -3 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20, cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Back to Gallery
            </motion.div>
          </Link>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 12,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            {detail.title}
          </h1>

          {detail.description && (
            <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.6, fontWeight: 300 }}>
              {detail.description}
            </p>
          )}
        </motion.div>
      </section>

      {/* DETAIL SECTION */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(32px,5vw,60px) clamp(16px,4vw,48px) 80px" }}>
        <div id="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr min(320px,100%)", gap: "clamp(24px,5vw,60px)" }}>
          {/* LEFT: Tags + Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {detail.tags.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                  Tags
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {detail.tags.map((tag) => (
                    <Link key={tag} href={`/?q=${encodeURIComponent(tag.toLowerCase())}`} style={{ textDecoration: "none" }}>
                      <motion.span
                        whileHover={{ background: "rgba(123,111,240,0.15)", borderColor: "rgba(123,111,240,0.3)", color: "#a09cff" }}
                        style={{ padding: "6px 16px", borderRadius: 40, border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "#6b6b80", cursor: "pointer", display: "inline-block", transition: "all 0.2s", fontWeight: 500 }}
                      >
                        #{tag}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {(
                [
                  { label: "Resolution", value: "3840 × 2160" },
                  { label: "Format", value: "MP4 / JPG" },
                  { label: "Type", value: "Live Wallpaper" },
                  { label: "License", value: "Free" },
                ] as const
              ).map((item) => (
                <div
                  key={item.label}
                  style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}
                >
                  <p style={{ fontSize: 11, color: "#6b6b80", marginBottom: 6, letterSpacing: "0.08em" }}>{item.label.toUpperCase()}</p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px,2vw,16px)", fontWeight: 600, color: "#f0f0f5" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Download + Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Download
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {detail.downloads.length > 0 ? (
                detail.downloads.map((dl) => (
                  <motion.a
                    key={dl.url}
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(123,111,240,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 24px",
                      borderRadius: 16,
                      background: dl.quality === "4K"
                        ? "linear-gradient(135deg, rgba(123,111,240,0.15), rgba(91,184,255,0.08))"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${dl.quality === "4K" ? "rgba(123,111,240,0.25)" : "rgba(255,255,255,0.06)"}`,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: dl.quality === "4K" ? "#a09cff" : "#f0f0f5", letterSpacing: "-0.01em" }}>
                        {dl.quality}
                      </p>
                      <p style={{ fontSize: 12, color: "#6b6b80", marginTop: 2 }}>
                        {dl.quality === "4K" ? "3840×2160" : "1920×1080"}
                      </p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 3V14M6 10L10 14L14 10" stroke={dl.quality === "4K" ? "#7b6ff0" : "#6b6b80"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                ))
              ) : (
                <motion.a
                  href={`https://motionbgs.com/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "18px 24px", borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(123,111,240,0.15), rgba(91,184,255,0.08))",
                    border: "1px solid rgba(123,111,240,0.25)", textDecoration: "none", cursor: "pointer",
                  }}
                >
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#a09cff" }}>
                    Download on MotionBGs
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13L13 3M13 3H7M13 3V9" stroke="#7b6ff0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.a>
              )}
            </div>

            {/* VIDEO Preview — ganti dari img ke video */}
            {(detail.videoUrl || detail.thumbnail) && (
              <div style={{ marginTop: 32 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                  Preview
                </h2>
                {detail.videoUrl ? (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <video
                      ref={previewVideoRef}
                      src={proxiedVideo(detail.videoUrl)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* Play icon overlay */}
                    <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 1L9 5L2 9V1Z" fill="rgba(255,255,255,0.8)" />
                      </svg>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>LIVE</span>
                    </div>
                  </div>
                ) : detail.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proxiedImg(detail.thumbnail)}
                    alt={detail.title}
                    style={{ width: "100%", borderRadius: 16, objectFit: "cover", aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.06)" }}
                  />
                ) : null}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          #detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
