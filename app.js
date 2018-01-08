const http = require("http");
const request = require("request");

http.createServer((req, res) => {
  //req is new visitor

  request({
    url: "https://blockchain.info/stats?format=json",
    json: true
  }, (error, res, body) => {
    console.log(body.market_price_usd);
  })

  console.log('I am new bit coin user' + req.url);
  res.end("Bitcoin to moon");
}).listen(8080);
