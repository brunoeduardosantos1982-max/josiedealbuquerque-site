import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz-client";

export const metadata: Metadata = {
  title: "Por que você se sente travada? | Diagnóstico",
  description:
    "Responda 8 perguntas honestas e descubra qual bloqueio está te segurando, e o primeiro passo pra sair dele.",
  alternates: { canonical: "/mentoria/quiz" },
};

export default function QuizPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <QuizClient />
    </section>
  );
}
