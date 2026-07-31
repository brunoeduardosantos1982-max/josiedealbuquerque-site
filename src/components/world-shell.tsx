import Link from "next/link";
import { AssinaturaJ, BrandLockup } from "@/components/logo";

type NavItem = { label: string; href: string };

/* Regra do projeto: cada mundo tem navegação própria e NUNCA expõe o outro.
   A ponte de volta é só o logo (raiz).

   `chrome` decide como o cabeçalho se comporta:
   - "solid" (padrão): barra com fundo e borda, empurrando o conteúdo para baixo.
   - "float": pílulas flutuando POR CIMA do conteúdo, sem fundo de barra. É o que
     permite o hero de vídeo ocupar a tela inteira desde o topo. */
export function WorldShell({
  world,
  nav,
  cta,
  chrome = "solid",
  children,
}: {
  world: "neutral" | "mentoria" | "empresas";
  nav: NavItem[];
  cta?: NavItem;
  chrome?: "solid" | "float";
  children: React.ReactNode;
}) {
  const worldClass =
    world === "mentoria"
      ? "world-mentoria"
      : world === "empresas"
        ? "world-empresas"
        : "";

  return (
    <div className={`flex min-h-screen flex-col bg-bg text-fg ${worldClass}`}>
      {chrome === "float" ? (
        <header className="absolute inset-x-0 top-0 z-20">
          <nav className="flex items-center justify-center gap-2 px-4 pt-4 sm:gap-3 sm:px-8 sm:pt-6">
            <Link
              aria-label="Josie de Albuquerque, página inicial"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/5 bg-bege/90 text-brand shadow-sm backdrop-blur-md transition hover:bg-bege sm:h-11 sm:w-11"
              href="/"
            >
              <AssinaturaJ className="h-5 w-auto" />
            </Link>
            <div className="flex items-center gap-4 rounded-xl border border-black/5 bg-bege/90 px-4 py-2.5 shadow-sm backdrop-blur-md sm:gap-8 sm:px-8 sm:py-3">
              {nav.map((item) => (
                <Link
                  className="text-[12px] font-medium text-muted transition-colors duration-200 hover:text-brand sm:text-[14px]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              {cta ? (
                <Link
                  className="text-[12px] font-semibold text-brand transition-colors duration-200 hover:opacity-70 sm:text-[14px]"
                  href={cta.href}
                >
                  {cta.label}
                </Link>
              ) : null}
            </div>
          </nav>
        </header>
      ) : (
        <header className="border-b border-line">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
            <BrandLockup compact />
            <nav className="flex items-center gap-1 sm:gap-2">
              {nav.map((item) => (
                <Link
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-brand"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              {cta ? (
                <Link
                  className="btn-brand ml-1 px-4 py-2 text-sm"
                  href={cta.href}
                >
                  {cta.label}
                </Link>
              ) : null}
            </nav>
          </div>
        </header>
      )}
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Josie de Albuquerque | desenvolvimento humano</p>
          <p className="text-xs">
            © {new Date().getFullYear()} · josiedealbuquerque.com.br
          </p>
        </div>
      </footer>
    </div>
  );
}
