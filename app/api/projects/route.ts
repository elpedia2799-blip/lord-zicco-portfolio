import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validators";

export async function GET() {
  const projects = await prisma.project.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(projects);
}
export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = projectSchema.parse(await req.json());
    const project = await prisma.project.create({ data });
    return NextResponse.json(project);
  } catch (e) { return NextResponse.json({ error: e instanceof Error && e.message==="UNAUTHORIZED" ? "Unauthorized":"Invalid request" }, { status: 400 }); }
}