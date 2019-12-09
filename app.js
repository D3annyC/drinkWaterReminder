const express = require('express');
const app = express();
const linebot = require('linebot');

const line = require('@line/bot-sdk');

const Agenda = require('agenda');
const agenda = new Agenda();

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
    require('dotenv').config();                      // 使用 dotenv 讀取 .env 檔案
}

// const bot = linebot({
//     channelId: process.env.CHANNEL_ID,
//     channelSecret: process.env.CHANNEL_SECRET,
//     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
// });

// const linebotParser = bot.parser();

const defaultAccessToken = 'CHANNEL_ACCESS_TOKEN';
const defaultSecret = 'CHANNEL_SECRET';
const defaultUserId = 'CHANNEL_ID';

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
    channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create user ID from env variable
const userId = process.env.CHANNEL_ID || defaultUserId;

let message = [
    {
        type: "text",
        text: "Hello world!"
    },
    {
        type: "sticker",
        packageId: "1",
        stickerId: "410"
    }
];

agenda.define('waterDrinkingReminder', async job => {
    await client
        .pushMessage(userId, message)
        .then(() => console.log({
            success: true,
            events: message
        }))
        .catch(err => console.log(err))
});

(async function () { // IIFE to give access to async/await
    await agenda.start();
    await agenda.every('2 minutes', 'waterDrinkingReminder');
})();

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server start');
});