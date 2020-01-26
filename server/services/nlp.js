async function processString(text) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    // The text to analyze
    const text = 'Hello, world!';
    const features = {
      "extractSyntax": true,
      "extractEntities": true,
    };
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT'
    };
  
    // Detects the sentiment of the text
    const [result] = await client.annotateText({document: document, features: features});
    const entities = result.entities[0];
    const verb = result.tokens[0].partOfSpeech;
    console.log(`verb: ${verb}`);
    console.log(result);
    console.log()
    console.log(`word: ${entities.name}`);
    console.log(`type: ${entities.type}`);
    console.log(`salience: ${entities.salience}`);
  }

  processString().catch(console.error);