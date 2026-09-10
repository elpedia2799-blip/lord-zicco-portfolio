import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() { return NextResponse.json(await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })); }
export async function POST(req: Request) {
  try { await requireAdmin(); const body = await req.json(); return NextResponse.json(await prisma.service.create({ data: { name: body.name, description: body.description, icon: body.icon || "Sparkles" } })); }
  catch { return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 400 }); }
}