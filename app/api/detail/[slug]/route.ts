import { NextResponse } from "next/server";
import { scrapeDetail } from "@/lib/scraper";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  console.log(`[/api/detail] received slug: "${slug}"`);

  try {
    const detail = await scrapeDetail(slug);
    return NextResponse.json(detail);
  } catch (err) {
    console.error(`[/api/detail/${slug}] error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Scraping gagal" },
      { status: 502 }
    );
  }
}
