import { prisma } from "@/lib/prisma";

export default async function Media() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Media Library</h1>
      <p className="mt-1 text-white/40">Upload and reuse images for projects and content.</p>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        {media.map((m) => <div key={m.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"><img src={m.url} alt={m.alt || m.filename} className="aspect-square w-full object-cover" /><p className="truncate p-3 text-xs text-white/40">{m.filename}</p></div>)}
      </div>
    </div>
  );
}
