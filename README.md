# Vylinejs

Vylinejs is a downstream integration based on
[LINEJS](https://github.com/evex-dev/linejs), maintained at
[nezumi0627/Vylinejs](https://github.com/nezumi0627/Vylinejs). LINEJS remains
the protocol and API foundation; portable protocol work from
[Vyline](https://github.com/nezumi0627/vyline) is integrated here and can flow
back upstream as focused pull requests.

## Why Vylinejs

- **Familiar API:** built on LINEJS, so existing concepts and usage stay familiar
  wherever compatibility allows.
- **Quick adaptation:** as an independent fork, Vylinejs can respond directly to
  new LINE protocol changes and user requests, with frequent maintenance and
  room to evolve its API when needed.
- **Performance work:** hot paths are measured and optimized to remove concrete
  CPU and memory bottlenecks. See the [stability notes](docs/VYLINEJS_STABILITY.md)
  for benchmarks and their limits.
- **Upstream-friendly:** improvements that are useful to LINEJS are sent back as
  focused contributions.

Vylinejs aims to combine LINEJS's familiar interface with the flexibility and
short iteration cycle of an independently maintained fork.

```mermaid
flowchart LR
    L[LINEJS upstream] --> VJ[Vylinejs: adaptation and repair]
    V[Vyline: tested protocol assets] --> VJ
    VJ --> PR[Focused LINEJS pull request]
    PR --> L
```

See [the porting guide](docs/VYLINE_PORTING.md) for provenance and
[the stability notes](docs/VYLINEJS_STABILITY.md) for queue limits, issue
status, and measured FileStorage performance.

Import names remain `@evex/linejs` for source compatibility. The project and
GitHub releases are Vylinejs. This is an unofficial LINE client.
