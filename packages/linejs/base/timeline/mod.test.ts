import { assertRejects } from "@std/assert";
import { Timeline } from "./mod.ts";

const discontinuedMessage =
	"LINE VOOM ended on 2026-09-30 and is no longer available";

Deno.test("legacy Timeline compatibility API fails before making requests", async () => {
	const timeline = new Timeline({} as never);
	await assertRejects(
		() => timeline.initTimeline(),
		Error,
		discontinuedMessage,
	);
	await assertRejects(
		() => timeline.createPost({ homeId: "c-test" }),
		Error,
		discontinuedMessage,
	);
});
