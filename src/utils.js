const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');

/**
 * Checks if the current directory is a Node.js project with package.json
 * @returns {boolean} True if it's a Node.js project
 */
function checkIfNodeProject() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    return fs.existsSync(packageJsonPath);
  } catch (error) {
    return false;
  }
}

/**
 * Prints a summary of the scan results
 * @param {Array} unusedDependencies - List of unused regular dependencies
 * @param {Array} unusedDevDependencies - List of unused dev dependencies
 * @param {Array} largePackages - List of large packages
 */
function printSummary(unusedDependencies, unusedDevDependencies, largePackages) {
  console.log(chalk.cyan('\n📊 Scan Results Summary:\n'));
  
  // Create a table for unused dependencies
  const table = new Table({
    head: [
      chalk.white('Type'), 
      chalk.white('Package Name')
    ],
    colWidths: [20, 40]
  });
  
  // Add unused dependencies to table
  if (unusedDependencies.length > 0) {
    unusedDependencies.forEach(dep => {
      table.push([chalk.red('Unused Dependency'), dep]);
    });
  }
  
  // Add unused dev dependencies to table
  if (unusedDevDependencies.length > 0) {
    unusedDevDependencies.forEach(dep => {
      table.push([chalk.yellow('Unused DevDependency'), dep]);
    });
  }
  
  // Add large packages to table
  if (largePackages.length > 0) {
    largePackages.forEach(dep => {
      table.push([chalk.magenta('Large Package (>1MB)'), dep]);
    });
  }
  
  // Print stats
  const totalUnused = unusedDependencies.length + unusedDevDependencies.length;
  const totalLarge = largePackages.length;
  
  if (totalUnused > 0 || totalLarge > 0) {
    console.log(table.toString());
    console.log(chalk.white(`\n🧮 Total: ${totalUnused} unused packages, ${totalLarge} large packages\n`));
  } else {
    console.log(chalk.green('✅ No unused or problematic packages found! Your project is clean.'));
  }
}

module.exports = { printSummary, checkIfNodeProject };