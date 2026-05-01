// lib/scraper.ts — scraping logic using Cheerio (proven from live.js)

import { load } from "cheerio";

// ============================================================
// Interfaces — TIDAK BOLEH BERUBAH
// ============================================================

export interface WallpaperCard {
  slug: string;   // e.g. "/angel-bound-by-thorns"
  name: string;   // e.g. "angel-bound-by-thorns"
  title: string;  // e.g. "Angel Bound By Thorns"
  thumbnail: string;
  videoUrl: string | null;
}

export interface WallpaperDetail {
  title: string;
  description: string | undefined;
  thumbnail: string | undefined;
  previewVideo: string | undefined;
  videoUrl: string | null;
  tags: string[];
  downloads: { quality: string; url: string }[];
}

// ============================================================
// Constants
// ============================================================

const BASE = "https://motionbgs.com";

const BROWSER_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Referer: "https://motionbgs.com/",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
};

// ============================================================
// Query to Tag mapping
// ============================================================

const QUERY_TO_TAG: Record<string, string> = {
  aot: "attack-on-titan",
  aow: "attack-on-titan",
  jjk: "jujutsu-kaisen",
  mha: "my-hero-academia",
  bnha: "my-hero-academia",
  hsr: "honkai-star-rail",
  genshin: "genshin-impact",
  lol: "league-of-legends",
  zzz: "zenless-zone-zero",
  wuwa: "wuthering-waves",
  csm: "chainsaw-man",
  dbz: "dragon-ball",
  op: "one-piece",
  cars: "car",
  city: "japan",
  cities: "japan",
  sport: "football",
  soccer: "football",
  anime: "anime",
  games: "games",
  game: "games",
  nature: "nature",
  space: "space",
  fantasy: "fantasy",
  superhero: "superhero",
  football: "football",
  animal: "animal",
  animals: "animal",
  technology: "technology",
  tech: "technology",
  horror: "horror",
  car: "car",
  holiday: "holiday",
  japan: "japan",
  naruto: "naruto",
  bleach: "bleach",
  berserk: "berserk",
  frieren: "frieren",
  hololive: "hololive",
  rain: "rain",
  night: "night",
  sunset: "sunset",
  forest: "forest",
  winter: "winter",
  water: "water",
  snow: "snow",
  landscape: "landscape",
  mountain: "mountain",
  bmw: "bmw",
  nissan: "nissan",
  jdm: "jdm",
  audi: "audi",
  porsche: "porsche",
  lamborghini: "lamborghini",
  marvel: "marvel",
  spiderman: "spiderman",
  venom: "venom",
  deadpool: "deadpool",
  superman: "superman",
  astronaut: "astronaut",
  dragon: "dragon",
  knight: "knight",
  arcane: "arcane",
  dune: "dune",
  wednesday: "wednesday",
  joker: "joker",
  ronaldo: "ronaldo",
  mbappe: "mbappe",
  neymar: "neymar",
  messi: "messi",
  cat: "cat",
  dog: "dog",
  skull: "skull",
  zombie: "zombie",
  coding: "coding",
  matrix: "matrix",
  christmas: "christmas",
  halloween: "halloween",
  torii: "torii",
  pokemon: "pokemon",
  valorant: "valorant",
  overwatch: "overwatch",
  fortnite: "fortnite",
  minecraft: "minecraft",
};

function queryToTagSlug(query: string): string {
  const q = query.toLowerCase().trim().replace(/\s+/g, "-");
  return QUERY_TO_TAG[q] ?? q;
}

// ============================================================
// Helpers
// ============================================================

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function thumbnailToVideoUrl(thumbnail: string): string | null {
  const match = thumbnail.match(
    /https:\/\/motionbgs\.com\/i\/c\/\d+x\d+\/(media\/\d+\/[^.]+)\./
  );
  if (!match) return null;
  return `${BASE}/${match[1]}.960x540.mp4`;
}

const SKIP_PREFIXES = [
  "/tag:",
  "/4k",
  "/mobile",
  "/gifs",
  "/page",
  "/about",
  "/contact",
  "/search",
  "/category",
  "/dl/",
  "/cdn-",
  "/wp-",
];

// ============================================================
// scrapeList — fetch halaman tag/homepage dengan Cheerio
// ============================================================

