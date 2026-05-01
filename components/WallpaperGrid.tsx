"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WallpaperCard from "@/components/WallpaperCard";
import SkeletonCard from "@/components/SkeletonCard";
import type { WallpaperCard as CardType } from "@/lib/scraper";

interface Props {
  initialQuery?: string;
}

type ErrorType = "network" | "fatal" | null;

export default function WallpaperGrid({ initialQuery = "" }: Props) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef(initialQuery);

  const classifyError = (msg: string): ErrorType => {
    const lower = msg.toLowerCase();
    // Error konfigurasi / fatal
    if (lower.includes("403") || lower.includes("cors") || lower.includes("blocked")) {
      return "fatal";
    }
    // Error jaringan / sementara
    return "network";
  };

  const fetchCards = useCallback(
    async (pg: number, q: string, reset = false) => {
      if (pg === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null);
      setErrorType(null);

      try {
        const url = `/api/list?page=${pg}&q=${encodeURIComponent(q)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || `HTTP ${res.status}`);
        }

        setCards((prev) => (reset ? data.items : [...prev, ...data.items]));
        // Jika items kosong atau API bilang no more, stop pagination
        setHasMore(data.hasMore && data.items.length > 0);
        setTotal(reset ? data.items.length : (prev) => prev + data.items.length);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(msg);
        setErrorType(classifyError(msg));
        // Jangan terus scroll saat error
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    queryRef.current = initialQuery;
    setPage(1);
    setCards([]);
    fetchCards(1, initialQuery, true);
  }, [initialQuery, fetchCards]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchCards(nextPage, queryRef.current);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, fetchCards]);

  return (
    <div>
      {/* Error state */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: 32,
            padding: "20px 24px",
            borderRadius: 16,
            background: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,80,80,0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>
            {errorType === "fatal" ? "🚫" : "⚠️"}
          </span>
          <div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#ff8080",
                marginBottom: 6,
              }}
            >
              {errorType === "fatal"
                ? "Koneksi ke motionbgs.com diblokir"
                : "Gagal memuat wallpaper"}
            </p>
            <p style={{ fontSize: 13, color: "#6b6b80", lineHeight: 1.6 }}>
              {errorType === "fatal"
                ? "Pastikan domain motionbgs.com dapat diakses dari server. Cek konfigurasi CORS atau firewall."
                : error}
            </p>
            {errorType === "network" && (
              <button
                onClick={() => fetchCards(1, queryRef.current, true)}
                style={{
                  marginTop: 12,
                  padding: "6px 16px",
                  borderRadius: 8,
                  background: "rgba(255,80,80,0.15)",
                  border: "1px solid rgba(255,80,80,0.3)",
                  color: "#ff8080",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Coba lagi
              </button>
            )}
            {errorType === "fatal" && (
              <p style={{ marginTop: 8, fontSize: 12, color: "#6b6b80" }}>
                Cek: <code style={{ color: "#a09cff" }}>next.config.js</code> → pastikan domain motionbgs.com diizinkan.
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Stats bar */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: 13, color: "#6b6b80", fontWeight: 400 }}>
            {initialQuery ? (
              <>
                <span style={{ color: "#f0f0f5" }}>{cards.length}</span> hasil untuk{" "}
                <span style={{ color: "#7b6ff0" }}>"{initialQuery}"</span>
              </>
            ) : (
              <>
                <span style={{ color: "#f0f0f5" }}>{cards.length}+</span> live wallpapers
              </>
            )}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "4K", "HD"].map((f) => (
              <button
                key={f}
                style={{
                  padding: "4px 12px",
                  borderRadius: 8,
                  background:
                    f === "All" ? "rgba(123,111,240,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    f === "All" ? "rgba(123,111,240,0.3)" : "rgba(255,255,255,0.06)"
                  }`,
                  color: f === "All" ? "#7b6ff0" : "#6b6b80",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
            gap: 24,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={initialQuery || "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
              gap: 24,
            }}
          >
            {cards.map((card, i) => (
              <WallpaperCard key={`${card.slug}-${i}`} card={card} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load more spinner */}
      {loadingMore && (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 24,
              height: 24,
              border: "2px solid rgba(123,111,240,0.2)",
              borderTop: "2px solid #7b6ff0",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && cards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", padding: "80px 0" }}
        >
          <p style={{ fontSize: 48, marginBottom: 16 }}>✦</p>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 20,
              color: "#f0f0f5",
              marginBottom: 8,
            }}
          >
            Tidak ada wallpaper ditemukan
          </p>
          <p style={{ color: "#6b6b80", fontSize: 14 }}>
            {initialQuery
              ? `Coba kata kunci lain. Contoh: "anime", "naruto", "nature", "games"`
              : "Coba muat ulang halaman"}
          </p>
        </motion.div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
