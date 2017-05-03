const seedNoun = require('./seedNoun')
const seedSentiment = require('./seedSentiment')
const seedAction = require('./seedAction')

const firebase = require('./index')

const db = firebase.database()

// TO SEED, un-comment and run this file
// const nounDb = db.ref('nouns').set(seedNoun)
// const sentimentDb = db.ref('sentiments').set(seedSentiment)
// const actionDb = db.ref('actions').set(seedAction)
