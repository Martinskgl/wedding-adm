# Admin Panel Template

Painel administrativo reutilizável com Next.js, Prisma e NextAuth.

## Como usar para um novo projeto

### 1. Criar repositório a partir deste template

No GitHub, clique em **"Use this template"** → **"Create a new repository"**.  
Clone o novo repositório na sua máquina.

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com as credenciais do banco do cliente:

```env
DATABASE_URL="prisma+postgres://..."
DIRECT_URL="postgres://..."
NEXTAUTH_URL="https://admin.seusite.com"
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"
```

> Para gerar o NEXTAUTH_SECRET: `openssl rand -base64 32`

### 4. Rodar as migrations no banco

```bash
npx prisma migrate deploy
```

### 5. Criar o primeiro usuário admin

```bash
npx prisma studio
```

Ou via script seed (crie `prisma/seed.ts` com o usuário e senha com bcrypt hash).

### 6. Rodar em desenvolvimento

```bash
npm run dev
```

### 7. Deploy na Vercel

- Aponte o repositório na Vercel
- Configure as variáveis de ambiente no painel da Vercel
- Deploy automático a cada `git push`

---

## Personalizações por projeto

| O que mudar | Onde |
|---|---|
| Nome/logo na sidebar | `src/app/admin/layout.tsx` |
| Título do painel | `src/app/layout.tsx` (metadata) |
| Domínios de imagem permitidos | `next.config.ts` |
| Moeda (atualmente BRL) | `ProductsClient.tsx` e `TransactionClient.tsx` |
| Copyright no rodapé | `src/app/admin/layout.tsx` |
