import type { Metadata } from "next";
import ClientOnlyToaster from "../components/ClientOnlyToaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebSchool — Plataforma Educacional",
  description:
    "Plataforma educacional completa para alunos, professores, responsáveis e gestores escolares.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeRegistry>
            <ThemeProvider defaultTheme="light">
              <AuthProvider>
                <TooltipProvider>
                   {/* <ClientOnlyToaster position="top-right" richColors /> */}
                  {children}
                </TooltipProvider>
              </AuthProvider>
            </ThemeProvider>
          </ThemeRegistry>
        </ErrorBoundary>
      </body>
    </html>
  );
}