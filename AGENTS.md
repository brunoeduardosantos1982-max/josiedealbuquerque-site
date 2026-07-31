# josiedealbuquerque-site

Site da marca única **Josie de Albuquerque** (josiedealbuquerque.com.br), com dois mundos separados: `/empresas` (B2B, NR-1/saúde mental corporativa) e `/mentoria` (B2C). Regras compartilhadas do workspace: `D:\VortexBrain00\AGENTS.md`.

## Stack

Next.js (App Router, TypeScript) + `gray-matter`/`marked` para blog em Markdown (`content/blog/`) + Brevo (captura de leads server-side).

## Comandos (package.json)

- `npm run dev` — servidor local
- `npm run build` — build de produção
- `npm run lint` — ESLint (`eslint-config-next`)
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — vitest (`vitest run`)

Infra de teste criada em 2026-07-29 (contrato `josie-funil-autonomo-C01`); antes disso o projeto não tinha nenhum dos três. Vitest **não** lê os paths do `tsconfig`: o alias `@/*` mora em `vitest.config.ts` (`resolve.alias`). Teste de rota importa o `POST` direto de `./route` e stuba `fetch` com `vi.stubGlobal` — nunca faz rede de verdade.

## Variáveis de ambiente (nomes)

`BREVO_API_KEY`, `BREVO_LIST_B2C`, `BREVO_LIST_B2B`, `BREVO_LIST_MATERIAIS`, `BREVO_ENTREGA_TEMPLATE_ID`, `SITE_URL`, `NEXT_PUBLIC_WHATSAPP_JOSIE`. Referência em `.env.example`. Sem as chaves Brevo o site funciona e `/api/lead` apenas registra no log.

`NEXT_PUBLIC_WHATSAPP_JOSIE` é só dígitos com DDI e DDD. É link de saída, não segredo, por isso `NEXT_PUBLIC`. **Sem ela o CTA de agendamento da consulta cai em `/mentoria`**, e o funil de mentoria fica sem ponto de conversão.

## Funil do mundo Mentoria (modelo vigente desde 2026-07-30)

O caderno **não é produto**, é isca gratuita. O que se vende é a **consulta de mentoria de R$ 97**, paga por Pix ou link manual e agendada no WhatsApp, e esse valor volta como desconto se a pessoa comprar algum programa depois. **Não existe checkout no site**, e o trio de rotas Mercado Pago fica para os produtos futuros.

`/mentoria/quiz` é um fluxo único de pré-diagnóstico, não mais um quiz:

1. 8 perguntas de bloqueio (E/X/P/I), conteúdo fiel a `quiz-bloqueio-josie.html` no vault
2. gate com nome, e-mail e **aceite explícito** (sem ele `/api/materiais/subscribe` devolve 400)
3. 6 telas do mapa de cuidado, 4 afirmações por dimensão, 0 a 3
4. relatório com a leitura cruzada de bloqueio × dimensão mais frágil
5. CTA único: agendar a consulta

A lógica mora em `src/lib/pre-diagnostico.ts`, pura e testada. O componente só desenha. Mexeu nos textos, rode `npm test`: há teste que varre as 24 combinações atrás de termo vetado e travessão.

**Pegadinha das listas Brevo:** `/api/materiais/subscribe` escolhe a lista por `audience`. Sem esse campo o padrão é `b2b` e cai em `BREVO_LIST_MATERIAIS`; com `audience: "b2c"` cai em `BREVO_LIST_B2C`. Nunca deixe material do mundo Mentoria ir para a lista de materiais do mundo Empresas.

## Hero de vídeo e navegação flutuante (mundo Empresas)

`src/components/hero-video.tsx` serve `/empresas`: vídeo **vertical** (`nr1-hero-mobile.*`, o enquadramento nativo dos clipes) ocupando a tela inteira, conteúdo ancorado embaixo à esquerda em tipografia pequena. Server component de propósito, porque `autoplay muted playsinline` e `prefers-reduced-motion` resolvem em HTML e CSS.

- **`object-position` é medido, não estético.** Em `center 22%` a Josie e o slide ficam no quadro em tela larga; centralizado, o corte pega o tronco e decapita.
- **Contraste vem de dois gradientes**, um de baixo e um da esquerda, exatamente onde o texto pousa. A Josie fica à direita e continua limpa. Não voltar para overlay escuro na imagem inteira nem para painel de vidro por cima: os dois foram recusados pelo Bruno.
- No mobile o vídeo cabe inteiro na tela (sem sobra vertical para reposicionar), então a Josie aparece pequena no rodapé do quadro. **Débito conhecido:** um corte 9:16 mais fechado nela resolveria.

`WorldShell` tem a prop `chrome`: `"solid"` (padrão, barra com borda) ou `"float"` (pílulas absolutas por cima do conteúdo). O mundo Empresas usa `float`, e por isso **as páginas desse mundo precisam de `pt-28 sm:pt-32`** para não passar por baixo das pílulas. Página nova em `/empresas` sem esse respiro nasce quebrada.

**Pegadinha de screenshot:** com o vídeo tocando, `Page.captureScreenshot` via CDP trava e derruba o renderizador. Capture emulando `prefers-reduced-motion: reduce` (renderiza o poster), com `deviceScaleFactor: 1` e um alvo novo por rota.

## Convenções

- Conteúdo editorial (.md) tem origem no vault: `bssurf00/B01 Projetos/JosieDeAlbuquerque`.
- Leads B2B e B2C vão para listas Brevo SEPARADAS — nunca misturar.
- Identidade: mundo Empresas usa petróleo `#1D3557`; Mentoria usa terracota `#C26D50`; base bege `#F9F5EB`. Logo = assinatura "J".
- NUNCA descrever a Josie como "terapeuta" em copy.
- Deploy: `git push origin main` → Vercel faz o deploy automático.

