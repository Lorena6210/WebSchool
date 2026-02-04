import React from 'react';

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
    <aside
      style={{
        position: 'static',
        margin: '-20px auto',
        marginLeft: '-10px',
        width: 260,
        maxHeight: '100vh',
        background: 'linear-gradient(180deg, #007f5f 0%, #38b6ff 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        borderRadius: '0 24px 24px 0',
        padding: '0 0 16px 0',
        overflowY: 'auto',
      }}
    >
      {/* Topo - Avatar e Nome */}
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '36px 0 12px 0'
        }}>
          {/* Avatar animado */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            boxShadow: '0 2px 12px rgba(56,182,255,0.15)',
            animation: 'floatY 3s ease-in-out infinite alternate'
          }}>
            <svg width="54" height="54" viewBox="0 0 199 202" fill="none">
              <path d="M99.5 0C44.576 0 0 45.248 0 101C0 156.752 44.576 202 99.5 202C154.424 202 199 156.752 199 101C199 45.248 154.424 0 99.5 0ZM99.5 30.3C116.017 30.3 129.35 43.834 129.35 60.6C129.35 77.366 116.017 90.9 99.5 90.9C82.983 90.9 69.65 77.366 69.65 60.6C69.65 43.834 82.983 30.3 99.5 30.3ZM99.5 173.72C74.625 173.72 52.6355 160.792 39.8 141.198C40.0985 121.099 79.6 110.09 99.5 110.09C119.3 110.09 158.902 121.099 159.2 141.198C146.365 160.792 124.375 173.72 99.5 173.72Z" fill="white"/>
            </svg>
          </div>
          <span style={{
            fontWeight: 'bold',
            fontSize: '1.15rem',
            letterSpacing: '-1px',
            marginTop: '2px'
          }}>{usuario.Nome}</span>
        </div>
        {/* Navegação */}
        <nav style={{ marginTop: "18px" }}>
          {menuItems.slice(0, -3).map((item, index) => (  // Itens principais (excluindo os últimos 3, que são ações)
            <SidebarItem key={index} icon={item.icon} label={item.label} onClick={item.onClick} />
          ))}
        </nav>
      </div>

      {/* Rodapé - Ações (últimos 3 itens) */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.13)",
        marginTop: "18px",
        paddingTop: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
      }}>
        {menuItems.slice(-3).map((item, index) => (  // Últimos 3 itens como ações
          <SidebarItem key={index} icon={item.icon} label={item.label} onClick={item.onClick} />
        ))}
      </div>

      {/* Animação flutuante */}
      <style>{`
        @keyframes floatY {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        .sidebar-btn:hover, .sidebar-btn:focus {
          background-color: rgba(255,255,255,0.13) !important;
          outline: none;
        }
      `}</style>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="sidebar-btn"
      onClick={onClick}
      tabIndex={0}
      style={{
        width: "92%",
        margin: "6px auto",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px",
        borderRadius: "10px",
        background: "none",
        border: "none",
        color: "inherit",
        fontWeight: "500",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background .18s",
        outline: "none"
      }}
    >
      <span style={{ fontSize: "1.25em", display: "flex", alignItems: "center" }}>{icon}</span>
      {label}
    </button>
  );
}