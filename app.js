const express = require('express')
const app = express()
const linebot = require('linebot');
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
    require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});
// create LINE SDK client
const client = new line.Client(config);
// create user ID from env variable
const userId = process.env.USER_ID || defaultUserId;

let message = [
    {
        type: "text",
        text: "喝水了0.0b"
    },
    {
        type: "sticker",
        packageId: "1",
        stickerId: "410"
    }
];

client
    .pushMessage(userId, message)
    .then(() => console.log({
        success: true,
        events: message
    }))
    .catch(err => console.log(err))

// const linebotParser = bot.parser();
// bot.on('message', function (event) {
//     console.log(event);
//     switch (event.message.text) {
//         case '你':
//             event.reply('我快餓昏了，拜託你！')
//             break
//         case 'hi':
//             event.reply('我等你等好久了，給我東西吃！')
//             break
//         case 'hello':
//             event.reply('我沒心情跟你說 hello，我需要食物！')
//             break
//         case '天氣':
//             event.reply('別管天氣了，我餓到快沒力氣了！')
//             break
//         case '聽說':
//             event.reply('聽說什麼，你沒聽到我說我肚子好餓嗎？')
//             break
//         case '問':
//             event.reply('問什麼不重要，重要是我肚子好餓，給我東西吃！')
//             break
//         case '說':
//             event.reply('說什麼說，不要再說了，等吃飽再說吧！')
//             break
//         case '名字':
//             event.reply('我叫小雞，你是我的主人，你不知道嗎？')
//             break
//         case '媽媽':
//             event.reply('你就是我媽，我受不了！')
//             break
//         default:
//             event.reply('不要再說了，我肚子好餓，趕快餵我！')
//     }
// });
app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server start')
});