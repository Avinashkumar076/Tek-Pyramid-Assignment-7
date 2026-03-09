# ⚛️ React Assignment – Avinash Kumar

## 👤 Developer Info

| Field        | Details                        |
|--------------|-------------------------------|
| Name         | Avinash Kumar                 |
| Education    | BCA – AISECT University, 2022 |
| Training     | MERN Stack – Naresh I Technologies, Hyderabad |
| Experience   | Frontend Developer – MSVP Innovations Pvt. Ltd (Rewardwale) |

---

## 🚀 Project Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** v18+ → [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **Git** → [Download](https://git-scm.com/)

---

## 🛠️ Installation & Setup

### Step 1: Create Vite React Project
```bash
npm create vite@latest react-assignment -- --template react
```

### Step 2: Navigate into the project
```bash
cd react-assignment
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Install additional packages
```bash
npm install prop-types
```

### Step 5: Start the development server
```bash
npm run dev
```

The app will run at **http://localhost:5173**

---

## ⚡ Why Vite over Create React App (CRA)?

| Feature              | Vite ✅                              | Create React App ❌              |
|----------------------|--------------------------------------|----------------------------------|
| **Dev Server Speed** | Instant (uses native ES Modules)     | Slow (bundles everything upfront)|
| **Hot Module Reload**| Near-instant HMR                     | Slower HMR                       |
| **Build Speed**      | Super fast (uses Rollup)             | Slow (uses Webpack)              |
| **Bundle Size**      | Smaller production bundles           | Larger bundles                   |
| **Configuration**    | Minimal config needed                | Complex config (ejecting)        |
| **Maintenance**      | Actively maintained                  | Officially deprecated by Meta    |
| **Modern Standards** | Uses ESM natively                    | CommonJS-based, older approach   |

> **Summary:** Vite is blazing fast ⚡ because it doesn't bundle during development — it serves files using native browser ESM. CRA is officially deprecated and not recommended for new projects in 2024+.

---

## 📦 Dependencies

### Core Dependencies
| Package       | Version  | Purpose                                 |
|---------------|----------|-----------------------------------------|
| `react`       | ^18.x    | Core React library for building UI      |
| `react-dom`   | ^18.x    | Renders React components to the DOM     |
| `prop-types`  | ^15.x    | Runtime type checking for component props |

### Dev Dependencies
| Package              | Version  | Purpose                                         |
|----------------------|----------|-------------------------------------------------|
| `vite`               | ^5.x     | Next-gen frontend build tool (replaces Webpack) |
| `@vitejs/plugin-react` | ^4.x   | Vite plugin that enables React Fast Refresh     |
| `eslint`             | ^8.x     | JavaScript linting for code quality             |
| `eslint-plugin-react` | ^7.x   | React-specific ESLint rules                     |

---

## 📁 Project Structure

```
react-assignment/
├── public/
│   └── vite.svg               # Static assets served as-is
├── src/
│   ├── assets/                # Images, fonts, icons
│   │   └── react.svg
│   ├── components/            # All reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductList.jsx
│   │   └── ProductCard.jsx
│   ├── App.jsx                # Root component
│   ├── App.css                # App-level styles
│   ├── main.jsx               # Entry point – renders App to DOM
│   └── index.css              # Global styles
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML entry point for Vite
├── package.json               # Project metadata & scripts
├── vite.config.js             # Vite configuration
├── README.md                  # This file
└── PROJECT_STRUCTURE.md       # Detailed folder explanation
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server at localhost:5173
npm run build    # Build for production (output in /dist)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

---

## 🌐 Deployment

This project is deployed on **Vercel**:

**Live Link:** `https://tek-pyramid-assignment-7-4zw2.vercel.app/`

### How to Deploy on Vercel:
1. Run `npm run build` → generates a `dist/` folder
2. Go to [vercel.com](https://vercel.com) → Import GitHub repo
3. Vercel auto-detects Vite → click **Deploy**
4. Done! 🎉

---

## 📚 Tasks Completed

- [x] Task 1: Setup and Configuration
- [x] Task 2: Component Architecture
- [x] Task 3: JSX Mastery
- [x] Task 4: Props Implementation
- [x] Task 5: State Management
- [x] Task 6: State vs Props
- [x] Task 7: Conditional Rendering
- [x] Task 8: Lists and Keys
- [x] Task 9: React Fragments
- [x] Task 10: Event Handling
- [x] Task 11: Final Integrated Project (E-Commerce Dashboard)

---

## 📬 Contact

> Built with ❤️ by **Avinash Kumar** | Ramgarh, Jharkhand
