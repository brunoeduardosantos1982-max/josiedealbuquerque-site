import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NR-1 e riscos psicossociais: o que sua empresa precisa fazer",
  description:
    "Entenda o que a NR-1 exige sobre gestão de riscos psicossociais, prazos, fiscalização e como adequar sua empresa.",
  alternates: { canonical: "/empresas/nr1" },
};

/* Página-pilar (SEO + autoridade). Conteúdo inicial; expansão técnica completa
   está especificada para o Codex em docs/tasks/codex-nr1-pilar.md */
export default function Nr1Page() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <p className="eyebrow">guia técnico</p>
      <h1 className="mt-4 text-4xl font-medium leading-[1.12]">
        NR-1 e riscos psicossociais: o que sua empresa precisa fazer
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-base leading-8 text-muted">
        <p>
          A NR-1 (Norma Regulamentadora nº 1) estabelece o Gerenciamento de
          Riscos Ocupacionais e passou a exigir que as empresas identifiquem,
          avaliem e gerenciem também os <strong className="text-fg">riscos
          psicossociais</strong>: fatores do trabalho que afetam a saúde
          mental, como sobrecarga, assédio, jornadas exaustivas e falta de
          autonomia.
        </p>
        <p>
          Na prática, isso significa que saúde mental deixou de ser um tema de
          benefício e virou <strong className="text-fg">obrigação legal</strong>,
          com fiscalização ativa e autuação para empresas em não conformidade.
        </p>
        <h2 className="mt-4 text-2xl font-medium text-fg">
          O que a norma exige
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>Identificação e avaliação dos riscos psicossociais no PGR</li>
          <li>Medidas de prevenção e controle documentadas</li>
          <li>Acompanhamento contínuo e revisão periódica</li>
          <li>Evidências de ação, não apenas declarações de intenção</li>
        </ul>
        <h2 className="mt-4 text-2xl font-medium text-fg">
          Por onde começar
        </h2>
        <p>
          O primeiro passo é um diagnóstico: entender o cenário real da
          empresa antes de produzir documentos. A adequação que começa pelo
          papel e ignora o ambiente costuma falhar nos dois: nem protege as
          pessoas, nem passa na fiscalização.
        </p>
      </div>
      <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
        <h2 className="text-xl font-medium text-fg">
          Quer saber como está a sua empresa?
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Agende um diagnóstico inicial e receba uma leitura honesta do que
          falta para a conformidade, e do que isso pode devolver em clima e
          produtividade.
        </p>
        <Link className="btn-brand mt-5 inline-block" href="/empresas/contato">
          Agendar diagnóstico
        </Link>
      </div>
    </article>
  );
}
