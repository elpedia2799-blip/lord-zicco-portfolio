import Link from "next/link";
import { ArrowDown, ArrowUpRight, Instagram, Youtube, Sparkles, PenTool, Layers3, Image as ImageIcon, Shirt, PanelsTopLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/ContactForm";

const iconMap: Record<string, any> = { Sparkles, PenTool, Layers3, Image: ImageIcon, Shirt, PanelsTopLeft, Instagram };

export default async function Home() {
  const [settings, projects, services] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.project.findMany({ where: { published: true }, include: { category: true }, orderBy: [{ featured: "desc" }, { projectDate: "desc" }] }),
    prisma.service.findMany({ where: { enabled: true }, orderBy: { sortOrder: "asc" } })
  ]);
  const s = settings!;
  return <main>
    <section className="hero-grid relative min-h-screen overflow-hidden pt-32">
      <div className="hero-orb right-[5%] top-[12%]"/>
      <div className="container grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div className="reveal relative z-10">
          <div className="mb-6 text-xs font-bold tracking-[.3em] text-white/50">— GRAPHIC DESIGNER</div>
          <h1 className="display max-w-4xl text-6xl leading-[.84] sm:text-8xl lg:text-[9.3rem]">CREATIVE<br/>DESIGN.<br/><i className="red">BOLD</i> IDEAS.</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/55">{s?.heroDescription || "I’m Lord Zicco, a graphic designer focused on creating modern, bold and memorable visual identities."}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link className="btn btn-red" href="#portfolio">View Portfolio <ArrowUpRight size={17}/></Link><Link className="btn" href="#contact">Contact Me</Link></div>
          <div className="mt-10 flex gap-5 text-white/55"><a href={s?.instagram || "#"} aria-label="Instagram"><Instagram size={19}/></a><a href={s?.xUrl || "#"} aria-label="X">𝕏</a><a href={s?.behance || "#"} aria-label="Behance">Be</a><a href={s?.youtube || "#"} aria-label="YouTube"><Youtube size={19}/></a></div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px]"><div className="float overflow-hidden rounded-[34px] border border-white/10 bg-white/[.03] p-2 glow"><img src={s?.heroImage || "/placeholders/hero.svg"} alt="Lord Zicco hero visual" className="aspect-[4/5] w-full rounded-[28px] object-cover"/></div><div className="absolute -bottom-7 -left-4 glass rounded-2xl px-5 py-4 text-xs tracking-[.2em] text-white/60">LZ / VISUAL STUDIO</div></div>
      </div><div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/30"><ArrowDown/></div>
    </section>
    <section id="portfolio" className="section"><div className="container"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold tracking-[.3em] text-red">MY PORTFOLIO</p><h2 className="display text-5xl sm:text-7xl">Featured Work</h2></div><p className="max-w-md text-white/45">Selected projects from identity, apparel, campaigns and digital experiences.</p></div><div className="grid gap-5 md:grid-cols-2">{projects.map((p, i) => <Link href={`/projects/${p.slug}`} key={p.id} className={`card group ${i === 0 ? "md:row-span-2" : ""}`}><div className={`${i === 0 ? "aspect-[4/5]" : "aspect-[16/10]"} overflow-hidden bg-white/5`}><img src={p.imageUrl} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></div><div className="p-6"><div className="text-xs uppercase tracking-[.2em] text-red">{p.category.name}</div><h3 className="mt-2 text-2xl font-bold">{p.title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{p.description}</p></div></Link>)}</div></div></section>
    <section id="about" className="section border-y border-white/10 bg-[#080808]"><div className="container grid gap-12 lg:grid-cols-2 lg:items-center"><img src={s?.aboutImage || "/placeholders/about.svg"} alt="Lord Zicco profile" className="w-full rounded-[30px] border border-white/10 object-cover"/><div><p className="text-xs font-bold tracking-[.3em] text-red">ABOUT ME</p><h2 className="display mt-4 text-5xl sm:text-7xl">Hi, I’m Lord Zicco</h2><p className="mt-7 text-lg leading-8 text-white/55">{s?.aboutBio}</p><div className="mt-9 grid grid-cols-3 gap-3">{[[s?.experience || "2+","Years Experience"],[s?.projectsCount || "100+","Projects Completed"],[s?.clientsCount || "50+","Happy Clients"]].map(([n,l])=><div key={l} className="rounded-2xl border border-white/10 p-4"><b className="text-3xl">{n}</b><p className="mt-2 text-xs text-white/40">{l}</p></div>)}</div><blockquote className="mt-9 border-l-2 border-red pl-5 text-xl italic text-white/75">“{s?.quote}”</blockquote></div></div></section>
    <section id="services" className="section"><div className="container"><p className="text-xs font-bold tracking-[.3em] text-red">WHAT I DO</p><h2 className="display mt-4 text-5xl sm:text-7xl">Services</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((x) => { const Icon = iconMap[x.icon] || Sparkles; return <div className="card p-7" key={x.id}><Icon className="text-red" size={28}/><h3 className="mt-14 text-2xl font-bold">{x.name}</h3><p className="mt-3 text-sm leading-6 text-white/45">{x.description}</p></div> })}</div></div></section>
    <section className="section bg-[#080808]"><div className="container"><p className="text-xs font-bold tracking-[.3em] text-red">MY PROCESS</p><h2 className="display mt-4 text-5xl sm:text-7xl">How I Work</h2><div className="mt-12 grid gap-0 md:grid-cols-5">{[["01","Brief","Understand your needs and goals."],["02","Concept","Explore ideas and create concepts."],["03","Design","Bring the concept to life."],["04","Revision","Improve based on feedback."],["05","Final Delivery","Get your files ready to use."]].map(([n,t,d])=><div key={n} className="border-l border-white/10 p-6 first:border-l-0"><div className="text-sm text-red">{n}</div><h3 className="mt-7 text-xl font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-white/40">{d}</p></div>)}</div></div></section>
    <section id="contact" className="section"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold tracking-[.3em] text-red">GET IN TOUCH</p><h2 className="display mt-4 text-5xl sm:text-7xl">LET’S CREATE SOMETHING GREAT</h2><div className="mt-8 space-y-3 text-white/55"><p>{s?.email}</p><p>{s?.phone}</p><p>{s?.location}</p></div></div><ContactForm/></div></section>
  </main>
}