const fs = require("fs");

let memList = [
	"6283111499433@c.us"    
]

async function mem(arr, comp){
	for(x in arr){
		if(x == comp){
			return true;
		}
		else{ return false;}
	}
}
async function handleDb() {
    db = JSON.parse(fs.readFileSync('db.json'));
	keyDb = Object.keys(db);
}

async function handlerPulsa(msg, client){
    if(!mem(memList, msg.from)){
        client.sendMessage(msg.from, "sorry, this number is not registered.");
        return
    }
    let mBody = msg.body;

    await handleDb();
        //split the message, separated with . as array element
        let parsed = msg.body.split(","); //ex : +.08123123.erik
        let opr = parsed[0];
        let nm = parsed[1];
        if(msg.body.includes("show")){
            let fmat = "-> ";

            if(nm == "all"){
                for(x in keyDb){
                    fmat += ` ${keyDb[x]}.${db[keyDb[x]]}.`;
                }
                // fmat = fmat.replace(regex, "");
            }
            else{
                if(db[nm] == undefined) fmat = `${nm} not found `;
                fmat = ` ${nm} = ${db[nm]}`;              
                
            }
            client.sendMessage(msg.from, fmat);
        }
        if(msg.body.includes("P") || msg.body.includes("M")){
            
            oldVal = parseInt(db[nm]);
            val = parseInt(parsed[2]);

            if(db.hasOwnProperty(nm)){ //if an property exist
                let temp;
                if(opr == "P"){
                    temp = oldVal + val;
                    opr = '+';
                }
                else if(opr == "M"){
                    // if(val < oldVal) {
                    //     temp = 0;
                    //     return;
                    // }
                    temp = oldVal - val;
                    opr = "-";
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

module.exports = handlerPulsa;