# Vylinejs

`@nezumi0627/vylinejs` is an unofficial LINE client library based on the
[LINEJS project](https://github.com/evex-dev/linejs). It is maintained by
[nezumi0627](https://github.com/nezumi0627) and adapts portable protocol work
from [Vyline](https://github.com/nezumi0627/vyline). Vylinejs keeps a familiar
library shape while shipping fork-specific fixes independently.

## Install

The package is published on JSR. npm and Bun projects can install it through
JSR's npm compatibility layer.

```sh
deno add jsr:@nezumi0627/vylinejs
npx jsr add @nezumi0627/vylinejs
bunx jsr add @nezumi0627/vylinejs
```

Keep the `.npmrc` file created by the JSR CLI so npm-compatible tools can
resolve JSR dependencies. See the [installation guide](https://nezumi0627.github.io/Vylinejs/docs/start).

## Imports

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";
import { CallSession } from "@nezumi0627/vylinejs/call";
import type { Message } from "@nezumi0627/vylinejs/types";
```

The single public package is `@nezumi0627/vylinejs`. It contains shared protocol
types under the `/types` and `/types/thrift` subpaths. The optional Agent I code
remains in the repository and is not released as a package.

## Project relationship

Vylinejs descends from LINEJS. Vyline is a separate application project and a
source of independently developed protocol experience. The [comparison and
porting history](https://nezumi0627.github.io/Vylinejs/VYLINE_PORTING) explains
what is shared and what stays application-specific.

Square remains as an inherited legacy API and is not actively supported.
LINE VOOM/Timeline APIs are deprecated because the service ended. Read the
[feature support table](https://nezumi0627.github.io/Vylinejs/docs/features)
before relying on a protocol surface.

## Migration from LINEJS

Change package imports from `@evex/linejs` to `@nezumi0627/vylinejs`, and
`@evex/linejs-types` imports to `@nezumi0627/vylinejs/types`. The base, call,
storage, and Thrift subpaths remain available. Review the migration guide for
changed behavior and limits.

## License and attribution

Vylinejs is distributed under the MIT License. It retains required notices for
the LINEJS code and contributors on which it is based. See the repository
license and [author notes](https://nezumi0627.github.io/Vylinejs/docs/authors).
