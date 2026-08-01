import type { MetadataRoute } from "next";

import { listarPosts } from "@/lib/blog";

/* O domínio tem padrão no código porque é público e porque sitemap com URL
   errada é pior que sitemap nenhum: o buscador indexa endereço que não existe.
   SITE_URL continua servindo para sobrescrever em preview. */
const SITE = (
  process.env.SITE_URL || "https://www.josiedealbuquerque.com.br"
).replace(/\/$/, "");

/* `prioridade` aqui não é chute: reflete o funil. As duas portas de entrada
   pagas (/mentoria/guia e /mentoria/quiz) e os dois hubs de mundo vêm antes
   das institucionais. */
const ROTAS: { caminho: string; prioridade: number; frequencia: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { caminho: "/", prioridade: 1, frequencia: "monthly" },
  { caminho: "/empresas", prioridade: 0.9, frequencia: "monthly" },
  { caminho: "/empresas/nr1", prioridade: 0.9, frequencia: "monthly" },
  { caminho: "/mentoria", prioridade: 0.9, frequencia: "monthly" },
  { caminho: "/mentoria/quiz", prioridade: 0.8, frequencia: "monthly" },
  { caminho: "/mentoria/guia", prioridade: 0.8, frequencia: "monthly" },
  { caminho: "/empresas/blog", prioridade: 0.7, frequencia: "weekly" },
  { caminho: "/empresas/contato", prioridade: 0.6, frequencia: "yearly" },
  { caminho: "/sobre", prioridade: 0.5, frequencia: "yearly" },
  { caminho: "/privacidade", prioridade: 0.2, frequencia: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const fixas = ROTAS.map((rota) => ({
    url: `${SITE}${rota.caminho}`,
    lastModified: agora,
    changeFrequency: rota.frequencia,
    priority: rota.prioridade,
  }));

  // Cada post entra com a data dele, não com a data do build.
  const posts = listarPosts().map((post) => ({
    url: `${SITE}/empresas/blog/${post.slug}`,
    lastModified: new Date(post.data),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...fixas, ...posts];
}
