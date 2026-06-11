# Tarefa Codex — Expandir conteúdo: página-pilar NR-1 e Sobre

> Spec autocontida. Diretório: D:\VortexBrain00\josiedealbuquerque-site (Next.js 16 App Router, TS, Tailwind v4 — ler node_modules/next/dist/docs/ antes; ver AGENTS.md). Branch: main. Você NÃO commita.

## Contexto

Site da consultora **Josie de Albuquerque** (josiedealbuquerque.com.br) com dois mundos que NUNCA se cruzam na navegação: `/mentoria` (B2C, tom acolhedor) e `/empresas` (B2B, tom técnico-profissional). Esta tarefa é SÓ no mundo `/empresas` e na página neutra `/sobre`.

## Regras de linguagem (INVIOLÁVEIS)

- PROIBIDO em qualquer texto: "terapeuta", "terapia", "tratamento", "cura".
- PROIBIDO o caractere travessão (—): usar vírgula ou dois-pontos.
- No mundo /empresas: ZERO linguagem terapêutica/espiritual; ZERO menção a quiz/bloqueio/mentoria. Tom: técnico, sério, confiável, sem alarmismo barato.
- Seguir o padrão visual existente (ver `src/app/empresas/nr1/page.tsx` como referência de classes: `eyebrow`, `text-fg`, `text-muted`, `btn-brand`, bordas `border-line`, superfícies `bg-surface`).

## Entrega 1 — Expandir `src/app/empresas/nr1/page.tsx`

Transformar a página atual (esqueleto) em página-pilar SEO completa (1.200-1.800 palavras), mantendo o que existe e adicionando seções:

1. **O que são riscos psicossociais** (com exemplos concretos do dia a dia da empresa: metas inalcançáveis, jornadas exaustivas, assédio, falta de clareza de papel, isolamento)
2. **O que mudou na NR-1 e por quê** (gestão de riscos ocupacionais agora inclui os psicossociais no PGR; contexto: saúde mental como uma das maiores causas de afastamento no Brasil)
3. **Prazos e fiscalização** (fiscalização ativa; multas e autuação por não conformidade; NÃO inventar datas específicas: usar "em vigor" e "fiscalização ativa")
4. **Passo a passo da adequação** (5-6 passos numerados: diagnóstico → mapeamento no PGR → plano de ação → implementação → monitoramento → revisão periódica)
5. **Erros comuns** (3-4: tratar como papelada, pesquisa de clima genérica, ação pontual sem continuidade, ignorar lideranças)
6. **FAQ** (4-5 perguntas: "Toda empresa precisa?", "Qual o papel do RH?", "Pesquisa de clima resolve?", "O que a fiscalização olha?")
7. Manter o CTA final existente para /empresas/contato.

Adicionar JSON-LD de FAQPage (script type="application/ld+json") com as perguntas do FAQ.

## Entrega 2 — Enriquecer `src/app/sobre/page.tsx`

Manter a estrutura e o tom neutro (a página serve aos DOIS públicos sem pender). Adicionar:
- Uma seção "Formação e trajetória" com 3-4 itens em lista sóbria (especialização em Gestão Estratégica em NR-1; mais de 12 anos em desenvolvimento humano; mais de mil pessoas acompanhadas; vivência em gestão dentro de grandes empresas).
- NÃO inventar nomes de instituições, datas ou números além dos citados.

## Critérios de aceite

1. `npm run build` passa.
2. Zero ocorrências de: terapeuta, terapia, tratamento, cura, travessão (—), quiz/bloqueio em /empresas.
3. NR-1 com as 7 seções + JSON-LD FAQPage válido.
4. Nenhuma dependência nova.

Ao terminar, liste os arquivos alterados e o resultado do build.
