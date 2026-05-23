# Strict Agent Rules & Guidelines (agent.md)
**Project:** DavidSiSx Portfolio  
**Target Repository:** `DavidSiSx/Portfolio`

All developer agents working on this codebase MUST strictly adhere to the following workflow rules, security protocols, and engineering standards. Failure to follow these guidelines will result in architecture degradation or security leaks.

---

## 💾 Git & Commit Policy

*   **Commit Frequency**: Commit early and commit often. A Git commit MUST be made immediately after completing any individual feature, bugfix, refactoring, or documentation update. Do not pile multiple features into a single commit.
*   **Conventional Commits**: All commit messages must strictly follow the conventional commits specification:
    *   `feat: add scrolltrigger timeline`
    *   `fix: recalibrate matter.js dimensions on resize`
    *   `docs: update installation instructions`
    *   `refactor: clean spline loading state logic`
*   **NO AI ATTRIBUTION**: **NEVER** add "Co-Authored-By" or any form of AI attribution in commit messages. Commits must look professional, clean, and developer-authored.

---

## 🔒 Security & Secrets Policy

*   **Zero Credentials in Code**: Under no circumstances should database credentials, OAuth tokens, personal access tokens, or private API keys (e.g., Google Maps, Mapbox, Firebase) be written directly into the source code.
*   **Environment Variables**: All configurations and secret keys must be loaded from `process.env` (using `.env` locally).
*   **Gitignore Integrity**: A `.gitignore` file must exist in the root directory and explicitly list `.env`, `.env.local`, `.env.*.local`, `node_modules/`, and build artifacts to prevent accidental leaks.
*   **Pre-Commit Staging Check**: Verify staged files before committing (`git diff --staged`) to ensure no `.env` or credentials have accidentally slipped in.

---

## ⚡ Design & Motion Arsenal Integration

Follow these rules when styling and animating elements:
1.  **UI Design**: Before starting any UI styling, consult `getdesign.md` or `awesome-design-md` to match the closest brand design tokens.
2.  **Animations**: Use **GSAP + ScrollTrigger** for scroll-based layouts and timelines. Use **Anime.js** for lightweight SVG or DOM animations. Do not write complex raw CSS keyframes manually if GSAP/Anime.js covers them.
3.  **3D Stack**: Use **Spline** for static or editor-animated 3D models. Use **Three.js** directly for dynamic, data-driven WebGL configurations.
4.  **Loaders & Skeletons**: Use **Phantom UI** or pure CSS loaders (e.g., from freefrontend) for loading states, keeping UX fluid during assets fetch.

---

## 🏗️ Architectural Standards

*   **Component Modularity**: Keep presentational code (styles, elements) strictly separated from business/interaction logic. Use Custom Hooks (`useTimeline`, `usePhysics`) to isolate states.
*   **Performance (60fps Target)**:
    *   Disable, pause, or hide Lottie files, Matter.js engines, and Spline canvases when they are not in the active viewport scroll range.
    *   Avoid heavy calculations (like canvas scale changes) inside scroll event loops; use CSS transforms and passive listeners.
