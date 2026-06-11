import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guia Essencial",
  description:
    "Hábitos, rotina e equilíbrio para destravar a partir de onde você está. O primeiro passo prático da jornada, por R$ 19,90.",
  alternates: { canonical: "/mentoria/guia" },
};

const HOTMART_URL = "https://pay.hotmart.com/M95873042T?off=uoo819k9";

const entregas = [
  {
    title: "Hábitos de equilíbrio",
    body: "Estrutura de rotina elaborada a partir do essencialismo: foco no que devolve energia, corte do que só consome.",
  },
  {
    title: "Clareza no dia a dia",
    body: "Ferramentas práticas para gerenciar tempo e atenção, prevenindo a ansiedade de viver apagando incêndio.",
  },
  {
    title: "Reconexão com você",
    body: "Práticas de autoconhecimento para retomar o contato com o que é seu de verdade, um passo por vez.",
  },
];

export default function GuiaPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-5 pb-12 pt-16 text-center sm:px-8">
        <p className="eyebrow">o primeiro passo</p>
        <h1 className="mt-5 text-4xl font-medium leading-[1.12] sm:text-5xl">
          Guia Essencial
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
          Saber o nome do seu bloqueio é o começo. Destravar pede prática: uma
          rotina que te devolva energia, foco no essencial e reconexão com o
          que você quer. É exatamente isso que o Guia Essencial entrega.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <a className="btn-brand" href={HOTMART_URL}>
            Quero o Guia Essencial · R$ 19,90
          </a>
          <p className="text-xs text-muted">
            Acesso imediato · pagamento seguro via Hotmart
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-5 py-12 sm:px-8 md:grid-cols-3">
          {entregas.map((item) => (
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

      <section className="mx-auto w-full max-w-3xl px-5 py-12 text-center sm:px-8">
        <p className="text-base leading-7 text-muted">
          Criado por Josie de Albuquerque, especialista em desenvolvimento
          pessoal com mais de 12 anos de experiência e mais de mil pessoas
          acompanhadas.
        </p>
        <a className="btn-brand mt-7 inline-block" href={HOTMART_URL}>
          Começar agora · R$ 19,90
        </a>
        <p className="mx-auto mt-8 max-w-xl text-[11px] leading-5 text-muted opacity-80">
          Este conteúdo é educacional e de desenvolvimento pessoal. Não
          constitui diagnóstico, conduta psicológica ou médica, nem
          substitui acompanhamento profissional de saúde.
        </p>
      </section>
    </>
  );
}
