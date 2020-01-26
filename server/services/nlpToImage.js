module.exports.nlpToImage = async function nlpToImage(text){
    let nlp = require('./nlp');
    let shutterstock = require('./shutterstock');
    
    let processedText = await nlp.processString(text);
    let image_url = await shutterstock.searchImage(processedText.object);
    return image_url;
}