import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() { return NextResponse.json(await prisma.siteSettings.findUnique({ where: { id: "main" } })); }
export async function PUT(req: Request) {
  try { await requireAdmin(); const body = await req.json(); const allowed = ["siteTitle","seoDescription","heroHeading","heroDescription","heroImage","aboutBio","aboutImage","experience","projectsCount","clientsCount","quote","email","phone","location","instagram","xUrl","behance","youtube","copyright","footerText"]; const data = Object.fromEntries(Object.entries(body).filter(([k])=>allowed.includes(k))); return NextResponse.json(await prisma.siteSettings.update({ where: { id: "main" }, data })); }
  catch { return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 400 }); }
}