const textToImage = require('text-to-image');
const {UltimateTextToImage} = require("ultimate-text-to-image");
var clc = require("cli-color");



//function for mapping
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

async function textToImageFun(text) {
  try{
    let fontSize;
    let lineHeight;
    const textLength = text.length;

    //defining font size and line height depending on text lenth
       fontSize = Math.floor(scale(textLength, 1, 100, 185, 85));


    //creating the image from the text
    let dataUri = new UltimateTextToImage(text, {
      width: 650,
      height: 1024,
      fontFamily: "Arial",
      
      fontSize: fontSize,
      strokeSize: 5,
      backgroundColor: "00FFFF00",
      strokeColor: "#000000",
      fontColor: "#ffffff",
      align: "center",
      valign: "middle",
      margin: 1,
      chopOverflow: false
    }).render().toBuffer().toString("base64");
    return dataUri;
} catch (err) {
  return "TextTooLong"
}
};

module.exports = textToImageFun