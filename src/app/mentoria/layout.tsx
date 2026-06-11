import { WorldShell } from "@/components/world-shell";

export default function MentoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorldShell
      cta={{ label: "Fazer o diagnóstico", href: "/mentoria/quiz" }}
      nav={[
        { label: "Início", href: "/mentoria" },
        { label: "O guia", href: "/mentoria/guia" },
      ]}
      world="mentoria"
    >
      {children}
    </WorldShell>
  );
}
