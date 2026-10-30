# Internal protocol schema

This directory is the source schema for LINE protocol enums, Thrift structures,
and generated TypeScript types. It is not published separately. The public types
are included in `@nezumi0627/vylinejs` under `/types`.

## Examples

```ts
import type * as VylineTypes from "@nezumi0627/vylinejs/types";

type GetContacts = () => Promise<VylineTypes.Contact[]>;
```

Types are generated from the protocol schema in this repository. They describe
observed wire data and do not imply that every corresponding LINE service is
currently available.
