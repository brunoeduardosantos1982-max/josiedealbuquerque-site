"use client";

import { useState } from "react";

import {
  DIMENSOES,
  NOME_DIMENSAO,
  WHATSAPP_JOSIE,
  dimensaoMaisForte,
  dimensaoMaisFragil,
  leituraCruzada,
  linkConsulta,
  percentual,
  somarMapa,
  type BloqueioKey,
  type DimensaoKey,
} from "@/lib/pre-diagnostico";

/* Fluxo único de pré-diagnóstico do mundo Mentoria.

   Bloco 1 (bloqueio) -> gate (nome + e-mail, entrega o caderno) -> Bloco 2 (mapa
   de cuidado, 6 dimensões) -> relatório com a leitura cruzada -> CTA da consulta.

   Conteúdo do Bloco 1 é 100% fiel ao protótipo quiz-bloqueio-josie.html
   (fonte de verdade). 4 perfis extraídos de 18 casos reais:
   E=Estagnada X=Esgotada P=Perdida I=Insegura. */

type ProfileKey = BloqueioKey;
type Scores = Record<ProfileKey, number>;

const PROFILES: Record<
  ProfileKey,
  { nome: string; badge: string; p1: string; insight: string; p2: string }
> = {
  E: {
    nome: "O Bloqueio da Estagnação",
    badge: "Você parou, e sente isso por dentro",
    p1: 'Por fora, está tudo em ordem. Você tem uma vida montada, talvez estabilidade no trabalho, uma rotina que funciona. Mas por dentro existe uma voz baixinha que pergunta: <strong>"é só isso?"</strong>. Você não está mal, está parada. E parar, pra quem já foi movida por algo, dói de um jeito difícil de explicar.',
    insight:
      "O que prende a Estagnada quase nunca é falta de capacidade. É falta de um <strong>próximo passo que faça sentido</strong>, não o próximo passo óbvio, mas um que seja seu. Enquanto ele não aparece, você preenche o vazio com mais do mesmo.",
    p2: 'Mulheres que se reconheceram aqui descobriram que o ponto não era "fazer mais", e sim reencontrar a direção que tinham perdido de vista. Foi quando pararam de empurrar e começaram a escutar.',
  },
  X: {
    nome: "O Bloqueio do Esgotamento",
    badge: "Você dá conta de tudo, e está se esvaziando",
    p1: "Você é a pessoa em quem todos se apoiam. Resolve, sustenta, segura as pontas. E é justamente por isso que ninguém percebe quando você não está bem, <strong>nem você mesma, até passar do limite</strong>. O cansaço já não vai embora com um fim de semana. Virou o seu estado padrão.",
    insight:
      "O esgotamento raramente é sobre fazer demais. É sobre fazer demais <strong>pelos outros e quase nada por si</strong>, e ter perdido até a permissão de querer algo só pra você. O primeiro passo não é descansar; é se recolocar na própria lista.",
    p2: "As mulheres que saíram desse lugar não largaram suas responsabilidades. Elas aprenderam onde investir a própria energia, e a impor limites sem culpa. O bem-estar voltou como consequência, não como mais uma tarefa.",
  },
  P: {
    nome: "O Bloqueio da Falta de Direção",
    badge: "Você se perdeu de si mesma pelo caminho",
    p1: 'Em algum momento entre as escolhas, as cobranças e a correria, você foi ficando longe de quem você é. Hoje, se alguém te perguntar o que você realmente quer, a resposta não vem, ou vem cheia de "deveria". <strong>Você não está sem rumo por falta de esforço. Está sem rumo porque perdeu o contato com a sua própria bússola.</strong>',
    insight:
      "Falta de direção quase nunca se resolve com mais informação ou mais um curso. Se resolve com <strong>autoconhecimento</strong>: reconhecer seus valores, o que te move, o que é seu de verdade e o que você só herdou. A clareza nasce de dentro, não de fora.",
    p2: "Foi o caminho de muitas que chegaram perdidas e saíram com objetivos claros, valores definidos e uma visão de futuro que finalmente parecia delas. O rumo apareceu quando elas se reencontraram primeiro.",
  },
  I: {
    nome: "O Bloqueio da Insegurança",
    badge: "Você quer crescer, mas duvida de si",
    p1: 'Você sabe que tem potencial. Vê oportunidades, sente o impulso de ir mais longe, e então a voz interna te puxa de volta: <strong>"e se eu não der conta? e se não for boa o suficiente?"</strong>. O medo não te paralisa por completo, mas te mantém um passo aquém do que você poderia.',
    insight:
      "A insegurança raramente é falta de competência, é falta de <strong>autoconfiança</strong>, que é coisa diferente. Competência você já tem; o que falta é a relação de confiança com você mesma. E isso se constrói, não se espera nascer pronto.",
    p2: "As mulheres que destravaram isso não viraram destemidas. Elas aprenderam a transformar o medo em movimento, a agir junto com a insegurança em vez de esperar ela passar. Foi aí que vieram o espaço próprio, o negócio que cresceu, os desafios que antes pareciam grandes demais.",
  },
};

