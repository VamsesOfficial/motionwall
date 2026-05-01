import DetailClient from "./DetailClient";
import Navbar from "@/components/Navbar";
import { slugToTitle } from "@/lib/scraper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// generateMetadata TIDAK memanggil scrapeDetail agar tidak blocking render
// dan tidak menyebabkan double-fetch yang bisa trigger error page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = slugToTitle(slug);
  return {
    title: `${title} — MotionWall`,
    description: `Watch ${title} live wallpaper in 4K. Free download on MotionWall.`,
  };
}

export default async function WallpaperPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main style={{ background: "#050507", minHeight: "100vh" }}>
      <Navbar />
      <DetailClient slug={slug} />
    </main>
  );
}
