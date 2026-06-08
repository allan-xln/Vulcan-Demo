import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vulcan Demo | Inteligência Operacional com IA",
  description: "Demo comercial interativa do Vulcan, uma plataforma SaaS de Inteligência Operacional com IA.",
  icons: {
    icon: "/vulcan-logo.svg",
    shortcut: "/vulcan-logo.svg",
    apple: "/vulcan-logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
