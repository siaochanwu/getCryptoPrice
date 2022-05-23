require('dotenv').config();
const schedule = require('node-schedule');
const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const line = require('@line/bot-sdk');

/* GET users listing. */
router.post('/line', async (req, res, next) => {

    let events = req.body.events[0]
    // console.log(events)
    // const replyToken = events.replyToken;
    pushMSG();
    
});

function pushMSG() {
    const client = new line.Client({
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    });

    axios({
        url: `${process.env.COIN_API}?filter_asset_id=BTC,ETH`,
        method: 'get',
        headers: {
            'X-CoinAPI-Key': process.env.COINAPI_Key
        },
    })
    .then((res) => {
        console.log(res)
        const BTC = res.data[0].price_usd;
        const ETH = res.data[1].price_usd;

        const message = {
            type: 'text',
            text: `BTC: ${BTC} \nETH: ${ETH}`
        };
    
        client.pushMessage(process.env.USER_ID, message)
        .then(() => {
            console.log('success')
        })
        .catch((err) => {
            // error handling
        });
    })
    .catch((err) => console.error(err))
}

const job = schedule.scheduleJob('0 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    pushMSG();
  });
module.exports = router;

