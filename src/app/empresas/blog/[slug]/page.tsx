import type { Metadata } from "next";
import Image from "next/image";
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

      {meta.imagem ? (
        <figure className="mx-auto w-full max-w-4xl px-5 pt-10 sm:px-8">
          {/* Prova de entrega real, em preto e branco para não competir com o
              texto técnico. O material de origem é 3:4; o corte 16:9 é do CSS. */}
          <Image
            alt="Josie de Albuquerque apontando para um slide sobre hierarquia de necessidades durante treinamento numa empresa"
            className="aspect-[16/9] w-full rounded-2xl object-cover object-[center_30%] ring-1 ring-black/5"
            height={1867}
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            src={meta.imagem}
            width={1400}
          />
          <figcaption className="mt-3 text-xs leading-5 text-muted">
            Josie de Albuquerque conduzindo treinamento sobre riscos
            psicossociais e bem-estar organizacional, in company.
          </figcaption>
        </figure>
      ) : null}

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
