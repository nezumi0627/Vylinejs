# DeepWiki and repository architecture

Open the generated
[Vylinejs DeepWiki](https://deepwiki.com/nezumi0627/Vylinejs) for a separate,
AI-generated explanation of the public GitHub repository. DeepWiki indexes the
repository independently from this maintained documentation; check its
citations against source before relying on details.

This maintained code map is the local fallback and source-oriented entry point.

## Repository map

| Area | Location | Role |
| --- | --- | --- |
| Public library | `packages/linejs/` | Main TypeScript package and public client APIs |
| Client features | `packages/linejs/client/features/` | Login, Talk, calls, media, LIFF, Moa, and service operations |
| Shared primitives | `packages/linejs/base/` | Storage, E2EE, transports, event emitters, and protocol helpers |
| Thrift definitions | `packages/types/` | Source schemas and generated protocol types |
| Examples | `example/` | Runnable usage by feature and runtime |
| Maintained docs | `docs/docs/` | Install path, guides, support status, and API references |
| Generated docs site | `docs/.vitepress/` | VitePress theme, navigation, search, and Mermaid rendering |

## Reading paths

1. Install and first login: [step-by-step quickstart](../docs/quickstart/1-install).
2. Authentication internals and session risks: [authentication guide](../docs/auth).
3. Feature availability and runtime constraints: [support table](../docs/features).
4. Call protocol details: [call guide](../docs/call).
5. Source comparisons and project ancestry: [project history](../VYLINE_PORTING).
6. Benchmarks and stability evidence: [stability notes](../VYLINEJS_STABILITY).

## Package boundaries

`packages/linejs` is the published library surface. `packages/types` supplies
shared Thrift data. Examples are separate consumers, not part of the runtime
package. The docs site is a Node.js/npm project and is built separately from
the Deno-first library workspace.

For a symbol, search its exact identifier in `packages/linejs/`, then follow
its imports into `base/` or `types/`. For behavior, prefer a feature guide and
its linked example. Generated Thrift files are not the authoritative place to
infer service behavior.

Maintainer signature: [nezumi0627](https://github.com/nezumi0627)
