import Link from "next/link";
import { WorldShell } from "@/components/world-shell";
import { AssinaturaJ } from "@/components/logo";

export default function Home() {
  return (
    <WorldShell nav={[{ label: "Sobre", href: "/sobre" }]} world="neutral">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
        <AssinaturaJ className="h-24 w-auto text-tinta" />
        <h1 className="mt-8 max-w-3xl text-4xl font-medium leading-[1.1] sm:text-5xl">
          Josie de Albuquerque
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-eucalipto">
          Desenvolvimento humano, das pessoas às organizações
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-5 pb-16 sm:px-8 md:grid-cols-2">
        <Link
          className="group rounded-2xl border border-line bg-surface p-8 text-left transition hover:border-petroleo"
          href="/empresas"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petroleo">
            Para empresas
          </p>
          <h2 className="mt-3 text-2xl font-medium text-tinta">
            Bem-estar organizacional e adequação à NR-1
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Diagnóstico, programa de bem-estar e conformidade com a gestão de
            riscos psicossociais que a norma exige.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-petroleo group-hover:underline">
            Conhecer soluções corporativas →
          </span>
        </Link>

        <Link
          className="group rounded-2xl border border-line bg-surface p-8 text-left transition hover:border-terracota"
          href="/mentoria"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracota">
            Para você
          </p>
          <h2 className="mt-3 text-2xl font-medium text-tinta">
            Uma jornada pessoal de reencontro
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Autoconhecimento e direção para mulheres que sentem que a vida
            travou, começando por um diagnóstico de 2 minutos.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-terracota group-hover:underline">
            Descobrir a mentoria →
          </span>
        </Link>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-12 text-center sm:px-8">
          <p className="text-base leading-7 text-muted">
            Mais de 12 anos dedicados ao desenvolvimento de pessoas, com mais
            de mil alunas e profissionais acompanhados, e atuação em grandes
            empresas. Hoje, esse trabalho vive em duas frentes: a jornada
            individual e os ambientes onde as pessoas trabalham.
          </p>
        </div>
      </section>
    </WorldShell>
  );
}
