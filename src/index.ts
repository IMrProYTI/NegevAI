import VkBot from "node-vk-bot-api";
const client = new VkBot(process.env.VK_TOKEN || "");

// @ts-ignore
import CharacterAI from "node_characterai";
const characterAI = new CharacterAI();

// characterAI.authenticateAsGuest();
characterAI.authenticateWithToken(process.env.CHARACTERAI_TOKEN);

async function getReplyAI(input: string): Promise<string> {
	const chat = await characterAI.createOrContinueChat(process.env.CHARACTERAI_CHARID);
	const response = await chat.sendAndAwaitResponse(input, true)

	return response.text;
};

client.on(async ctx => {
	ctx.reply(await getReplyAI(ctx.message.text || ""));
});

client.startPolling(() => {
	console.log("Successful login!");
	return {};
});