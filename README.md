# Documentação do Frontend - CineRate

## Visão Geral
O frontend da plataforma CineRate foi desenvolvido em React com as seguintes tecnologias:
- React 18
- Tailwind CSS para estilização
- shadcn/ui para componentes de interface
- Lucide React para ícones
- Vite como bundler

## Estrutura do Projeto

```
movies-frontend/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx          # Página principal de autenticação
│   │   ├── Login.jsx             # Componente de login
│   │   ├── Register.jsx          # Componente de registro
│   │   ├── Header.jsx            # Cabeçalho da aplicação
│   │   ├── Dashboard.jsx         # Dashboard principal
│   │   ├── AddMovieDialog.jsx    # Modal para adicionar filmes
│   │   └── MovieCard.jsx         # Card de exibição de filme
│   ├── contexts/
│   │   └── AuthContext.jsx       # Contexto de autenticação
│   ├── lib/
│   │   └── api.js               # Configurações da API
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Ponto de entrada
```

## Funcionalidades Implementadas

### 1. Autenticação
- **Login**: Formulário com validação de email e senha
- **Registro**: Formulário completo com confirmação de senha
- **Gerenciamento de estado**: Context API para estado global de autenticação
- **Persistência**: Token JWT armazenado no localStorage

### 2. Interface de Usuário
- **Design responsivo**: Funciona em desktop e mobile
- **Tema moderno**: Gradientes e componentes shadcn/ui
- **Ícones**: Lucide React para ícones consistentes
- **Feedback visual**: Loading states e mensagens de erro/sucesso

### 3. CRUD de Filmes
- **Listagem**: Grid responsivo de cards de filmes
- **Adição**: Modal com formulário completo (título, gênero, nota, resenha)
- **Exclusão**: Confirmação antes de deletar
- **Busca**: Filtro por título em tempo real
- **Filtros**: Filtro por gênero

### 4. Recursos Adicionais
- **Sistema de avaliação**: Exibição visual com estrelas (0-10 convertido para 0-5 estrelas)
- **Validações**: Formulários com validação client-side
- **Estados vazios**: Mensagens quando não há filmes
- **Responsividade**: Layout adaptável para diferentes tamanhos de tela

## Configuração da API

O frontend está configurado para se conectar com dois backends:
- **Autenticação**: `http://localhost:8000/api/auth`
- **Avaliações**: `http://localhost:8001/api/ratings`

## Como Executar

1. Instalar dependências:
```bash
cd movies-frontend
pnpm install
```

2. Iniciar servidor de desenvolvimento:
```bash
pnpm run dev --host
```

3. Acessar: `http://localhost:5173`

## Próximos Passos

Para usar a aplicação completa, você precisará:
1. Configurar e executar os backends FastAPI
2. Configurar o MongoDB
3. Ajustar as URLs da API se necessário
4. Implementar funcionalidades adicionais como edição de filmes

## Observações Técnicas

- A aplicação usa Context API para gerenciamento de estado
- Tokens JWT são armazenados no localStorage
- Todas as requisições autenticadas incluem o header Authorization
- O design é totalmente responsivo e acessível
- Componentes são reutilizáveis e bem estruturados

