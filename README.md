# AffiliateConnect Hub

[![Core API CI](https://github.com/mansque404/affiliate-connect-hub/actions/workflows/core-api-ci.yml/badge.svg)](https://github.com/mansque404/affiliate-connect-hub/actions)

## 📖 Sobre o Projeto

O **AffiliateConnect Hub** é um sistema de back-end robusto que simula o núcleo de uma plataforma de marketing de afiliados. O projeto consiste em uma API principal para gerenciar produtos e afiliados, e um worker de automação para popular o banco de dados com novos produtos.

Este projeto foi desenvolvido como um case técnico para demonstrar competências em desenvolvimento back-end com **Node.js/NestJS** e **Python**, utilizando as melhores práticas de mercado como CI/CD, testes, e um ambiente de desenvolvimento containerizado com Docker.

## ✨ Funcionalidades Principais

-   **Autenticação de Afiliados:** Sistema de registro e login com autenticação baseada em JWT (JSON Web Tokens).
-   **Rotas Protegidas:** Uso de Guards para garantir que apenas usuários autenticados possam acessar recursos específicos.
-   **Gestão de Produtos:** Endpoints para criar e listar produtos que podem ser promovidos.
-   **Geração de Links de Afiliado:** Funcionalidade principal onde um afiliado autenticado pode gerar um link de venda rastreável para um produto.
-   **Worker de Automação (Scraping):** Um serviço em Python com Selenium que extrai dados de uma página de produto de exemplo e os cadastra na API.
-   **Ambiente Dockerizado:** Todo o ambiente de desenvolvimento (API, bancos de dados) é orquestrado com Docker Compose para fácil configuração.
-   **Integração Contínua (CI/CD):** Pipeline de CI com GitHub Actions para rodar lint, testes e build a cada push, garantindo a qualidade do código.

## 🛠️ Tecnologias Utilizadas

| Categoria              | Tecnologia                                                              |
| ---------------------- | ----------------------------------------------------------------------- |
| **Back-end (API)** | Node.js, NestJS, TypeScript, Express                                    |
| **Banco de Dados** | PostgreSQL (Relacional), MongoDB (Não-Relacional)                       |
| **ORM** | Prisma                                                                  |
| **Automação & Scraping** | Python, Selenium                                                        |
| **DevOps & Infra** | Docker, Docker Compose, GitHub Actions                                  |
| **Testes** | Jest                                                                    |

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (v18 ou superior)
-   [Python](https://www.python.org/downloads/) (v3.8 ou superior)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/mansque404/affiliate-connect-hub.git](https://github.com/mansque404/affiliate-connect-hub.git)
    cd affiliate-connect-hub
    ```

2.  **Crie os arquivos de variáveis de ambiente:**
    -   Na pasta `core-api`, crie um arquivo `.env` e copie o conteúdo de `.env.example` (se existir) ou use o modelo abaixo.
    -   Na pasta `product-scraper`, crie um arquivo `.env` com o modelo abaixo.

3.  **Suba os containers do Docker:**
    Na raiz do projeto, execute o comando para iniciar o PostgreSQL e o MongoDB.
    ```bash
    docker-compose up -d
    ```

4.  **Configure e inicie a API (NestJS):**
    Abra um **novo terminal**.
    ```bash
    # Navegue até a pasta da API
    cd core-api

    # Instale as dependências
    npm install

    # Rode as migrações do Prisma para criar as tabelas no banco de dados
    npx prisma migrate dev

    # Inicie a API em modo de desenvolvimento
    npm run start:dev
    ```
    A API estará rodando em `http://localhost:3000`.

5.  **Configure e execute o Worker (Python):**
    Abra um **terceiro terminal**.
    ```bash
    # Navegue até a pasta do scraper
    cd product-scraper

    # Crie e ative o ambiente virtual
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # Linux/macOS:
    # source venv/bin/activate

    # Instale as dependências Python
    pip install -r requirements.txt
    ```

## ⚙️ Variáveis de Ambiente

> ⚠️ **Importante:** Nunca faça commit dos seus arquivos `.env`! Eles já estão no `.gitignore`.

**Arquivo: `core-api/.env`**
```env
DATABASE_URL="postgresql://admin:password123@localhost:5432/affiliatedb?schema=public"
JWT_SECRET_KEY="SUA_CHAVE_SECRETA_GERADA_AQUI"
```

**Arquivo: `product-scraper/.env`**
```env
API_BASE_URL=http://localhost:3000
API_USER_EMAIL=afiliado.teste@email.com
API_USER_PASSWORD=senhaSuperForte123
```

## 🧪 Executando Testes

Para rodar os testes unitários da API, navegue até a pasta `core-api` e execute:
```bash
npm run test
```

## 📑 Documentação da API

A collection completa do Postman pode ser encontrada [aqui](https://mansque404-1500357.postman.co/workspace/Vitor-Mansque-Rodrigues-Costa's~49778fe6-80c3-413f-8b28-df6e1f2411ed/collection/47581381-77f9f014-2f82-4159-9162-0c7cd24f5ce8?action=share&source=copy-link&creator=47581381) (opcional).

| Verbo  | Rota                                | Protegido? | Descrição                                    |
| :----- | :---------------------------------- | :--------: | :------------------------------------------- |
| `POST` | `/auth/register`                    |     Não    | Registra um novo afiliado.                   |
| `POST` | `/auth/login`                       |     Não    | Autentica um afiliado e retorna um token JWT. |
| `GET`  | `/users/me`                         |     Sim    | Retorna os dados do afiliado autenticado.    |
| `GET`  | `/products`                         |     Sim    | Lista todos os produtos disponíveis.         |
| `POST` | `/products`                         |     Sim    | Cria um novo produto.                        |
| `GET`  | `/products/:id/generate-link`       |     Sim    | Gera um link de afiliado para um produto.    |

---
