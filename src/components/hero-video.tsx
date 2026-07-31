/* Hero de vídeo do mundo Empresas.

   Os arquivos vêm do contrato C03: filmagem de uma entrega in company real da
   Josie sobre NR-1, com plateia de decisores. É a única prova de entrega que o
   site tem, e por decisão registrada ela é EXCLUSIVA de /empresas e da página
   NR-1 (fora de tom no mundo B2C da mentoria).

   TODO o material de origem é VERTICAL (vídeos 9:16, fotos 3:4). Por isso o
   hero muda de forma conforme a tela, em vez de esticar retrato numa tela larga:

   - Mobile: o vídeo cobre a tela inteira e o texto pousa sobre ele, com véu.
   - Desktop: o vídeo volta para o fluxo e ocupa um quadro RETRATO ao lado do
     texto. Esticar 9:16 numa tela 16:9 obriga a um corte que joga fora quase
     dois terços do quadro e fica feio.

   É um único elemento <video>: `absolute inset-0` no mobile e `lg:static` no
   desktop devolve ele para a célula da grade, sem duplicar download nem decode.

   O fundo é petróleo, a cor do mundo Empresas, então o texto em bege funciona
   nos dois arranjos sem precisar de dois conjuntos de estilo.

   Server component de propósito: `autoplay muted playsinline` e o respeito a
   prefers-reduced-motion resolvem em HTML e CSS, sem mandar JS para o cliente. */

export function HeroVideo({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#152a4a]">
      {/* Véus: só no mobile, onde o texto pousa em cima da imagem. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3/5 bg-gradient-to-r from-black/70 via-black/25 to-transparent lg:hidden"
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-end gap-12 px-6 pb-10 pt-24 sm:px-12 lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
        {/* Mídia. Fundo no mobile, coluna retrato no desktop. */}
        {/* No desktop a largura precisa ser explícita: com `justify-self-end` a
            coluna encolhe para o conteúdo, e aí `aspect-ratio` zera a altura. */}
        <div className="absolute inset-0 lg:static lg:order-2 lg:ml-auto lg:aspect-[9/16] lg:w-full lg:max-w-[400px] lg:overflow-hidden lg:rounded-3xl lg:shadow-2xl lg:ring-1 lg:ring-white/10">
          <video
            aria-hidden="true"
            autoPlay
            className="h-full w-full object-cover object-[center_22%] motion-reduce:hidden lg:object-[center_28%]"
            loop
            muted
            playsInline
            poster="/video/nr1-hero-vertical-poster.jpg"
            preload="metadata"
          >
            <source src="/video/nr1-hero-mobile.webm" type="video/webm" />
            <source src="/video/nr1-hero-mobile.mp4" type="video/mp4" />
          </video>
          {/* Sem movimento: fica só o quadro parado. */}
          <div
            aria-hidden="true"
            className="hidden h-full w-full bg-cover bg-[center_22%] motion-reduce:block lg:bg-[center_28%]"
            style={{ backgroundImage: "url('/video/nr1-hero-vertical-poster.jpg')" }}
          />
        </div>

        <div className="relative z-20 lg:order-1">{children}</div>
      </div>
    </section>
  );
}
