import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_VALIDO = /^[a-z0-9-]+$/;

export type PostMeta = {
  slug: string;
  titulo: string;
  data: string; // ISO YYYY-MM-DD
  categoria: string;
  resumo: string;
  imagem: string;
  material?: string;
  materialTitulo?: string;
};

export type Post = { meta: PostMeta; html: string };

// YAML sem aspas parseia datas como Date; normalizamos para string ISO.
function normalizarData(valor: unknown): string {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10);
  return String(valor ?? "");
}

function textoOpcional(valor: unknown): string | undefined {
  return typeof valor === "string" && valor.length > 0 ? valor : undefined;
}

export function parsePost(raw: string, slug: string): Post {
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    titulo: String(data.titulo ?? ""),
    data: normalizarData(data.data),
    categoria: String(data.categoria ?? ""),
    resumo: String(data.resumo ?? ""),
    imagem: String(data.imagem ?? ""),
    material: textoOpcional(data.material),
    materialTitulo: textoOpcional(data.materialTitulo),
  };
  const html = marked.parse(content, { async: false }) as string;
  return { meta, html };
}

export function listarPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((arquivo) => arquivo.endsWith(".md"))
    .map((arquivo) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, arquivo), "utf8");
      return parsePost(raw, arquivo.replace(/\.md$/, "")).meta;
    })
    .sort((a, b) => (a.data < b.data ? 1 : -1));
}

export function lerPost(slug: string): Post | null {
  if (!SLUG_VALIDO.test(slug)) return null;
  const arquivo = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(arquivo)) return null;
  return parsePost(fs.readFileSync(arquivo, "utf8"), slug);
}

export function formatarDataPt(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split("-").map(Number);
  if (!ano || !mes || !dia) return dataIso;
  const rotulo = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(ano, mes - 1, dia));
  return rotulo.charAt(0).toUpperCase() + rotulo.slice(1);
}
