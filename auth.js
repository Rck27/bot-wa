
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
var clc = require("cli-color");


function auth() {
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: false
        }
    });
    client.initialize();

    client.on('qr', (qr) => {
        qrcode.generate(qr, {small:true});
    });
    client.on('ready', () => {
        console.log("READY")
        client.sendMessage("6283111499433@c.us", "bot running");
    });

    return client;
}
module.exports = auth;