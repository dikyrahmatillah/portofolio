import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Allow: /
Disallow: /about
Disallow: /projects
Disallow: /experience
Disallow: /testimonials
Disallow: /contact
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml
`.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
