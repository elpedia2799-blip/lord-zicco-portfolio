import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const [visitors, portfolioViews, submissions, projects] = await Promise.all([
      prisma.analyticsEvent.count({ where: { type: "VISIT" } }),
      prisma.analyticsEvent.count({ where: { type: "PROJECT_VIEW" } }),
      prisma.message.count(),
      prisma.project.findMany({ orderBy: { views: "desc" }, take: 5, select: { title:true, views:true } })
    ]);
    return NextResponse.json({ visitors, portfolioViews, submissions, projects });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}