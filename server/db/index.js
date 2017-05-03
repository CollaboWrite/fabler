const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: "AIzaSyCiZ-uKSWpNfsLWr8sjSvEjIRHSg9dzeMU",
  authDomain: "fabler-bf9eb.firebaseapp.com",
  databaseURL: "https://fabler-bf9eb.firebaseio.com",
  projectId: "fabler-bf9eb",
  storageBucket: "fabler-bf9eb.appspot.com",
  messagingSenderId: "751280677739"
}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
