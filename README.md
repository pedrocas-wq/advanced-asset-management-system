# AAMS - AirPlus Aircraft Management System

Um sistema avançado de gerenciamento de ativos desenvolvido com React, TypeScript e Vite. O sistema oferece funcionalidades completas para controle de ativos, relatórios, turnos e configurações, com suporte a múltiplos idiomas e modo offline.

## ✨ Funcionalidades

### 🔐 Autenticação
- Login seguro com validação
- Registro de novos usuários
- Recuperação de senha
- Proteção de rotas
- Auditoria de ações do usuário

### 📊 Dashboard
- Visão geral dos ativos
- Gráficos e métricas em tempo real
- Indicadores de performance
- Resumo de atividades recentes

### 📈 Relatórios
- Relatórios detalhados de ativos
- Exportação em múltiplos formatos
- Filtros avançados
- Visualizações customizáveis

### ⏰ Gerenciamento de Turnos
- Controle de turnos de trabalho
- Histórico de atividades
- Atribuição de responsabilidades

### ⚙️ Configurações
- Configurações do sistema
- Preferências do usuário
- Gerenciamento de perfis
- Configurações de notificações

### 🌐 Recursos Adicionais
- **PWA**: Funciona como aplicativo nativo
- **Offline**: Sincronização automática quando online
- **i18n**: Suporte a português e inglês
- **Responsivo**: Interface adaptável a todos os dispositivos
- **Auditoria**: Rastreamento completo de ações

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **i18next** for internationalization
- **Dexie.js** for offline storage and sync
- **Lucide React** for icons

### Backend
- **Supabase** (PostgreSQL + Auth + Storage + Functions)
- **Row Level Security (RLS)** for data isolation
- **Real-time subscriptions** for live updates

### DevOps
- **GitHub Actions** for CI/CD
- **Netlify** for hosting and serverless functions
- **ESLint** for code quality

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Netlify account (for deployment)
- Git

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd aams
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required environment variables:
```env
# Get these from your Supabase project dashboard
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_ENV=development
```

### 3. Database Setup

You need to set up Supabase for the backend:

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Click "Connect to Supabase" in the app's top-right corner
3. Run the database migration:
   ```sql
   -- Execute the contents of supabase/migrations/create_initial_tables.sql
   -- in your Supabase SQL editor
   ```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Sidebar)
│   ├── auth/            # Authentication components
│   └── dashboard/       # Dashboard components
├── pages/               # Page components
├── services/
│   ├── supabase/        # Supabase client and auth
│   ├── offline/         # Dexie and sync logic
│   └── i18n/            # Internationalization
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🔑 Default Credentials

For development, you can create a test account or use OAuth providers (Google).

Default roles available:
- **admin**: Full system access
- **supervisor**: Management access
- **technician**: Operational access
- **viewer**: Read-only access

## 🌍 Internationalization

The system supports Portuguese and English:

- Language files: `src/services/i18n/locales/`
- Automatic language detection based on browser settings
- Manual language switching via header toggle

## 📱 PWA Features

- **Installable**: Can be installed on desktop and mobile
- **Offline capable**: Full functionality when offline
- **Background sync**: Automatic data sync when connection resumes
- **Push notifications**: (Ready for implementation)

## 🔐 Security Features

- **Row Level Security (RLS)** on all database tables
- **Role-based access control** with granular permissions
- **Client data isolation** - users only see their organization's data
- **Comprehensive audit logging** for all critical operations
- **Secure authentication** with Supabase Auth

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

1. Fork the repository
2. Set up GitHub Secrets:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   NETLIFY_AUTH_TOKEN
   NETLIFY_SITE_ID
   NETLIFY_STAGING_SITE_ID
   ```
3. Push to `main` branch for production or `staging` for staging environment

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Netlify (install netlify-cli first)
npx netlify deploy --prod --dir=dist
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Tests (to be implemented)
npm test
```

## 📊 Monitoring and Analytics

- Error tracking ready (Sentry integration available)
- Performance monitoring built-in
- Comprehensive audit logging
- Real-time system health monitoring

## 🔄 Offline Capabilities

The system includes:
- **Local database** (Dexie.js) for offline storage
- **Automatic synchronization** when connection resumes
- **Conflict resolution** for concurrent edits
- **Queue management** for offline operations
- **Connection status indicators**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**AAMS v1.0.0** - Built with ❤️ for the aviation industry