"use client";

import { useState } from "react";
import { isEmailValido } from "@/lib/validacao";

/* Captura do mundo Mentoria, feita para tráfego pago.

   Segue o padrão do workspace decidido em 2026-07-08, que a `CapturaMaterial`
   (mais antiga, do mundo Empresas) ainda não segue:
   - entrega SÓ por e-mail, sem botão de download na tela. Quem quer o material
     precisa dar um e-mail que existe, e isso é o que sustenta a lista;
   - cidade OBRIGATÓRIA. A base herdada do RD Station veio com cidade vazia em
     100% dos 1.560 leads, e sem ela não dá para segmentar campanha por região. */

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-fg outline-none focus:border-brand";

export function CapturaB2C({
  slug,
  chamada,
}: {
  slug: string;
  chamada: string;
}) {
  const [consentimento, setConsentimento] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;

    if (!dados.nome?.trim()) {
      setErro("Me conta seu primeiro nome.");
      return;
    }
    if (!isEmailValido(dados.email ?? "")) {
      setErro("Confere o e-mail, parece incompleto.");
      return;
    }
    if (!dados.cidade?.trim()) {
      setErro("Me diz de qual cidade você é.");
      return;
    }
    if (!consentimento) {
      setErro("Preciso do seu aceite para enviar o material.");
      return;
    }

    setErro("");
    setEnviando(true);
    try {
      // Best-effort: falha de rede não pode travar a confirmação para a leitora.
      await fetch("/api/materiais/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dados,
          audience: "b2c",
          material: slug,
          consentimento: true,
        }),
      });
    } catch {
      /* silencioso de propósito */
    } finally {
      setEnviando(false);
      setEnviado(true);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-bege/60 p-8 text-center">
        <h3 className="font-serif text-2xl text-brand">Pronto, está a caminho.</h3>
        <p className="mt-3 text-base leading-7 text-muted">
          Enviei o material para o seu e-mail agora. Se não aparecer em alguns
          minutos, dá uma olhada na caixa de promoções ou spam.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
      <h3 className="font-serif text-2xl leading-tight text-brand">{chamada}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Gratuito. Você recebe por e-mail em seguida.
      </p>
      <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          autoComplete="given-name"
          className={inputClass}
          name="nome"
          placeholder="Seu primeiro nome"
          type="text"
        />
        <input
          autoComplete="email"
          className={inputClass}
          name="email"
          placeholder="Seu melhor e-mail"
          type="email"
        />
        <input
          autoComplete="address-level2"
          className={inputClass}
          name="cidade"
          placeholder="Sua cidade"
          type="text"
        />
        <label className="mt-1 flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted">
          <input
            checked={consentimento}
            className="mt-0.5 h-4 w-4 shrink-0"
            onChange={(event) => setConsentimento(event.target.checked)}
            type="checkbox"
          />
          <span>
            Aceito receber o material e os conteúdos da Josie por e-mail. Li a{" "}
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
          className="btn-brand mt-2 w-full disabled:opacity-60"
          disabled={enviando}
          type="submit"
        >
          {enviando ? "Enviando..." : "Quero receber"}
        </button>
        <p className="text-center text-xs leading-5 text-muted">
          Sem spam. Você sai quando quiser.
        </p>
      </form>
    </div>
  );
}
