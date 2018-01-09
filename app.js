const express = require("express");
const request = require("request");

const app = express();
let btcPrice;
let btcBlocks;

request({
  url: "https://blockchain.info/stats?format=json",
  json: true
}, (error, res, body) => {
  btcPrice = body.market_price_usd;
  btcBlocks = body.n_blocks_total;
})

app.get('/', (req, res) => {
  res.send('Coin to the moon ' + btcPrice);
});

app.get('/block', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => {
  console.log('GO');
});
