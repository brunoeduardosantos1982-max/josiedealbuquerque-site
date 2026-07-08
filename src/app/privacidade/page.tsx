import type { Metadata } from "next";
import { WorldShell } from "@/components/world-shell";

export const metadata: Metadata = {
  title: "Política de Privacidade | Josie de Albuquerque",
  description:
    "Como os seus dados são tratados ao baixar materiais e se inscrever nas comunicações.",
  alternates: { canonical: "/privacidade" },
};

// RASCUNHO: validar o texto legal antes de considerar final.
const ATUALIZADO_EM = "8 de julho de 2026";

export default function PrivacidadePage() {
  return (
    <WorldShell nav={[{ label: "Início", href: "/" }]} world="neutral">
      <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Privacidade</p>
        <h1 className="mt-3 font-serif text-4xl text-brand">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted">
          Última atualização: {ATUALIZADO_EM}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-base leading-7 text-fg">
          <section>
            <h2 className="font-serif text-xl text-brand">
              1. Quem trata os seus dados
            </h2>
            <p className="mt-2 text-muted">
              A responsável pelos dados é Josie de Albuquerque. Para qualquer
              assunto relacionado a esta política ou aos seus dados, entre em
              contato pelo site.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">
              2. Quais dados coletamos
            </h2>
            <p className="mt-2 text-muted">
              Ao pedir um material gratuito, coletamos o seu nome, e-mail,
              empresa, cargo e telefone. Nada além disso é exigido para a
              entrega.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">3. Para que usamos</h2>
            <p className="mt-2 text-muted">
              Usamos esses dados para entregar o material solicitado e para
              enviar comunicações relacionadas a NR-1, riscos psicossociais e
              serviços para empresas. Você decide receber isso ao marcar o
              consentimento no formulário. O telefone pode ser usado para
              contato comercial quando você demonstrar interesse.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">4. Base legal</h2>
            <p className="mt-2 text-muted">
              O tratamento é feito com base no seu consentimento, conforme a Lei
              Geral de Proteção de Dados (LGPD, Lei 13.709/2018). Registramos o
              momento em que você consentiu.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">
              5. Com quem compartilhamos
            </h2>
            <p className="mt-2 text-muted">
              Usamos a plataforma Brevo como operadora para armazenar os
              contatos e enviar os e-mails. Os seus dados não são vendidos nem
              compartilhados para outros fins.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">
              6. Por quanto tempo guardamos
            </h2>
            <p className="mt-2 text-muted">
              Mantemos os seus dados enquanto você quiser receber as
              comunicações. Se você se descadastrar, paramos de enviar e
              removemos o seu contato da base ativa.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-brand">7. Os seus direitos</h2>
            <p className="mt-2 text-muted">
              Você pode, a qualquer momento, acessar, corrigir, excluir os seus
              dados ou revogar o consentimento. Todo e-mail que enviamos traz um
              link de descadastro no rodapé.
            </p>
          </section>
        </div>
      </div>
    </WorldShell>
  );
}
