/* Hero de vídeo em tela cheia do mundo Empresas.

   Os arquivos vêm do contrato C03: filmagem de uma entrega in company real da
   Josie sobre NR-1, com plateia de decisores. É a única prova de entrega que o
   site tem, e por decisão registrada ela é EXCLUSIVA de /empresas e da página
   NR-1 (fora de tom no mundo B2C da mentoria).

   Layout: o vídeo ocupa a tela inteira e o conteúdo se ancora embaixo à
   esquerda, em tipografia pequena, para não competir com o quadro. Nada de
   painel por cima do vídeo.

   Os 8 clipes de origem são VERTICAIS, então o corte 9:16 é o enquadramento
   nativo e é ele que manda aqui. Em tela larga o `object-position` puxa o
   quadro para cima: centralizado, o corte pegaria o tronco da Josie e cortaria
   a cabeça e o slide (medido no C03: em y alto ela fica sem cabeça).

   Server component de propósito: `autoplay muted playsinline` e o respeito a
   prefers-reduced-motion resolvem em HTML e CSS, sem mandar JS para o cliente. */

export function HeroVideo({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#16243c]">
      <div className="absolute inset-0 -z-10">
        <video
          aria-hidden="true"
          autoPlay
          className="h-full w-full object-cover object-[center_22%] motion-reduce:hidden"
          loop
          muted
          playsInline
          poster="/video/nr1-hero-poster.jpg"
          preload="metadata"
        >
          <source src="/video/nr1-hero-mobile.webm" type="video/webm" />
          <source src="/video/nr1-hero-mobile.mp4" type="video/mp4" />
        </video>
        {/* Sem movimento: fica só o quadro parado. */}
        <div
          aria-hidden="true"
          className="hidden h-full w-full bg-cover bg-[center_22%] motion-reduce:block"
          style={{ backgroundImage: "url('/video/nr1-hero-poster.jpg')" }}
        />
      </div>

      {/* Véu em duas direções, de baixo e da esquerda, que é exatamente onde o
          texto pousa. A Josie fica à direita do quadro e continua limpa: em vez
          de escurecer a imagem inteira, escurece só o canto que precisa ler. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-3/5 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
      />

      <div className="flex flex-1 items-end px-6 pb-10 sm:px-12 sm:pb-16 md:px-20 lg:px-28 lg:pb-20">
        {children}
      </div>
    </section>
  );
}
