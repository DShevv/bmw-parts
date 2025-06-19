export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seo/feed.xml`);
  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
