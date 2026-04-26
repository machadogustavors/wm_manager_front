# WM Manager - Frontend

Uma aplicação web moderna de gerenciamento de serviços, desenvolvida com as tecnologias mais atuais do ecossistema React. O projeto oferece autenticação segura, dashboard interativo e gerenciamento completo de dados.

---

## Funcionalidades

### Autenticação & Segurança
- **Login seguro** integrado com AWS Cognito
- **Registro de novos usuários** com validação de dados
- **Confirmação de conta** via email
- **Proteção de rotas** com AuthGuard para acesso restrito
- **Gerenciamento automático de sessão** com refresh de tokens

### Dashboard
- **Visualização de dados** em tempo real
- **Gráficos interativos** com Chart.js e react-chartjs-2
- **Cards informativos** com métricas principais
- **Design responsivo** que se adapta a qualquer dispositivo

### Gerenciador de Serviços
- **Tabela de dados** com suporte a filtros avançados
- **Criação de novos serviços** com formulário intuitivo
- **Visualização e filtro** de informações
- **Interface amigável** para manipulação de dados

### Interface do Usuário
- **Design moderno** com Tailwind CSS + Animações
- **Header e Footer** consistentes em todas as páginas
- **Loader customizado** durante requisições
- **Notificações toast** para feedback do usuário
- **Layout responsivo** e mobile-friendly

---

## Arquitetura & Infraestrutura

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│   React 19 + TypeScript 5.8             │
│   Frontend Framework                    │
├─────────────────────────────────────────┤
│   Vite 6.3 (Build & Dev Server)         │
│   ESLint + TypeScript Linting           │
├─────────────────────────────────────────┤
│   React Router 7.6 (Routing)            │
│   React Query 5.80 (State Management)   │
├─────────────────────────────────────────┤
│   Tailwind CSS 3.3 + Animações          │
│   Styling & Design System               │
├─────────────────────────────────────────┤
│   AWS Cognito + OIDC                    │
│   Autenticação & Segurança              │
├─────────────────────────────────────────┤
│   Axios (HTTP Client)                   │
│   Comunicação com Backend                │
└─────────────────────────────────────────┘
```

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AuthGuard.tsx      # Proteção de rotas
│   ├── Header/            # Cabeçalho da aplicação
│   ├── Footer/            # Rodapé
│   └── Loader/            # Indicador de carregamento
├── pages/               # Páginas da aplicação
│   ├── Login/             # Autenticação
│   ├── Register/          # Registro de usuários
│   ├── ConfirmAccount/    # Confirmação de conta
│   ├── Dashboard/         # Dashboard com gráficos
│   └── Table/             # Gerenciador de serviços
├── layouts/             # Layouts compartilhados
│   ├── AuthLayout.tsx     # Layout para páginas públicas
│   └── MainLayout.tsx     # Layout protegido
├── contexts/            # React Contexts
│   ├── AuthContext.tsx    # Contexto de autenticação
│   └── DataContext.tsx    # Contexto de dados
├── providers/           # Context Providers
│   ├── AuthProvider.tsx
│   └── DataProvider.tsx
├── hooks/               # Custom React Hooks
│   ├── useAuth.ts        # Hook de autenticação
│   └── useData.ts        # Hook de dados
├── services/            # Serviços & APIs
│   ├── httpClient.ts     # Configuração Axios
│   └── servicesData.ts   # Endpoints da API
├── lib/                 # Utilitários
│   └── types.ts         # Tipos TypeScript globais
└── router/              # Configuração de rotas
    └── index.tsx
```

### Fluxo de Dados

```
User Interaction
      ↓
Components (React)
      ↓
Custom Hooks (useAuth, useData)
      ↓
React Query (State Management)
      ↓
Axios HTTP Client
      ↓
AWS API Gateway
      ↓
Backend Services
```

---

## Como Começar

### Pré-requisitos
- **Node.js** >= 18.x
- **npm** ou **yarn**
- Conta **AWS** com Cognito configurado

### Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd wm_manager_front
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
VITE_API_URL=https://sua-api.execute-api.sa-east-1.amazonaws.com/prod
VITE_COGNITO_DOMAIN=seu-cognito-domain
VITE_COGNITO_CLIENT_ID=seu-client-id
VITE_COGNITO_REDIRECT_URI=http://localhost:5173
```

### Desenvolvimento

**Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Isso gera os arquivos otimizados em `dist/`

### Visualizar Build

```bash
npm run preview
```

### Verificar Qualidade do Código

```bash
npm run lint
```

---

## Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|----------|
| **react** | ^19.1.0 | Framework UI |
| **react-router-dom** | ^7.6.2 | Roteamento |
| **@tanstack/react-query** | ^5.80.7 | Gerenciamento de Estado |
| **@aws-sdk/client-cognito** | ^3.828.0 | Autenticação AWS |
| **axios** | ^1.10.0 | HTTP Client |
| **tailwindcss** | ^3.3.0 | Estilização CSS |
| **chart.js** | ^4.5.0 | Gráficos |
| **react-toastify** | ^11.0.5 | Notificações |

---

## Segurança

- **Autenticação via AWS Cognito** - Gerenciamento seguro de credenciais
- **Protected Routes** - Apenas usuários autenticados acessam áreas restritas
- **TypeScript** - Type-safety para prevenir erros
- **HTTPS** - Comunicação criptografada com backend
- **CORS** - Configuração segura de origem cruzada

---

## Configuração do Ambiente

### AWS Cognito Setup

1. Crie um User Pool no AWS Cognito
2. Configure um App Client com as URLs de redirect
3. Configure os providers de identidade (opcional)
4. Copie as credenciais para o `.env`

### API Backend

O projeto comunica com uma API REST hospedada em AWS API Gateway. Ensure que:
- O CORS está configurado corretamente
- Os tokens JWT estão sendo validados
- Os endpoints correspondem aos declarados em `services/servicesData.ts`

---

## Performance

- **Code Splitting**: React Router v7 com lazy loading automático
- **Tree Shaking**: Vite remove código não utilizado
- **Lazy Loading**: Componentes carregados sob demanda
- **Caching**: React Query gerencia cache inteligente
- **Otimização de Bundle**: Tailwind CSS com purge habilitado

---

## Troubleshooting

### Erro de CORS
Verifique se a URL da API está correta no `.env` e se o backend permite a origem do frontend.

### Autenticação falhando
- Confirme as credenciais do Cognito
- Verifique se o token está sendo enviado nos headers
- Valide o `VITE_COGNITO_REDIRECT_URI`

### Compilação lenta
Execute `npm run build` com `--verbose` para diagnosticar gargalos.

---

## Padrões de Código

O projeto segue as seguintes convenções:

- **Components**: PascalCase para nomes de arquivos
- **Hooks**: camelCase com prefixo `use`
- **Types**: Definidas em `lib/types.ts`
- **Imports**: Usando alias `@src` para melhor legibilidade

---

## Licença

Este projeto está sob a licença MIT.

---

## Autor

**Gustavo Machado**

---
