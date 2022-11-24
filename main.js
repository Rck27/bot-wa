const { Client, LocalAuth } = require('whatsapp-web.js');
const auth = require('./auth');
//const chatHandler = require('./chat');
const config = require("dotenv/config");
const {getList, getButton} = require("./lib/commands.js");
const fs = require("fs");
const textToImageFun = require('./to-image');
const PREFIX = process.env.CMD_PREFIX || "!";
const handlerPulsa = require('./handlerPulsa');
const mainHandler = require('./handlerMain');
const client = auth();

client.on('message', (msg) => handler(msg));

async function handler(msg){
    try {
        let chat = await msg.getChat();
        let mBody = msg.body;
        if(mBody.includes(",") && mBody.split(",").length >= 2) handlerPulsa(msg, client);
        if(mBody.includes(".")) mainHandler(msg, client);
        else{
            client.sendMessage(msg.from, `${msg.body}, soon be imiplemented`);
            //handlerMain(msg, client);
        }
    } catch (error) {
        console.error(error);
    }
}


