import { describe, expect, it } from "vitest";

import {
  DIMENSOES,
  NOME_BLOQUEIO,
  NOME_DIMENSAO,
  ORDEM_DESEMPATE,
  PONTUACAO_MAXIMA_DIMENSAO,
  WHATSAPP_JOSIE,
  dimensaoMaisForte,
  dimensaoMaisFragil,
  leituraCruzada,
  linkConsulta,
  mapaVazio,
  normalizarWhatsApp,
  percentual,
  somarMapa,
  type BloqueioKey,
  type DimensaoKey,
} from "./pre-diagnostico";

const BLOQUEIOS: BloqueioKey[] = ["E", "X", "P", "I"];

describe("estrutura do instrumento", () => {
  it("tem 6 dimensões com 4 afirmações cada, 24 itens no total", () => {
    expect(DIMENSOES).toHaveLength(6);
    for (const dimensao of DIMENSOES) {
      expect(dimensao.itens).toHaveLength(4);
    }
    const total = DIMENSOES.reduce((soma, d) => soma + d.itens.length, 0);
    expect(total).toBe(24);
  });

  it("a pontuação máxima por dimensão bate com 4 itens de 0 a 3", () => {
    expect(PONTUACAO_MAXIMA_DIMENSAO).toBe(12);
  });

  it("a ordem de desempate cobre todas as dimensões, sem repetir", () => {
    expect(new Set(ORDEM_DESEMPATE).size).toBe(6);
    for (const { chave } of DIMENSOES) {
      expect(ORDEM_DESEMPATE).toContain(chave);
    }
  });
});

describe("somarMapa", () => {
  it("soma as respostas de cada dimensão", () => {
    const mapa = somarMapa({ emocional: [3, 2, 1, 0], fisico: [1, 1, 1, 1] });
    expect(mapa.emocional).toBe(6);
    expect(mapa.fisico).toBe(4);
  });

  it("trata dimensão sem resposta como zero", () => {
    const mapa = somarMapa({ fisico: [3, 3, 3, 3] });
    expect(mapa.fisico).toBe(12);
    expect(mapa.espiritual).toBe(0);
  });

  it("ignora valor fora da escala em vez de inflar a pontuação", () => {
    const mapa = somarMapa({ trabalho: [99, -5, 2, Number.NaN] });
    expect(mapa.trabalho).toBe(5); // 3 + 0 + 2 + 0
  });

  it("mapa vazio começa zerado em todas as dimensões", () => {
    const mapa = mapaVazio();
    expect(Object.values(mapa).every((valor) => valor === 0)).toBe(true);
  });
});

describe("dimensaoMaisFragil", () => {
  it("devolve a de menor pontuação", () => {
    const mapa = somarMapa({
      fisico: [3, 3, 3, 3],
      psicologico: [2, 2, 2, 2],
      emocional: [3, 3, 3, 3],
      espiritual: [3, 3, 3, 2],
      relacoes: [3, 3, 3, 3],
      trabalho: [3, 3, 3, 3],
    });
    expect(dimensaoMaisFragil(mapa)).toBe("psicologico");
  });

  it("no empate segue ORDEM_DESEMPATE, e emocional vence relações", () => {
    const mapa = mapaVazio();
    mapa.emocional = 4;
    mapa.relacoes = 4;
    mapa.fisico = 12;
    mapa.psicologico = 12;
    mapa.espiritual = 12;
    mapa.trabalho = 12;
    expect(dimensaoMaisFragil(mapa)).toBe("emocional");
  });

  it("com tudo zerado devolve a primeira da ordem de desempate", () => {
    expect(dimensaoMaisFragil(mapaVazio())).toBe("emocional");
  });
});

describe("dimensaoMaisForte", () => {
  it("devolve a de maior pontuação", () => {
    const mapa = mapaVazio();
    mapa.trabalho = 11;
    mapa.fisico = 3;
    expect(dimensaoMaisForte(mapa)).toBe("trabalho");
  });
});

describe("percentual", () => {
  it("converte a pontuação para 0 a 100", () => {
    expect(percentual(0)).toBe(0);
    expect(percentual(6)).toBe(50);
    expect(percentual(12)).toBe(100);
  });

  it("prende valores fora da faixa", () => {
    expect(percentual(-3)).toBe(0);
    expect(percentual(40)).toBe(100);
  });
});

