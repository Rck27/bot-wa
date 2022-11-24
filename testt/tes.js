const fs = require("fs");

let db, keyDb;


async function upDb(){
     db = JSON.parse(fs.readFileSync('db.json'));
     keyDb = Object.keys(db);
}

// db["erik"] = 10;
// fs.writeFileSync('db.json', JSON.stringify(db));
tes();

async function tes(){
    await upDb();
    db['erik'] = 100;
    console.log(db);
    await fs.writeFileSync('db.json', JSON.stringify(db));
}

module.exports = tes;