"use client";

import { useState } from "react";
import { isEmailValido } from "@/lib/validacao";

/* Portão da aula gratuita.

   Captura ANTES de liberar o vídeo, e revela o player na mesma página em vez de
   redirecionar. O motivo é de conversão: todo redirecionamento perde gente, e
   quem veio de anúncio tem paciência curta.

   Capturar antes é o que sustenta o funil inteiro. Se o vídeo ficasse aberto, a
   maioria assistiria e sumiria, e não haveria a quem mandar a sequência nem o
   convite do ao vivo. O preço é uma queda no número de quem assiste; a troca
   vale porque o objetivo da aula é gerar lead qualificado, não audiência.

   Cidade é obrigatória pelo mesmo motivo de sempre: a base herdada veio com
   cidade vazia em 100% e ficou impossível segmentar por região. */

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-fg outline-none focus:border-brand";

export function AulaGate({
  material,
  videoSrc,
  poster,
}: {
  material: string;
  /* Vazio enquanto a gravação não existe: o componente mostra o estado de
     "em breve" em vez de um player quebrado. */
  videoSrc?: string;
  poster?: string;
}) {
  const [consentimento, setConsentimento] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [liberado, setLiberado] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;

    if (!dados.nome?.trim()) return setErro("Me conta seu primeiro nome.");
    if (!isEmailValido(dados.email ?? ""))
      return setErro("Confere o e-mail, parece incompleto.");
    if (!dados.cidade?.trim()) return setErro("Me diz de qual cidade você é.");
    if (!consentimento)
      return setErro("Preciso do seu aceite para liberar a aula.");

    setErro("");
    setEnviando(true);
    try {
      await fetch("/api/materiais/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dados,
          audience: "b2c",
          material,
          estagio: "aula",
          consentimento: true,
        }),
      });
    } catch {
      /* Best-effort: falha de rede não pode impedir a pessoa de assistir. */
    } finally {
      setEnviando(false);
      setLiberado(true);
    }
  }

  if (liberado) {
    return (
      <div className="overflow-hidden rounded-2xl border border-brand/40 bg-black">
        {videoSrc ? (
          <video
            className="aspect-video w-full"
            controls
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-bege/10 px-8 text-center">
            <p className="font-serif text-2xl text-bege">
              Sua inscrição está confirmada.
            </p>
            <p className="max-w-sm text-sm leading-6 text-bege/70">
              A gravação abre em instantes no seu e-mail, e você recebe também o
              convite do próximo encontro ao vivo com a Josie.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
      <h2 className="font-serif text-2xl leading-tight text-brand">
        Assistir agora, de graça
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        A aula abre nesta página assim que você preencher.
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
            Aceito assistir à aula e receber os conteúdos da Josie por e-mail.
            Li a{" "}
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
          {enviando ? "Liberando..." : "Liberar a aula"}
        </button>
        <p className="text-center text-xs leading-5 text-muted">
          Gratuito. Sem spam, e você sai quando quiser.
        </p>
      </form>
    </div>
  );
}
