const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const auth = require('./auth');
//const chatHandler = require('./chat');
const config = require("dotenv/config");
const {getList, getButton} = require("./lib/commands.js");
const fs = require("fs");
let db, keyDb, val, oldVal;
const textToImageFun = require('./to-image');

const PREFIX = process.env.CMD_PREFIX || "!";


const client = auth();

client.on('message', async msg => {
        const chat = await msg.getChat();
		if(checker(pulsaMember, msg.from)){
			handlePulsa(msg, fs);
			chatHandle(client, chat, msg);
		}
        // chatHandle(client, chat, msg);
})



client.on("message_create", (msg) => handleMsg(msg));
async function handleMsg(msg) {
	try {
		const chat = await msg.getChat();
		// var mBody = '!btn --title="A message with buttons" --cap="A message with buttons" --pop="is this a subtitle?" Okay Hmm Yoo!';
	// std == true ? mBody = msg.body :  mBody = '!btn --title="A message with buttons" --cap="A message with buttons" --pop="is this a subtitle?" Okay Hmm Yoo!';
		var mBody = msg.body;
	if (mBody !== "" && msg.id.fromMe === true) {
		var mBodySplit = mBody.split(" ");

		var mCommand = mBodySplit[0];
		var mArg = mBody.includes(" ") ? mBodySplit.slice(1).join(" ") : false;
		
		if (mArg)
			if (msg)
				if (mCommand === PREFIX + "list") {
					var obj = await getList(mArg);
					console.log(obj);
					// if (obj) {
					// 	client.sendMessage(chat.id._serialized, obj);
					// 	msg.delete(true);
					// 	msg.delete();
					// }
				} else if (mCommand === PREFIX + "btn") {
					var obj = await getButton(mArg);
					if (obj) {
						console.log(chat.id + chat.id._serialized);
						// client.sendMessage(msg.from, obj);
						client.sendMessage(chat.id._serialized, obj);
						//msg.delete(true);
						//msg.delete();
					}
				}
	}
	} catch (error) {
		console.log(error);
	}
}
async function handleDb(){
	//let db = fs.readFileSync('db.json');
	db = JSON.parse(fs.readFileSync('db.json'));
	keyDb = Object.keys(db);
}

async function handlePulsa(msg){
	await handleDb();
        let parsed = msg.body.split("."); //ex : +.08123123.erik
        let opr = parsed[0];
        let nm = parsed[1];
        if(msg.body.includes("Show")){
            let fmat = "-> ";

            if(nm === undefined){
                for(x in keyDb){
                    fmat += ` ${keyDb[x]}.${db[keyDb[x]]}.`;
                }
                // fmat = fmat.replace(regex, "");
            }
            else{              
                fmat = ` ${nm} = ${db[nm]}`;
            }
            client.sendMessage(msg.from, fmat);
        }
        if(msg.body.includes("+") || msg.body.includes("-")){
            
            oldVal = parseInt(db[nm]);
            val = parseInt(parsed[2]);

            if(db.hasOwnProperty(nm)){ //if an property exist
                let temp;
                if(opr == "+"){
                    temp = oldVal + val;
                }
                else if(opr == "-"){
                    // if(val < oldVal) {
                    //     temp = 0;
                    //     return;
                    // }
                    temp = oldVal - val;
                }
                else if(opr == "D"){
                    temp = 0;
                }
                client.sendMessage(msg.from, `${nm} ${opr} ${val} = ${temp}`);
                db[nm] = temp;
            }
            else{
                client.sendMessage(msg.from, `${nm} added`);
                db[nm] = val;
            }
			fs.writeFileSync('db.json',JSON.stringify(db));
			console.log(db);
            }
            //client.sendMessage(msg.from, 'hi');
			console.log(db);
        
}

let pulsaMember = [
	"6283111499433@c.us"
];

async function checker(arr, comp){
	for(x in arr){
		if(x == comp){
			return true;
		}
		else{ return false;}
	}
}
let state = 0;
async function chatHandle(client, chat, msg){
    try {
		// if(checker(pulsaMember, msg.from)){
		// 	handlePulsa();
		// }

        parsedMsg = msg.body.split(".");
        if(state == 1){
			try {
				console.log(parsedMsg[3]);
				let sender;
				parsedMsg[2] == undefined ? sender = "Rahasia" : sender = parsedMsg[2];
				let teks = `halo, ada yang ngirim kamu pesan loh
Dari : ${parsedMsg[2]}
Pesan : ${parsedMsg[1]}`;
				//client.sendMessage(parsedMsg[0]+"@c.us", teks);
				about(chat, teks, "💧oke 💧ikutan", parsedMsg[0]+"@c.us");
				state = 0;				
			} catch (error) {
				console.error(error);
			}

        }
        if(parsedMsg[0] == '!about'){
            await about(chat, `
fitur
	sticker
	sticker.caption : rubah text menjadi sticker
	menfess ; as the name implies
	about

		*More features later on*
			`, "bt1 bt2 bt3");
        }
		else if(parsedMsg[0] == "💧oke"){
			client.sendMessage(msg.from, "thanks for participating");
		}
		
        //divide the message as three part, method, value and...
        else if(parsedMsg[0] == "!menfess" || parsedMsg[0] == "💧ikutan"){
            state = 1;
            let teks = `*menfess*
Cara kirim : noTujuan.Pesan.Pengirim
contoh : 6283111499433.aku.lup u
*note, untuk mengirim pesan lagi, ketikkan ulang !menfess terlebih dahulu.*
opsi pengirim dapat dikosongi`;
            await client.sendMessage(msg.from, teks);
        }
        else if(parsedMsg[0] == "!sticker" && state == 0){
            if(msg.hasMedia){
                let media = await msg.downloadMedia();
                console.log(media);
                await chat.sendMessage(media, {sendMediaAsSticker: true, stickerAuthor: "de.ricc",stickerName: "bot"
                });
            }
            else {
                let media = await textToImageFun(parsedMsg[1]);
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
        var mBody = `!btn --title="*BOT-leG*" --cap="${capt}" --pop="De.ricc" ${bt}`;
		var mBodySplit = mBody.split(" ");

		var mCommand = mBodySplit[0];
		var mArg = mBody.includes(" ") ? mBodySplit.slice(1).join(" ") : false;
		var obj = await getButton(mArg);
					if (obj) {
						console.log(chat.id + toWho);
						// client.sendMessage(msg.from, obj);
						await client.sendMessage(toWho, obj);
						//msg.delete(true);
						//msg.delete();
					}
	} catch (error) {
		console.log(error);
	}
}