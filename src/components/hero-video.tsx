import { ControleSom } from "@/components/controle-som";

/* Hero de vídeo do mundo Empresas.

   O arquivo é `Josi palestra .MOV`, entregue pelo Bruno em 2026-08-01: uma
   entrega in company real sobre gestão estratégica de pessoas, 1min48s,
   vertical nativo 2160×3840 com áudio.

   DECISÃO DE LAYOUT (2026-08-01): o vídeo NÃO é mais fundo com texto por cima.
   Ele já vem editado, com legendas queimadas no quadro em fonte própria e
   slides da marca. Sobrepor a headline do site criava duas camadas de texto
   competindo, e o véu escurecia justamente a faixa das legendas. Agora ele é
   apresentado emoldurado, ao lado do texto no desktop e acima dele no mobile.
   Isso também eliminou os dois gradientes e o posicionamento absoluto.

   O fundo é petróleo, a cor do mundo Empresas, então o texto em bege funciona
   nos dois arranjos com um conjunto único de estilos.

   Só o botão de som vai como JS; o resto renderiza no servidor. */

const ID_VIDEO = "hero-empresas-video";

export function HeroVideo({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#152a4a]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-14 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-28">
        <div className="relative z-20 lg:order-1">{children}</div>

        <figure className="lg:order-2 lg:justify-self-end">
          <div className="relative mx-auto aspect-[9/16] w-[78%] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 sm:w-[60%] lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[400px]">
            {/* Começa MUDO por obrigação do navegador: autoplay com som é
                bloqueado em Chrome, Safari e Firefox. O ControleSom libera. */}
            <video
              autoPlay
              className="h-full w-full object-cover motion-reduce:hidden"
              id={ID_VIDEO}
              loop
              muted
              playsInline
              poster="/video/josie-palestra-poster.jpg"
              preload="metadata"
            >
              <source src="/video/josie-palestra.mp4" type="video/mp4" />
            </video>
            {/* Sem movimento: fica só o quadro parado. */}
            <div
              aria-hidden="true"
              className="hidden h-full w-full bg-cover bg-center motion-reduce:block"
              style={{
                backgroundImage: "url('/video/josie-palestra-poster.jpg')",
              }}
            />
            <div className="absolute bottom-3 right-3 z-10">
              <ControleSom alvo={ID_VIDEO} />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs leading-5 text-bege/60 lg:text-right">
            Entrega in company sobre gestão estratégica de pessoas.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