export async function scrapeList(
  query?: string,
  page: number = 1
): Promise<{ cards: WallpaperCard[]; hasMore: boolean }> {
  let url: string;
  if (query && query.trim()) {
    const tagSlug = queryToTagSlug(query.trim());
    url = page <= 1
      ? `${BASE}/tag:${tagSlug}/`
      : `${BASE}/tag:${tagSlug}/page/${page}/`;
  } else {
    url = page <= 1 ? `${BASE}/` : `${BASE}/page/${page}/`;
  }

  console.log(`[scrapeList] fetching: ${url}`);

  let html: string;
  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      // 404 pada page > 1 = sudah habis, bukan error
      if (res.status === 404 && page > 1) {
        console.log(`[scrapeList] page ${page} tidak ada (404), stop pagination`);
        return { cards: [], hasMore: false };
      }
      // 404 pada tag page 1 = tag tidak ada, fallback ke homepage
      if (res.status === 404 && query) {
        console.warn(`[scrapeList] tag 404: ${url}, fallback ke homepage`);
        const fallback = await fetch(`${BASE}/`, {
          headers: BROWSER_HEADERS,
          next: { revalidate: 1800 },
        });
        if (!fallback.ok) throw new Error(`HTTP ${fallback.status}: ${fallback.statusText}`);
        html = await fallback.text();
      } else {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
    } else {
      html = await res.text();
    }
  } catch (err) {
    console.error("[scrapeList] fetch error:", err);
    throw new Error(
      `Gagal mengambil data dari motionbgs.com: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const $ = load(html);

  // Kumpulkan thumbnail — WAJIB cek data-src dulu (lazy-load)
  const thumbnails: string[] = [];
  $("img").each((_, el) => {
    const src = $(el).attr("data-src") || $(el).attr("src") || "";
    if (src.includes("/i/c/") && src.endsWith(".jpg")) {
      // Pastikan URL absolut — motionbgs kadang emit path relatif di data-src
      const absUrl = src.startsWith("http") ? src : `${BASE}${src}`;
      thumbnails.push(absUrl);
    }
  });

  // Kumpulkan slug dari <a href>
  const slugs: string[] = [];
  const seen = new Set<string>();

  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (
      !href.startsWith("/") ||
      href.length <= 3 ||
      href.includes(".") ||
      seen.has(href) ||
      SKIP_PREFIXES.some((p) => href.startsWith(p))
    ) return;
    seen.add(href);
    slugs.push(href);
  });

  if (slugs.length === 0) {
    console.warn("[scrapeList] Tidak ada slug ditemukan. HTML:", html.slice(0, 500));
  }

  // Pasangkan slug <-> thumbnail berdasarkan nama
  const cards: WallpaperCard[] = slugs.map((slug, i) => {
    const name = slug.slice(1);
    const matchingThumb = thumbnails.find((img) => img.includes(name));
    const thumbnail = matchingThumb || thumbnails[i] || "";
    const videoUrl = thumbnail ? thumbnailToVideoUrl(thumbnail) : null;

    return { slug, name, title: slugToTitle(name), thumbnail, videoUrl };
  });

  // Ada lebih banyak halaman jika halaman ini penuh (60 item)
  const hasMore = cards.length >= 30;

  return { cards, hasMore };
}

// ============================================================
// scrapeDetail — menggunakan Cheerio, persis dari live.js
// ============================================================

export async function scrapeDetail(slug: string): Promise<WallpaperDetail> {
  const url = `${BASE}/${slug}`;
  console.log(`[scrapeDetail] fetching: ${url}`);

  let html: string;
  try {
    // Small delay to reduce chance of rate limiting
    await new Promise((r) => setTimeout(r, 200));

    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      next: { revalidate: 3600 },
    });

    console.log(`[scrapeDetail] status: ${res.status} for "${slug}"`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    html = await res.text();
    console.log(`[scrapeDetail] HTML snippet (first 500 chars): ${html.slice(0, 500)}`);
  } catch (err) {
    console.error(`[scrapeDetail] fetch error for "${slug}":`, err);
    throw new Error(
      `Gagal mengambil detail: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const $ = load(html);

  const rawTitle = $("h1 span").first().text().trim() || slugToTitle(slug);
  const title = rawTitle;
  const description = $('meta[name="description"]').attr("content");
  const rawThumb = $('meta[property="og:image"]').attr("content");
  const rawPreview = $('meta[property="og:video"]').attr("content");

  // Normalisasi ke URL absolut
  const toAbs = (u: string | undefined) =>
    !u ? undefined : u.startsWith("http") ? u : `${BASE}${u}`;

  const thumbnail = toAbs(rawThumb);
  const previewVideo = toAbs(rawPreview);
  const videoSrc = $("video source").first().attr("src");
  // Prioritas: video source dari DOM → previewVideo dari og:video
  const videoUrl = videoSrc ? BASE + videoSrc : (previewVideo ?? null);

  const tags: string[] = [];
  $(".subtags a span").each((_, el) => {
    const t = $(el).text().trim();
    if (t) tags.push(t);
  });

  const downloads: { quality: string; url: string }[] = [];
  $(".download a").each((_, el) => {
    const quality = $(el).find(".font-bold").text().trim();
    const link = $(el).attr("href");
    if (link) {
      downloads.push({ quality: quality || "Download", url: BASE + link });
    }
  });

  console.log(`[scrapeDetail] parsed:`, { title, thumbnail, previewVideo, videoUrl, tags: tags.length, downloads: downloads.length });
  return { title, description, thumbnail, previewVideo, videoUrl, tags, downloads };
}
