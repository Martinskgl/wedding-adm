#!/bin/bash

echo "🔧 Instalando painel admin..."

TEMP=$(mktemp -d)
git clone --quiet https://github.com/Martinskgl/wedding-adm.git $TEMP

mkdir -p src/app/api src/actions src/services src/views src/components/common src/lib

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

echo "✅ Pronto! Adicione no seu .env:"
echo ""
echo "NEXTAUTH_URL=http://localhost:3000"
echo "NEXTAUTH_SECRET=rode: openssl rand -base64 32"
