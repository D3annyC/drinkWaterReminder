const express = require('express');
const app = express();
const linebot = require('linebot');

const Agenda = require('agenda');
const agenda = new Agenda();

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
    require('dotenv').config();                      // 使用 dotenv 讀取 .env 檔案
}

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

agenda.define('waterDrinkingReminder', async job => {
    const linebotParser = bot.parser();

    bot.on('message', function (event) {
        console.log(event);
        event.reply([
            { type: 'text', text: 'Hello, world 1' },
            { type: 'text', text: 'Hello, world 2' }
        ]);
    });

    await app.post('/', linebotParser);
});

(async function () { // IIFE to give access to async/await
    await agenda.start();
    await agenda.every('2 minutes', 'waterDrinkingReminder');
})();

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server start');
});