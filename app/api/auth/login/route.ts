import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validators";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const input = loginSchema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
}