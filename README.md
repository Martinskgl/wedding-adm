# wedding-adm

Painel administrativo reutilizável para sites de casamento. Gerencie produtos (lista de presentes) e pedidos diretamente pelo painel.

---

## O que está incluído

- Login com autenticação (NextAuth) — todo o `/admin` e as actions exigem usuário com role `ADMIN`
- Dashboard com acesso rápido
- Produtos — criar, editar, deletar
- Pedidos — visualizar, alterar status, deletar

---

## Como instalar em um projeto existente

Na raiz do projeto, rode:

```bash
curl -s https://raw.githubusercontent.com/Martinskgl/wedding-adm/main/install.sh | bash
```

> O repositório precisa ser **público** para este comando funcionar.  
> Se for privado, use: `git clone https://github.com/Martinskgl/wedding-adm.git /tmp/wedding-adm && bash /tmp/wedding-adm/install.sh`

---

## Configuração após instalar

### 1. Instalar dependências necessárias

O painel depende de pacotes que podem não estar no projeto. Instale:

**npm:**
```bash
npm install next-auth bcryptjs sonner @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @prisma/client @prisma/extension-accelerate@^2 class-variance-authority clsx tailwind-merge
npm install --save-dev @types/bcryptjs prisma
```

**pnpm:**
```bash
pnpm add next-auth bcryptjs sonner @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @prisma/client @prisma/extension-accelerate@^2 class-variance-authority clsx tailwind-merge
pnpm add -D @types/bcryptjs prisma
```

---

### 2. Variáveis de ambiente

Adicione no `.env` do projeto:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere com: openssl rand -base64 32"
```

> `DATABASE_URL` e `DIRECT_URL` já devem existir no projeto.

> ⚠️ Use `@prisma/extension-accelerate@^2`. A versão 3.x tem tipos incompatíveis com o Prisma 6 e quebra o build.

---

### 3. Banco de dados

**Banco novo (vazio):**
```bash
npx prisma migrate deploy
```

**Banco que já tem as tabelas** (criadas antes com `db push`): marque a migration inicial como aplicada, uma única vez:
```bash
npx prisma migrate resolve --applied 0_init
```

---

### 4. Criar usuário admin

Abra o Prisma Studio:
```bash
npx prisma studio
```

**Passo a passo:**
1. Crie um registro na tabela **Role** com `name: ADMIN` (só usuários com esse role acessam o painel)
2. Crie um registro na tabela **User** com:
   - `name`: seu nome
   - `email`: seu email
   - `password`: senha **hasheada** com bcryptjs
   - `roleId`: o uuid da Role criada acima

> Para gerar o hash da senha, rode no terminal:
> ```bash
> node -e "require('bcryptjs').hash('suasenha', 10).then(console.log)"
> ```

---

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000/admin` → vai redirecionar para o login.

---

## O que personalizar por projeto

| O que mudar | Arquivo | O que editar |
|---|---|---|
| Nome/logo na sidebar | `src/app/admin/layout.tsx` | Linha com `<span>Admin</span>` |
| Título da aba | `src/app/layout.tsx` | Campo `title` no metadata |
| Domínios de imagem | `next.config.ts` | Array `remotePatterns` |
| Copyright no rodapé | `src/app/admin/layout.tsx` | Texto `Admin Panel` |

---

## Fluxo para um novo projeto

```
1. Crie o repositório do novo site
2. Rode o comando de instalação na raiz do projeto
3. Configure o .env
4. npx prisma migrate deploy
5. Crie o usuário admin via Prisma Studio
6. npm run dev
```

---

## Estrutura instalada

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          ← sidebar + layout do painel
│   │   ├── page.tsx            ← dashboard
│   │   ├── product/            ← listagem, criação e edição de produtos
│   │   └── order/              ← listagem e gestão de pedidos
│   ├── login/                  ← página de login
│   ├── api/auth/               ← rota do NextAuth
│   └── ui/login-form.tsx       ← formulário de login
├── actions/
│   ├── action.product.tsx      ← criar, editar, deletar produto
│   └── action.transaction.ts   ← atualizar status, deletar pedido
├── services/
│   ├── product/                ← queries de produto no banco
│   └── transaction/            ← queries de pedido no banco
├── components/
│   ├── common/
│   │   ├── AdminSidebarLink.tsx
│   │   └── SignOutButton.tsx
│   └── ui/
│       ├── table.tsx
│       └── input.tsx
├── views/admin/Admin.page.tsx  ← dashboard principal
├── lib/
│   ├── auth.ts                 ← requireAdmin(): protege páginas e actions
│   ├── prisma.ts               ← conexão com banco
│   └── utils.ts                ← funções utilitárias
├── types/next-auth.d.ts        ← tipagem do role na sessão
└── auth.config.ts              ← configuração do NextAuth
```

---

## Status dos pedidos

| Status | Descrição |
|---|---|
| `PENDING` | Pendente |
| `PAID` | Pago |
| `FAILED` | Falhou |
| `CANCELLED` | Cancelado |
