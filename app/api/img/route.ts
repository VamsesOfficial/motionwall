import { NextRequest, NextResponse } from "next/server";

// Whitelist path prefixes yang diizinkan dari motionbgs.com
const ALLOWED_PATHS = ["/i/c/", "/media/", "/static/"];

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) return new NextResponse("Missing url", { status: 400 });

  // Normalisasi: jika URL relatif (/i/c/... atau /media/...), jadikan absolut
  const url = rawUrl.startsWith("/")
    ? `https://motionbgs.com${rawUrl}`
    : rawUrl;

  // Pastikan URL dari motionbgs.com
  if (!url.startsWith("https://motionbgs.com/")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Pastikan path masuk whitelist
  const path = url.replace("https://motionbgs.com", "");
  const allowed = ALLOWED_PATHS.some((p) => path.startsWith(p));
  if (!allowed) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        // Kunci: Referer ke domain mereka sendiri untuk bypass hotlink protection
        Referer: "https://motionbgs.com/",
        Accept: "image/avif,image/webp,image/apng,image/*,video/mp4,video/webm,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    });

    if (!res.ok) {
      console.error(`[/api/img] fetch failed: ${res.status} for ${url}`);
      return new NextResponse("Upstream fetch failed", { status: res.status });
    }

    const contentType = res.headers.get("content-type") ?? "application/octet-stream";
    const isVideo = contentType.includes("video") || url.endsWith(".mp4") || url.endsWith(".webm");

    if (isVideo) {
      // Untuk video, stream langsung agar tidak load semua ke memori
      return new NextResponse(res.body, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400",
          "Accept-Ranges": res.headers.get("accept-ranges") ?? "bytes",
          ...(res.headers.get("content-length")
            ? { "Content-Length": res.headers.get("content-length")! }
            : {}),
        },
      });
    }

    // Untuk image, buffer dan return
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error(`[/api/img] error for ${url}:`, err);
    return new NextResponse("Proxy error", { status: 500 });
  }
}
