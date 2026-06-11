import { WorldShell } from "@/components/world-shell";

export default function EmpresasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorldShell
      cta={{ label: "Agendar diagnóstico", href: "/empresas/contato" }}
      nav={[
        { label: "Soluções", href: "/empresas" },
        { label: "NR-1", href: "/empresas/nr1" },
      ]}
      world="empresas"
    >
      {children}
    </WorldShell>
  );
}
