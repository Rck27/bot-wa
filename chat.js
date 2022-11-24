const {MessageMedia} = require('whatsapp-web.js');
const toImage = require('./to-image');
const {getList, getButton} = require("./lib/commands.js");


let state = 0;
async function chatHandle(client, chat, msg){
    try {
        parsedMsg = msg.body.split(".");
        if(state == 1){
            console.log(parsedMsg[3]);
            let sender;
            parsedMsg[2] == undefined ? sender = "Rahasia" : sender = parsedMsg[2];
            let teks = `halo, ada yang ngirim kamu pesan loh
Dari : ${parsedMsg[2]}
Pesan : ${parsedMsg[1]}`;
            client.sendMessage(parsedMsg[0]+"@c.us", teks);
            about(chat, teks, "!menfess ikutan tes", parsedMsg[0]+"@c.us");
            state = 0;
        }
        if(parsedMsg[0] == '!about'){
            about(chat, "tesssssssssssssssss", "bt1 bt2 bt3");
        }
        //divide the message as three part, method, value and...
        if(parsedMsg[0] == "!menfess"){
            state = 1;
            let teks = `*menfess*
Cara kirim : noTujuan.Pesan.Pengirim
contoh : 6283111499433.aku.lup u
*note, untuk mengirim pesan lagi, ketikkan ulang !menfess terlebih dahulu.*
opsi pengirim dapat dikosongi`;
            chat.sendMessage(teks);
        }
        if(parsedMsg[0] == "!sticker" && state == 0){
            if(msg.hasMedia){
                let media = await msg.downloadMedia();
                console.log(media);
                chat.sendMessage(media, {sendMediaAsSticker: true, stickerAuthor: "de.ricc",stickerName: "bot"
                });
            }
            else {
                let media = await toImage(parsedMsg[1]);
                console.log(media);
                let textMedia = await new MessageMedia("image/png", media);
                await chat.sendMessage(textMedia, {sendMediaAsSticker: true, stickerAuthor: "de.ricc",stickerName: "bot"
                });
            }
            return;
        }

    } catch (error) {
        console.log(error);
    }
}
async function about(chat, capt, bt, toWho = chat.id._serialized){
	try {
		// const chat = await msg.getChat();
        var mBody = `!btn --title="Bot g
        aje" --cap="${capt}" --pop="De.ricc" ${bt}`;
		var mBodySplit = mBody.split(" ");

		var mCommand = mBodySplit[0];
		var mArg = mBody.includes(" ") ? mBodySplit.slice(1).join(" ") : false;
		var obj = await getButton(mArg);
					if (obj) {
						console.log(chat.id + toWho);
						// client.sendMessage(msg.from, obj);
						client.sendMessage(toWho, obj);
						//msg.delete(true);
						//msg.delete();
					}
	} catch (error) {
		console.log(error);
	}
}
module.exports = chatHandle;