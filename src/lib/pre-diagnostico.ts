/* Motor do pré-diagnóstico do mundo Mentoria.
   Lógica pura: sem React, sem rede, sem env. Tudo aqui é testável isolado.

   O instrumento tem dois blocos que se cruzam:
   - BLOQUEIO (E/X/P/I): vem do quiz de 8 perguntas, validado contra 18 casos reais.
   - MAPA DE CUIDADO: 6 dimensões da Parte 1 do caderno "Do Caos ao Equilíbrio",
     4 afirmações por dimensão, cada uma de 0 a 3. Site e caderno falam do mesmo diagnóstico.

   O valor do relatório está no CRUZAMENTO dos dois, não em nenhum deles sozinho. */

export type BloqueioKey = "E" | "X" | "P" | "I";

export type DimensaoKey =
  | "fisico"
  | "psicologico"
  | "emocional"
  | "espiritual"
  | "relacoes"
  | "trabalho";

export type MapaCuidado = Record<DimensaoKey, number>;

export const PONTUACAO_MAXIMA_DIMENSAO = 12; // 4 afirmações x 3 pontos

export const NOME_DIMENSAO: Record<DimensaoKey, string> = {
  fisico: "física",
  psicologico: "psicológica",
  emocional: "emocional",
  espiritual: "espiritual",
  relacoes: "das suas relações",
  trabalho: "do seu trabalho",
};

export const NOME_BLOQUEIO: Record<BloqueioKey, string> = {
  E: "Estagnada",
  X: "Esgotada",
  P: "Perdida",
  I: "Insegura",
};

export const DIMENSOES: {
  chave: DimensaoKey;
  titulo: string;
  convite: string;
  itens: string[];
}[] = [
  {
    chave: "fisico",
    titulo: "Cuidado físico",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Faço refeições nutritivas com regularidade",
      "Pratico exercícios físicos",
      "Priorizo dormir o suficiente para recarregar",
      "Quando adoeço, respeito o tempo de descanso",
    ],
  },
  {
    chave: "psicologico",
    titulo: "Cuidado psicológico",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Reservo um tempo longe de telas e internet",
      "Priorizo a autorreflexão",
      "Escrevo para processar pensamentos e emoções",
      "Leio livros por prazer, sem relação com o trabalho",
    ],
  },
  {
    chave: "emocional",
    titulo: "Cuidado emocional",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Passo tempo com pessoas de quem gosto da companhia",
      "Me permito chorar quando é necessário",
      "Pratico o autoelogio, e não só a autocobrança",
      "Procuro fontes de riso e de alegria",
    ],
  },
  {
    chave: "espiritual",
    titulo: "Cuidado espiritual",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Passo tempo na natureza",
      "Cultivo uma conexão espiritual alinhada com as minhas crenças",
      "Pratico meditação, oração ou silêncio",
      "Identifico o que tem valor para mim e priorizo isso",
    ],
  },
  {
    chave: "relacoes",
    titulo: "Cuidado nas relações",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Marco encontros regulares com quem eu amo",
      "Permito que os outros me ajudem quando preciso",
      "Peço ajuda quando é o caso",
      "Converso com alguém em quem confio sobre o que sinto",
    ],
  },
  {
    chave: "trabalho",
    titulo: "Cuidado no trabalho",
    convite: "Com que frequência isso acontece na sua vida hoje?",
    itens: [
      "Faço pausas durante a jornada",
      "Estabeleço limites com clientes e colegas",
      "Equilibro o número de tarefas para não me sobrecarregar",
      "Protejo o meu tempo fora do trabalho",
    ],
  },
];

/* Empate na dimensão mais frágil resolve nesta ordem. O critério não é estético:
   as primeiras da fila são as que, quando faltam, derrubam as outras junto.
   Sem cuidado emocional e sem rede de apoio, nenhuma disciplina de sono ou
   agenda se sustenta por muito tempo. */
export const ORDEM_DESEMPATE: DimensaoKey[] = [
  "emocional",
  "relacoes",
  "psicologico",
  "fisico",
  "trabalho",
  "espiritual",
];

