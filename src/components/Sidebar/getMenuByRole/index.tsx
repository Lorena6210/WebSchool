import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../views";
import { getMenuByRole } from "../index";

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
  const menuItems = getMenuByRole(usuario.Role, router);

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
          width:"1024px"
        }}
      >
        <div style={{ width: "100%", maxWidth: "1024px", flexDirection:"column" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
