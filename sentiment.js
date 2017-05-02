// Imports the Google Cloud client library
const Language = require('@google-cloud/language')

// Instantiates a client
const language = Language({
  projectId: 'fabler-166415',
  keyFilename: '../Fabler-630ee723e518.json'
});
const EventEmitter = require('node-event-emitter');


import ee from './phrase-matcher/script.js'

ee.on('speech', (speechResult) => console.log(speechResult))

// ee.on('speech', function(speechResult) {
// console.log('speechResult', speechResult)
const document = language.document({ content: speechResult });

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
// })

