const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const bitCore = require("bitcore-lib");
let lastPrice;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get('/', (req, res) => {
  getPrice((lastPrice) => {
    res.render("index", {
      lastPrice
    });
  })
});

app.get('/brain', (req, res) => {
  getPrice((lastPrice) => {
    res.render("brain", {
      lastPrice
    });
  })
});

app.get('/converter', (req, res) => {
  getPrice((lastPrice) => {
    res.render("converter", {
      lastPrice
    });
  })
});

function brainWallet (uinput, callback) {
  const input = new Buffer(uinput);
  const hash = bitCore.crypto.Hash.sha256(input);
  const bn = bitCore.crypto.BN.fromBuffer(hash);
  const pk = new bitCore.PrivateKey(bn).toWIF();
  const addy = new bitCore.PrivateKey(bn).toAddress();
  callback(pk, addy);
}

function getPrice (returnPrice) {
  request({
    url: "https://blockchain.info/ticker",
    json: true
  }, (err, res, body) => {
    returnPrice(body.USD.buy);
  });
}

request({
  url: "https://blockchain.info/ticker",
  json: true
}, (err, res, body) => {
  lastPrice = body.USD.buy;
});

app.post('/wallet', (req, res) => {
  let brainsrc = req.body.brainsrc;
  brainWallet(brainsrc, (priv, addr) => res.send('The brain wallet of: ' + brainsrc + "<br>Addy:"
    + addr + "<br>Private key:" + priv));
});

app.listen(8080, () => {
  console.log('GO');
});
