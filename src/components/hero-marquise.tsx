import Image from "next/image";
import Link from "next/link";

/* Hero editorial do mundo Mentoria.

   Sistema vindo da referência que o Bruno passou: uma composição só ocupando a
   viewport inteira, com o nome gigante rolando atrás e o recorte da pessoa por
   cima, texto pequeno nos cantos, fio fino acima do rodapé e entrada em
   camadas. O que NÃO veio da referência: a paleta cinza e azul, a fonte
   Helvetica ME de CDN externo, a copy e as imagens de outra marca. Aqui manda o
   manual da Josie: Lora na marquise, bege sobre tinta quente, terracota no CTA.

   O recorte foi gerado localmente com rembg a partir de uma foto real, então a
   imagem da Josie nunca saiu da máquina.

   Server component: as animações são CSS puro, com prefers-reduced-motion
   colapsando tudo em globals.css. Nada de JS para o cliente. */

const MARQUISE = "Do Caos ao Equilíbrio";

export function HeroMarquise() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#241b16]">
      {/* Marquise: duas metades idênticas para o loop não ter emenda. */}
      <div
        aria-hidden="true"
        className="anim-fade-up absolute inset-x-0 top-[18vh] z-10 overflow-hidden sm:top-[15vh]"
        style={{ animationDelay: "500ms" }}
      >
        <div className="marquise flex w-max whitespace-nowrap font-serif text-[11vh] leading-none text-bege/90 sm:text-[16vh]">
          <span className="pr-[6vw]">{MARQUISE}&nbsp;</span>
          <span className="pr-[6vw]">{MARQUISE}&nbsp;</span>
        </div>
      </div>

      {/* Recorte por cima da marquise: as letras passam por trás dela. */}
      <div
        className="anim-rise-in pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
        style={{ animationDelay: "300ms" }}
      >
        <Image
          alt="Josie de Albuquerque"
          className="h-[68vh] w-auto object-contain object-bottom sm:h-[78vh]"
          height={1362}
          priority
          src="/img/josie-recorte.webp"
          width={574}
        />
      </div>

      {/* Fio, cresce da esquerda. */}
      <div
        aria-hidden="true"
        className="anim-line absolute inset-x-6 bottom-[10.5rem] z-10 h-px bg-bege/50 sm:inset-x-10"
        style={{ animationDelay: "1200ms" }}
      />

      {/* Rodapé: chamada à esquerda, assinatura à direita. */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-6 px-6 pb-6 sm:px-10 sm:pb-8">
        <div
          className="anim-fade-up max-w-xs"
          style={{ animationDelay: "1400ms" }}
        >
          {/* É o h1 real da página: a marquise é decorativa e aria-hidden. */}
          <h1 className="font-serif text-lg leading-snug text-bege sm:text-xl">
            Você não está perdida.
            <br />
            Está em transição.
          </h1>
          <Link
            className="group mt-4 inline-flex items-center gap-2 rounded-full border border-bege/50 px-5 py-2.5 text-[13px] font-medium text-bege transition-all duration-200 hover:border-bege hover:bg-bege hover:text-[#241b16]"
            href="/mentoria/quiz"
          >
            Descobrir o que me trava
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <div
          className="anim-fade-up hidden text-right text-xs leading-relaxed text-bege/70 sm:block"
          style={{ animationDelay: "1550ms" }}
        >
          <p>Josie de Albuquerque</p>
          <p>desenvolvimento humano</p>
          <p className="mt-1 text-bege/50">8 perguntas · 2 minutos</p>
        </div>
      </div>
    </section>
  );
}
