"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent, getThemeText } from "@/lib/theme/roleAccent";

export default function Perfil() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role);
  const palette = getThemeText(isDark);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: palette.primary }}>Perfil</h1>
          <p className="text-sm" style={{ color: palette.secondary }}>
            Dados da sua conta escolar.
          </p>
          <div className="mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: accent }} />
        </div>

        <div
          className="grid gap-4 rounded-xl p-4 sm:grid-cols-2"
          style={{
            backgroundColor: palette.card,
            border: `1px solid ${palette.border}`,
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.35)" : "0 4px 20px rgba(15,39,71,0.1)",
          }}
        >
          <div>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: palette.muted }}
            >
              Nome
            </p>
            <p className="font-semibold" style={{ color: palette.primary }}>{user?.nome ?? "-"}</p>
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: palette.muted }}
            >
              RA
            </p>
            <p className="font-semibold" style={{ color: palette.primary }}>{user?.ra ?? "-"}</p>
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: palette.muted }}
            >
              Turma
            </p>
            <p className="font-semibold" style={{ color: palette.primary }}>{user?.turma ?? "-"}</p>
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: palette.muted }}
            >
              Perfil
            </p>
            <p className="font-semibold capitalize" style={{ color: accent }}>{user?.role ?? "-"}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
