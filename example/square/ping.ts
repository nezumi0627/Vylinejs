import {
	loginWithAuthToken,
	loginWithPassword,
	loginWithQR,
} from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithPassword({
	password: "",
	email: "",
	onPincodeRequest(pin) {
		console.log(pin);
	},
}, { device: "DESKTOPWIN", storage: new FileStorage("./storage.json") });

client.on("square:message", async (message) => {
	console.log(message.text);
	if (message.text === "!ping") {
		await message.react("NICE");
		await message.reply("pong!");
	}
});

client.listen({ square: true });
