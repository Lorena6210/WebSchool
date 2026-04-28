# WebSchool — Plataforma Educacional

Uma plataforma educacional completa para alunos, professores, responsáveis e gestores escolares, construída com Next.js 15, React 19 e TailwindCSS 4.

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| **Next.js** | 15 (App Router) | Framework principal |
| **React** | 19 | Interface de usuário |
| **TypeScript** | 5.7 | Tipagem estática |
| **TailwindCSS** | 4 | Estilização |
| **Lucide React** | 0.475 | Ícones |
| **Recharts** | 2.15 | Gráficos |
| **Sonner** | 1.7 | Notificações toast |

## Design

O projeto utiliza o estilo **Academic Warmth** — uma abordagem Neobrutalist suave com:

- Fundo creme (`#FDFAF5`) e tinta escura (`#1C1917`)
- Bordas sólidas e sombras offset (neobrutalism)
- Fontes: **Fraunces** (display) + **DM Sans** (corpo) + **Space Mono** (mono)
- Cores por perfil: Aluno (roxo), Responsável (âmbar), Professor (verde), Gestor (azul-índigo)

## Perfis de Usuário

| Perfil | Cor | Funcionalidades |
|---|---|---|
| **Aluno** | `#6B21A8` | Dashboard, Boletim, Atividades, Calendário, Histórico Médico |
| **Responsável** | `#B45309` | Dashboard, Boletim do filho, Avisos, Calendário |
| **Professor** | `#166534` | Dashboard, Atividades, Provas, Calendário |
| **Gestor** | `#3B4FD8` | Dashboard completo, Usuários, Relatórios, Calendário, Horários |

## Contas de Demonstração

| Perfil | Identificador | Senha |
|---|---|---|
| Aluno | `2024001` | `aluno123` |
| Responsável | `maria.ferreira@email.com` | `resp123` |
| Professor | `carlos.mendes@escola.edu.br` | `prof123` |
| Gestor | `ana.paula@escola.edu.br` | `gestor123` |

## Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raiz (providers)
│   ├── page.tsx            # Página inicial (redireciona por perfil)
│   ├── login/page.tsx      # Página de login
│   └── mural/              # Rotas protegidas por perfil
│       ├── aluno/page.tsx
│       ├── professor/page.tsx
│       ├── responsavel/page.tsx
│       └── gestor/page.tsx
├── components/             # Componentes reutilizáveis
│   ├── DashboardLayout.tsx # Layout com sidebar + header responsivo
│   ├── ProtectedRoute.tsx  # Proteção de rotas por perfil
│   ├── ErrorBoundary.tsx   # Tratamento de erros
│   └── ui/                 # Componentes de UI (shadcn-style)
├── lib/
│   ├── context/            # Contextos React
│   │   ├── AuthContext.tsx # Autenticação (login/logout com mock)
│   │   └── ThemeContext.tsx# Tema (claro/escuro)
│   ├── mockData.ts         # Dados de demonstração
│   └── utils.ts            # Utilitários (cn, etc.)
├── features/               # Componentes de página por perfil
│   ├── aluno/
│   │   └── DashboardAluno.tsx
│   ├── professor/
│   │   └── DashboardProfessor.tsx
│   ├── responsavel/
│   │   ├── DashboardResponsavel.tsx
│   │   ├── BoletimResponsavel.tsx
│   │   └── Avisos.tsx
│   ├── gestor/
│   │   ├── DashboardGestor.tsx
│   │   ├── GerenciarUsuarios.tsx
│   │   ├── GerenciarAtividades.tsx
│   │   ├── Relatorios.tsx
│   │   ├── CriarCalendario.tsx
│   │   └── CriarHorarios.tsx
│   └── auth/
│       └── Login.tsx
└── types/
    ├── index.ts            # Re-exportações
    └── user.ts             # Tipos principais (User, Grade, Activity, etc.)
```

## Como Executar

```bash
# Instalar dependências
npm install
# ou
yarn install
# ou
pnpm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
