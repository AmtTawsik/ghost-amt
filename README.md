# 👻 ghost-amt

> Find and clean up unused npm dependencies in your Node.js projects — quickly and safely.

[![npm version](https://img.shields.io/npm/v/ghost-amt.svg)](https://www.npmjs.com/package/ghost-amt)
[![Downloads](https://img.shields.io/npm/dm/ghost-amt.svg)](https://www.npmjs.com/package/ghost-amt)
[![License](https://img.shields.io/npm/l/ghost-amt.svg)](https://github.com/your-username/ghost-amt/blob/main/LICENSE)

---

## 🚀 Features

- 🔎 Detects **unused dependencies** and devDependencies in your project  
- ⚠️ Warns about **large packages** (>1MB) that might bloat your app  
- 🤖 Interactive CLI with colorful output and emojis  
- 🧹 Prompt to **uninstall unused packages** with confirmation  
- 🕒 Fast, zero-config scanning powered by [`depcheck`](https://github.com/depcheck/depcheck)  
- 💻 Works with JavaScript and TypeScript projects  

---

## 📦 Installation

Install globally to use anywhere:

```bash
npm install -g ghost-amt
````

Or run without installing:

```bash
npx ghost-amt
```

---

## 🧙‍♂️ Usage

Run `ghost-amt` inside your project root folder:

```bash
ghost-amt
```

You’ll see an output like this:

```
👻 Welcome to ghost-amt - Find and clean up unused npm dependencies

🔍 Scanning project for unused dependencies...
✅ Project scan completed!

📊 Scan Results Summary:

┌────────────────────┬───────────────────────────────┐
│ Type               │ Package Name                  │
├────────────────────┼───────────────────────────────┤
│ Unused Dependency  │ lodash                        │
│ Unused DevDependency │ jest                        │
│ Large Package (>1MB) │ puppeteer                   │
└────────────────────┴───────────────────────────────┘

🧮 Total: 2 unused packages, 1 large package

? Do you want to remove all 2 unused packages? (y/N)
```

---

## ⚙️ How It Works

1. **Static code analysis:** Scans your codebase to detect which dependencies are actually imported or required.
2. **Package size detection:** Checks installed package sizes to identify potentially heavy dependencies.
3. **Interactive removal:** Prompts you to safely uninstall unused packages with your confirmation.

---

## ❗ Limitations

* May **miss dynamic imports or requires** (e.g., `require(variable)`).
* Does **not modify your source code**; only cleans `package.json` and `node_modules`.
* Some build tools or scripts may cause false positives.

---

## 📖 Advanced Usage

### Run in CI mode (non-interactive)

```bash
ghost-amt --ci
```

### Generate report without uninstall prompt

```bash
ghost-amt --report-only
```

---

## 🤝 Contributing

Contributions are very welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📝 License

MIT © [Abdullah Al Mubin](https://github.com/AmtTawsik)

---

## 👤 Author

**Abdullah Al Mubin**

* [Website](https://abdullahalmubin.blog)
* [LinkedIn](https://www.linkedin.com/in/abdullah-al-mubin-tawsik)