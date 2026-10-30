# Vylinejs Documentation and Registry Design

**Status:** Approved for implementation by the user on 2026-10-29
**Workspace:** `E:\projects\Vylinejs`

## Intent

Make the GitHub Pages site and all user-facing documentation describe the current Vylinejs repository and APIs, then publish its Deno-first packages under a Vylinejs-owned JSR scope with npm-compatible installation.

## Decisions

- Main library package: `@nezumi0627/vylinejs`.
- Supporting packages follow the same brand: `@nezumi0627/vylinejs-types` and `@nezumi0627/vylinejs-agent`.
- Use JSR as the source registry. JSR's official npm compatibility layer supports npm, Bun, and Node consumers; do not attempt to publish those same JSR tarballs with `npm publish`.
- Keep the repository Deno-first and preserve its package subpath structure. Document migration from existing `@evex/linejs` imports.
- Publish from GitHub Actions with OIDC after package/repository linking and verified credentials. No registry secrets are committed.
- Pages must present Vylinejs as an unofficial LINE client library, link the fork, distinguish LINEJS from the Vyline application, and state which functionality is actually supported.
- Review every published doc page and code example against current source. Remove upstream-specific or retired guidance, mark limitations, and add focused coverage where the public interface currently lacks documentation.
- Preserve LINEJS attribution, licenses, and the project's decision not to split maintenance features into another package.

## Constraints

- Do not claim all Vyline functionality is included in Vylinejs.
- Do not claim blanket performance superiority; cite measured benchmark scope and limits.
- Do not claim registry publication succeeded until the registries show the package versions.
- Do not delete or stage the pre-existing untracked `docs/.vitepress/dist/` directory.
- Preserve the current source release history and use a valid new SemVer for first registry publication.

## Acceptance criteria

- Pages build and expose a Vylinejs-specific landing page, navigation, and comparison of LINEJS, Vyline, and Vylinejs.
- Every page in the public docs sidebar and every linked guide describes current APIs, names, install commands, and support status; all imports match the selected package names.
- Code examples that can run independently pass type checking or are labeled as pseudocode / dependent on caller-provided adapters.
- All package publish dry-runs pass and all package identity references are consistent.
- CI can publish the packages with GitHub OIDC when the user links the package scope to the GitHub repository; no long-lived token is required.
- Additional actionable improvements found during review are implemented when they fit this scope, otherwise recorded with a reason.
- Actual release status and any remaining account-side setup are reported precisely.