const QUESTIONS: { q: string; opts: [string, Partial<Scores>][] }[] = [
  {
    q: "Quando você pensa na sua vida hoje, qual frase aperta mais?",
    opts: [
      ["Tenho tudo no lugar, mas sinto que parei no tempo.", { E: 2 }],
      ["Estou exausta de segurar tudo sozinha.", { X: 2 }],
      ["Não sei mais o que eu quero da vida.", { P: 2 }],
      ["Sei o que quero, mas não confio que vou conseguir.", { I: 2 }],
    ],
  },
  {
    q: "Como costumam ser as suas manhãs de segunda-feira?",
    opts: [
      ["No piloto automático, os dias se parecem demais.", { E: 2 }],
      ["Já acordo cansada, antes mesmo de começar.", { X: 2 }],
      ["Com aquela sensação de 'pra onde estou indo?'.", { P: 2 }],
      [
        "Com uma lista de coisas que tenho medo de não dar conta.",
        { I: 1, X: 1 },
      ],
    ],
  },
  {
    q: "O que mais te incomoda quando você para pra sentir?",
    opts: [
      ["A sensação de que a vida poderia ser mais, mas não anda.", { E: 2 }],
      ["Não sobrar nada de mim pra mim.", { X: 2 }],
      ["Ter me afastado de quem eu costumava ser.", { P: 2 }],
      ["Ver oportunidades passarem porque eu hesitei.", { I: 2 }],
    ],
  },
  {
    q: "Se uma amiga te perguntasse 'o que você quer pra você?', você...",
    opts: [
      ["Saberia responder, mas acho que não vou atrás.", { E: 1, I: 1 }],
      ["Diria que primeiro precisava de um tempo pra respirar.", { X: 2 }],
      ["Travaria, sinceramente não sei mais.", { P: 2 }],
      ["Teria a resposta, mas com medo de não merecer ou conseguir.", { I: 2 }],
    ],
  },
  {
    q: "Onde a sua inquietação aparece mais forte?",
    opts: [
      ["Na carreira: sinto que estagnei profissionalmente.", { E: 2 }],
      ["No corpo e na mente: ansiedade, cansaço, sobrecarga.", { X: 2 }],
      ["Por dentro: um vazio, uma falta de propósito.", { P: 2 }],
      ["Nas escolhas: me sabotando bem na hora de avançar.", { I: 2 }],
    ],
  },
  {
    q: "Quando você imagina estar bem de verdade, o que vem primeiro?",
    opts: [
      ["Ter um novo rumo que me empolgue de novo.", { E: 1, P: 1 }],
      ["Acordar leve, com energia e tempo pra mim.", { X: 2 }],
      ["Saber exatamente quem eu sou e o que quero.", { P: 2 }],
      ["Confiar em mim o suficiente pra arriscar.", { I: 2 }],
    ],
  },
  {
    q: "O que você já tentou pra mudar isso?",
    opts: [
      ["Mudei coisas por fora, mas a sensação voltou.", { E: 2 }],
      ["Tento descansar, mas a culpa não deixa.", { X: 2 }],
      ["Busquei respostas em vários lugares, sem encontrar.", { P: 2 }],
      ["Comecei algumas vezes, mas o medo me fez parar.", { I: 2 }],
    ],
  },
  {
    q: "E por dentro de tudo isso, no fundo você sente que...",
    opts: [
      ["...existe algo maior esperando por mim, e eu não acesso.", { P: 1, E: 1 }],
      ["...preciso me cuidar antes de cuidar de todo mundo.", { X: 2 }],
      ["...perdi a conexão comigo mesma.", { P: 2 }],
      ["...sou capaz de muito mais do que me permito.", { I: 2 }],
    ],
  },
];

const ESCALA: { valor: number; rotulo: string }[] = [
  { valor: 0, rotulo: "Nunca" },
  { valor: 1, rotulo: "Pouco" },
  { valor: 2, rotulo: "Às vezes" },
  { valor: 3, rotulo: "Sempre" },
];

