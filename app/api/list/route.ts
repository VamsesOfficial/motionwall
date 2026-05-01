import { NextResponse } from "next/server";
import { scrapeList } from "@/lib/scraper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const q = searchParams.get("q") || "";

  try {
    const { cards, hasMore } = await scrapeList(q || undefined, page);

    return NextResponse.json({
      items: cards,
      hasMore,
      total: cards.length,
    });
  } catch (err) {
    console.error("[/api/list] error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Scraping gagal",
        items: [],
        hasMore: false,
        total: 0,
      },
      { status: 502 }
    );
  }
}
