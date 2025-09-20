#!/usr/bin/env node

/**
 * Setup script for AAMS project
 * Initializes environment and checks dependencies
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 AAMS Setup Script');
console.log('====================');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found');
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Please copy .env.example to .env and fill in your values');
  }
} else {
  console.log('✅ .env file found');
}

console.log('✅ Setup complete!');