/**
 * Proxy media URLs through /api/img to bypass motionbgs.com hotlink protection.
 * Server-side kita kirim Referer: https://motionbgs.com/ sehingga lolos.
 */
export function proxiedImg(originalUrl: string | undefined | null): string | undefined {
  if (!originalUrl) return undefined;
  return `/api/img?url=${encodeURIComponent(originalUrl)}`;
}

// Video juga pakai proxy yang sama (route /api/img handle MP4/WebM)
export const proxiedVideo = proxiedImg;
