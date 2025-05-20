# 👻 ghost-amt

> Find and clean up unused npm dependencies in your project

[![npm version](https://img.shields.io/npm/v/ghost-amt.svg)](https://www.npmjs.com/package/ghost-amt)
[![Downloads](https://img.shields.io/npm/dm/ghost-amt.svg)](https://www.npmjs.com/package/ghost-amt)
[![License](https://img.shields.io/npm/l/ghost-amt.svg)](https://github.com/your-username/ghost-amt/blob/main/LICENSE)

<p align="center">
  <img src="https://i.imgur.com/XYZ123.png" alt="ghost-amt logo" width="300">
</p>

## 🚀 Features

- **Finds unused dependencies** in your Node.js projects
- **Detects large packages** (>1MB) that might be bloating your project
- **Interactive CLI** with colorful, emoji-rich feedback
- **Zero configuration** required to get started
- **Auto-removal** of unused packages with confirmation
- **Fast scanning** powered by depcheck

## 📦 Installation

\`\`\`bash
# Install globally
npm install -g ghost-amt

# Or use without installing
npx ghost-amt
\`\`\`

## 🧙‍♂️ Usage

Simply run in your project root:

\`\`\`bash
ghost-amt
\`\`\`

### Example Output

\`\`\`
👻 Welcome to ghost-amt - Find and clean up unused npm dependencies

🔍 Scanning project for unused dependencies...
✅ Project scan completed!

📊 Scan Results Summary:

┌────────────────────┬────────────────────────────────────────┐
│ Type               │ Package Name                           │
├────────────────────┼────────────────────────────────────────┤
│ Unused Dependency  │ lodash                                 │
├────────────────────┼────────────────────────────────────────┤
│ Unused Dependency  │ moment                                 │
├────────────────────┼────────────────────────────────────────┤
│ Unused DevDependency │ jest                                 │
├────────────────────┼────────────────────────────────────────┤
│ Large Package (>1MB) │ puppeteer                            │
└────────────────────┴────────────────────────────────────────┘

🧮 Total: 3 unused packages, 1 large packages

? Do you want to remove all 3 unused packages? (y/N)
\`\`\`

## ⚙️ How It Works

ghost-amt uses several techniques to identify unused packages:

1. **Static Analysis**: Scans your project files to find which imports and requires are actually being used
2. **Package Size Detection**: Identifies large packages that might be unnecessarily bloating your project
3. **Interactive Removal**: Lets you choose whether to remove unused packages with a simple prompt

## 🚫 What It Doesn't Do

- **Doesn't modify your code**: Only removes packages from package.json and node_modules
- **Doesn't touch dynamically loaded modules**: If you use \`require(variable)\`, it might report false positives
- **Doesn't analyze build-time usage**: Tools used only in build scripts might be reported as unused

## 📖 Advanced Usage

### CI Mode

\`\`\`bash
# Non-interactive mode for CI pipelines
ghost-amt --ci
\`\`\`

### Generate Report Only

\`\`\`bash
ghost-amt --report-only
\`\`\`

## 🛠️ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Abdullah Al Mubin**

* Twitter: [@abdullahmubin](https://twitter.com/abdullahmubin)
* Github: [@abdullahmubin](https://github.com/abdullahmubin)