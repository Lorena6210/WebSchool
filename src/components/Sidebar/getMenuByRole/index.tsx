// src/components/BasePage/index.tsx  // Assuming this is the file path based on context
import React from "react";
import { useRouter } from "next/router";  // Changed to "next/router" for Pages Router compatibility
import { getMenuByRole, Role } from "../index";  // Corrected path to lib/menu.ts; removed duplicate import
import Navbar from "../views/index";  // Assuming Navbar is in src/components/Navbar/index.tsx; adjust if path differs

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface LayoutProps {
  usuario: Usuario;
  children: React.ReactNode;
}

export default function Layout({ usuario, children }: LayoutProps) {
  const router = useRouter();
  const menuItems = getMenuByRole(usuario.Role as Role, usuario.Id, router);  // Fixed: Added userId and cast Role; matches lib/menu.ts signature

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar no TOPO */}
      <Navbar usuario={usuario} menuItems={menuItems} />

      {/* Conteúdo */}
      <main
        style={{
          flex: 1,
          padding: "24px 16px",
          background: "#f4f9fb",
          display: "flex",
          justifyContent: "center",
          width: "1024px",  // Fixed: Added quotes for string value
        }}
      >
        <div style={{ width: "100%", maxWidth: "1024px", flexDirection: "column" }}>
          {children}
        </div>
      </main>
    </div>
  );
}