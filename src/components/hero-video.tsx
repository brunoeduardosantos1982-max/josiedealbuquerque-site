/* Hero de vídeo full-bleed do mundo Empresas.

   Os arquivos vêm do contrato C03: filmagem de uma entrega in company real da
   Josie sobre NR-1, com plateia de decisores. É a única prova de entrega que o
   site tem, e por decisão registrada ela é EXCLUSIVA de /empresas e da página
   NR-1 (fora de tom no mundo B2C da mentoria).

   Server component de propósito: `autoplay muted playsinline` e o respeito a
   prefers-reduced-motion resolvem em HTML e CSS, sem mandar JS para o cliente.

   O texto NÃO fica solto sobre o vídeo: ele mora num painel de vidro
   (o sistema visual aprovado pela Josie). Isso garante contraste sem precisar
   de um scrim escuro cobrindo a imagem inteira. */

export function HeroVideo({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video
          aria-hidden="true"
          autoPlay
          className="h-full w-full object-cover motion-reduce:hidden"
          loop
          muted
          playsInline
          poster="/video/nr1-hero-poster.jpg"
          preload="metadata"
        >
          <source
            media="(max-width: 640px)"
            src="/video/nr1-hero-mobile.webm"
            type="video/webm"
          />
          <source
            media="(max-width: 640px)"
            src="/video/nr1-hero-mobile.mp4"
            type="video/mp4"
          />
          <source src="/video/nr1-hero.webm" type="video/webm" />
          <source src="/video/nr1-hero.mp4" type="video/mp4" />
        </video>
        {/* Sem movimento: fica só o quadro parado, com o mesmo enquadramento. */}
        <div
          aria-hidden="true"
          className="hidden h-full w-full bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: "url('/video/nr1-hero-poster.jpg')" }}
        />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl rounded-3xl border border-white/25 bg-white/80 p-7 shadow-[0_8px_40px_rgba(29,53,87,0.18)] backdrop-blur-xl sm:p-10">
          {children}
        </div>
      </div>
    </section>
  );
}
