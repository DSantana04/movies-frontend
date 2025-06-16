# Instruções de Configuração dos Backends

Para que o frontend funcione corretamente, você precisa ter os dois backends FastAPI rodando. Aqui estão as instruções:

## 1. API de Autenticação (movies-fastapi)

```bash
# Clone o repositório
git clone https://github.com/diegoperpetuo/movies-fastapi.git
cd movies-fastapi

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente no arquivo .env
# Exemplo:
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=movies_auth
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256

# Execute a API
uvicorn app.main:app --reload --port 8000
```

A API estará disponível em: `http://localhost:8000`

## 2. API de Avaliações (movies-rating)

```bash
# Clone o repositório
git clone https://github.com/diegoperpetuo/movies-rating.git
cd movies-rating

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente no arquivo .env
# Exemplo:
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=movies_ratings
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256

# Execute a API
uvicorn app.main:app --reload --port 8001
```

A API estará disponível em: `http://localhost:8001`

## 3. MongoDB

Certifique-se de ter o MongoDB rodando localmente ou configure a URL de conexão nos arquivos .env dos backends.

## 4. Testando as APIs

Você pode testar as APIs acessando:
- Documentação da API de Auth: `http://localhost:8000/docs`
- Documentação da API de Ratings: `http://localhost:8001/docs`

## 5. CORS

Certifique-se de que os backends estão configurados para aceitar requisições do frontend (localhost:5173). Adicione as configurações de CORS se necessário.

Exemplo para FastAPI:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

