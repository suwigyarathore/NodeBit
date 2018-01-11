const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const bitCore = require("bitcore-lib");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function brainWallet (uinput, callback) {
  const input = new Buffer(brainsrc);
  const hash = bitCore.crypto.Hash.sha256(input);
  const bn = bitCore.crypto.BN.fromBuffer(hash);
  const pk = new bitCore.PrivateKey(bn).toWIF();
  const addy = new bitCore.PrivateKey(bn).toAddress();
  callback(pk, addy);
}

app.post('/wallet', (req, res) => {
  let brainsrc = req.body.brainsrc;
  console.log('brainsrc', brainsrc);
  brainWallet(brainsrc, (priv, addr) => res.send('The brain wallet of: ' + brainsrc + "<br>Addy:"
    + addr + "<br>Private key:" + priv));
});

app.listen(8080, () => {
  console.log('GO');
});
