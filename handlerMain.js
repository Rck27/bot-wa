const UltimateTextToImage = require("./to-image");
const {MessageMedia} = require("whatsapp-web.js");
let process = require("process");
var os = require("os-utils");
let parsed, chat, stat;


async function mainHandler(msg, client){
try {
    chat = await msg.getChat();
    parsed = msg.body.split(".");
    if(parsed[1] == "about") aboutHandler();
    else if(parsed[1] == "s" || parsed[1] == "!s") stickerHandle(msg, client);
    else if(parsed[1] == "mfs") menfessHandler(msg, client);
} catch (err) {
    console.error(err);
}
}

async function aboutHandler(){
    stat = "\n"
    // for (const [key,value] of Object.entries(process.memoryUsage())){
    //     stat += `${key}, ${value/1000000}MB \n`
    // }
    stat += os.cpuCount();
    os.allLoadavg();
    about = `\t \t \t *Bot-leg* \n >sticker .s \n >menfess .mfs \n *Memory usage* \n ${os.cpuCount()} \n ${os.freememPercentage()} \n ${os.allLoadavg()}`;
    chat.sendMessage(about);
}


async function menfessHandler(msg, client){
try {
    let from = parsed[4];
    //chat.sendMessage("hai");
    /////.mfs.tujuan.pesan.dari////////////
    ////0/1//////2/////3////4////////
    if(typeof parsed[2] == 'undefined'){
        // console.log("hai");
        chat.sendMessage(" format : mfs.tujuan.pesan.dari(opsional)\n contoh \n .mfs.6289111499433.utangmu.rahasia");
        return;
    }
    // console.log("is this executed?"+parsed[2]+"@c.us");
    if(typeof parsed[4] == 'undefined') from = "rahasia";
    let isi = ` hi, ada yang memberi pesan,\n isinya : ${parsed[3]},\n dari ${from}`;
    client.sendMessage(parsed[2]+"@c.us", isi);
    //client.sendMessage(parsed[2]+'@c.us', parsed[3]);
    //send();

} catch (err) {
    console.error(err)
}
}

async function stickerHandle(msg, client){
try {
    if(msg.hasMedia){
        let media = await msg.downloadMedia();
        console.log(media);
        await chat.sendMessage(media, {sendMediaAsSticker: true, stickerAuthor: "de.ricc",stickerName: "bot"
        });
    }
    else {
        if(!parsed[2]) chat.sendMessage("no text provided");
        let media = await UltimateTextToImage(parsed[2]);
        let textMedia = await new MessageMedia("image/png", media);
        await chat.sendMessage(textMedia, {sendMediaAsSticker: true, stickerAuthor: "de.ricc",stickerName: "bot"
        });
    }
} catch (err) {
    console.error(err);
}
}

module.exports = mainHandler;