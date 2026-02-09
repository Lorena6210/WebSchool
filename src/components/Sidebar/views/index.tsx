import React from "react";

interface Usuario {
  Nome: string;
  Id: number;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface NavbarProps {
  usuario: Usuario;
  menuItems: MenuItem[];
}

export default function Navbar({ usuario, menuItems }: NavbarProps) {
  return (
    <header
      style={{
        maxWidth: "1024vh",
        width: "100%",
        position:"static",
        marginTop:"-8px",
        marginRight:"0px",
        // justifyContent: "center",
        height: 72,
        background: "linear-gradient(90deg, #007f5f 0%, #38b6ff 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      }}
    >
      {/* Esquerda - Avatar + Nome */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "floatY 3s ease-in-out infinite alternate",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 199 202" fill="none">
            <path
              d="M99.5 0C44.576 0 0 45.248 0 101C0 156.752 44.576 202 99.5 202C154.424 202 199 156.752 199 101C199 45.248 154.424 0 99.5 0Z"
              fill="white"
            />
          </svg>
        </div>

        <strong style={{ fontSize: "1.05rem" }}>{usuario.Nome}</strong>
      </div>

      {/* Centro - Navegação principal */}
      <nav style={{ display: "flex", gap: 8 }}>
        {menuItems.slice(0, -3).map((item, index) => (
          <TopItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </nav>

      {/* Direita - Ações */}
      <div style={{ display: "flex", gap: 6 }}>
        {menuItems.slice(-3).map((item, index) => (
          <TopItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </div>

      {/* Estilos globais */}
      <style>{`
        @keyframes floatY {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }
        .top-btn:hover {
          background: rgba(255,255,255,0.18);
        }
      `}</style>
    </header>
  );
}

function TopItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="top-btn"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 8,
        background: "none",
        border: "none",
        color: "inherit",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "background .2s",
      }}
    >
      <span style={{ fontSize: "1.1em" }}>{icon}</span>
      {label}
    </button>
  );
}
