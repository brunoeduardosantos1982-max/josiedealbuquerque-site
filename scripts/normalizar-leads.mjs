/* CLI de normalização da base de leads do RD Station para importação no Brevo.
   Só faz I/O: a lógica (e os testes dela) vive em src/lib/importacao-leads.ts.

   Uso:
     node scripts/normalizar-leads.mjs <entrada.csv> <saida.csv>

   O arquivo de SAÍDA contém PII (e-mail e telefone de pessoas reais) e NUNCA
   deve ser gravado dentro deste repositório. Grave junto da fonte, no vault. */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));

const [, , entrada, saida] = process.argv;

if (!entrada || !saida) {
  console.error("uso: node scripts/normalizar-leads.mjs <entrada.csv> <saida.csv>");
  process.exit(1);
}

const repo = resolve(AQUI, "..");
if (resolve(saida).startsWith(repo)) {
  console.error(
    "recusado: a saida contem PII e nao pode ser gravada dentro do repositorio.",
  );
  process.exit(1);
}

// Node 24 executa TypeScript por type-stripping; nao ha passo de build.
const modulo = await import(
  pathToFileURL(resolve(repo, "src/lib/importacao-leads.ts")).href
);
const { decodificar, parseTsv, normalizarBase, paraCsvBrevo } = modulo;

const buffer = await readFile(entrada);
const registros = parseTsv(decodificar(buffer));
const { leads, invalidos, duplicados, total } = normalizarBase(registros);

const importadoEm = new Date().toISOString().slice(0, 10);
await writeFile(saida, paraCsvBrevo(leads, importadoEm), "utf8");

console.log(
  [
    `lidos:      ${total}`,
    `validos:    ${leads.length}`,
    `invalidos:  ${invalidos}`,
    `duplicados: ${duplicados}`,
    `soma bate:  ${leads.length + invalidos + duplicados === total}`,
    `com whatsapp: ${leads.filter((lead) => lead.whatsapp).length}`,
    `com cidade:   ${leads.filter((lead) => lead.cidade).length}`,
    `saida:      ${saida}`,
  ].join("\n"),
);
