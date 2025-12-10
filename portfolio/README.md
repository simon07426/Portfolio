# Portfolio - Šimon Godarský

Moderné portfólio vytvorené pomocou React, Vite a Tailwind CSS.

## 🚀 Funkcie

- **React Router** - SPA navigácia
- **Dark Mode** - Podpora tmavého režimu s viacerými farebnými témami
- **Dvojjazyčnosť** - Podpora slovenčiny a angličtiny
- **Responzívny dizajn** - Optimalizované pre všetky zariadenia
- **Moderný UI** - Gradient pozadia, animácie a smooth transitions

## 📦 Inštalácia

```bash
npm install
```

## 🛠️ Vývoj

```bash
npm run dev
```

Aplikácia bude dostupná na `http://localhost:5173`

## 🏗️ Build pre produkciu

```bash
npm run build
```

Build vytvorí optimalizovanú verziu v priečinku `dist/`.

## 🌐 Nasadenie na Netlify

### Metóda 1: Netlify CLI

1. Nainštaluj Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Prihlás sa do Netlify:
```bash
netlify login
```

3. Nasadiť aplikáciu:
```bash
netlify deploy --prod
```

### Metóda 2: Netlify Dashboard (GitHub/GitLab)

1. Pushni kód do Git repozitára (GitHub/GitLab)
2. Choď na [Netlify](https://www.netlify.com) a prihlás sa
3. Klikni na "Add new site" → "Import an existing project"
4. Vyber svoj repozitár
5. Netlify automaticky deteguje nastavenia z `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `20`

### Konfigurácia

Projekt obsahuje `netlify.toml` s predkonfigurovanými nastaveniami:
- Build command a publish directory
- Redirects pre React Router (SPA routing)
- Node.js verzia 20

## 📁 Štruktúra projektu

```
portfolio/
├── public/
│   ├── _redirects      # Netlify redirects pre SPA
│   └── vite.svg
├── src/
│   ├── App.jsx          # Hlavná aplikácia s routing
│   ├── ProjectDetail.jsx # Detail projektu
│   ├── App.css          # Štýly
│   ├── index.css        # Globálne štýly a témy
│   └── main.jsx         # Entry point
├── netlify.toml         # Netlify konfigurácia
├── vite.config.js       # Vite konfigurácia
└── package.json
```

## 🎨 Témy

Aplikácia podporuje viacero farebných tém v dark mode:
- Blue (predvolená)
- Purple
- Green
- Orange
- Pink
- Cyan

## 📝 Poznámky

- Všetky cesty sú automaticky presmerované na `index.html` pre správne fungovanie React Router
- Build je optimalizovaný s code splitting pre lepšiu výkonnosť
- Scrollbar je skrytý pre čistejší vzhľad

## 🔧 Technológie

- **React 19** - UI framework
- **Vite 7** - Build tool
- **React Router DOM 7** - Routing
- **Tailwind CSS 3** - Styling
- **Netlify** - Hosting
