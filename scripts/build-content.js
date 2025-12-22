#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Contentlayer build with progress monitoring...\n');

const startTime = Date.now();

const child = spawn('npx', ['contentlayer', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV: process.env.NODE_ENV || 'development' }
});

let outputBuffer = '';
let errorBuffer = '';
let progressInterval;

function showProgress() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  process.stdout.write(`\r⏳ Building... (${elapsed}s elapsed)`);
}

progressInterval = setInterval(showProgress, 500);

child.stdout.on('data', (data) => {
  outputBuffer += data.toString();
  const lines = outputBuffer.split('\n');
  
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim();
    if (line) {
      clearInterval(progressInterval);
      console.log(`\n📝 ${line}`);
      setTimeout(() => {
        progressInterval = setInterval(showProgress, 500);
      }, 100);
    }
  }
  
  outputBuffer = lines[lines.length - 1];
});

child.stderr.on('data', (data) => {
  errorBuffer += data.toString();
  const lines = errorBuffer.split('\n');
  
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim();
    if (line && !line.includes('ExperimentalWarning')) {
      console.log(`\n⚠️  ${line}`);
    }
  }
  
  errorBuffer = lines[lines.length - 1];
});

child.on('close', (code) => {
  clearInterval(progressInterval);
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  
  if (code === 0) {
    console.log(`\n\n✅ Contentlayer build completed successfully in ${totalTime}s!`);
  } else {
    console.log(`\n\n❌ Contentlayer build failed with code ${code} after ${totalTime}s`);
    process.exit(code);
  }
});

child.on('error', (err) => {
  clearInterval(progressInterval);
  console.error(`\n\n💥 Failed to start contentlayer build: ${err.message}`);
  process.exit(1);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  clearInterval(progressInterval);
  console.log('\n\n🛑 Build cancelled by user');
  child.kill('SIGTERM');
  process.exit(130);
});
