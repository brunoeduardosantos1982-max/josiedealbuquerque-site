import { WorldShell } from "@/components/world-shell";

export default function MentoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorldShell
      chrome="float"
      cta={{
        label: "Fazer o diagnóstico",
        labelCurto: "Diagnóstico",
        href: "/mentoria/quiz",
      }}
      nav={[
        { label: "Início", href: "/mentoria" },
        { label: "O caderno", href: "/mentoria/guia" },
      ]}
      world="mentoria"
    >
      {children}
    </WorldShell>
  );
}