## Mídia da palestra NR-1 (vídeo de fundo de /empresas)

Os originais ficam em `materiais-src/videos/` e `materiais-src/fotos/`, ambos **git-ignored** (os 8 `.mov` somam 843 MB; no repo travariam clone e build da Vercel). O que o site serve são os derivados leves em `public/video/`, versionados: `nr1-hero.{mp4,webm}` (1920×1080), `nr1-hero-mobile.{mp4,webm}` (1080×1920) e `nr1-hero-poster.jpg`.

- **Pegadinha da rotação:** metade dos `.mov` reporta `3840×2160` no `ffprobe`, mas tem `rotation=-90` nos side data — a exibição real é `2160×3840`. **Todos os 8 são verticais**; não existe material horizontal. Conferir sempre extraindo um frame e medindo o JPG, não confiando no `width/height` do stream.
- O corte 16:9 usa `crop=2160:1215:0:640`. O offset `y=640` é medido: em `y=1100` a Josie fica sem cabeça.
- Vídeo de fundo vai sempre **sem faixa de áudio** (`-an`) — é mudo por definição e áudio atrapalha o autoplay.
- Regenerar: `ffmpeg -ss 2 -t 12 -i "<origem.mov>" -vf "crop=2160:1215:0:640,scale=1920:1080" -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -y public/video/nr1-hero.mp4` (WebM: `-c:v libvpx-vp9 -crf 46 -b:v 0 -row-mt 1`). Teto: 3 MB por arquivo.
- Estes vídeos são **exclusivos de `/empresas` e da página NR-1** — é filmagem de entrega corporativa com plateia, fora de tom no mundo `/mentoria`.

## Materiais em PDF (checklist NR-1, caderno "Do Caos ao Equilíbrio")

Todo material rico tem a **fonte HTML versionada em `materiais-src/`** e o **PDF derivado em `public/materiais/`**. O PDF nunca é a fonte: quem edita é o HTML, e o PDF se regenera.

- `checklist-nr1.html` → `public/materiais/checklist-nr1.pdf` (1 página, mundo Empresas, petróleo/eucalipto)
- `caderno-do-caos-ao-equilibrio.html` → `public/materiais/caderno-do-caos-ao-equilibrio.pdf` (49 páginas, mundo Mentoria, terracota/bege). É o produto de entrada de R$ 97.

Regeneração: Chrome headless via CDP, `Page.printToPDF` com `preferCSSPageSize:true` e `printBackground:true`, margens zeradas (o `@page { size:A4; margin:0 }` do HTML é quem manda). Espere ~6 s depois do `Page.navigate` antes de imprimir, senão as fontes do Google Fonts não terminam de carregar e o PDF sai com fallback serifado.

**Regras de conteúdo do caderno** (valem para qualquer edição futura):
- Termos proibidos em TODO material B2C: "terapeuta", "terapia", "tratamento", "cura". A Josie não é psicóloga registrada.
- A leitora é tratada **no feminino**. O público validado são mulheres de 30 a 45 anos.
- Sem travessão (em-dash) na copy; use vírgula ou dois-pontos.
- Sem linguagem esotérica na abertura ("alquimia", "energético", "bioenergia"). A dor vem primeiro.
- Estrutura fixa: 4 bloqueios do quiz como ponto de partida, depois os 4 pilares (Aceitação, Presença, Coragem, Disciplina) como as 4 partes.
- Disclaimer educacional obrigatório na contracapa.

Teste de aceite (roda da raiz do projeto, exige PyMuPDF):

```
python -c "import fitz;d=fitz.open('public/materiais/caderno-do-caos-ao-equilibrio.pdf');t=chr(10).join(p.get_text() for p in d);print('FALHOU' if any(w in t.lower() for w in ['terapeuta','terapia','tratamento',chr(8212)]) else 'OK')"
```

## Importação de base de leads

`node scripts/normalizar-leads.mjs <entrada.csv> <saida.csv>` converte um export do RD Station no CSV de importação do Brevo (`EMAIL,NOME,WHATSAPP,CIDADE,ORIGEM,IMPORTADO_EM`). Lógica pura e testada em `src/lib/importacao-leads.ts`; o `.mjs` só faz I/O.

- O export do RD Station é **UTF-16 com BOM e separado por TAB** — lido como UTF-8/vírgula devolve lixo em silêncio.
- Telefone vai no atributo de texto `WHATSAPP`, nunca no campo `SMS` do Brevo (ele valida E.164 e rejeita a linha inteira). Comprimento fora de 10/11 dígitos vira vazio: não se inventa telefone.
- O CSV de saída contém PII e **não pode ser gravado dentro deste repo** — o script recusa e sai com código 1. Ele mora no vault, junto da fonte.

## Pegadinhas

- `src/lib/importacao-leads.ts` importa `./validacao.ts` **com extensão**, e o `tsconfig.json` tem `allowImportingTsExtensions: true` por causa disso. É proposital: o CLI roda esse módulo direto no Node (type-stripping do Node 24) e o ESM do Node não resolve import sem extensão, embora vitest e Next resolvam. Tirar a extensão quebra o CLI sem quebrar teste nem build.
- Autor do commit TEM que ser `brunoeduardosantos1982@gmail.com` — o build da Vercel trava com outro autor.
- Formulários de lead magnet novos seguem o padrão do workspace: entrega SÓ por e-mail (sem download na tela) e campo cidade obrigatório — sem retroagir os materiais antigos.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
