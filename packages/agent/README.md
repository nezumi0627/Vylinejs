# Vylinejs Agent I

The repository contains an optional client for LINE Android's Agent I
web experience. It is source code only and is not published as a separate package. It streams assistant responses and requires a caller-provided
Yahoo/LINE session cookie when the endpoint requests one. The upstream service
is undocumented and may change without notice.

```ts
import { AgentIClient } from "./mod.ts";

const agent = new AgentIClient({
	cookie: sessionCookie,
	lineVersion: "26.6.0",
	source: "chattab_searchbar",
});

for await (const chunk of agent.chat("やあ")) {
	process.stdout.write(chunk.text ?? "");
}
```

Use a cookie obtained through a method you control; never commit cookies or
write them to logs. This package does not include a LINE account login helper
or a cookie acquisition service.