export function mapaVazio(): MapaCuidado {
  return {
    fisico: 0,
    psicologico: 0,
    emocional: 0,
    espiritual: 0,
    relacoes: 0,
    trabalho: 0,
  };
}

/** Soma as respostas (0 a 3) de cada dimensão. Resposta ausente conta como 0. */
export function somarMapa(
  respostas: Partial<Record<DimensaoKey, number[]>>,
): MapaCuidado {
  const mapa = mapaVazio();
  for (const { chave } of DIMENSOES) {
    const valores = respostas[chave] ?? [];
    mapa[chave] = valores.reduce((total, valor) => {
      const limpo = Number.isFinite(valor) ? Math.min(3, Math.max(0, valor)) : 0;
      return total + limpo;
    }, 0);
  }
  return mapa;
}

/** A dimensão de menor pontuação. Empate resolve por ORDEM_DESEMPATE. */
export function dimensaoMaisFragil(mapa: MapaCuidado): DimensaoKey {
  let escolhida: DimensaoKey = ORDEM_DESEMPATE[0];
  let menor = Number.POSITIVE_INFINITY;
  for (const chave of ORDEM_DESEMPATE) {
    if (mapa[chave] < menor) {
      menor = mapa[chave];
      escolhida = chave;
    }
  }
  return escolhida;
}

/** A dimensão de maior pontuação, usada para reconhecer o que já está de pé. */
export function dimensaoMaisForte(mapa: MapaCuidado): DimensaoKey {
  let escolhida: DimensaoKey = ORDEM_DESEMPATE[0];
  let maior = Number.NEGATIVE_INFINITY;
  for (const chave of ORDEM_DESEMPATE) {
    if (mapa[chave] > maior) {
      maior = mapa[chave];
      escolhida = chave;
    }
  }
  return escolhida;
}

export function percentual(pontos: number): number {
  const limpo = Math.min(PONTUACAO_MAXIMA_DIMENSAO, Math.max(0, pontos));
  return Math.round((limpo / PONTUACAO_MAXIMA_DIMENSAO) * 100);
}

/* --- Textos da leitura cruzada ---
   14 peças compõem as 24 combinações possíveis (4 bloqueios x 6 dimensões).
   PONTE explica o mecanismo do bloqueio, CONSEQUENCIA explica o que a dimensão
   frágil provoca, VIRADA reposiciona o problema. Nenhuma promete resultado,
   nenhuma diagnostica, nenhuma elogia. */

const PONTE: Record<BloqueioKey, string> = {
  E: "Isso costuma andar junto: a estagnação raramente começa por falta de capacidade, começa quando a vida vira manutenção. Você segue cumprindo o que precisa ser cumprido, e o que não é cobrado por ninguém vai saindo da agenda em silêncio.",
  X: "Isso não é coincidência: quem sustenta todo mundo aprende cedo a tratar a própria vida como a parte adiável. Você não deixou de cuidar disso por descuido, deixou porque era o único lugar de onde dava para tirar tempo sem decepcionar ninguém.",
  P: "Faz sentido que seja aí: quando você perde o contato com a própria bússola, o primeiro corte cai justamente no que não tem utilidade óbvia. E é exatamente esse tipo de cuidado que devolveria a você as pistas de quem você é.",
  I: "Existe uma lógica nisso: a insegurança faz você investir onde acha que precisa provar alguma coisa, e desinvestir do resto. O que não é avaliado por ninguém acaba virando o que você se permite deixar por último.",
};

