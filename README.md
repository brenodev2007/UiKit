# 🌟 LumiUI

[![npm version](https://img.shields.io/npm/v/lumi-ui?color=blue&style=for-the-badge)](https://www.npmjs.com/package/lumi-ui)
[![npm downloads](https://img.shields.io/npm/dt/lumi-ui?color=green&style=for-the-badge)](https://www.npmjs.com/package/lumi-ui)
[![license](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)](./LICENSE)
[![build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](#)

---

## 🖌️ Logo LumiUI (Minimalist SVG)

```html
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="40" rx="8" fill="#4F46E5"/>
  <text x="60" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="white">LumiUI</text>
</svg>
```

🌟 About

LumiUI is a modern, lightweight, and customizable React UI component library designed to make your development faster and your interfaces cleaner.
Built with accessibility, performance, and simplicity in mind.

🚀 Features

⚡ Fast & Lightweight – optimized bundle size

🎨 Customizable – theming made easy

🧩 Reusable Components – build beautiful UIs in minutes

🌗 Dark Mode Support – automatic theme switching

♿ Accessible by Default – WAI-ARIA compliant

📦 Installation
```
npm install lumi-ui
# or
yarn add lumi-ui
```


🛠️ Usage
```
import { Button } from "lumi-ui";

export default function App() {
  return (
    <div>
      <Button variant="primary">Click me ✨</Button>
    </div>
  );
}
```
🎨 Theming
```
import { ThemeProvider } from "lumi-ui";

<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
```

🤝 Contributing

Contributions are welcome!

Fork the repo

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'feat: add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

✨ Made with ❤️ by Soriani
