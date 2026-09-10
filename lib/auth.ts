import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-secret-change-me");
const COOKIE = "lz_admin_session";

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId, role: "ADMIN" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function destroySession() { (await cookies()).set(COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" }); }
export async function getSession() { const token=(await cookies()).get(COOKIE)?.value; if(!token)return null; try{const {payload}=await jwtVerify(token,secret);return payload as {userId:string;role:string};}catch{return null;} }
export async function requireAdmin(){const session=await getSession();if(!session||session.role!=="ADMIN")throw new Error("UNAUTHORIZED");return session;}
