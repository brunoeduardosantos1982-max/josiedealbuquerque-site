import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatarDataPt, listarPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog NR-1 e riscos psicossociais | Josie de Albuquerque",
  description:
    "Conteúdo técnico sobre NR-1, riscos psicossociais e conformidade do PGR para empresas.",
  alternates: { canonical: "/empresas/blog" },
};

export default function BlogEmpresasPage() {
  const posts = listarPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <p className="eyebrow">Conteúdo para empresas</p>
      <h1 className="mt-3 font-serif text-4xl text-brand">
        NR-1, riscos psicossociais e conformidade
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-muted">
        Análises práticas sobre a norma, o que a fiscalização exige e como manter
        o PGR da sua empresa em conformidade.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-brand"
            href={`/empresas/blog/${post.slug}`}
            key={post.slug}
          >
            {/* Com foto, o card mostra a prova de entrega real. Sem, cai no
                bloco petróleo de antes, para post novo nunca nascer quebrado. */}
            <div className="relative flex h-40 items-end overflow-hidden bg-brand p-5">
              {post.imagem ? (
                <Image
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[center_35%] transition duration-500 group-hover:scale-105"
                  height={1867}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  src={post.imagem}
                  width={1400}
                />
              ) : null}
              <span className="relative rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bege backdrop-blur-sm">
                {post.categoria}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs text-muted">
                {formatarDataPt(post.data)}
              </span>
              <h2 className="mt-2 font-serif text-xl leading-snug text-brand">
                {post.titulo}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                {post.resumo}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
