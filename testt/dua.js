const textToImageFun = require("../to-image");
const fs = require("fs")
async function a() {
    let b = await textToImageFun("yesus ae sampek godek-godek");
    await fs.writeFileSync("./a.png", b)
}
a();
//console.log(b);
//fs.writeFileSync("./a.jpg", b);
//console.log(textToImageFun("hiii"));