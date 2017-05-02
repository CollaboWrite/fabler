// Imports the Google Cloud client library
const Language = require('@google-cloud/language')

// Instantiates a client
const language = Language({
  projectId: 'fabler-166415',
  keyFilename: '../Fabler-630ee723e518.json'
});

// The text to analyze, e.g. "Hello, world!"
// const text = 'Hello, world!';

// Instantiates a Document, representing the provided text
const document = language.document({ content: 'Sarah is feeling awesome today' });

document.detectSentiment()
  .then((results) => {
    const sentiment = results[0];
    console.log(`Score: ${sentiment.score}`);
    console.log(`Magnitude: ${sentiment.magnitude}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

document.detectEntities()
  .then((results) => {
    const entities = results[0];

    console.log('Entities:');
    entities.forEach((entity) => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

document.detectSyntax()
  .then((results) => {
    console.log(results)
    const syntax = results[0];

    console.log('Parts of speech:');
    syntax.forEach((part) => {
      console.log(`${part.partOfSpeech.tag}:\t ${part.text.content}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
