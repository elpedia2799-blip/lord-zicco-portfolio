"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, SunMoon } from "lucide-react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [["Home","/"],["Portfolio","/#portfolio"],["About","/#about"],["Services","/#services"],["Contact","/#contact"]];
  return <header className="fixed left-0 right-0 top-0 z-50"><div className="container pt-4"><nav className="glass flex items-center justify-between rounded-full px-4 py-3"><Link href="/" className="flex items-center gap-3 font-semibold"><span className="grid size-9 place-items-center rounded-full bg-white text-black font-black">LZ</span><span>Lord Zicco</span></Link><div className="hidden items-center gap-7 md:flex">{links.map(([label,href]) => <Link key={label} href={href} className="text-sm text-white/65 hover:text-white">{label}</Link>)}</div><div className="hidden items-center gap-2 md:flex"><button aria-label="Toggle theme" className="grid size-10 place-items-center rounded-full border border-white/10"><SunMoon size={17}/></button><Link className="btn btn-red text-sm" href="/#contact">Let’s Talk <ArrowUpRight size={16}/></Link></div><button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X/> : <Menu/>}</button></nav>{open && <div className="glass mt-2 rounded-3xl p-5 md:hidden">{links.map(([label,href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="block border-b border-white/10 py-4 text-lg">{label}</Link>)}</div>}</div></header>;
}