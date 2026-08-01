import { ControleSom } from "@/components/controle-som";

/* Hero de vídeo em tela cheia do mundo Empresas (versão para avaliação).

   Pedido do Bruno em 2026-08-01: o vídeo vem ANTES do texto e ocupa a tela
   inteira, passando por baixo do cabeçalho. Resolve as duas queixas da versão
   em duas colunas: o vazio embaixo do CTA no desktop (que vinha da figura alta
   esticando a grade) e o vídeo pequeno demais no mobile.

   O problema de formato e como ele é resolvido:
   o vídeo é 9:16. No mobile isso quase bate com a tela, então `object-cover`
   preenche de verdade, cortando pouca coisa. No desktop, preencher um 16:9 com
   um 9:16 jogaria fora dois terços do quadro, cortando as legendas queimadas ou
   a cabeça da Josie. Por isso no desktop ele passa a `object-contain`,
   centralizado, e o vazio das laterais é preenchido por uma cópia DESFOCADA do
   próprio quadro. É a solução padrão para vídeo vertical em tela larga, e faz o
   corte parecer decisão em vez de acidente.

   Só o botão de som vai como JS. */

const ID_VIDEO = "hero-empresas-video";
const POSTER = "/video/josie-palestra-poster.jpg";

export function HeroVideoCheio() {
  return (
    <section className="relative isolate h-[100svh] w-full overflow-hidden bg-[#101f36]">
      {/* Fundo desfocado: só aparece no desktop, onde sobra espaço nas laterais. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-45 blur-2xl"
        style={{ backgroundImage: `url('${POSTER}')` }}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <video
          autoPlay
          className="h-full w-full object-cover motion-reduce:hidden lg:w-auto lg:object-contain"
          id={ID_VIDEO}
          loop
          muted
          playsInline
          poster={POSTER}
          preload="metadata"
        >
          <source src="/video/josie-palestra.mp4" type="video/mp4" />
        </video>
        {/* Sem movimento: fica só o quadro parado, no mesmo enquadramento. */}
        <div
          aria-hidden="true"
          className="hidden h-full w-full bg-cover bg-center motion-reduce:block lg:bg-contain lg:bg-no-repeat"
          style={{ backgroundImage: `url('${POSTER}')` }}
        />
      </div>

      {/* Véu curto no topo, só para as pílulas do cabeçalho lerem sobre o vídeo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent"
      />

      <div className="absolute bottom-6 right-6 z-20">
        <ControleSom alvo={ID_VIDEO} />
      </div>
    </section>
  );
}
