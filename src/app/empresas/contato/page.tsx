import type { Metadata } from "next";
import { ContatoB2BForm } from "@/components/contato-b2b-form";

export const metadata: Metadata = {
  title: "Agendar diagnóstico | Para empresas",
  description:
    "Conte o cenário da sua empresa e agende um diagnóstico inicial de riscos psicossociais e adequação à NR-1.",
  alternates: { canonical: "/empresas/contato" },
};

export default function ContatoEmpresasPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-14 sm:px-8">
      <p className="eyebrow">diagnóstico inicial</p>
      <h1 className="mt-4 text-4xl font-medium leading-[1.12]">
        Vamos entender o cenário da sua empresa
      </h1>
      <p className="mt-5 text-base leading-7 text-muted">
        Preencha os dados abaixo. Você recebe o retorno da Josie para agendar
        a conversa de diagnóstico, sem compromisso.
      </p>
      <ContatoB2BForm />
    </section>
  );
}
