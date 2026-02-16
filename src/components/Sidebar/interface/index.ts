export interface Usuario {
    Nome: string;
    Id: number;
}

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void
}

export interface Navbar {
    usuario: string;
    MenuItem?: MenuItem[];
}

export interface SidebarProps {
    role: Role;
    userId: number;
}