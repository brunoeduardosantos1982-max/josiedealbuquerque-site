import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NR-1 e riscos psicossociais: o que sua empresa precisa fazer",
  description:
    "Entenda o que a NR-1 exige sobre gestão de riscos psicossociais, fiscalização ativa e como adequar sua empresa com método.",
  alternates: { canonical: "/empresas/nr1" },
};

const passosAdequacao = [
  {
    titulo: "Diagnóstico inicial",
    texto:
      "Levantar dados, escutar áreas críticas e entender como o trabalho está organizado antes de propor documentos ou ações.",
  },
  {
    titulo: "Mapeamento no PGR",
    texto:
      "Registrar os fatores psicossociais identificados dentro do Programa de Gerenciamento de Riscos, com critérios claros de avaliação.",
  },
  {
    titulo: "Plano de ação",
    texto:
      "Definir prioridades, responsáveis, prazos internos, indicadores e medidas compatíveis com o porte e a realidade da empresa.",
  },
  {
    titulo: "Implementação",
    texto:
      "Executar mudanças em processos, rotinas de liderança, canais de reporte, comunicação interna e gestão de demandas.",
  },
  {
    titulo: "Monitoramento",
    texto:
      "Acompanhar evidências, incidentes, afastamentos, rotatividade, relatos recorrentes e sinais de sobrecarga por área.",
  },
  {
    titulo: "Revisão periódica",
    texto:
      "Atualizar o PGR e o plano de ação quando houver mudanças de equipe, estrutura, metas, jornada ou modelo de trabalho.",
  },
];

const errosComuns = [
  "Reduzir a adequação a papelada, sem alterar práticas que geram risco no cotidiano.",
  "Usar apenas uma pesquisa de clima genérica, sem conexão direta com o PGR e com evidências operacionais.",
  "Fazer uma ação pontual de comunicação interna e abandonar o tema depois do primeiro ciclo.",
  "Ignorar o papel das lideranças, que influenciam carga, prioridades, clareza e segurança nas relações de trabalho.",
];

const faq = [
  {
    pergunta: "Toda empresa precisa olhar para riscos psicossociais?",
    resposta:
      "Sim. Toda organização precisa avaliar os riscos presentes no seu ambiente de trabalho. A profundidade do processo varia conforme porte, atividade, número de pessoas, histórico de ocorrências e nível de exposição.",
  },
  {
    pergunta: "Qual é o papel do RH na adequação à NR-1?",
    resposta:
      "O RH costuma coordenar escutas, dados de pessoas, comunicação e desenvolvimento de lideranças. Ainda assim, a adequação deve envolver segurança do trabalho, jurídico, gestão e áreas operacionais, porque o risco nasce na forma como o trabalho é organizado.",
  },
  {
    pergunta: "Pesquisa de clima resolve a exigência?",
    resposta:
      "Não de forma isolada. Pesquisa de clima pode apoiar o diagnóstico, mas precisa estar conectada à identificação de riscos, ao PGR, a um plano de ação documentado e ao acompanhamento contínuo.",
  },
  {
    pergunta: "O que a fiscalização olha?",
    resposta:
      "A fiscalização tende a observar se a empresa identificou riscos psicossociais, registrou esses fatores no PGR, definiu medidas proporcionais, mantém evidências de execução e revisa o processo ao longo do tempo.",
  },
  {
    pergunta: "A adequação precisa ser igual para todas as áreas?",
    resposta:
      "Não. Áreas com jornadas, metas, exposição a conflito, pressão de entrega ou baixa autonomia podem exigir medidas diferentes. A adequação técnica considera o risco real de cada contexto.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.resposta,
    },
  })),
};

