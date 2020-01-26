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

  console.log(`text: ${text}`)
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

  // TODO

  let response = {
    action,
    object
  };

  return response;
}

