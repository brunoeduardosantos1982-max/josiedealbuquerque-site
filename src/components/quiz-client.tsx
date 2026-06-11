"use client";

import { useState } from "react";

/* Conteúdo 100% fiel ao protótipo quiz-bloqueio-josie.html (fonte de verdade).
   4 perfis extraídos de 18 casos reais: E=Estagnada X=Esgotada P=Perdida I=Insegura. */

type ProfileKey = "E" | "X" | "P" | "I";
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

const HOTMART_URL = "https://pay.hotmart.com/M95873042T?off=uoo819k9";

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

type Stage = "intro" | "questions" | "gate" | "result";

export function QuizClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Scores>({ E: 0, X: 0, P: 0, I: 0 });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

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

    setEnviando(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience: "b2c",
          nome: nome.trim(),
          email: email.trim(),
          bloqueio: topProfile(scores),
        }),
      });
    } catch {
      /* o resultado aparece mesmo se a gravação falhar; lead é registrado no servidor */
    }
    setEnviando(false);
    setStage("result");
  }

  if (stage === "intro") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">diagnóstico · 2 minutos</p>
        <h1 className="mt-4 text-3xl font-medium leading-[1.15] sm:text-4xl">
          Por que você se sente travada?
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Você tem uma vida que, no papel, deveria te deixar bem. Mas por
          dentro algo não flui. Responda 8 perguntas honestas e descubra qual
          é o bloqueio que está te segurando, e o primeiro passo pra sair
          dele.
        </p>
        <button
          className="btn-brand mt-7 w-full"
          onClick={() => setStage("questions")}
          type="button"
        >
          Começar o diagnóstico
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-muted">
          São perguntas sobre como você se sente. Não há resposta certa, só a
          sua verdade.
        </p>
      </div>
    );
  }

  if (stage === "questions") {
    const item = QUESTIONS[idx];
    const pct = Math.round((idx / QUESTIONS.length) * 100);
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <div className="h-1.5 overflow-hidden rounded-full bg-bege">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-6 text-xs tracking-wide text-muted">
          Pergunta {idx + 1} de {QUESTIONS.length}
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

  if (stage === "gate") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">seu diagnóstico está pronto</p>
        <h2 className="mt-4 text-3xl font-medium leading-[1.15]">
          Pra onde envio o seu resultado?
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Identifiquei o seu bloqueio principal e preparei o primeiro passo
          pra você. Deixe seu nome e e-mail que eu te mostro agora, e te envio
          uma cópia pra você reler quando precisar.
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
        {erro ? <p className="mt-3 text-sm text-terracota">{erro}</p> : null}
        <button
          className="btn-brand mt-6 w-full disabled:opacity-60"
          disabled={enviando}
          onClick={submitLead}
          type="button"
        >
          {enviando ? "Um instante..." : "Ver o meu resultado"}
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-muted">
          Seus dados ficam só com a Josie. Sem spam, você pode sair quando
          quiser.
        </p>
      </div>
    );
  }

  const profile = PROFILES[topProfile(scores)];
  return (
    <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
      <p className="eyebrow">{nome.trim()}, aqui está o seu diagnóstico</p>
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
        <p>
          <strong className="text-fg">O seu primeiro passo:</strong>{" "}
          reconhecer o bloqueio já muda como você se enxerga, mas reconhecer
          não basta. Eu preparei um material que te mostra, na prática, como
          começar a destravar a partir de onde você está hoje.
        </p>
      </div>
      <a className="btn-brand mt-7 block w-full text-center" href={HOTMART_URL}>
        Quero dar o primeiro passo
      </a>
      <p className="mt-6 text-center text-[11px] leading-5 text-muted opacity-80">
        Este conteúdo é educacional e de desenvolvimento pessoal. Não
        constitui diagnóstico, conduta psicológica ou médica, nem
        substitui acompanhamento profissional de saúde. Se você está
        enfrentando sofrimento intenso, procure um profissional de saúde
        mental.
      </p>
    </div>
  );
}
