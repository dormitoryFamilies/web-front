import { scrapeDormitoryData } from "../../../lib/api/scraper";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || 1; // `type`이 없을 경우 기본값 설정

    const data = await scrapeDormitoryData(type);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error scraping data:", error);
    return new Response(JSON.stringify({ error: "Failed to scrape data" }), { status: 500 });
  }
}
