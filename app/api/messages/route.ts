import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { messageSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const input = messageSchema.parse(await req.json());
    await prisma.message.create({ data: input });
    await prisma.analyticsEvent.create({ data: { type: "CONTACT_SUBMISSION", path: "/#contact" } });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid form data" }, { status: 400 }); }
}