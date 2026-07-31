import type { Metadata } from "next";
import Link from "next/link";

import { CapturaB2C } from "@/components/captura-b2c";

/* Landing de tráfego pago do mundo Mentoria.

   Era a página de venda do Guia Essencial de R$ 19,90 na Hotmart. Desde a
   virada de modelo de 2026-07-30 nada é vendido aqui: o material é gratuito e
   a página existe para capturar lead de anúncio. O que se vende no funil é a
   consulta de mentoria, e ela vem depois, pelo pré-diagnóstico.

   Página de anúncio: um objetivo só, sem link de saída competindo com o
   formulário. O único caminho alternativo é o pré-diagnóstico, no rodapé. */

const MATERIAL = "caderno-do-caos-ao-equilibrio";

export const metadata: Metadata = {
  title: "Do Caos ao Equilíbrio | Caderno gratuito",
  description:
    "Caderno gratuito de 49 páginas para quem construiu uma vida certa por fora e se sente travada por dentro. Autoavaliação, exercícios e um caminho em quatro pilares.",
  alternates: { canonical: "/mentoria/guia" },
};

const dentro = [
  {
    title: "Um diagnóstico honesto",
    body: "Uma autoavaliação de cuidado em seis áreas da vida, para você ver, com número na frente, onde anda se abandonando sem perceber.",
  },
  {
    title: "Os quatro bloqueios",
    body: "Estagnação, esgotamento, falta de direção e insegurança. Você lê os quatro e reconhece o seu, com o caminho de saída de cada um.",
  },
  {
    title: "26 exercícios para escrever",
    body: "Limites, valores, atenção plena, sono, metas. Organizados em quatro partes: aceitação, presença, coragem e disciplina.",
  },
];

export default function GuiaPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-14">
          <div>
            <p className="eyebrow">caderno gratuito</p>
            <h1 className="mt-5 text-4xl font-medium leading-[1.12] sm:text-5xl">
              Você construiu uma vida certa e mesmo assim se sente travada.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Não é falta de esforço, e não é você que está quebrada. É que em
              algum ponto do caminho você saiu da própria lista. Este caderno de
              49 páginas foi feito para você se escutar de novo, com a sua letra
              e no seu tempo.
            </p>
            <p className="mt-5 text-base leading-7 text-muted">
              Escrito por Josie de Albuquerque a partir de doze anos
              acompanhando mulheres e de dezoito histórias estudadas de perto.
            </p>
          </div>

          <div className="md:sticky md:top-24">
            <CapturaB2C
              chamada="Receber o caderno agora"
              slug={MATERIAL}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-5 py-12 sm:px-8 md:grid-cols-3">
          {dentro.map((item) => (
            <div
              className="rounded-2xl border border-line bg-surface p-6"
              key={item.title}
            >
              <h2 className="text-lg font-medium text-fg">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 py-14 text-center sm:px-8">
        <p className="font-serif text-2xl leading-relaxed italic text-fg">
          &ldquo;Hoje eu vivo em Equilíbrio, mas eu já fui uma agente do
          Caos.&rdquo;
        </p>
        <p className="mt-3 text-sm text-muted">Josie de Albuquerque</p>

        <p className="mt-10 text-base leading-7 text-muted">
          Quer saber, antes de ler, qual é exatamente o bloqueio que está te
          segurando?
        </p>
        <Link className="btn-outline mt-5 inline-block" href="/mentoria/quiz">
          Fazer o pré-diagnóstico
        </Link>

        <p className="mx-auto mt-10 max-w-xl text-[11px] leading-5 text-muted opacity-80">
          Este conteúdo é educacional e de desenvolvimento pessoal. Não
          constitui diagnóstico, conduta psicológica ou médica, nem substitui
          acompanhamento profissional de saúde.
        </p>
      </section>
    </>
  );
}
