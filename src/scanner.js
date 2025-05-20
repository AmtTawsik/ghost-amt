const depcheck = require('depcheck');
const ora = require('ora');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const packageJson = require('package-json');

/**
 * Scans the project for unused dependencies
 * @returns {Promise<Object>} Object containing unused dependencies and dev dependencies
 */
async function scanProject() {
  const spinner = ora('🔍 Scanning project for unused dependencies...').start();
  
  try {
    // Read package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Get all dependencies and devDependencies
    const allDependencies = {
      ...(packageData.dependencies || {}),
      ...(packageData.devDependencies || {})
    };
    
    // Configure depcheck
    const options = {
      ignoreBinPackage: false,
      skipMissing: false,
      ignorePatterns: [
        'dist',
        'build',
        'coverage',
        'node_modules'
      ]
    };
    
    // Run depcheck
    const results = await new Promise((resolve, reject) => {
      depcheck(process.cwd(), options, resolve);
    });
    
    // Separate unused dependencies and dev dependencies
    const unusedDependencies = filterDependenciesByType(results.dependencies, packageData.dependencies || {});
    const unusedDevDependencies = filterDependenciesByType(results.dependencies, packageData.devDependencies || {});
    
    // Identify large packages
    spinner.text = '📦 Checking package sizes...';
    const largePackages = await identifyLargePackages(allDependencies);
    
    spinner.succeed('✅ Project scan completed!');
    
    return {
      unusedDependencies,
      unusedDevDependencies,
      largePackages
    };
  } catch (error) {
    spinner.fail('❌ Scan failed');
    throw error;
  }
}

/**
 * Filters dependencies by type (dev or regular)
 * @param {Array} unusedList - List of all unused dependencies
 * @param {Object} dependencyObject - Object containing dependencies
 * @returns {Array} Filtered dependencies
 */
function filterDependenciesByType(unusedList, dependencyObject) {
  return unusedList.filter(dep => Object.keys(dependencyObject).includes(dep));
}

/**
 * Identifies large packages based on their size
 * @param {Object} dependencies - Object containing all dependencies
 * @returns {Promise<Array>} List of large packages
 */
async function identifyLargePackages(dependencies) {
  const largePackages = [];
  const sizeThreshold = 1000000; // 1MB
  
  // Get package sizes (in a real implementation, we would check actual sizes
  // but for MVP we're defining packages >1MB as "large")
  const knownLargePackages = [
    'webpack', 'react', 'angular', 'vue', 'lodash', 'moment', 
    'puppeteer', 'sharp', 'gatsby', 'jest', 'typescript'
  ];
  
  for (const dep of Object.keys(dependencies)) {
    try {
      // Simple approach for MVP - check against known large packages
      if (knownLargePackages.includes(dep) || dep.includes('webpack')) {
        largePackages.push(dep);
        continue;
      }
      
      // Try to get package info from npm registry
      const packageInfo = await packageJson(dep, { fullMetadata: true });
      
      // If package has a size property or we can estimate from other metadata
      if (packageInfo && packageInfo.dist && packageInfo.dist.unpackedSize > sizeThreshold) {
        largePackages.push(dep);
      }
    } catch (error) {
      // Skip if we can't get package info
      continue;
    }
  }
  
  return largePackages;
}

module.exports = { scanProject };