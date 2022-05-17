require('dotenv').config()
const express = require('express');
const router = express.Router();
const line = require('@line/bot-sdk');

/* GET users listing. */
router.post('/line', function(req, res, next) {

    let events = req.body.events[0]
    console.log(events)
    const replyToken = events.replyToken

    const client = new line.Client({
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    });

    const message = {
        type: 'text',
        text: 'Hello World!'
    };

    client.replyMessage(replyToken, message)
    .then(() => {
        console.log('success')
    })
    .catch((err) => {
        // error handling
    });
});

function getCryptoPrice() {
    fetch(`process.env.COIN_API?filter_asset_id=BTC;ETH`, {
        method: 'GET',
        headers: {
            'X-CoinAPI-Key': process.env.COINAPI_Key
        },
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

module.exports = router;
