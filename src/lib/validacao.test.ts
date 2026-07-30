import { describe, expect, it } from "vitest";

import { isEmailValido } from "./validacao";

describe("isEmailValido", () => {
  it("aceita e-mail comum", () => {
    expect(isEmailValido("josie@exemplo.com.br")).toBe(true);
  });

  it("ignora espaco em volta", () => {
    expect(isEmailValido("  josie@exemplo.com  ")).toBe(true);
  });

  it("recusa endereco sem arroba", () => {
    expect(isEmailValido("josieexemplo.com")).toBe(false);
  });

  it("recusa endereco sem dominio com ponto", () => {
    expect(isEmailValido("josie@exemplo")).toBe(false);
  });

  it("recusa endereco curto demais", () => {
    expect(isEmailValido("a@b.c".slice(0, 4))).toBe(false);
  });

  it("recusa endereco longo demais", () => {
    const local = "a".repeat(250);
    expect(isEmailValido(`${local}@exemplo.com`)).toBe(false);
  });

  it("recusa string vazia", () => {
    expect(isEmailValido("")).toBe(false);
  });
});
