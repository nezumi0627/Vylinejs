# Vylinejs Docs and Registry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the Vylinejs Pages site and every public guide against current source, then prepare and publish Vylinejs packages through JSR with npm-compatible installation.

**Architecture:** Keep the existing Deno monorepo and VitePress site. Rename the library, shared types, and Agent I package identities to the selected `@nezumi0627/vylinejs*` scope; publish TypeScript through JSR and use its supported npm compatibility registry rather than duplicating the package through npm.

**Tech Stack:** Deno 2, TypeScript, VitePress, GitHub Actions OIDC, JSR npm compatibility.

**Spec:** `docs/superpowers/specs/2026-10-29-vylinejs-docs-and-registry-design.md`

## Global Constraints

- Package names: `@nezumi0627/vylinejs`, `@nezumi0627/vylinejs-types`, `@nezumi0627/vylinejs-agent`.
- Keep Deno-first TypeScript source and existing subpath exports.
- Preserve upstream attribution and license notices.
- Never report a publish as complete without registry confirmation.
- Leave pre-existing untracked `docs/.vitepress/dist/` untouched.

## Review Focus

- Authentication examples must accurately describe refresh behavior and retained E2EE keys.
- Old LINEJS identifiers, package names, sample paths, and removed services must not remain in user-facing pages.
- Public APIs and examples must match exported source symbols.
- Cross-platform support descriptions must not imply unsupported browser/runtime compatibility.
- OIDC publication must be scoped to tags and use least privilege.

---

### Task 1: Rename package identities and imports

**Files:** `packages/linejs/deno.json`, `packages/types/deno.json`, `packages/agent/deno.json`, all imports and examples referencing `@evex/linejs*`, package READMEs.

- [ ] Change package identities to the selected names and bump each initial registry version to a consistent release version.
- [ ] Replace internal package aliases and public import examples consistently.
- [ ] Update package descriptions, repository links, and migration guidance.
- [ ] Run package type checks and JSR dry-runs for all three packages.

### Task 2: Rewrite the Pages landing page and navigation

**Files:** `docs/index.md`, `docs/.vitepress/config.mts`, relevant links in root README.

- [ ] Write the landing page for Vylinejs users with clear install/start/documentation paths.
- [ ] Add a comparison and project-history navigation path; distinguish this library from the Vyline application.
- [ ] Correct site metadata, social links, footer attribution, edit links, and sidebar coverage.
- [ ] Build the site and verify generated links/anchors.

### Task 3: Audit and refresh all public guides

**Files:** all user-facing Markdown under `docs/docs/`, `docs/INCOMING_AUDIO.md`, package READMEs, and linked examples.

- [ ] Compare every factual sentence and API sample against current source, tests, package exports, and official service notices where relevant.
- [ ] Rewrite outdated installation, authentication, E2EE, polling, LIFF, Square, call, Album/Moa, VOOM, storage, and troubleshooting guidance.
- [ ] Add a migration section from `@evex/linejs`; label runtime and live-network verification limits.
- [ ] Verify examples by type-checking runnable snippets or correcting/removing them.
- [ ] Build Pages, inspect emitted pages, and fix broken links and stale brand references.

### Task 4: Prepare registry publishing

**Files:** package metadata, `.github/workflows/ci.yml`, a tag-triggered JSR publish workflow, installation docs.

- [ ] Use `deno publish --dry-run` for each package and record included files.
- [ ] Add GitHub Actions OIDC permissions only to the publish job; scope publishing to Vylinejs version tags.
- [ ] Document package/repository linking required in JSR and npm-compatible install commands.
- [ ] Confirm scope/package availability and current account authentication without exposing tokens.
- [ ] Publish only after package checks and Pages verification; confirm package pages and install resolution.

### Task 5: Whole-change review and final verification

**Files:** all task changes.

- [ ] Review the full diff for stale claims, source/license attribution, unsafe credential advice, and package-name drift.
- [ ] Run the full Deno tests, package type checks, all JSR dry-runs, docs build, and `git diff --check`.
- [ ] Search public docs for upstream-only installation instructions and unsupported claims.
- [ ] Record improvements found during the audit and either fix them or explain why they are deferred.
- [ ] Report published URLs or the precise remaining user-side registry setup.
