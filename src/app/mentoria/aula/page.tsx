import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AulaGate } from "@/components/aula-gate";

/* Landing da aula gratuita "Clareza na Transição".

   É o destino de TODO o tráfego pago e de e-mail no modelo decidido em
   2026-08-01. A aula é híbrida: a gravação abre nesta página na hora, e uma vez
   por mês há um encontro ao vivo onde quem fez o quiz pergunta sobre o próprio
   resultado.

   PENDÊNCIAS DE CONTEÚDO (marcadas com AJUSTAR quando a Josie definir):
   - o tema e o recorte da aula;
   - o arquivo da gravação em `public/video/`;
   - os três pontos de "o que você vai ver", que hoje falam do que a marca já
     promete de forma verificável, não do conteúdo específico dela.

   Enquanto a gravação não existe, `AULA_VIDEO` fica vazio e o portão confirma a
   inscrição sem player quebrado. A página está fora do sitemap e com noindex
   até a aula existir: landing de captação indexada antes da hora recebe visita
   que não converte e ainda queima a URL no buscador. */

const MATERIAL = "aula-clareza-na-transicao";
const AULA_VIDEO = ""; // AJUSTAR: "/video/aula-clareza.mp4" quando a gravação existir

export const metadata: Metadata = {
  title: "Clareza na Transição | Aula gratuita com Josie de Albuquerque",
  description:
    "Aula gratuita para mulheres que construíram uma vida certa por fora e se sentem travadas por dentro. Entenda o que está te segurando e qual é o primeiro passo.",
  alternates: { canonical: "/mentoria/aula" },
  robots: { index: false, follow: false }, // AJUSTAR: liberar quando a aula existir
};

const paraQuem = [
  "Você tem uma vida que, no papel, deveria te deixar bem, e mesmo assim algo não anda.",
  "Você resolve a vida de todo mundo e não sobra nada de você para você.",
  "Você já tentou mudar coisas por fora, e a sensação voltou igual.",
  "Você sente que se afastou de quem você era, e não sabe o caminho de volta.",
];

const vaiVer = [
  {
    n: "01",
    t: "Por que esforço não resolve",
    d: "O travamento quase nunca é falta de capacidade. Entender o mecanismo real muda o que você tenta primeiro.",
  },
  {
    n: "02",
    t: "Os quatro jeitos de travar",
    d: "Estagnação, esgotamento, falta de direção e insegurança pedem caminhos diferentes. Confundir os quatro é o que faz a pessoa insistir na saída errada.",
  },
  {
    n: "03",
    t: "O primeiro passo que cabe na sua semana",
    d: "Não é virar outra pessoa. É uma mudança pequena o suficiente para você conseguir fazer, e específica o suficiente para mudar alguma coisa.",
  },
];

export default function AulaPage() {
  return (
    <>
      {/* ===== hero: promessa + portão lado a lado ===== */}
      <section className="bg-[#241b16]">
        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:px-8 sm:pt-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
            <div>
              <p className="inline-block rounded-full bg-eucalipto/25 px-3 py-1 text-[11.5px] font-medium text-bege">
                Aula gratuita · assista agora
              </p>

              <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-bege sm:text-5xl">
                Clareza na Transição
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-bege/80">
                Quando o antigo já não faz sentido e o novo ainda não se revelou,
                você não está perdida. Está em transição. Esta aula é sobre dar
                nome ao que está te segurando, e descobrir o primeiro passo que
                cabe na sua vida real.
              </p>

              <div className="mt-8 flex flex-col gap-3 text-[15px] leading-7 text-bege/70">
                <p>
                  <strong className="text-bege">Com Josie de Albuquerque</strong>,
                  doze anos acompanhando mulheres nesse ponto de virada.
                </p>
                <p>
                  Você assiste na hora, no seu tempo. E uma vez por mês eu abro
                  um encontro ao vivo para responder perguntas.
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <AulaGate material={MATERIAL} videoSrc={AULA_VIDEO || undefined} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== para quem é ===== */}
      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
          <h2 className="text-center font-serif text-3xl leading-tight">
            Você se reconhece em algum destes?
          </h2>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
            {paraQuem.map((item) => (
              <li
                className="rounded-xl border border-line bg-surface px-5 py-4 text-[15px] leading-6 text-fg"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-xl text-center text-base leading-7 text-muted">
            Cada uma dessas frases aponta para um travamento diferente, e o
            caminho de saída de cada um também é diferente. É disso que a aula
            trata.
          </p>
        </div>
      </section>

      {/* ===== o que você vai ver ===== */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <h2 className="font-serif text-3xl leading-tight">
          O que você vai ver
        </h2>
        <div className="mt-8 flex flex-col gap-7">
          {vaiVer.map((item) => (
            <div className="flex gap-5" key={item.n}>
              <span className="font-serif text-2xl text-brand">{item.n}</span>
              <div>
                <h3 className="text-lg font-medium text-fg">{item.t}</h3>
                <p className="mt-1 text-[15px] leading-7 text-muted">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== quem conduz ===== */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 px-6 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Image
            alt="Josie de Albuquerque"
            className="mx-auto w-56 md:mx-0 md:w-full"
            height={1362}
            sizes="(min-width: 768px) 30vw, 224px"
            src="/img/josie-recorte.webp"
            width={574}
          />
          <div>
            <p className="eyebrow">quem conduz</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              Josie de Albuquerque
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Doze anos dedicados ao desenvolvimento de pessoas, com mais de mil
              acompanhadas. O método dela nasceu de dezoito histórias estudadas
              de perto, e de uma frase que ela mesma diz sobre a própria
              trajetória: hoje eu vivo em equilíbrio, mas eu já fui uma agente do
              caos.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Ela não promete atalho. O que ela faz é te ajudar a enxergar onde
              você está e a dar o passo seguinte com clareza.
            </p>
          </div>
        </div>
      </section>

      {/* ===== fecho ===== */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-8">
        <h2 className="font-serif text-3xl leading-tight">
          Quer descobrir o seu antes da aula?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
          O pré-diagnóstico leva alguns minutos e mostra qual dos quatro
          bloqueios está te segurando, junto com o mapa de como você anda se
          cuidando em seis áreas da vida. Quem chega ao encontro ao vivo com ele
          feito aproveita muito mais.
        </p>
        <Link className="btn-outline mt-7 inline-block" href="/mentoria/quiz">
          Fazer o pré-diagnóstico
        </Link>

        <p className="mx-auto mt-12 max-w-xl text-[11px] leading-5 text-muted opacity-80">
          Este conteúdo é educacional e de desenvolvimento pessoal. Não constitui
          diagnóstico, conduta psicológica ou médica, nem substitui
          acompanhamento profissional de saúde.
        </p>
      </section>
    </>
  );
}
