import Link from "next/link";
import { BrandLockup } from "@/components/logo";

type NavItem = { label: string; href: string };

/* Regra do projeto: cada mundo tem navegação própria e NUNCA expõe o outro.
   A ponte de volta é só o logo (raiz). */
export function WorldShell({
  world,
  nav,
  cta,
  children,
}: {
  world: "neutral" | "mentoria" | "empresas";
  nav: NavItem[];
  cta?: NavItem;
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
