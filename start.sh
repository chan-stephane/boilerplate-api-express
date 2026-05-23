#!/bin/sh

# Exit on error
set -e

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "🚀 Starting application..."
exec pm2-runtime start ecosystem.config.js