export default function Nr1Page() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />

      <p className="eyebrow">guia técnico</p>
      <h1 className="mt-4 text-4xl font-medium leading-[1.12] text-fg">
        NR-1 e riscos psicossociais: o que sua empresa precisa fazer
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-base leading-8 text-muted">
        <p>
          A NR-1, Norma Regulamentadora nº 1, estabelece as diretrizes gerais
          para o Gerenciamento de Riscos Ocupacionais. Na prática, ela orienta
          como as empresas devem identificar perigos, avaliar riscos, definir
          medidas preventivas e manter evidências de gestão. Com a inclusão dos
          riscos psicossociais no escopo do PGR, o tema deixou de ser apenas uma
          pauta de bem-estar e passou a integrar a rotina técnica de
          conformidade.
        </p>
        <p>
          Para empresas, isso exige método. Não basta afirmar que existe uma
          política interna ou realizar uma ação isolada. É necessário demonstrar
          como os fatores relacionados à organização do trabalho são mapeados,
          avaliados, acompanhados e reduzidos. O objetivo é construir um
          processo que seja útil para a gestão, compreensível para as equipes e
          consistente diante de uma fiscalização ativa.
        </p>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">
            O que são riscos psicossociais
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <p>
              Riscos psicossociais são fatores presentes na organização, nas
              relações e nas condições de trabalho que podem gerar desgaste
              relevante para as pessoas e para a operação. Eles não aparecem
              apenas em situações extremas. Muitas vezes surgem em rotinas
              normalizadas: pressão permanente, pouca previsibilidade, falhas de
              comunicação e ausência de critérios para tomada de decisão.
            </p>
            <p>
              Exemplos comuns incluem metas inalcançáveis, jornadas exaustivas,
              assédio moral ou sexual, falta de clareza de papel, isolamento em
              modelos remotos ou híbridos, baixa autonomia, conflitos frequentes
              entre áreas e lideranças sem preparo para organizar prioridades.
              Esses fatores afetam absenteísmo, rotatividade, produtividade,
              segurança psicológica e qualidade das entregas.
            </p>
            <p>
              A avaliação técnica não busca responsabilizar uma pessoa ou uma
              área específica. Ela busca entender como o trabalho está
              estruturado. Quando a mesma queixa aparece em setores diferentes,
              quando afastamentos se concentram em uma unidade ou quando a
              rotatividade aumenta em determinado time, há sinais que merecem
              leitura estruturada.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">
            O que mudou na NR-1 e por quê
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <p>
              O ponto central é que a gestão de riscos ocupacionais passa a
              contemplar também os fatores psicossociais no PGR. Isso aproxima a
              rotina de segurança e gestão de pessoas de uma realidade que já
              aparece nos dados das empresas: aumento de afastamentos,
              dificuldade de retenção, queda de engajamento e impacto direto na
              continuidade das operações.
            </p>
            <p>
              Saúde mental está entre as grandes causas de afastamento no
              Brasil. Para o ambiente corporativo, isso não pode ser analisado
              apenas como tema individual. A forma como metas são definidas,
              como jornadas são controladas, como conflitos são conduzidos e
              como lideranças distribuem demandas influencia diretamente o nível
              de exposição ao risco.
            </p>
            <p>
              A NR-1 reforça uma lógica preventiva. Empresas que já possuem
              ritos de segurança, compliance, governança e gestão de pessoas
              podem integrar o tema a processos existentes. O desafio é sair da
              intenção genérica e construir evidências: diagnóstico, critérios,
              plano, responsáveis, registros e revisão.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">
            Prazos e fiscalização
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <p>
              A exigência está em vigor e a fiscalização ativa pode solicitar
              evidências de conformidade. Isso inclui o PGR atualizado, o
              histórico de avaliação, as medidas definidas e a comprovação de
              que a empresa acompanha seus riscos. Multas e autuações podem
              ocorrer quando há não conformidade ou ausência de gestão
              demonstrável.
            </p>
            <p>
              O risco mais comum é esperar uma notificação para organizar a
              documentação. Quando isso acontece, a empresa tende a agir com
              pressa, produzir registros frágeis e perder a chance de usar o
              processo como ferramenta real de gestão. Adequação bem feita exige
              leitura do contexto, pactuação interna e continuidade.
            </p>
            <p>
              Também é importante evitar alarmismo. A NR-1 não exige soluções
              padronizadas nem projetos incompatíveis com a realidade de cada
              negócio. Ela exige coerência entre risco identificado, medida
              adotada e evidência mantida. Esse é o eixo de uma implantação
              séria.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">
            Passo a passo da adequação
          </h2>
          <ol className="mt-5 flex flex-col gap-4">
            {passosAdequacao.map((passo, index) => (
              <li
                className="rounded-2xl border border-line bg-surface p-5"
                key={passo.titulo}
              >
                <div className="text-sm font-medium text-fg">
                  {index + 1}. {passo.titulo}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-5">
            Esse percurso ajuda a empresa a sair de uma resposta improvisada
            para um sistema de gestão. O diagnóstico mostra prioridades, o PGR
            organiza a leitura técnica, o plano de ação define execução e o
            monitoramento comprova evolução. A revisão periódica fecha o ciclo
            e mantém o processo vivo.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">Erros comuns</h2>
          <ul className="mt-5 flex list-disc flex-col gap-3 pl-5">
            {errosComuns.map((erro) => (
              <li key={erro}>{erro}</li>
            ))}
          </ul>
          <p className="mt-5">
            Em geral, esses erros têm a mesma origem: tentar cumprir uma norma
            sem olhar para a operação. A adequação precisa conversar com metas,
            jornada, desenho de cargos, ritos de liderança, canais de reporte e
            indicadores de pessoas. Quando fica restrita a um arquivo, perde
            força técnica e valor para a gestão.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-medium text-fg">FAQ sobre NR-1</h2>
          <div className="mt-5 flex flex-col gap-4">
            {faq.map((item) => (
              <div
                className="rounded-2xl border border-line bg-surface p-5"
                key={item.pergunta}
              >
                <h3 className="text-base font-medium text-fg">
                  {item.pergunta}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.resposta}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
        <h2 className="text-xl font-medium text-fg">
          Quer saber como está a sua empresa?
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Agende um diagnóstico inicial e receba uma leitura objetiva do que
          falta para a conformidade, com prioridades claras para gestão,
          liderança e evidências.
        </p>
        <Link className="btn-brand mt-5 inline-block" href="/empresas/contato">
          Agendar diagnóstico
        </Link>
      </div>
    </article>
  );
}
