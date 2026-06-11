/* Captura de leads dos DOIS mundos, com listas Brevo SEPARADAS (regra do projeto:
   lead B2C e lead B2B nunca entram na mesma comunicação).
   Env-gated: sem BREVO_API_KEY o endpoint loga e responde ok (site funciona;
   a integração liga quando as chaves da conta Brevo forem configuradas). */

type LeadPayload = {
  audience?: "b2c" | "b2b";
  nome?: string;
  email?: string;
  bloqueio?: string;
  empresa?: string;
  cargo?: string;
  funcionarios?: string;
  telefone?: string;
  desafio?: string;
};

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false, error: "json" }, { status: 400 });
  }

  const audience = payload.audience === "b2b" ? "b2b" : "b2c";
  if (!isValidEmail(payload.email)) {
    return Response.json({ ok: false, error: "email" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId =
    audience === "b2b"
      ? Number(process.env.BREVO_LIST_B2B)
      : Number(process.env.BREVO_LIST_B2C);

  console.log({
    event: "lead_recebido",
    audience,
    bloqueio: payload.bloqueio ?? null,
    brevo: Boolean(apiKey && Number.isFinite(listId)),
  });

  if (!apiKey || !Number.isFinite(listId)) {
    return Response.json({ ok: true, stored: false });
  }

  const attributes: Record<string, string> = {};
  if (payload.nome) attributes.NOME = payload.nome;
  if (audience === "b2c" && payload.bloqueio) {
    attributes.BLOQUEIO = payload.bloqueio;
  }
  if (audience === "b2b") {
    if (payload.empresa) attributes.EMPRESA = payload.empresa;
    if (payload.cargo) attributes.CARGO = payload.cargo;
    if (payload.funcionarios) attributes.FUNCIONARIOS = payload.funcionarios;
    if (payload.telefone) attributes.TELEFONE = payload.telefone;
    if (payload.desafio) attributes.DESAFIO = payload.desafio;
  }

  try {
    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        updateEnabled: true,
        attributes,
        listIds: [listId],
      }),
    });

    if (!response.ok && response.status !== 204) {
      const body = await response.text();
      console.error({
        event: "lead_brevo_erro",
        status: response.status,
        body: body.slice(0, 300),
      });
      return Response.json({ ok: true, stored: false });
    }

    return Response.json({ ok: true, stored: true });
  } catch (error) {
    console.error({ event: "lead_brevo_excecao", error: String(error) });
    return Response.json({ ok: true, stored: false });
  }
}
