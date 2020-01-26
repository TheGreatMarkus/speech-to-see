module.exports.processString = async function processString(text) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  const features = {
    "extractSyntax": true,
    "extractEntities": true,
  };

  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  };

  if (text === null || typeof text === 'undefined') {
    return {
      action: "",
      object: ""
    }
  }

  // Detects the sentiment of the text
  const [result] = await client.annotateText({ document: document, features: features });

  // Currently assume that there is one sentence
  const tokens = result.tokens;
  const entities = result.entities;

  // Currently only consider one verb per sentence.
  let action = tokens.filter(token => {
    return token.partOfSpeech.tag === "VERB";
  })[0].text.content;


  let objects = entities.sort((entity1, entity2) => {
    return entity2.salience - entity1.salience;
  });

  let object = objects[0].mentions[0].text.content;
  let content = "";
  console.log(`object: ${object}`);
  // Assuming that if you say image, then there is a second noun with smaller salience
  if (object.toLowerCase() === "image" && objects.length > 1) {
    query = objects[1].mentions[0].text.content;
    let shutterstock = require('./shutterstock');

    content = await shutterstock.searchImage(query);
  } else if (objects.length > 1) {
    content = objects[1].mentions[0].text.content;
  }



  let response = {
    action,
    object,
    content: content
  };

  return response;
}

