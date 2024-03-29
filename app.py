# -*- coding: utf8 -*-
from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import *

from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

# Channel Access Token
line_bot_api = LineBotApi('nXKOG0Hc2d5V7KCrpZEe1pqsXNBqSB+PUaD8qe6YYCroZilSi8Q+GUhfxwxiE5Dfbq4p5bNKOKlOeijlUEViciIsjWDuPQCZl8Mxn+lAiWnccey7/9Fg20L53gJqpIIbBcqd+oBuHe/Gm9Aiyys5cwdB04t89/1O/w1cDnyilFU=')
# Channel Secret
handler = WebhookHandler('eafba9916e3d3aacc16459e6737d680c')
#USER_ID
USER_ID='U55512a1467f25930fab3c3cd8abf5deb'

# 監聽所有來自 /callback 的 Post Request
@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

# 處理訊息
def handle_message():
    message = TextSendMessage(text="喝水囉0.0b")
    line_bot_api.push_message(USER_ID, message)
    #ing_message = ImageSendMessage(
    #    original_content_url='https://i.imgflip.com/3iwbld.jpg',
    #    preview_image_url='https://i.imgflip.com/3iwbld.jpg')
    #line_bot_api.push_message(USER_ID, ing_message)

sched = BackgroundScheduler(daemon=True)
sched.add_job(handle_message,'interval',minutes=10)
sched.start()

import os
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
