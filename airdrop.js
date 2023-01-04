const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = 'secret token';
const bot = new TelegramBot(token, {polling: true});



bot.onText(/\/airdropme/, async msg => {

const userName = msg.from.username;
const chatId = msg.chat.id;
const userId = msg.from.id;

  // Get the chat member object for the user
  bot.getChatMember(chatId, userId).then((chatMember) => {
    // The "date" field of the chatMember object contains the date that the user joined the chat
    const joinDate = chatMember.date;

        const namePrompt = await bot.sendMessage(msg.chat.id, "Hi, what's your name?", {
        reply_markup: {
            force_reply: true,
        },
    });
    bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
        const name = nameMsg.text;
        // save name in DB if you want to ...
        // fs.appendFileSync('message.txt', `Hello ${name}!`);
        fs.appendFileSync('name.txt', `Name: ${name}\nUser ID: ${userId}\nUsername: @${userName}\nJoin Date: ${joinDate}`);
        await bot.sendMessage(msg.chat.id, `Hello ${name}!`);
    });
});
