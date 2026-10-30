# Vylinejs Docs Unslopping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic-looking docs presentation with a distinctive, readable Vylinejs technical-journal style while preserving the existing framework and navigation.

**Architecture:** Keep VitePress and its existing custom home/search/theme components. Refine shared design tokens and page chrome in the theme stylesheet, then adjust the home composition and Markdown diagram presentation/content at their current sources. Inspect built pages in a fresh preview process so stale CSS assets cannot hide the changes.

**Tech Stack:** VitePress, Vue 3, TypeScript, CSS, Mermaid.

**Spec:** `docs/superpowers/specs/2026-10-30-docs-unslopping-design.md`

## Global Constraints

- Preserve existing VitePress routes, search, translation control, examples, and green identity.
- Use no more than two primary type families; preserve monospace for code as the documented technical-content exception.
- Use 1px rules and one small radius; add no shadows or gradients.
- Keep keyboard focus, readable contrast, reduced-motion behavior, and responsive layouts.
- Do not change documentation claims while making presentation changes.
- Do not add or run automated tests; validate by production build and browser inspection.

## Review Focus

- Stale preview serves HTML that points at missing hashed CSS: verify CSS status and computed tokens from a fresh preview.
- Long Mermaid labels overflow/clamp at desktop or phone widths: inspect the history and lineage graphs at both sizes.
- Dark theme loses contrast or green accent clarity: inspect one home and one article page in each theme.
- Sidebar rules collide with the scrollbar: inspect the full navigation scroll region.
- Custom home content collapses awkwardly at narrow widths: inspect the homepage at mobile viewport.

---

### Task 1: Shared editorial theme and docs chrome

**Files:**
- Modify: `docs/.vitepress/theme/style.css`

**Interfaces:**
- Consumes: existing VitePress theme variables and current custom component classes.
- Produces: shared type, color, spacing, navigation, article, sidebar, focus, and diagram presentation rules.

- [ ] Establish the approved editorial hierarchy with the existing green as a semantic accent; remove generic repeated panel treatments where they are purely decorative.
- [ ] Keep light/dark values, sidebar scroll gutter, keyboard focus, reduced motion, and narrow-screen rules consistent.
- [ ] Rework Mermaid container sizing so diagram content is readable without clipping or arbitrary enlargement.
- [ ] Run `npm run build` from `docs`; expect a successful VitePress production build.

### Task 2: Home page authorship and hierarchy

**Files:**
- Modify: `docs/.vitepress/theme/DocsHome.vue`
- Modify: `docs/.vitepress/theme/style.css`

**Interfaces:**
- Consumes: shared editorial tokens from Task 1.
- Produces: a distinctive content-led home layout with a clear next step, project facts, and restrained technical examples.

- [ ] Preserve the current useful two-column introduction and primary installation action, but remove generic copy/layout cues and tune section rhythm to the approved technical-journal direction.
- [ ] Make support status, guides, and project identity visually distinct by information type instead of repeating one card pattern.
- [ ] Check responsive behavior and contrast in both themes in the rendered homepage.

### Task 3: Diagrams and article reading rhythm

**Files:**
- Modify: `docs/VYLINE_PORTING.md`
- Modify: `docs/.vitepress/theme/style.css`

**Interfaces:**
- Consumes: shared diagram styles from Task 1.
- Produces: readable lineage and history diagrams plus consistent article hierarchy.

- [ ] Correct Mermaid source syntax and simplify node labels enough to fit without clipping.
- [ ] Use vertical or compact layouts appropriate to each graph; preserve relationship meaning and chronology.
- [ ] Inspect the rendered history diagrams and at least one other Markdown diagram at desktop and mobile widths.

### Task 4: Production visual audit

**Files:**
- No source files unless the audit finds a required correction.

**Interfaces:**
- Consumes: built VitePress site.
- Produces: verified preview URL and a concise visual-audit result.

- [ ] Build docs and start a fresh preview after the build so generated asset paths match.
- [ ] Confirm HTML and its referenced stylesheet return 200 and the page has the custom green token applied.
- [ ] Inspect homepage, an article page, diagram labels, sidebar scrolling, dark/light modes, and mobile layout.
- [ ] Run `git diff --check`; expect no whitespace errors.