/* A env sobrescreve; o padrão no lib garante que o CTA nunca fique sem destino. */
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_JOSIE || WHATSAPP_JOSIE;

function topProfile(scores: Scores): ProfileKey {
  let best: ProfileKey = "E";
  let bestValue = -1;
  for (const key of ["X", "P", "I", "E"] as ProfileKey[]) {
    if (scores[key] > bestValue) {
      bestValue = scores[key];
      best = key;
    }
  }
  return best;
}

type Stage = "intro" | "questions" | "gate" | "mapa" | "result";

export function QuizClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Scores>({ E: 0, X: 0, P: 0, I: 0 });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [consentimento, setConsentimento] = useState(false);
  const [dimIdx, setDimIdx] = useState(0);
  const [respostas, setRespostas] = useState<Record<DimensaoKey, number[]>>(
    () =>
      Object.fromEntries(
        DIMENSOES.map((d) => [d.chave, Array(d.itens.length).fill(-1)]),
      ) as Record<DimensaoKey, number[]>,
  );

  function choose(points: Partial<Scores>) {
    setScores((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(points) as ProfileKey[]) {
        next[key] += points[key] ?? 0;
      }
      return next;
    });
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      setStage("gate");
    }
  }

  function responder(chave: DimensaoKey, item: number, valor: number) {
    setRespostas((prev) => {
      const next = { ...prev, [chave]: [...prev[chave]] };
      next[chave][item] = valor;
      return next;
    });
  }

  async function submitLead() {
    setErro(null);
    const okEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
    if (!nome.trim()) {
      setErro("Me conta seu primeiro nome.");
      return;
    }
    if (!okEmail) {
      setErro("Confere o e-mail, parece incompleto.");
      return;
    }
    if (!consentimento) {
      setErro("Preciso do seu aceite para te enviar o caderno por e-mail.");
      return;
    }

    setEnviando(true);
    const bloqueio = topProfile(scores);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience: "b2c",
          nome: nome.trim(),
          email: email.trim(),
          bloqueio,
        }),
      });
    } catch {
      /* o fluxo continua mesmo se a gravação falhar; o lead é registrado no servidor */
    }
    try {
      await fetch("/api/materiais/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience: "b2c",
          nome: nome.trim(),
          email: email.trim(),
          material: "caderno-do-caos-ao-equilibrio",
          /* Sobrescreve `material` se a pessoa ja tinha baixado antes:
             a rota grava com updateEnabled, entao o contato sobe de estagio. */
          estagio: "quiz",
          consentimento: true,
        }),
      });
    } catch {
      /* a entrega do caderno é best-effort, nunca trava o pré-diagnóstico */
    }
    setEnviando(false);
    setStage("mapa");
  }

  /* ---------------- intro ---------------- */
  if (stage === "intro") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">pré-diagnóstico · 5 minutos</p>
        <h1 className="mt-4 text-3xl font-medium leading-[1.15] sm:text-4xl">
          Por que você se sente travada?
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Você tem uma vida que, no papel, deveria te deixar bem. Mas por dentro
          algo não flui. Este pré-diagnóstico tem duas partes: primeiro
          identifica o bloqueio que está te segurando, depois mapeia onde você
          anda se cuidando e onde parou. No fim você recebe uma leitura pessoal
          e o caderno completo, de graça.
        </p>
        <button
          className="btn-brand mt-7 w-full"
          onClick={() => setStage("questions")}
          type="button"
        >
          Começar o pré-diagnóstico
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-muted">
          São perguntas sobre como você se sente. Não há resposta certa, só a
          sua verdade.
        </p>
      </div>
    );
  }

  /* ---------------- bloco 1: bloqueio ---------------- */
  if (stage === "questions") {
    const item = QUESTIONS[idx];
    const pct = Math.round((idx / QUESTIONS.length) * 50);
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <div className="h-1.5 overflow-hidden rounded-full bg-bege">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-6 text-xs tracking-wide text-muted">
          Parte 1 de 2 · pergunta {idx + 1} de {QUESTIONS.length}
        </p>
        <h2 className="mt-2 text-2xl font-medium leading-[1.25]">{item.q}</h2>
        <div className="mt-6 flex flex-col gap-3">
          {item.opts.map(([texto, points]) => (
            <button
              className="rounded-xl border border-line bg-bege/60 px-5 py-4 text-left text-[15px] leading-6 transition hover:border-brand hover:bg-bege"
              key={texto}
              onClick={() => choose(points)}
              type="button"
            >
              {texto}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- gate ---------------- */
  if (stage === "gate") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">primeira parte concluída</p>
        <h2 className="mt-4 text-3xl font-medium leading-[1.15]">
          Já sei qual é o seu bloqueio
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Falta a segunda parte, que é onde a leitura fica realmente sua: um
          mapa de como você anda se cuidando em seis áreas da vida. Deixe seu
          nome e e-mail para eu te enviar o caderno completo agora, e siga para
          o mapa.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-muted">
            Seu primeiro nome
            <input
              autoComplete="given-name"
              className="rounded-xl border border-line bg-bege/50 px-4 py-3.5 text-base text-fg outline-none focus:border-brand"
              onChange={(event) => setNome(event.target.value)}
              placeholder="Como você gosta de ser chamada"
              type="text"
              value={nome}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-muted">
            Seu melhor e-mail
            <input
              autoComplete="email"
              className="rounded-xl border border-line bg-bege/50 px-4 py-3.5 text-base text-fg outline-none focus:border-brand"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
              type="email"
              value={email}
            />
          </label>
        </div>
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted">
          <input
            checked={consentimento}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand,#C26D50)]"
            onChange={(event) => setConsentimento(event.target.checked)}
            type="checkbox"
          />
          <span>
            Aceito receber o caderno e os conteúdos da Josie por e-mail. Seus
            dados ficam só com ela, e você pode sair quando quiser.
          </span>
        </label>
        {erro ? <p className="mt-3 text-sm text-terracota">{erro}</p> : null}
        <button
          className="btn-brand mt-6 w-full disabled:opacity-60"
          disabled={enviando}
          onClick={submitLead}
          type="button"
        >
          {enviando ? "Um instante..." : "Continuar para o mapa"}
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-muted">
          O caderno vai para o seu e-mail, sem custo.
        </p>
      </div>
    );
  }

  /* ---------------- bloco 2: mapa de cuidado ---------------- */
  if (stage === "mapa") {
    const dimensao = DIMENSOES[dimIdx];
    const atual = respostas[dimensao.chave];
    const completa = atual.every((valor) => valor >= 0);
    const pct = 50 + Math.round((dimIdx / DIMENSOES.length) * 50);
    const ultima = dimIdx + 1 === DIMENSOES.length;

    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <div className="h-1.5 overflow-hidden rounded-full bg-bege">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-6 text-xs tracking-wide text-muted">
          Parte 2 de 2 · área {dimIdx + 1} de {DIMENSOES.length}
        </p>
        <h2 className="mt-2 text-2xl font-medium leading-[1.25]">
          {dimensao.titulo}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">{dimensao.convite}</p>

        <div className="mt-6 flex flex-col gap-5">
          {dimensao.itens.map((item, posicao) => (
            <div key={item}>
              <p className="text-[15px] leading-6 text-fg">{item}</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {ESCALA.map((opcao) => {
                  const marcada = atual[posicao] === opcao.valor;
                  return (
                    <button
                      aria-pressed={marcada}
                      className={`rounded-lg border px-2 py-2.5 text-xs leading-4 transition ${
                        marcada
                          ? "border-brand bg-brand text-white"
                          : "border-line bg-bege/50 text-muted hover:border-brand"
                      }`}
                      key={opcao.valor}
                      onClick={() =>
                        responder(dimensao.chave, posicao, opcao.valor)
                      }
                      type="button"
                    >
                      {opcao.rotulo}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-brand mt-7 w-full disabled:opacity-50"
          disabled={!completa}
          onClick={() => (ultima ? setStage("result") : setDimIdx(dimIdx + 1))}
          type="button"
        >
          {ultima ? "Ver o meu pré-diagnóstico" : "Próxima área"}
        </button>
        {!completa ? (
          <p className="mt-3 text-center text-xs text-muted">
            Responda as quatro afirmações para seguir.
          </p>
        ) : null}
      </div>
    );
  }

  /* ---------------- relatório ---------------- */
  const bloqueio = topProfile(scores);
  const profile = PROFILES[bloqueio];
  const mapa = somarMapa(respostas);
  const fragil = dimensaoMaisFragil(mapa);
  const forte = dimensaoMaisForte(mapa);
  const leitura = leituraCruzada(bloqueio, fragil);

  return (
    <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
      <p className="eyebrow">
        {nome.trim()}, aqui está o seu pré-diagnóstico
      </p>

      <h2 className="mt-4 text-3xl font-medium leading-[1.15]">
        {profile.nome}
      </h2>
      <p className="mt-3 inline-block rounded-full border border-brand px-4 py-1 font-serif text-sm italic text-brand">
        {profile.badge}
      </p>

      <div className="mt-6 flex flex-col gap-4 text-base leading-7 text-muted">
        <p dangerouslySetInnerHTML={{ __html: profile.p1 }} />
        <div
          className="rounded-r-xl border-l-[3px] border-brand bg-bege/70 px-5 py-4 text-[15px] leading-7 text-fg"
          dangerouslySetInnerHTML={{ __html: profile.insight }}
        />
        <p dangerouslySetInnerHTML={{ __html: profile.p2 }} />
      </div>

      {/* mapa de cuidado */}
      <h3 className="mt-10 font-serif text-2xl font-medium leading-tight">
        O seu mapa de cuidado
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Não é nota, é retrato. Ele mostra onde a sua energia está sendo reposta
        e onde ela só sai.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {DIMENSOES.map((dimensao) => {
          const valor = percentual(mapa[dimensao.chave]);
          const eFragil = dimensao.chave === fragil;
          return (
            <div key={dimensao.chave}>
              <div className="flex items-baseline justify-between text-sm">
                <span className={eFragil ? "font-medium text-brand" : "text-fg"}>
                  {dimensao.titulo}
                </span>
                <span className="text-xs text-muted">{valor}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bege">
                <div
                  className={`h-full rounded-full ${eFragil ? "bg-brand" : "bg-fg/25"}`}
                  style={{ width: `${valor}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* leitura cruzada */}
      <h3 className="mt-10 font-serif text-2xl font-medium leading-tight">
        O que isso quer dizer junto
      </h3>
      <div className="mt-4 flex flex-col gap-4 text-base leading-7 text-muted">
        <p className="text-fg">
          <strong>{leitura.abertura}</strong>
        </p>
        <p>{leitura.corpo}</p>
        <div className="rounded-r-xl border-l-[3px] border-brand bg-bege/70 px-5 py-4 text-[15px] leading-7 text-fg">
          {leitura.virada}
        </div>
        <p>
          Vale reparar no outro lado também: a sua área mais firme hoje é a{" "}
          <strong className="text-fg">{NOME_DIMENSAO[forte]}</strong>. Ela é a
          prova de que você consegue sustentar cuidado quando decide que aquilo
          importa. O trabalho não é aprender a se cuidar, é estender para o
          resto o que você já faz em algum lugar.
        </p>
      </div>

      {/* próximo passo */}
      <div className="mt-10 rounded-2xl border border-brand/40 bg-bege/60 p-6 sm:p-7">
        {/* Esta oferta existe SÓ aqui, no relatório de quem respondeu o quiz.
            Não pode virar página própria: URL é adivinhável e compartilhável. */}
        <p className="eyebrow">só para quem fez o pré-diagnóstico</p>
        <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-fg">
          Diagnóstico inicial com a Josie
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-muted">
          O caderno completo já saiu para o seu e-mail, sem custo, e ele te leva
          longe sozinha. O que ele não faz é olhar para o seu caso.
        </p>
        {/* A fronteira com a aula gratuita é o que sustenta o preço: na aula a
            Josie explica os bloqueios; aqui ela abre o mapa DESTA pessoa. */}
        <p className="mt-3 text-[15px] leading-7 text-muted">
          No diagnóstico a Josie abre <strong className="text-fg">o seu mapa</strong>,
          com as suas seis dimensões na tela, e trabalha em cima do que apareceu
          neste pré-diagnóstico. Não é uma aula sobre os bloqueios: é uma hora
          sobre o seu.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-fg">
          <strong className="text-[20px] text-brand">R$ 333</strong>. E se você
          decidir fechar a mentoria depois, esse valor é <strong className="text-fg">abatido
          integralmente</strong> do pacote que escolher.
        </p>
        <a
          className="btn-brand mt-6 block w-full text-center"
          href={linkConsulta(WHATSAPP, nome.trim(), profile.nome)}
          rel="noreferrer"
          target="_blank"
        >
          Quero agendar o meu diagnóstico
        </a>
        <p className="mt-3 text-center text-xs leading-5 text-muted">
          Você fala direto com a Josie no WhatsApp para escolher o horário.
        </p>
      </div>

      <p className="mt-8 text-center text-[11px] leading-5 text-muted opacity-80">
        Este conteúdo é educacional e de desenvolvimento pessoal. Não constitui
        diagnóstico, conduta psicológica ou médica, nem substitui acompanhamento
        profissional de saúde. Se você está enfrentando sofrimento intenso,
        procure um profissional de saúde mental.
      </p>
    </div>
  );
}
