# MovieRate - Frontend React com TypeScript

### Membros:
- Danilo Santana
- Diego Perpétuo
- Luccas Pino
- Milton Kiefer

Uma plataforma moderna para avaliação de filmes e séries, desenvolvida em **React com TypeScript**.

## 🚀 Funcionalidades

- **Autenticação completa**: Login e registro de usuários com tipagem TypeScript
- **Dashboard interativo**: Visualização de estatísticas e avaliações
- **CRUD de avaliações**: Criar, visualizar e excluir avaliações de filmes/séries
- **Interface responsiva**: Design moderno com Tailwind CSS e shadcn/ui
- **Validação de formulários**: Validação robusta em tempo real
- **Type Safety**: Tipagem completa em TypeScript para maior segurança

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Axios** - Requisições HTTP com tipagem
- **Vite** - Build tool

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (gerenciador de pacotes)
- APIs backend rodando:
  - API de autenticação: `http://localhost:8000`
  - API de avaliações: `http://localhost:8001`

## 🔧 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd movies-rating-frontend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as URLs das APIs**
   
   Edite o arquivo `src/lib/api.ts` se necessário para ajustar as URLs dos backends:
   ```typescript
   export const API_CONFIG = {
     AUTH_BASE_URL: 'http://localhost:8000/api/auth',
     RATINGS_BASE_URL: 'http://localhost:8001/api/ratings'
   } as const;
   ```

4. **Execute o projeto**
   ```bash
   pnpm run dev
   ```

5. **Acesse a aplicação**
   
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📱 Páginas e Funcionalidades

### 🏠 Landing Page (`/`)
- Apresentação da plataforma
- Links para login e registro
- Seção de funcionalidades

### 🔐 Autenticação
- **Login** (`/login`): Autenticação de usuários existentes
- **Registro** (`/register`): Criação de novas contas

### 📊 Dashboard (`/dashboard`)
- Estatísticas do usuário (total de avaliações, nota média, gêneros únicos)
- Lista de todas as avaliações do usuário
- Formulário para adicionar novas avaliações
- Funcionalidade de exclusão de avaliações

## 🔌 Integração com APIs

### API de Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Dados do usuário logado

### API de Avaliações
- `POST /api/ratings/` - Criar avaliação
- `GET /api/ratings/` - Listar avaliações do usuário
- `DELETE /api/ratings/{title}` - Excluir avaliação

## 🎨 Design e UX

- **Design responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema moderno**: Interface limpa e intuitiva
- **Feedback visual**: Loading states, mensagens de erro e sucesso
- **Navegação fluida**: Transições suaves entre páginas

## 🔒 Segurança

- **Rotas protegidas**: Dashboard acessível apenas para usuários autenticados
- **Tokens JWT**: Autenticação baseada em tokens
- **Interceptors**: Tratamento automático de tokens expirados
- **Validação**: Validação de formulários no frontend

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── Navbar.tsx      # Barra de navegação
│   └── ProtectedRoute.tsx # Proteção de rotas
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── lib/               # Utilitários e configurações
│   ├── api.ts         # URLs das APIs
│   └── services.ts    # Serviços HTTP
├── pages/             # Páginas da aplicação
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── Dashboard.tsx
├── types/             # Definições de tipos TypeScript
│   └── index.ts       # Tipos principais
├── App.tsx            # Componente principal
└── main.tsx          # Ponto de entrada
```

## 🔧 TypeScript

O projeto utiliza TypeScript com configuração rigorosa:

- **Strict mode** habilitado
- **Type checking** completo
- **Interfaces** bem definidas para todas as entidades
- **Type safety** em todas as requisições HTTP
- **Props tipadas** em todos os componentes

### Principais tipos definidos:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface Rating {
  title: string;
  genre: string;
  rating: number;
  user_id?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
```

## 🚀 Deploy

Para fazer o deploy da aplicação:

1. **Build de produção**
   ```bash
   pnpm run build
   ```

2. **Preview local**
   ```bash
   pnpm run preview
   ```

3. **Deploy**
   
   O diretório `dist/` contém os arquivos estáticos prontos para deploy em qualquer servidor web.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos issues do GitHub.

---

**MovieRate** - Sua plataforma pessoal para avaliação de entretenimento com TypeScript! 🎬⭐

