"use client";
import { useState } from "react";
export function ContactForm() {
  const [state,setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    setState(res.ok ? "success" : "error"); if(res.ok) e.currentTarget.reset();
  }
  return <form onSubmit={submit} className="space-y-4 rounded-[28px] border border-white/10 bg-[#090909] p-5 md:p-7">
    {["name","email","subject"].map(x=><input key={x} name={x} required placeholder={x[0].toUpperCase()+x.slice(1)} className="w-full rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4 outline-none focus:border-red"/>)}
    <textarea name="message" required placeholder="Tell me about your project..." rows={7} className="w-full resize-y rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4 outline-none focus:border-red"/>
    <button disabled={state==="loading"} className="btn btn-red w-full">{state==="loading"?"Sending…":"Send Message →"}</button>
    {state==="success" && <p className="text-sm text-green-400">Message sent successfully.</p>}
    {state==="error" && <p className="text-sm text-red">Something went wrong. Please try again.</p>}
  </form>
}