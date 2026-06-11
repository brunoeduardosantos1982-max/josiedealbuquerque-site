import type { Metadata } from "next";
import { WorldShell } from "@/components/world-shell";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Josie de Albuquerque: desenvolvimento humano, das pessoas às organizações.",
  alternates: { canonical: "/sobre" },
};

const trajetoria = [
  "Especialização em Gestão Estratégica em NR-1.",
  "Mais de 12 anos de atuação em desenvolvimento humano.",
  "Mais de mil pessoas acompanhadas em processos de clareza, decisão e mudança.",
  "Vivência em gestão dentro de grandes empresas, com leitura prática de ambientes corporativos.",
];

export default function SobrePage() {
  return (
    <WorldShell nav={[{ label: "Início", href: "/" }]} world="neutral">
      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
        <p className="eyebrow">sobre</p>
        <h1 className="mt-4 text-4xl font-medium leading-[1.12]">
          Josie de Albuquerque
        </h1>
        <div className="mt-8 flex flex-col gap-5 text-base leading-8 text-muted">
          <p>
            Há mais de 12 anos trabalho com desenvolvimento humano. Nesse
            caminho, acompanhei mais de mil pessoas em processos de
            autoconhecimento e mudança, e atuei dentro de grandes empresas,
            onde aprendi como os ambientes de trabalho moldam a vida de quem
            está neles.
          </p>
          <p>
            Hoje esse trabalho vive em duas frentes. Na primeira, acompanho
            mulheres em jornadas individuais de reencontro: clareza, direção e
            confiança para destravar a própria vida. Na segunda, ajudo empresas
            a construírem ambientes mais saudáveis e produtivos, com programas
            de bem-estar organizacional e adequação à NR-1.
          </p>
          <p>
            Os dois mundos têm portas separadas, mas a essência é a mesma:
            pessoas funcionam melhor quando são vistas por inteiro.
          </p>
        </div>

        <section className="mt-12 rounded-2xl border border-line bg-surface p-7">
          <h2 className="text-2xl font-medium text-fg">
            Formação e trajetória
          </h2>
          <ul className="mt-5 flex list-disc flex-col gap-3 pl-5 text-base leading-7 text-muted">
            {trajetoria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </WorldShell>
  );
}
