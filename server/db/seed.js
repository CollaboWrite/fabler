const seedNoun = require('./seedNoun')
const seedSentiment = require('./seedSentiment')
const seedAction = require('./seedAction')

const firebase = require('./index')

const db = firebase.database()
// const nounDb = db.ref('nouns')
const sentimentDb = db.ref('sentiments')
// const actionDb = db.ref('actions')

// TO SEED, un-comment and run this file
// const nounDb = db.ref('nouns').set(seedNoun)
// const sentimentDb = db.ref('sentiments').set(seedSentiment)
// const actionDb = db.ref('actions').set(seedAction)

module.exports = sentimentDb
