import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HeroVideoCheio } from "@/components/hero-video-cheio";

export const metadata: Metadata = {
  title: "Para empresas | NR-1 e bem-estar organizacional",
  description:
    "Diagnóstico, programa de bem-estar organizacional e adequação à NR-1: gestão de riscos psicossociais com método e conformidade.",
  alternates: { canonical: "/empresas" },
};

const riscos = [
  {
    title: "Multas e passivo trabalhista",
    body: "A NR-1 exige gestão de riscos psicossociais. A fiscalização está ativa e a não conformidade gera autuação.",
  },
  {
    title: "Afastamentos e turnover",
    body: "Ambientes adoecidos elevam afastamentos por saúde mental, hoje uma das principais causas de ausência no Brasil.",
  },
  {
    title: "Produtividade em queda",
    body: "Equipes sobrecarregadas e desengajadas entregam menos, erram mais e levam o clima junto.",
  },
];

const etapas = [
  {
    numero: "01",
    title: "Diagnóstico Estratégico Organizacional",
    body: "Realizamos um mapeamento completo dos riscos psicossociais, da segurança psicológica, do clima organizacional e dos fatores que impactam a saúde, o engajamento e a produtividade das equipes, identificando prioridades e oportunidades de melhoria.",
  },
  {
    numero: "02",
    title: "Programa de Bem-Estar e Desenvolvimento Humano",
    body: "Desenvolvemos soluções personalizadas para fortalecer a saúde mental, o equilíbrio emocional, a qualidade das relações, a liderança e o bem-estar organizacional, promovendo ambientes mais saudáveis, engajados e sustentáveis.",
  },
  {
    numero: "03",
    title: "Gestão Estratégica e Adequação à NR-1",
    body: "Transformamos as exigências da NR-1 em ações práticas de prevenção, monitoramento e melhoria contínua, integrando a gestão dos riscos psicossociais à estratégia da empresa e fortalecendo sua cultura organizacional, transformando uma exigência legal em uma vantagem competitiva.",
  },
];

export default function EmpresasPage() {
  return (
    <>
      <HeroVideoCheio />

      {/* O texto desce para logo abaixo do vídeo. Com o hero deixando de ser
          uma grade de duas colunas, some o vazio que sobrava sob o CTA no
          desktop: agora a coluna não precisa acompanhar a altura da figura. */}
      <section className="bg-[#152a4a]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-8 sm:py-16">
          <Link
            className="group mb-4 inline-flex items-center gap-1.5 rounded-full bg-eucalipto/25 px-3 py-1 text-[11.5px] font-medium text-bege transition-colors hover:bg-eucalipto/40"
            href="/empresas/nr1"
          >
            A fase punitiva da NR-1 já começou
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <h1 className="max-w-2xl text-[1.6rem] font-medium leading-[1.15] tracking-tight text-bege sm:text-[2.1rem]">
            Adequação à NR-1 não é sobre evitar multa. É sobre construir uma
            empresa mais forte.
          </h1>

          <p className="mt-4 max-w-xl text-[14px] leading-6 font-normal text-bege/70 sm:text-[15px]">
            Gestão de riscos psicossociais com método e conformidade.
          </p>

          <Link
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-bege/60 px-5 py-3 text-[13px] font-medium text-bege transition-all duration-200 hover:border-bege hover:bg-bege hover:text-[#16243c] sm:w-auto"
            href="/empresas/contato"
          >
            Agendar um diagnóstico inicial
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="border-b border-line bg-surface/70">
        <div className="mx-auto w-full max-w-5xl px-5 pt-14 sm:px-8">
          <p className="eyebrow">para empresas</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Transformamos a adequação à NR-1 em uma estratégia de crescimento
            organizacional, promovendo saúde mental, segurança psicológica e
            ambientes de trabalho que impulsionam pessoas, resultados e
            sustentabilidade empresarial.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-5 py-12 sm:px-8 md:grid-cols-3">
          {riscos.map((item) => (
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

      <section className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
        <h2 className="text-3xl font-medium">Como trabalhamos</h2>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          {/* Foto da entrega real, em preto e branco: prova sem competir com o
              texto nem puxar a atenção para a cor. O material de origem é 3:4. */}
          <figure className="md:sticky md:top-28">
            <Image
              alt="Josie de Albuquerque conduzindo uma entrega sobre NR-1 e bem-estar organizacional numa empresa"
              className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
              height={1333}
              sizes="(min-width: 768px) 38vw, 100vw"
              src="/img/josie-metodo-pb.jpg"
              width={1000}
            />
            <figcaption className="mt-3 text-xs leading-5 text-muted">
              Entrega in company sobre NR-1 e bem-estar organizacional.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            {etapas.map((etapa) => (
              <div className="flex gap-5" key={etapa.numero}>
                <span className="font-serif text-2xl text-brand">
                  {etapa.numero}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-fg">{etapa.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {etapa.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <blockquote className="mt-10 rounded-2xl border border-petroleo/20 bg-petroleo/5 p-7">
          <p className="text-base leading-7 text-fg italic">
            &ldquo;Mais do que adequar empresas à NR-1, ajudamos organizações a
            construir ambientes emocionalmente saudáveis, produtivos e
            preparados para os desafios do futuro do trabalho.&rdquo;
          </p>
        </blockquote>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-7">
          <p className="text-sm leading-7 text-muted">
            <strong className="text-fg">Quem conduz:</strong> Josie de
            Albuquerque, Administradora, especialista em Desenvolvimento Humano
            e com especialização em Gestão Estratégica em NR-1 e Bem-Estar
            Organizacional. Possui sólida experiência em gestão administrativa e
            mais de 12 anos atuando no desenvolvimento de pessoas, incluindo
            vivência em grandes empresas e projetos voltados à saúde integrativa,
            comportamento e desempenho humano.
          </p>
        </div>
        <div className="mt-8">
          <Link className="btn-brand" href="/empresas/contato">
            Agendar um diagnóstico inicial
          </Link>
        </div>
      </section>
    </>
  );
}
