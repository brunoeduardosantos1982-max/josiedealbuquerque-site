import type { Metadata } from "next";
import Link from "next/link";

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
    title: "Diagnóstico",
    body: "Mapeamento dos riscos psicossociais e do clima da empresa, com leitura técnica e plano de prioridades.",
  },
  {
    numero: "02",
    title: "Programa de bem-estar",
    body: "Ações estruturadas de desenvolvimento humano e saúde organizacional, desenhadas para a realidade da empresa.",
  },
  {
    numero: "03",
    title: "Adequação à NR-1",
    body: "Documentação e gestão contínua dos riscos psicossociais, em conformidade com a norma.",
  },
];

export default function EmpresasPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
        <p className="eyebrow">para empresas</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.12] sm:text-5xl">
          Sua empresa está preparada para as exigências da NR-1 em saúde
          mental?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          A norma agora obriga a gestão de riscos psicossociais no trabalho.
          Adequar-se é lei, e é também o que reduz afastamentos, turnover e
          queda de produtividade.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link className="btn-brand" href="/empresas/contato">
            Agendar um diagnóstico inicial
          </Link>
          <Link className="btn-outline" href="/empresas/nr1">
            Entender a NR-1
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-surface/70">
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

      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8">
        <h2 className="text-3xl font-medium">Como trabalhamos</h2>
        <div className="mt-8 flex flex-col gap-6">
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
        <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
          <p className="text-sm leading-7 text-muted">
            <strong className="text-fg">Quem conduz:</strong> Josie de
            Albuquerque, especialização em Gestão Estratégica em NR-1,
            experiência em gestão administrativa e mais de 12 anos em
            desenvolvimento humano, com atuação dentro de grandes empresas.
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
