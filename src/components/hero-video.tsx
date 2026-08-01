import { ControleSom } from "@/components/controle-som";

/* Hero de vídeo do mundo Empresas.

   Arquivo: `Josi palestra .MOV`, entregue pelo Bruno em 2026-08-01. Entrega in
   company real sobre gestão estratégica de pessoas, 1min48s, vertical nativo
   2160×3840 com áudio.

   O vídeo NÃO é fundo com texto por cima. Ele já vem editado, com legendas
   queimadas no quadro em fonte própria e slides da marca; sobrepor a headline
   criava duas camadas de texto competindo. Ele é apresentado emoldurado.

   ORDEM (decisão do Bruno, 2026-08-01, para o mobile):
   texto → vídeo → legenda → botão. O CTA vem depois da legenda, não antes do
   vídeo, e por isso ele entra por uma prop separada em vez de vir junto no
   `children`. No mobile o vídeo ocupa a largura inteira, o que num 9:16 dá
   ~82% da altura da tela; no desktop volta a ser coluna ao lado do texto, e a
   grade recoloca o CTA embaixo do texto, na coluna da esquerda.

   Só o botão de som vai como JS; o resto renderiza no servidor. */

const ID_VIDEO = "hero-empresas-video";

export function HeroVideo({
  children,
  cta,
}: {
  children: React.ReactNode;
  cta?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#152a4a]">
      {/* `lg:grid-rows-[auto_1fr]` + `items-start` é o que cola o CTA embaixo do
          texto no desktop: a figura ocupa as duas linhas e define a altura, e
          sem isso a linha do CTA ficava centralizada na sobra, descolando. */}
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-14 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-14 lg:gap-y-0 lg:py-28">
        <div className="lg:col-start-1 lg:row-start-1">{children}</div>

        <figure className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end">
          <div className="relative mx-auto aspect-[9/16] h-[46vh] w-auto overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 sm:h-auto sm:w-[52%] lg:mx-0 lg:ml-auto lg:h-auto lg:w-full lg:max-w-[400px]">
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

        {cta ? (
          <div className="lg:col-start-1 lg:row-start-2 lg:mt-7">{cta}</div>
        ) : null}
      </div>
    </section>
  );
}
