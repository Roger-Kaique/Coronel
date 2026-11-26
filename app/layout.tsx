import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coronel do Corte — Barbearia",
  description:
    "Coronel do Corte. Uma experiência de barbearia feita de presença, precisão e personalidade.",
  openGraph: {
    title: "Coronel do Corte — Barbearia",
    description: "Presença em cada detalhe. Agende seu horário.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
