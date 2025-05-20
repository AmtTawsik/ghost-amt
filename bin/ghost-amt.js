#!/usr/bin/env node

const { run } = require('../src/index');

run().catch(error => {
  console.error('An error occurred:', error.message);
  process.exit(1);
});