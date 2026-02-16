// src/components/Sidebar/views/index.tsx
import React from "react";
import { useRouter } from "next/router";  // Use "next/router" for Pages Router compatibility
import { getMenuByRole, Role } from "../index";  // Adjust path to lib/menu.ts as needed
import { FaClipboardList } from "react-icons/fa";  // Added import for FaClipboardList if used in custom menus

interface SidebarProps {
  role: Role;
  userId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ role, userId }) => {
  const router = useRouter();  // Initialize router here to ensure it's defined
  const menuItems = getMenuByRole(role, userId, router);  // Pass the router instance

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <button key={index} onClick={item.onClick}>
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

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
  menuItems?: MenuItem[];  // Made optional to prevent undefined errors
}

export default function Navbar({ usuario, menuItems = [] }: NavbarProps) {  // Default to empty array
  // Separar menus principais e ações (últimos 3)
  const mainMenus = menuItems.slice(0, -3);
  const actionMenus = menuItems.slice(-3);

  return (
    <header className="navbar-root">
      {/* Esquerda - Avatar + Nome */}
      <div className="navbar-user">
        <div className="navbar-avatar">
          <svg width="28" height="28" viewBox="0 0 199 202" fill="none">
            <circle cx="99.5" cy="101" r="101" fill="#fff" />
          </svg>
        </div>
        <span className="navbar-username">{usuario.Nome}</span>
      </div>

      {/* Centro - Navegação principal */}
      <nav className="navbar-menu">
        {mainMenus.map((item, idx) => (
          <MenuButton key={idx} icon={item.icon} label={item.label} onClick={item.onClick} />
        ))}
      </nav>

      {/* Direita - Ações */}
      <div className="navbar-actions">
        {actionMenus.map((item, idx) => (
          <MenuButton key={idx} icon={item.icon} label={item.label} onClick={item.onClick} />
        ))}
      </div>

      {/* Estilos */}
      <style jsx>{`
        .navbar-root {
          width: 100%;
          position: static;
          height: 72px;
          background: linear-gradient(90deg, #007f5f 0%, #38b6ff 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.13);
          z-index: 10;
        }
        .navbar-user {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .navbar-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floatY 3s ease-in-out infinite alternate;
        }
        .navbar-username {
          font-size: 1.08rem;
          font-weight: bold;
          letter-spacing: .01em;
        }
        .navbar-menu,
        .navbar-actions {
          display: flex;
          gap: 8px;
        }
        @keyframes floatY {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }
      `}</style>
    </header>
  );
}

// Botão de menu com label que aparece no hover
function MenuButton({
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
      className="menu-btn"
      onClick={onClick}
      title={label}
      tabIndex={0}
    >
      <span className="menu-icon">{icon}</span>
      <span className="menu-label">{label}</span>
      <style jsx>{`
        .menu-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 1.08rem;
          font-weight: 500;
          position: relative;
          transition: background .18s, box-shadow .18s;
          box-shadow: none;
        }
        .menu-btn:hover,
        .menu-btn:focus-visible {
          background: rgba(255,255,255,0.13);
          box-shadow: 0 2px 8px rgba(56,182,255,.09);
        }
        .menu-icon {
          font-size: 1.45em;
          display: flex;
        }
        .menu-label {
          opacity: 0;
          max-width: 0px;
          overflow: hidden;
          white-space: nowrap;
          margin-left: -4px;
          transition:
            opacity .22s cubic-bezier(.4,.2,.2,1),
            max-width .22s cubic-bezier(.4,.2,.2,1),
            margin-left .22s cubic-bezier(.4,.2,.2,1);
        }
        .menu-btn:hover .menu-label,
        .menu-btn:focus-visible .menu-label {
          opacity: 1;
          max-width: 180px;
          margin-left: 8px;
        }
      `}</style>
    </button>
  );
}

export { Sidebar };  // Export Sidebar if needed