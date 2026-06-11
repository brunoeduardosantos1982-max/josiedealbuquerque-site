import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Para você | Mentoria",
  description:
    "Você tem uma vida que deveria te deixar bem, mas por dentro algo não flui. Descubra em 2 minutos qual bloqueio está te segurando.",
  alternates: { canonical: "/mentoria" },
};

const sintomas = [
  "Acorda no piloto automático e os dias se parecem demais",
  "Dá conta de todo mundo, menos de você",
  "Não sabe mais responder o que você quer da vida",
  "Vê oportunidades passarem porque hesitou",
];

export default function MentoriaPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-5 pb-12 pt-16 text-center sm:px-8 sm:pt-24">
        <p className="eyebrow">para você</p>
        <h1 className="mt-5 text-4xl font-medium leading-[1.12] sm:text-5xl">
          Por fora, está tudo em ordem. Por dentro, algo travou.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
          Você montou uma vida que, no papel, deveria te deixar bem. Mas a
          sensação de estar travada não vai embora. O primeiro passo é dar
          nome a isso: um diagnóstico honesto, de 2 minutos.
        </p>
        <div className="mt-9">
          <Link className="btn-brand" href="/mentoria/quiz">
            Descobrir por que me sinto travada
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted">
          8 perguntas · 2 minutos · resultado na hora
        </p>
      </section>

      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
          <h2 className="text-center text-2xl font-medium">
            Você se reconhece em algum destes?
          </h2>
          <ul className="mx-auto mt-7 flex max-w-xl flex-col gap-3">
            {sintomas.map((item) => (
              <li
                className="rounded-xl border border-line bg-surface px-5 py-4 text-[15px] leading-6 text-fg"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm leading-6 text-muted">
            Cada uma dessas frases aponta para um bloqueio diferente, e o
            caminho para sair de cada um também é diferente. Por isso a
            jornada começa pelo diagnóstico.
          </p>
          <div className="mt-7 text-center">
            <Link className="btn-brand" href="/mentoria/quiz">
              Fazer o diagnóstico agora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
