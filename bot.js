import "jsr:@std/dotenv/load";
import { Bot } from "https://deno.land/x/grammy@v1.30.0/mod.ts";

const token = Deno.env.get("BOT_API_TOKEN");
if (!token) throw new Error("BOT_API_TOKEN is unset");

const forwardingChatId = Deno.env.get("FORWARDING_CHAT_ID");
if (!forwardingChatId) throw new Error("FORWARDING_CHAT_ID is unset");

const bot = new Bot(token);

const welcomeMsg = Deno.env.get("WELCOME_MSG") || "Hello!";
const okMsg = Deno.env.get("OK_MSG") || "OK!";
const errorMsg = Deno.env.get("ERROR_MSG") || "Error!";

bot.command("start", (ctx) => ctx.reply(welcomeMsg));

bot.on("message", async function(ctx) {
  if (!ctx.message.text) {
    ctx.reply(errorMsg);
    return;
  }

  await bot.api.sendMessage(forwardingChatId, ctx.message.text);
  ctx.reply(okMsg);
});

bot.start();

