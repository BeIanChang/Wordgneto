# Wordgneto

Vocabulary trainer that works offline, syncs progress with local storage, and keeps multiple dictionaries in play. Built with TypeScript + Vue 3 (Composition API) to showcase modern front-end engineering patterns: state management, persistence, theming, and smooth UX.

## 🎥 Demo

https://github.com/user-attachments/assets/95b2ea4d-fcd8-4b6c-87d6-bb30fed6d3e1

## What It Delivers
- **Multi-dictionary practice:** Ships with CET-4/6 decks and lets users curate custom “collect”, “simple”, and “wrong-word” lists.
- **Offline-first experience:** Pinia state syncs to `localforage` and `localStorage`, so sessions resume even without network access.
- **Dynamic theming & shortcuts:** One-click theme toggle, keyboard accelerators, and dialog-driven settings keep the UI delightful.
- **Lazy translations:** Translations load only when needed, keeping the initial bundle lean while supporting bilingual study.

## Tech Stack
- **Framework:** Vue 3 + Vite + TypeScript
- **State:** Pinia with modular stores (`src/stores`)
- **UI utilities:** Element Plus-inspired custom components, Iconify icons
- **Persistence:** localforage + `localStorage`
- **Tooling:** pnpm (preferred) or npm, ESLint-ready configuration

## Repo Layout
```
src/
  App.vue                 Root component; wires watchers + dialogs
  main.ts                 Bootstraps app and router
  router.ts               Route definitions
  stores/                 Pinia stores (base, runtime, practice, setting)
  components/             Reusable UI pieces (buttons, dialogs, panels)
  hooks/                  Composition utilities (dict, sound, theme)
  utils/                  Helpers (const, event bus, http wrapper)
  assets/                 Static assets and dictionary datasets
public/                   Static files served by Vite
vite.config.ts            Build & alias configuration
```

## Getting Started
```bash
pnpm install          # or npm install
pnpm dev              # npm run dev
```
Visit `http://localhost:5173`, open the settings dialog (top-right), choose a dictionary, and start a practice session.

## Key Implementation Notes
- `src/stores/base.ts`: Seeds built-in dictionaries, manages collect/simple/wrong lists, and chunks large word sets for practice sessions.
- `App.vue`: Uses watchers to persist state changes to storage and to keep derived lists (chapters, subsets) in sync.
- `src/hooks/dict.ts`: Handles translation data loading and keeps dictionaries trimmed to only the needed fields.
- `src/components/dialog/SettingDialog.vue`: Central place to adjust practice preferences (theme, sound, autoplay).
- `src/utils/eventBus.ts`: Lightweight event emitter to broadcast dictionary changes across components.
