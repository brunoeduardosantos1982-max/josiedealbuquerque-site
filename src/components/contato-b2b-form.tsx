"use client";

import { useState } from "react";

const inputClass =
  "rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-fg outline-none focus:border-brand";

export function ContatoB2BForm() {
  const [status, setStatus] = useState<"idle" | "enviando" | "ok" | "erro">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("enviando");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience: "b2b", ...data }),
      });
      setStatus(response.ok ? "ok" : "erro");
      if (response.ok) form.reset();
    } catch {
      setStatus("erro");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-8 rounded-2xl border border-line bg-surface p-8">
        <h2 className="text-2xl font-medium text-fg">Recebido!</h2>
        <p className="mt-3 text-base leading-7 text-muted">
          Obrigada pelo interesse. A Josie entra em contato em breve para
          agendar o diagnóstico inicial.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className={inputClass}
        name="nome"
        placeholder="Seu nome"
        required
        type="text"
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
        required
        type="text"
      />
      <input
        className={inputClass}
        name="funcionarios"
        placeholder="Número de funcionários"
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
        name="telefone"
        placeholder="Telefone / WhatsApp"
        required
        type="tel"
      />
      <textarea
        className={`${inputClass} min-h-28 resize-y`}
        name="desafio"
        placeholder="Qual o principal desafio da empresa hoje?"
        rows={4}
      />
      <button
        className="btn-brand disabled:opacity-60"
        disabled={status === "enviando"}
        type="submit"
      >
        {status === "enviando" ? "Enviando..." : "Solicitar diagnóstico"}
      </button>
      {status === "erro" ? (
        <p className="text-sm text-terracota">
          Algo falhou no envio. Tente novamente em instantes.
        </p>
      ) : null}
      <p className="text-xs leading-5 text-muted">
        Seus dados são usados apenas para este contato comercial.
      </p>
    </form>
  );
}