describe("WhatsApp da consulta", () => {
  it("o número da Josie está em E.164 do Brasil: 55 + DDD + 9 dígitos", () => {
    expect(WHATSAPP_JOSIE).toMatch(/^55\d{11}$/);
    expect(WHATSAPP_JOSIE).toHaveLength(13);
  });

  it("normaliza número com máscara para só dígitos", () => {
    expect(normalizarWhatsApp("+55 (48) 99686-8396")).toBe("5548996868396");
  });

  it("recusa número curto demais para ser celular brasileiro", () => {
    // 12 dígitos: e o nono digito faltando. Nao pode virar link.
    expect(normalizarWhatsApp("+554896868396")).toBe("");
    expect(normalizarWhatsApp("")).toBe("");
    expect(normalizarWhatsApp(undefined)).toBe("");
  });

  it("monta o link do wa.me com a mensagem já escrita", () => {
    const link = linkConsulta(WHATSAPP_JOSIE, "Ana", "O Bloqueio do Esgotamento");
    expect(link.startsWith(`https://wa.me/${WHATSAPP_JOSIE}?text=`)).toBe(true);
    const texto = decodeURIComponent(link.split("?text=")[1]);
    expect(texto).toContain("Ana");
    expect(texto).toContain("O Bloqueio do Esgotamento");
    expect(texto).toContain("diagnóstico de R$ 333");
  });

  it("sem nome, a mensagem continua fazendo sentido", () => {
    const texto = decodeURIComponent(
      linkConsulta(WHATSAPP_JOSIE, "", "O Bloqueio da Insegurança").split("?text=")[1],
    );
    expect(texto).toContain("uma leitora do site");
  });

  it("com número inválido cai em /mentoria em vez de link quebrado", () => {
    expect(linkConsulta("123", "Ana", "O Bloqueio da Estagnação")).toBe("/mentoria");
  });
});

describe("leituraCruzada", () => {
  it("nomeia o bloqueio e a dimensão na abertura", () => {
    const leitura = leituraCruzada("X", "emocional");
    expect(leitura.abertura).toContain(NOME_BLOQUEIO.X);
    expect(leitura.abertura).toContain(NOME_DIMENSAO.emocional);
  });

  it("produz texto para as 24 combinações possíveis", () => {
    for (const bloqueio of BLOQUEIOS) {
      for (const { chave } of DIMENSOES) {
        const leitura = leituraCruzada(bloqueio, chave as DimensaoKey);
        expect(leitura.abertura.length).toBeGreaterThan(40);
        expect(leitura.corpo.length).toBeGreaterThan(150);
        expect(leitura.virada.length).toBeGreaterThan(40);
      }
    }
  });

  it("muda o corpo quando muda a dimensão, com o mesmo bloqueio", () => {
    const a = leituraCruzada("P", "fisico");
    const b = leituraCruzada("P", "relacoes");
    expect(a.corpo).not.toBe(b.corpo);
  });

  it("muda a virada quando muda o bloqueio, com a mesma dimensão", () => {
    const a = leituraCruzada("E", "trabalho");
    const b = leituraCruzada("I", "trabalho");
    expect(a.virada).not.toBe(b.virada);
  });

  it("não usa termo vetado nem travessão em nenhuma combinação", () => {
    const proibidos = ["terapeuta", "terapia", "tratamento", "cura", "—"];
    for (const bloqueio of BLOQUEIOS) {
      for (const { chave } of DIMENSOES) {
        const leitura = leituraCruzada(bloqueio, chave as DimensaoKey);
        const texto =
          `${leitura.abertura} ${leitura.corpo} ${leitura.virada}`.toLowerCase();
        for (const termo of proibidos) {
          expect(texto).not.toContain(termo);
        }
      }
    }
  });

  it("nenhum item do instrumento usa termo vetado", () => {
    for (const dimensao of DIMENSOES) {
      for (const item of dimensao.itens) {
        const texto = item.toLowerCase();
        expect(texto).not.toContain("terapeuta");
        expect(texto).not.toContain("terapia");
        expect(texto).not.toContain("—");
      }
    }
  });
});
