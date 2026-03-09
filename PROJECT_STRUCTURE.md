# 📁 PROJECT_STRUCTURE.md

## React Assignment – Folder & File Documentation

This document explains the purpose of every file and folder in the project.

---

## 🗂️ Root Level

```
react-assignment/
```

This is the root of the project. All configuration and source files live here.

| File/Folder         | Purpose |
|---------------------|---------|
| `index.html`        | The single HTML file Vite uses as the entry point. React mounts into `<div id="root">` here. |
| `vite.config.js`    | Vite configuration — defines plugins (like React), build options, and dev server settings. |
| `package.json`      | Lists all npm dependencies, dev dependencies, and available npm scripts (`dev`, `build`, etc.). |
| `package-lock.json` | Auto-generated lock file. Ensures everyone installs the exact same dependency versions. |
| `.eslintrc.cjs`     | ESLint config file. Enforces code quality rules specific to React projects. |
| `.gitignore`        | Tells Git which files/folders to ignore (e.g., `node_modules/`, `dist/`). |
| `README.md`         | Main project documentation. Setup instructions, tech stack, deployment info. |
| `PROJECT_STRUCTURE.md` | This file. Explains every part of the project structure. |

---

## 📂 /public

```
public/
└── vite.svg
```

| File        | Purpose |
|-------------|---------|
| `vite.svg`  | Default Vite logo. Static assets here are served directly — they are NOT processed by Vite's bundler. Use this folder for `favicon.ico`, `robots.txt`, or any files you want to link directly. |

> **Key Rule:** Files in `public/` are referenced as `/filename.svg` (root-relative), NOT imported via JS.

---

## 📂 /src

```
src/
├── assets/
├── components/
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

This is where ALL your React code lives. Vite processes everything inside `src/`.

---

### 📂 /src/assets

```
src/assets/
└── react.svg
```

| File        | Purpose |
|-------------|---------|
| `react.svg` | Default React logo. Store all images, icons, and fonts here. Files here ARE processed by Vite (optimized, hashed filenames for caching). |

> **When to use `assets/` vs `public/`:**
> - `assets/` → Images imported in JS/JSX files (Vite optimizes them)
> - `public/` → Files that need a fixed URL (favicons, OG images, etc.)

---

### 📂 /src/components

```
src/components/
├── Header.jsx
├── Footer.jsx
├── ProductList.jsx
└── ProductCard.jsx
```

> **This is the most important folder.** All reusable React components live here.

| File              | Purpose |
|-------------------|---------|
| `Header.jsx`      | Top navigation bar. Displays app title, logo, and nav links. |
| `Footer.jsx`      | Bottom of the page. Displays copyright info. |
| `ProductList.jsx` | Container component. Renders a list of `ProductCard` components. |
| `ProductCard.jsx` | Individual product display. Receives product data via props and renders details. |

**Naming Conventions followed:**
- ✅ All files start with a **Capital Letter** (e.g., `ProductCard.jsx`, NOT `productCard.jsx`)
- ✅ Use **PascalCase** for both the filename and component name
- ✅ All components are placed inside the `components/` folder
- ✅ One component per file

---

### 📄 /src/App.jsx

```jsx
// Root component of the application
// Imports and composes all major components
// This is the top of the component tree
```

| Aspect    | Detail |
|-----------|--------|
| Role      | Root component — the parent of everything |
| Imports   | Header, ProductList, Footer |
| Exports   | Default export (`export default App`) |
| Purpose   | Orchestrates the layout and structure of the entire app |

---

### 📄 /src/main.jsx

```jsx
// Entry point of the React app
// ReactDOM.createRoot(...).render(<App />) is called here
```

| Aspect    | Detail |
|-----------|--------|
| Role      | JavaScript entry point — Vite starts here |
| Purpose   | Mounts the React `<App />` component into `index.html`'s `<div id="root">` |
| Key API   | `ReactDOM.createRoot()` — React 18's concurrent rendering API |

> Do **NOT** put component logic here. This file should only render `<App />`.

---

### 📄 /src/index.css

Global stylesheet. Applied to the entire app via import in `main.jsx`.

| Usage |
|-------|
| CSS resets (e.g., `* { box-sizing: border-box; }`) |
| Body font, background color, margin resets |
| CSS custom properties (variables) |

---

### 📄 /src/App.css

Component-level styles specifically for `App.jsx`.

---

## 🧩 Component Hierarchy (Visual)

```
App (Root)
├── Header
│   ├── Logo
│   └── Navigation Links
├── ProductList
│   ├── ProductCard (product 1)
│   ├── ProductCard (product 2)
│   ├── ProductCard (product 3)
│   └── ProductCard (...)
└── Footer
```

---

## ✅ Naming Conventions Summary

| Rule                          | Example |
|-------------------------------|---------|
| Component files → PascalCase  | `ProductCard.jsx` ✅ |
| Component names → PascalCase  | `function ProductCard()` ✅ |
| Variable names → camelCase    | `const productList = []` ✅ |
| CSS classes → kebab-case      | `className="product-card"` ✅ |
| Event handlers → camelCase    | `onClick`, `onChange` ✅ |
| Props → camelCase             | `releaseYear`, `isPremium` ✅ |

---

## 🔄 Data Flow Direction

```
App.jsx  ──(state/data)──▶  ProductList  ──(props)──▶  ProductCard
```

- **State** lives in parent components
- **Props** flow DOWN (parent → child)
- **Events** bubble UP (child → parent via callback props)

---

> 📌 This structure follows React best practices for small-to-medium scale applications.
> As the app grows, consider adding: `pages/`, `hooks/`, `context/`, `utils/` folders.
