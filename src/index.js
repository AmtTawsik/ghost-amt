const { scanProject } = require('./scanner');
const { removeUnusedPackages } = require('./remover');
const { printSummary, checkIfNodeProject } = require('./utils');
const chalk = require('chalk');
const inquirer = require('inquirer');

async function run() {
  console.log(chalk.cyan('\n👻 Welcome to ghost-amt - Find and clean up unused npm dependencies\n'));
  
  // Check if current directory is a Node.js project
  if (!checkIfNodeProject()) {
    console.log(chalk.red('❌ Error: This doesn\'t appear to be a valid Node.js project with package.json'));
    console.log(chalk.yellow('📝 Please run ghost-amt in the root directory of a Node.js project.'));
    process.exit(1);
  }

  try {
    // Scan project for unused dependencies
    const { 
      unusedDependencies, 
      unusedDevDependencies, 
      largePackages
    } = await scanProject();

    // Calculate statistics
    const totalUnused = [...unusedDependencies, ...unusedDevDependencies];
    
    // Print summary of the scan
    printSummary(unusedDependencies, unusedDevDependencies, largePackages);
    
    // If there are unused packages, prompt to remove them
    if (totalUnused.length > 0) {
      const { shouldRemove } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldRemove',
          message: `Do you want to remove all ${totalUnused.length} unused packages?`,
          default: false
        }
      ]);
      
      if (shouldRemove) {
        await removeUnusedPackages(totalUnused);
        console.log(chalk.green(`\n✅ Successfully removed ${totalUnused.length} unused packages!\n`));
      } else {
        console.log(chalk.yellow('\n🔍 No packages were removed. Here\'s what you can do manually:'));
        console.log(chalk.white(`npm uninstall ${totalUnused.join(' ')}`));
      }
    } else {
      console.log(chalk.green('\n✅ Great job! Your project doesn\'t have any unused dependencies.'));
    }
    
    console.log(chalk.cyan('\n👋 Thank you for using ghost-amt. Happy coding!\n'));
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { run };