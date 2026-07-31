import type { Metadata } from "next";
import Link from "next/link";

import { HeroMarquise } from "@/components/hero-marquise";

export const metadata: Metadata = {
  title: "Para você | Mentoria",
  description:
    "Você tem uma vida que deveria te deixar bem, mas por dentro algo não flui. Descubra em 2 minutos qual bloqueio está te segurando.",
  alternates: { canonical: "/mentoria" },
};

const sintomas = [
  "Acorda no piloto automático e os dias parecem se repetir",
  "Sabe trazer soluções para todo mundo, menos para você",
  "Não tem clareza sobre o que quer da vida",
  "Vê oportunidades passarem porque hesita ou procrastina",
];

export default function MentoriaPage() {
  return (
    <>
      <HeroMarquise />

      <section className="mx-auto w-full max-w-3xl px-5 pb-12 pt-16 text-center sm:px-8">
        <p className="eyebrow">para você</p>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
          Quando o antigo já não faz sentido e o novo ainda não se revelou por
          completo, você está no LIMIAR. O primeiro passo é dar um nome a isso.
          Faça este diagnóstico, de apenas 2 minutos, e reconheça o que te
          trava no momento.
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
            caminho para superar cada um também é diferente. Por isso a
            jornada começa pelo diagnóstico.
          </p>
          <div className="mt-7 text-center">
            <Link className="btn-brand" href="/mentoria/quiz">
              Fazer o diagnóstico agora
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-14 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracota">
            O LIMIAR
          </p>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-fg">
            Um espaço de restauração, regulação, regeneração e integração para
            quem está pronta para atravessar para a próxima fase da própria
            vida.
          </p>
        </div>
      </section>
    </>
  );
}
