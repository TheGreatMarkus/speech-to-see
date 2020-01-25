async function quickstart() {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    // The text to analyze
    const text = 'Hello, world!';
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeEntitySentiment({document: document});
    const entities = result.entities[0];
    console.log(`word: ${entities.name}`);
    console.log(`type: ${entities.type}`);
    console.log(`salience: ${entities.salience}`);
  }

  quickstart().catch(console.error);