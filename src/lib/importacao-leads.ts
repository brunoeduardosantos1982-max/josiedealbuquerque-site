/* Normalização da base de leads exportada do RD Station para importação no Brevo.
   Lógica PURA (sem I/O) para poder ser testada; o CLI que lê e escreve arquivo
   é `scripts/normalizar-leads.mjs`.

   Pegadinha da fonte: o export do RD Station vem em UTF-16 com BOM e separado
   por TAB. Lido como UTF-8/vírgula, devolve lixo silenciosamente. */

// Extensão .ts explícita de propósito: o CLI `scripts/normalizar-leads.mjs` roda
// este módulo direto no Node (type-stripping), e o ESM do Node não resolve import
// sem extensão. Exige `allowImportingTsExtensions` no tsconfig.
import { isEmailValido } from "./validacao.ts";

export type RegistroBruto = Record<string, string>;

export type Lead = {
  email: string;
  nome: string;
  whatsapp: string;
  cidade: string;
};

export type ResultadoNormalizacao = {
  leads: Lead[];
  invalidos: number;
  duplicados: number;
  total: number;
};

const BOM_LE = 0xff;
const BOM_BE = 0xfe;

/** Decodifica o buffer respeitando o BOM. Reconhece UTF-16LE, UTF-16BE e UTF-8. */
export function decodificar(buffer: Uint8Array): string {
  if (buffer.length >= 2) {
    if (buffer[0] === BOM_LE && buffer[1] === BOM_BE) {
      return new TextDecoder("utf-16le").decode(buffer.subarray(2));
    }
    if (buffer[0] === BOM_BE && buffer[1] === BOM_LE) {
      return new TextDecoder("utf-16be").decode(buffer.subarray(2));
    }
  }
  return new TextDecoder("utf-8").decode(buffer).replace(/^﻿/, "");
}

/** Quebra o conteúdo TAB-separado em registros indexados pelo header. */
export function parseTsv(conteudo: string): RegistroBruto[] {
  const linhas = conteudo
    .split(/\r?\n/)
    .filter((linha) => linha.trim().length > 0);
  if (linhas.length === 0) return [];

  const header = linhas[0].split("\t").map((coluna) => coluna.trim());
  return linhas.slice(1).map((linha) => {
    const celulas = linha.split("\t");
    const registro: RegistroBruto = {};
    header.forEach((coluna, indice) => {
      registro[coluna] = (celulas[indice] ?? "").trim();
    });
    return registro;
  });
}

export function normalizarEmail(valor: string): string {
  return valor.trim().toLowerCase();
}

/** "Maristela  seefeld" -> "Maristela Seefeld". */
export function normalizarNome(valor: string): string {
  return valor
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((palavra) =>
      palavra.length === 0
        ? palavra
        : palavra[0].toLocaleUpperCase("pt-BR") +
          palavra.slice(1).toLocaleLowerCase("pt-BR"),
    )
    .join(" ");
}

/** "+55 (47) 98420-1791" -> "+5547984201791". Comprimento fora de 10/11 dígitos
    vira vazio: nunca inventar número de telefone. */
export function normalizarTelefone(valor: string): string {
  let digitos = valor.replace(/\D/g, "");
  if (digitos.length > 11 && digitos.startsWith("55")) {
    digitos = digitos.slice(2);
  }
  if (digitos.length !== 10 && digitos.length !== 11) return "";
  return `+55${digitos}`;
}

/** Aplica as regras a um lote, deduplicando por e-mail (a primeira ocorrência vence). */
export function normalizarBase(registros: RegistroBruto[]): ResultadoNormalizacao {
  const leads: Lead[] = [];
  const vistos = new Set<string>();
  let invalidos = 0;
  let duplicados = 0;

  for (const registro of registros) {
    const email = normalizarEmail(registro.Email ?? "");

    if (!isEmailValido(email)) {
      invalidos += 1;
      continue;
    }
    if (vistos.has(email)) {
      duplicados += 1;
      continue;
    }
    vistos.add(email);

    const telefoneBruto =
      (registro.Telefone ?? "").trim() || (registro.Celular ?? "").trim();

    leads.push({
      email,
      nome: normalizarNome(registro.Nome ?? ""),
      whatsapp: normalizarTelefone(telefoneBruto),
      cidade: (registro.Cidade ?? "").trim(),
    });
  }

  return { leads, invalidos, duplicados, total: registros.length };
}

function escaparCampo(valor: string): string {
  return /[",\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor;
}

export const COLUNAS_BREVO = [
  "EMAIL",
  "NOME",
  "WHATSAPP",
  "CIDADE",
  "ORIGEM",
  "IMPORTADO_EM",
] as const;

/** CSV UTF-8 pronto para o import do Brevo. Telefone vai no atributo texto
    WHATSAPP, nunca no campo SMS (que valida E.164 e rejeita a linha inteira). */
export function paraCsvBrevo(leads: Lead[], importadoEm: string): string {
  const linhas = [COLUNAS_BREVO.join(",")];
  for (const lead of leads) {
    linhas.push(
      [
        lead.email,
        lead.nome,
        lead.whatsapp,
        lead.cidade,
        "rd-station",
        importadoEm,
      ]
        .map(escaparCampo)
        .join(","),
    );
  }
  return `${linhas.join("\n")}\n`;
}
