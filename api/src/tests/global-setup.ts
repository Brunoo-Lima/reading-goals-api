import { execSync } from 'child_process';

async function init() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  execSync('docker compose up -d --wait postgres-test');
  execSync('npx prisma db push', { stdio: 'inherit' });
}

export default init;