const CONSEQUENCIA: Record<DimensaoKey, string> = {
  fisico:
    "E o corpo é onde a conta chega primeiro. Sono, alimentação e movimento não são a parte cosmética do bem-estar, são a base de energia que todo o resto usa. Quando essa base está baixa, tudo parece mais difícil do que é, e você acha que o problema é a sua disposição.",
  psicologico:
    "E sem esse espaço você fica sem lugar para pensar. Autorreflexão, silêncio e leitura não são luxo de quem tem tempo sobrando, são o que impede a sua cabeça de viver reagindo. Sem isso, você atravessa os dias sem nunca decidir nada de verdade, só respondendo ao que aparece.",
  emocional:
    "E é isso que explica um cansaço que descanso não resolve. Quando o que você sente não tem lugar, ele não some, só fica esperando. Alegria, choro e companhia não são recompensa por um bom desempenho, são o que processa a vida enquanto ela acontece.",
  espiritual:
    "E é essa a dimensão que responde pelo sentido. Não importa qual seja a sua crença: sem algum momento de conexão com o que é maior que a sua rotina, sobra eficiência e falta significado. É a diferença entre uma vida que funciona e uma vida que vale.",
  relacoes:
    "E aqui está a peça mais cara de todas. Você provavelmente é excelente em apoiar e péssima em ser apoiada. Rede de apoio não é o que você aciona quando tudo desaba, é o que impede a queda, e ela só existe se for construída antes de precisar.",
  trabalho:
    "E é por isso que a sua semana não fecha. Sem pausa, sem limite e sem fronteira entre o expediente e o resto, o trabalho não ocupa o seu tempo, ele ocupa a sua atenção o dia inteiro. Você trabalha menos horas do que sente, e sente mais cansaço do que trabalha.",
};

const VIRADA: Record<BloqueioKey, string> = {
  E: "O seu próximo passo não está em fazer mais. Está em escolher uma direção que seja sua, e essa escolha precisa de espaço para aparecer.",
  X: "O primeiro passo não é descansar. É se recolocar na própria lista, e descobrir que a lista não desmorona quando você faz isso.",
  P: "O rumo não vem de mais informação. Ele volta quando você se reencontra primeiro, e é desse reencontro que este ponto está te afastando.",
  I: "A confiança não vem de pensar melhor sobre si. Ela vem de acumular evidência de que você se sustenta, e cuidar disso é a primeira evidência.",
};

/* WhatsApp da Josie. NÃO é segredo: vira link no HTML servido a todo mundo.
   Por isso mora aqui como padrão, com a env como sobrescrita, e não só na env:
   variável esquecida na Vercel deixaria o único CTA do funil sem destino. */
export const WHATSAPP_JOSIE = "5548996868396";

/** Só dígitos, como o wa.me exige. Devolve "" se não sobrar número utilizável. */
export function normalizarWhatsApp(bruto: string | undefined): string {
  const digitos = (bruto ?? "").replace(/\D/g, "");
  /* E.164 do Brasil: 55 + DDD (2) + celular (9) = 13 dígitos. O piso é 13 de
     propósito: 12 é justamente o número antigo sem o nono dígito, que abriria
     uma conversa com a pessoa errada. Melhor cair em /mentoria. */
  return digitos.length >= 13 ? digitos : "";
}

/** Link de agendamento da consulta, com a conversa já começada. */
export function linkConsulta(
  numero: string,
  nome: string,
  nomeBloqueio: string,
): string {
  const limpo = normalizarWhatsApp(numero);
  if (!limpo) return "/mentoria";
  const texto = `Oi Josie, sou ${nome || "uma leitora do site"}. Fiz o pré-diagnóstico e deu ${nomeBloqueio}. Quero agendar a consulta de mentoria.`;
  return `https://wa.me/${limpo}?text=${encodeURIComponent(texto)}`;
}

export type LeituraCruzada = {
  bloqueio: BloqueioKey;
  dimensao: DimensaoKey;
  abertura: string;
  corpo: string;
  virada: string;
};

/** Monta a leitura que cruza o bloqueio com a dimensão mais frágil. */
export function leituraCruzada(
  bloqueio: BloqueioKey,
  dimensao: DimensaoKey,
): LeituraCruzada {
  return {
    bloqueio,
    dimensao,
    abertura: `Você é a ${NOME_BLOQUEIO[bloqueio]}, e a dimensão em que você menos se cuida é a ${NOME_DIMENSAO[dimensao]}.`,
    corpo: `${PONTE[bloqueio]} ${CONSEQUENCIA[dimensao]}`,
    virada: VIRADA[bloqueio],
  };
}
