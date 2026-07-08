"use client";

import { useState } from "react";
import { isEmailValido } from "@/lib/validacao";

const inputClass =
  "rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-fg outline-none focus:border-brand";

type Props = {
  slug: string;
  titulo: string;
  pdfHref: string;
};

export function CapturaMaterial({ slug, titulo, pdfHref }: Props) {
  const [consentimento, setConsentimento] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    if (!isEmailValido(data.email ?? "")) {
      setErro("Confira o e-mail, parece incompleto.");
      return;
    }
    if (!consentimento) {
      setErro("Marque o consentimento para receber o material.");
      return;
    }
    setErro("");
    setEnviando(true);
    try {
      // Best-effort: o material é liberado mesmo se o Brevo falhar.
      await fetch("/api/materiais/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, material: slug, consentimento: true }),
      });
    } catch {
      // silencioso de propósito: não travar a entrega do lead
    } finally {
      setEnviando(false);
      setEnviado(true);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <h3 className="font-serif text-2xl text-brand">
          Prontinho. O seu material está liberado.
        </h3>
        <p className="mt-3 text-base text-muted">
          Também enviamos o link para o seu e-mail.
        </p>
        <a
          className="btn-brand mt-6 inline-block"
          href={pdfHref}
          rel="noopener"
          target="_blank"
        >
          Baixar o PDF
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-8">
      <h3 className="font-serif text-2xl text-brand">{titulo}</h3>
      <p className="mt-2 text-base text-muted">
        Material gratuito. Preencha os dados, baixe na hora e receba também por
        e-mail.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className={inputClass}
          name="nome"
          placeholder="Seu nome"
          required
          type="text"
        />
        <input
          className={inputClass}
          name="email"
          placeholder="E-mail corporativo"
          required
          type="email"
        />
        <input
          className={inputClass}
          name="empresa"
          placeholder="Empresa"
          required
          type="text"
        />
        <input
          className={inputClass}
          name="cargo"
          placeholder="Seu cargo"
          type="text"
        />
        <input
          className={inputClass}
          name="telefone"
          placeholder="Telefone / WhatsApp"
          required
          type="tel"
        />
        <label className="flex items-start gap-3 text-sm leading-6 text-muted">
          <input
            checked={consentimento}
            className="mt-1"
            name="consentimento"
            onChange={(e) => setConsentimento(e.target.checked)}
            type="checkbox"
          />
          <span>
            Aceito receber o material <strong className="text-fg">{titulo}</strong>{" "}
            e comunicações por e-mail, e li a{" "}
            <a
              className="underline hover:text-brand"
              href="/privacidade"
              rel="noopener"
              target="_blank"
            >
              política de privacidade
            </a>
            .
          </span>
        </label>
        {erro ? <p className="text-sm text-terracota">{erro}</p> : null}
        <button
          className="btn-brand disabled:opacity-60"
          disabled={enviando}
          type="submit"
        >
          {enviando ? "Enviando..." : "Quero o material"}
        </button>
        <p className="text-xs leading-5 text-muted">
          Sem spam. Você pode se descadastrar quando quiser.
        </p>
      </form>
    </div>
  );
}
