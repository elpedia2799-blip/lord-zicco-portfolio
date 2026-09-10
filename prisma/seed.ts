import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const seedPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!seedPassword) throw new Error("ADMIN_SEED_PASSWORD must be set before seeding.");
  const passwordHash = await bcrypt.hash(seedPassword, 12);
  await prisma.user.upsert({where:{email:"admin@lordzicco.com"},update:{passwordHash},create:{email:"admin@lordzicco.com",passwordHash,name:"Lord Zicco",role:"ADMIN"}});
  const categoryNames=["Logos","Posters","T-Shirts","Social Media","Branding","UI/UX","Flyer Design","Photo Manipulation"]; const categories:Record<string,string>={};
  for(const name of categoryNames){const c=await prisma.category.upsert({where:{name},update:{},create:{name}});categories[name]=c.id;}
  const services=[["Logo Design","Distinctive marks and logo systems built for recognition.","PenTool"],["Brand Identity","Cohesive visual systems that make brands feel consistent.","Layers3"],["Poster & Flyer Design","High-impact campaign graphics designed to communicate fast.","Image"],["T-Shirt Design","Bold apparel graphics for clubs, brands and events.","Shirt"],["Social Media Design","Scroll-stopping content systems for digital platforms.","Instagram"],["UI/UX Design","Clean interfaces and thoughtful experiences for digital products.","PanelsTopLeft"]];
  for(let i=0;i<services.length;i++) await prisma.service.upsert({where:{id:`seed-service-${i}`},update:{name:services[i][0],description:services[i][1],icon:services[i][2],enabled:true,sortOrder:i},create:{id:`seed-service-${i}`,name:services[i][0],description:services[i][1],icon:services[i][2],sortOrder:i}});
  await prisma.siteSettings.upsert({where:{id:"main"},update:{},create:{}});
  const sample=[["LZ Identity","A bold visual identity concept for Lord Zicco.","Branding",true],["Red Signal","Editorial poster exploration with a cinematic red accent.","Posters",true],["Circuit Culture","Futuristic apparel graphic inspired by PCB traces.","T-Shirts",false],["Studio Social","A social media visual system for a creative studio.","Social Media",false]];
  for(const [title,description,category,featured] of sample) await prisma.project.upsert({where:{slug:String(title).toLowerCase().replaceAll(" ","-")},update:{},create:{slug:String(title).toLowerCase().replaceAll(" ","-"),title:String(title),description:String(description),imageUrl:"/placeholders/project.svg",published:true,featured:Boolean(featured),categoryId:categories[String(category)]}});
}
main().finally(()=>prisma.$disconnect());