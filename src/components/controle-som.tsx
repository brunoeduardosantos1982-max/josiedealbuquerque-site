"use client";

import { useState } from "react";

/* Botão de som do hero.

   Existe porque navegador nenhum permite autoplay COM áudio: Chrome, Safari e
   Firefox exigem que o vídeo comece mudo, e só liberam o som depois de um gesto
   do usuário. Então o padrão é este: começa mudo, e um clique tira do mudo.

   É client component de propósito MÍNIMO: o hero inteiro segue renderizando no
   servidor e só este botão vai como JS. Ele acha o vídeo pelo id em vez de
   receber uma ref, para não obrigar o pai a virar client component também. */

export function ControleSom({ alvo }: { alvo: string }) {
  const [mudo, setMudo] = useState(true);

  /* Nada de detectar faixa de áudio por API do navegador: `webkitAudioDecodedByteCount`
     fica em zero justamente enquanto o vídeo está mudo, então no Chrome o botão
     nunca apareceria. O controle é sempre visível, como em qualquer player. */

  function alternar() {
    const video = document.getElementById(alvo) as HTMLVideoElement | null;
    if (!video) return;
    const novoMudo = !video.muted;
    video.muted = novoMudo;
    if (!novoMudo) {
      // Tirar do mudo é o gesto que também autoriza a reprodução com som.
      void video.play().catch(() => undefined);
    }
    setMudo(novoMudo);
  }

  return (
    <button
      aria-label={mudo ? "Tirar o vídeo do mudo" : "Deixar o vídeo mudo"}
      aria-pressed={!mudo}
      className="inline-flex items-center gap-2 rounded-full border border-bege/50 bg-black/30 px-4 py-2 text-[12px] font-medium text-bege backdrop-blur-sm transition-colors duration-200 hover:border-bege hover:bg-black/50"
      onClick={alternar}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        {mudo ? (
          <>
            <path d="m22 9-6 6" />
            <path d="m16 9 6 6" />
          </>
        ) : (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </>
        )}
      </svg>
      {mudo ? "Tirar do mudo" : "Silenciar"}
    </button>
  );
}
