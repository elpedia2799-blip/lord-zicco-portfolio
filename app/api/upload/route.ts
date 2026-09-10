import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST() {
  try {
    await requireAdmin();
    if (!process.env.CLOUDINARY_CLOUD_NAME) return NextResponse.json({ error: "Configure Cloudinary first." }, { status: 501 });
    return NextResponse.json({ error: "Use the Cloudinary upload widget/direct signed upload in your deployment." }, { status: 501 });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}