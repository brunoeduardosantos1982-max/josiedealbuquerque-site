/* Captura de leads de material rico (lead magnet) do mundo Empresas / NR-1.
   Isolada do /api/lead (que trata contato comercial). Best-effort e env-gated:
   sem BREVO_API_KEY o material é liberado mesmo assim; nada é gravado sem
   consentimento (LGPD). */

import { isEmailValido } from "@/lib/validacao";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";
const SITE = "https://www.josiedealbuquerque.com.br";

type SubscribePayload = {
  email?: unknown;
  nome?: unknown;
  empresa?: unknown;
  cargo?: unknown;
  telefone?: unknown;
  material?: unknown;
  consentimento?: unknown;
};

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor.trim() : "";
}

export async function POST(request: Request) {
  let payload: SubscribePayload;
  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return Response.json({ ok: false, error: "json" }, { status: 400 });
  }

  const email = texto(payload.email);
  const nome = texto(payload.nome);
  const empresa = texto(payload.empresa);
  const cargo = texto(payload.cargo);
  const telefone = texto(payload.telefone);
  const material = texto(payload.material);
  const consentimento = payload.consentimento === true;

  if (!isEmailValido(email)) {
    return Response.json({ ok: false, error: "email" }, { status: 400 });
  }
  // LGPD: sem consentimento explícito não grava nada.
  if (!consentimento) {
    return Response.json({ ok: false, error: "consentimento" }, { status: 400 });
  }
  if (!material) {
    return Response.json({ ok: false, error: "material" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = Number(process.env.BREVO_LIST_MATERIAIS);

  console.log({
    event: "material_recebido",
    material,
    brevo: Boolean(apiKey && Number.isFinite(listId)),
  });

  // Falha de config ou do Brevo NÃO trava a entrega (o front libera o material).
  if (!apiKey || !Number.isFinite(listId)) {
    return Response.json({ ok: true, stored: false });
  }

  const materialUrl = `${SITE}/materiais/${material}.pdf`;
  const attributes: Record<string, string> = {
    MATERIAL: material,
    MATERIAL_URL: materialUrl,
    CONSENT_EM: new Date().toISOString(),
  };
  if (nome) attributes.NOME = nome;
  if (empresa) attributes.EMPRESA = empresa;
  if (cargo) attributes.CARGO = cargo;
  if (telefone) attributes.TELEFONE = telefone;

  try {
    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes,
        listIds: [listId],
      }),
    });

    if (!response.ok && response.status !== 204) {
      const body = await response.text();
      console.error({
        event: "material_brevo_erro",
        status: response.status,
        body: body.slice(0, 300),
      });
      return Response.json({ ok: true, stored: false });
    }
  } catch (error) {
    console.error({ event: "material_brevo_excecao", error: String(error) });
    return Response.json({ ok: true, stored: false });
  }

  // E-mail transacional de entrega (best-effort; só se o template estiver setado).
  const templateId = Number(process.env.BREVO_ENTREGA_TEMPLATE_ID);
  if (Number.isFinite(templateId)) {
    try {
      await fetch(BREVO_EMAIL_URL, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [{ email, name: nome || undefined }],
          templateId,
          params: { NOME: nome, MATERIAL_URL: materialUrl },
        }),
      });
    } catch (error) {
      console.error({ event: "material_email_excecao", error: String(error) });
    }
  }

  return Response.json({ ok: true, stored: true });
}
