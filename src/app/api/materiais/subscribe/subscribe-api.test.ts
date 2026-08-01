import { afterEach, describe, expect, it, vi } from "vitest";

import { POST as subscribePOST } from "./route";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function postSubscribe(body: unknown) {
  return subscribePOST(
    new Request("https://example.com/api/materiais/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

const VALIDO = {
  email: "lead@exemplo.com",
  nome: "Maristela",
  empresa: "Acme",
  cargo: "RH",
  material: "checklist-nr1",
  consentimento: true,
};

describe("materiais subscribe", () => {
  it("rejeita e-mail invalido com 400 e nao chama o Brevo", async () => {
    const fetchMock = vi.fn(async () => Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    const response = await postSubscribe({ ...VALIDO, email: "naoeumemail" });

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejeita sem consentimento com 400 (LGPD)", async () => {
    const fetchMock = vi.fn(async () => Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    const response = await postSubscribe({ ...VALIDO, consentimento: false });

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejeita sem material com 400", async () => {
    const fetchMock = vi.fn(async () => Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    const response = await postSubscribe({ ...VALIDO, material: "" });

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sem envs do Brevo libera o material sem gravar", async () => {
    vi.stubEnv("BREVO_API_KEY", "");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "");
    const fetchMock = vi.fn(async () => Response.json({}));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    const response = await postSubscribe(VALIDO);
    const data = (await response.json()) as { ok: boolean; stored: boolean };

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.stored).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("grava no Brevo na lista de materiais com os atributos do lead", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    let capturado: { url: RequestInfo | URL; init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { url, init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    const response = await postSubscribe(VALIDO);
    const data = (await response.json()) as { ok: boolean; stored: boolean };
    const chamada = capturado as unknown as { url: RequestInfo | URL; init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as {
      email: string;
      listIds?: number[];
      attributes?: Record<string, string>;
    };

    expect(response.status).toBe(200);
    expect(data.stored).toBe(true);
    expect(String(chamada.url)).toBe("https://api.brevo.com/v3/contacts");
    expect(body.email).toBe("lead@exemplo.com");
    expect(body.listIds).toEqual([7]);
    expect(body.attributes?.MATERIAL).toBe("checklist-nr1");
    expect(body.attributes?.MATERIAL_URL).toContain("/materiais/checklist-nr1.pdf");
    expect(body.attributes?.NOME).toBe("Maristela");
    expect(body.attributes?.EMPRESA).toBe("Acme");
    expect(typeof body.attributes?.CONSENT_EM).toBe("string");
  });

  it("falha do Brevo nao trava a entrega: 200 com stored false", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    const fetchMock = vi.fn(async () => new Response("erro", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await postSubscribe(VALIDO);
    const data = (await response.json()) as { ok: boolean; stored: boolean };

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.stored).toBe(false);
  });

  it("com template configurado dispara tambem o e-mail transacional", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    vi.stubEnv("BREVO_ENTREGA_TEMPLATE_ID", "3");
    const urls: string[] = [];
    const fetchMock = vi.fn(async (url: RequestInfo | URL) => {
      urls.push(String(url));
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    const response = await postSubscribe(VALIDO);

    expect(response.status).toBe(200);
    expect(urls).toContain("https://api.brevo.com/v3/contacts");
    expect(urls).toContain("https://api.brevo.com/v3/smtp/email");
  });

  it("material do mundo Mentoria vai para a lista B2C, nunca para a de materiais B2B", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    vi.stubEnv("BREVO_LIST_B2C", "4");
    let capturado: { init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    const response = await postSubscribe({
      email: "leitora@exemplo.com",
      nome: "Ana",
      material: "caderno-do-caos-ao-equilibrio",
      audience: "b2c",
      consentimento: true,
    });
    const chamada = capturado as unknown as { init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as { listIds?: number[] };

    expect(response.status).toBe(200);
    expect(body.listIds).toEqual([4]);
    expect(body.listIds).not.toContain(7);
  });

  it("sem audience continua indo para a lista de materiais do mundo Empresas", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    vi.stubEnv("BREVO_LIST_B2C", "4");
    let capturado: { init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    await postSubscribe(VALIDO);
    const chamada = capturado as unknown as { init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as { listIds?: number[] };

    expect(body.listIds).toEqual([7]);
  });

  it("grava CIDADE, o atributo que a base herdada nunca teve", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_B2C", "4");
    let capturado: { init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    await postSubscribe({
      email: "leitora@exemplo.com",
      nome: "Ana",
      cidade: "Blumenau",
      material: "caderno-do-caos-ao-equilibrio",
      audience: "b2c",
      consentimento: true,
    });
    const chamada = capturado as unknown as { init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as {
      attributes?: Record<string, string>;
    };

    expect(body.attributes?.CIDADE).toBe("Blumenau");
    expect(body.attributes?.NOME).toBe("Ana");
  });

  it("grava ESTAGIO, que e o que separa lead frio de lead quente", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_B2C", "3");
    let capturado: { init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    await postSubscribe({
      email: "quente@exemplo.com",
      nome: "Ana",
      cidade: "Blumenau",
      material: "caderno-do-caos-ao-equilibrio",
      audience: "b2c",
      estagio: "quiz",
      consentimento: true,
    });
    const chamada = capturado as unknown as { init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as {
      attributes?: Record<string, string>;
      updateEnabled?: boolean;
    };

    expect(body.attributes?.ESTAGIO).toBe("quiz");
    // updateEnabled e o que permite o contato SUBIR de material para quiz.
    expect(body.updateEnabled).toBe(true);
  });

  it("sem estagio nao inventa valor no atributo", async () => {
    vi.stubEnv("BREVO_API_KEY", "xkeysib-test");
    vi.stubEnv("BREVO_LIST_MATERIAIS", "7");
    let capturado: { init?: RequestInit } | null = null;
    const fetchMock = vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
      capturado = { init };
      return Response.json({ id: 1 }, { status: 201 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    await postSubscribe(VALIDO);
    const chamada = capturado as unknown as { init: RequestInit };
    const body = JSON.parse(String(chamada.init.body)) as {
      attributes?: Record<string, string>;
    };

    expect(body.attributes?.ESTAGIO).toBeUndefined();
  });

  it("corpo que nao e json devolve 400", async () => {
    const fetchMock = vi.fn(async () => Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    const response = await subscribePOST(
      new Request("https://example.com/api/materiais/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "nao é json",
      }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
