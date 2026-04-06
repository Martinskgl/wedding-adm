#!/bin/bash

echo "🔧 Instalando painel admin..."

TEMP=$(mktemp -d)
git clone --quiet https://github.com/Martinskgl/wedding-adm.git $TEMP

# Copiar arquivos
mkdir -p src/app/api src/app/ui src/actions src/services src/views src/components/common src/components/ui src/lib

cp -r $TEMP/src/app/admin src/app/
cp -r $TEMP/src/app/login src/app/
cp -r $TEMP/src/app/api/auth src/app/api/
cp -r $TEMP/src/app/ui src/app/
cp -r $TEMP/src/actions/* src/actions/
cp -r $TEMP/src/services/* src/services/
cp -r $TEMP/src/views/* src/views/
cp -r $TEMP/src/components/common/* src/components/common/
cp -r $TEMP/src/components/ui/* src/components/ui/
cp -r $TEMP/src/lib/* src/lib/
cp $TEMP/src/auth.config.ts src/

rm -rf $TEMP

echo "📦 Instalando dependências..."

DEPS="@fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @prisma/client @prisma/extension-accelerate bcryptjs class-variance-authority clsx next-auth sonner tailwind-merge"
DEV_DEPS="@types/bcryptjs prisma"

# Detectar gerenciador de pacotes
if [ -f "pnpm-lock.yaml" ]; then
  PM="pnpm"
  pnpm add $DEPS
  pnpm add -D $DEV_DEPS
elif [ -f "yarn.lock" ]; then
  PM="yarn"
  yarn add $DEPS
  yarn add -D $DEV_DEPS
else
  PM="npm"
  npm install $DEPS
  npm install --save-dev $DEV_DEPS
fi

echo ""
echo "✅ Pronto! Agora faça:"
echo ""
echo "1. Adicione no .env:"
echo "   NEXTAUTH_URL=http://localhost:3000"
echo "   NEXTAUTH_SECRET=\$(openssl rand -base64 32)"
echo ""
echo "2. Rode as migrations:"
echo "   npx prisma migrate deploy"
echo ""
echo "3. Inicie o projeto:"
echo "   $PM run dev"
