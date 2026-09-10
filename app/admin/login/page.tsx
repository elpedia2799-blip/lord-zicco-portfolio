"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [error,setError]=useState(""); const router=useRouter();
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setError("");const body=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok) router.push("/admin"); else setError("Invalid email or password.");}
  return <main className="min-h-screen bg-[#050505] grid place-items-center p-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-7"><div className="mb-8"><b className="text-3xl">LZ</b><p className="mt-2 text-white/40">Admin Control Center</p></div><input name="email" type="email" required placeholder="Email" className="mb-3 w-full rounded-xl border border-white/10 bg-white/[.03] p-4"/><input name="password" type="password" required placeholder="Password" className="mb-5 w-full rounded-xl border border-white/10 bg-white/[.03] p-4"/><button className="btn btn-red w-full">Sign in</button>{error&&<p className="mt-4 text-sm text-red">{error}</p>}<p className="mt-5 text-xs text-white/25">Change the seeded password immediately after setup.</p></form></main>
}
