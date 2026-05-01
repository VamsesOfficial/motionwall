import Navbar from "@/components/Navbar";
import WallpaperGrid from "@/components/WallpaperGrid";
import HeroSection from "@/components/HeroSection";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "MotionWall — Premium 4K Live Wallpapers",
  description: "Discover 8950+ cinematic live wallpapers. Ultra HD, free download.",
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <main style={{ background: "#050507", minHeight: "100vh" }}>
      <Navbar />
      {!query && <HeroSection />}
      <div
        id="grid"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: query ? "clamp(90px,12vw,120px) clamp(16px,3vw,32px) 80px" : "0 clamp(16px,3vw,32px) 80px",
        }}
      >
        <WallpaperGrid initialQuery={query} />
      </div>
    </main>
  );
}
