import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CapturaMaterial } from "@/components/captura-material";
import { formatarDataPt, lerPost, listarPosts } from "@/lib/blog";

const SITE = "https://www.josiedealbuquerque.com.br";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listarPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = lerPost(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: `${meta.titulo} | Josie de Albuquerque`,
    description: meta.resumo,
    alternates: { canonical: `/empresas/blog/${slug}` },
    openGraph: {
      type: "article",
      title: meta.titulo,
      description: meta.resumo,
      url: `${SITE}/empresas/blog/${slug}`,
      locale: "pt_BR",
    },
  };
}

export default async function PostEmpresasPage({ params }: Params) {
  const { slug } = await params;
  const post = lerPost(slug);
  if (!post) notFound();
  const { meta, html } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.titulo,
    datePublished: meta.data,
    author: { "@type": "Person", name: "Josie de Albuquerque" },
    publisher: { "@type": "Person", name: "Josie de Albuquerque" },
    mainEntityOfPage: `${SITE}/empresas/blog/${slug}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-brand text-bege">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32">
          <div className="text-sm text-bege/70">
            <Link className="hover:text-bege" href="/empresas">
              Empresas
            </Link>{" "}
            /{" "}
            <Link className="hover:text-bege" href="/empresas/blog">
              Blog
            </Link>{" "}
            / {meta.categoria}
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
            {meta.titulo}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-bege/80">
            <span className="rounded-full bg-bege/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {meta.categoria}
            </span>
            <span>{formatarDataPt(meta.data)}</span>
            <span>·</span>
            <span>Josie de Albuquerque</span>
          </div>
        </div>
      </section>

      <div className="px-5 py-14 sm:px-8">
        <article
          className="artigo"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {meta.material ? (
          <div className="mx-auto mt-12 max-w-2xl">
            <CapturaMaterial
              pdfHref={`/materiais/${meta.material}.pdf`}
              slug={meta.material}
              titulo={meta.materialTitulo ?? `Material: ${meta.titulo}`}
            />
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-brand p-8 text-center text-bege">
          <h2 className="font-serif text-2xl">
            Precisa adequar o PGR da sua empresa?
          </h2>
          <p className="mt-3 text-bege/85">
            A Josie conduz a avaliação de riscos psicossociais pronta para a
            fiscalização.
          </p>
          <Link
            className="mt-6 inline-block rounded-xl bg-bege px-6 py-3 font-semibold text-brand transition hover:opacity-90"
            href="/empresas/contato"
          >
            Agendar diagnóstico
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <Link className="text-sm font-semibold text-brand" href="/empresas/blog">
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    </div>
  );
}
