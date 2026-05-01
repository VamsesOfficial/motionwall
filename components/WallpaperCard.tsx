"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { WallpaperCard } from "@/lib/scraper";
import { proxiedImg } from "@/lib/utils";

interface CardProps {
  card: WallpaperCard;
  index: number;
}

export default function WallpaperCard({ card, index }: CardProps) {
  const [hovered, setHovered] = useState(false);

  // Normalkan slug: buang leading slash jika ada
  const cleanSlug = card.slug.startsWith("/") ? card.slug.slice(1) : card.slug;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ position: "relative" }}
    >
      <Link href={`/wallpaper/${cleanSlug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            aspectRatio: "16/9",
            background: "#0d0d12",
            border: `1px solid ${hovered ? "rgba(123,111,240,0.3)" : "rgba(255,255,255,0.06)"}`,
            boxShadow: hovered
              ? "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(123,111,240,0.15)"
              : "0 4px 20px rgba(0,0,0,0.3)",
            transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1) translateY(0px)",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease",
            cursor: "pointer",
          }}
        >
          {/* Thumbnail JPG — selalu tampil */}
          {card.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={proxiedImg(card.thumbnail)}
              alt={card.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
              loading="lazy"
            />
          ) : (
            /* Fallback jika tidak ada thumbnail */
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #0d0d12, #1a1a2e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="rgba(123,111,240,0.1)" />
                <path d="M16 14L26 20L16 26V14Z" fill="rgba(123,111,240,0.5)" />
              </svg>
            </div>
          )}

          {/* Overlay gradient + info saat hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "flex-end",
              padding: "20px 16px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.3,
                  letterSpacing: "0.01em",
                  transform: hovered ? "translateY(0)" : "translateY(8px)",
                  transition: "transform 0.3s ease",
                }}
              >
                {card.title}
              </p>
              <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontWeight: 500,
                  }}
                >
                  4K
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  Live Wallpaper
                </span>
              </div>
            </div>
          </div>

          {/* Play icon badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 2L8 5L3 8V2Z" fill="rgba(255,255,255,0.7)" />
            </svg>
          </div>
        </div>

        {/* Title di bawah card */}
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.01em",
            paddingLeft: 2,
            fontFamily: "'DM Sans', sans-serif",
            color: hovered ? "#f0f0f5" : "#6b6b80",
            transition: "color 0.2s ease",
          }}
        >
          {card.title}
        </p>
      </Link>
    </motion.div>
  );
}
