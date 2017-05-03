// Imports the Google Cloud client library
const Language = require('@google-cloud/language')
const Promise = require('bluebird')

// Instantiates a client
const language = Language({
  projectId: 'fabler-166415',
  keyFilename: '../Fabler-630ee723e518.json'
  //^make these environment variables
});

const analyzeSpeech = function (speechResult) {
  // console.log('speechResult', speechResult)
  const document = language.document({ content: speechResult });
  let response = {
    entities: [],
    sentiment: null
  }
  
  Promise.all([
    document.detectSentiment(),
    document.detectEntities(),
    //document.detectSyntax()
  ])
    .spread((sentimentResult, entitiesResult) => {
      let score = sentimentResult[0].score
      entitiesResult[0].forEach(entity => response.entities.push(entity.name))
      response.sentiment = score
      //add logic to put verb stuff on the response object
      return response
    })
    .catch(console.error)

  // document.detectSyntax()
  //   .then((results) => {
  //     console.log(results)
  //     const syntax = results[0];

  //     console.log('Parts of speech:');
  //     syntax.forEach((part) => {
  //       console.log(`${part.partOfSpeech.tag}:\t ${part.text.content}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('ERROR:', err);
  //   });
}

module.exports = analyzeSpeech
