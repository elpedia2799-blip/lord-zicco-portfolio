import { prisma } from "@/lib/prisma";

export default async function Analytics() {
  const views = await prisma.project.findMany({ orderBy: { views: "desc" }, take: 10, select: { title: true, views: true } });
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="mt-1 text-white/40">Portfolio performance and most-viewed work.</p>
      <div className="mt-7 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
        <h2 className="font-bold">Most viewed projects</h2>
        <div className="mt-5 space-y-3">{views.map((v) => <div className="flex justify-between border-b border-white/5 pb-3" key={v.title}><span>{v.title}</span><span className="text-red">{v.views}</span></div>)}</div>
      </div>
    </div>
  );
}
