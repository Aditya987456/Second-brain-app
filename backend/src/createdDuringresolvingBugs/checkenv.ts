// checkEnv.ts---> test karne ke liye ki sab sahi chal raha hia like var from .env


import dotenv from 'dotenv'
dotenv.config()

console.log('🔍 Environment Variables Check:');
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? '✅ EXISTS' : '❌ MISSING');
console.log('All env vars starting with GITHUB:');

Object.keys(process.env).forEach(key => {
  if (key.startsWith('GITHUB')) {
    console.log(`  ${key}: ${process.env[key] ? '✅ SET' : '❌ NOT SET'}`);
  }
});