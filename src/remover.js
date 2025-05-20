const { exec } = require('child_process');
const ora = require('ora');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Removes unused packages from the project
 * @param {Array} packagesToRemove - List of packages to remove
 * @returns {Promise<void>}
 */
async function removeUnusedPackages(packagesToRemove) {
  if (!packagesToRemove || packagesToRemove.length === 0) {
    return;
  }
  
  const spinner = ora('🧹 Removing unused packages...').start();
  
  try {
    const packageList = packagesToRemove.join(' ');
    const command = `npm uninstall ${packageList}`;
    
    // Execute npm uninstall command
    await execPromise(command);
    
    spinner.succeed('🧹 Removed unused packages successfully!');
  } catch (error) {
    spinner.fail('❌ Failed to remove packages');
    throw new Error(`Failed to remove packages: ${error.message}`);
  }
}

module.exports = { removeUnusedPackages };