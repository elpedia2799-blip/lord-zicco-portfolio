import "./globals.css";
import { prisma } from "@/lib/prisma";
import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "Lord Zicco — Graphic Designer",
  description: "Lord Zicco is a graphic designer creating bold visual identities, branding, posters, apparel, social media designs and digital experiences."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings = null;
  try { settings = await prisma.siteSettings.findUnique({ where: { id: "main" } }); } catch {}
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <footer className="border-t border-white/10 py-10">
          <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><b className="text-2xl">LZ</b><span className="ml-3 text-white/70">Lord Zicco</span></div>
            <div className="text-sm text-white/45">{settings?.footerText || "Design / Create / Inspire"}</div>
            <div className="text-sm text-white/45">{settings?.copyright || "© 2026 Lord Zicco. All rights reserved."}</div>
          </div>
        </footer>
      </body>
    </html>
  );
}