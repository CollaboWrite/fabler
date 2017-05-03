import React from 'react'
import axios from 'axios'

const sentimentDb = require('../server/db/seed')

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// TODO: removed Disable button property - can add later

let counter = -1
function nextPhrase() {
  counter++
  return counter
}

export default class Root extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      prompt: [ 'A very young Mouse, who had never seen anything of the world, almost came to grief the very first time he ventured out.',
                'And this is the story he told his mother about his adventures.'],
      testBtn: '',
      backgroundColor: 'white'
    }
    this.testSpeech = this.testSpeech.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(ev) {
    ev.preventDefault()
    this.testSpeech()
  }
  testSpeech() {
    const self = this
    this.testBtn = 'disabled'
    // testBtn.textContent = 'Test in progress';

    // const phrase = phrases[nextPhrase()];
    // phrasePara.textContent = phrase;

    // const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    let sentence = "";
    recognition.onresult = function(event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at position 0.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      const speechCompiler = event.results[0][0].transcript;
      // diagnosticPara.textContent = 'Speech received: ' + speechCompiler + '.';

      sentence = speechCompiler

      // console.log(speechCompiler)

      // console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function() {
      recognition.stop();
      this.testBtn = ''
      // testBtn.textContent = 'Start new test';
      axios.post('/input', {sentence})
      .then((nlpObj) => {
        let sentiment = nlpObj.sentiment
        if (sentiment < -0.75) {
          sentiment = 'negative'
        } else if (sentiment > 0.75) {
          sentiment = 'positive'
        } else {
          sentiment = 'neutral'
        }
        let bgColor
        sentimentDb.orderByChild('name').equalTo(sentiment).once('value')
        .then(function(snapshot) {
          bgColor = snapshot.val()
          nlpObj.bgColor = bgColor[sentiment].color
          return nlpObj
        })
        .then(function(nlpObj){
          self.setState({backgroundColor: nlpObj.bgColor})
        })
        // return nlpObj    if we need to do further Firebase queries!!!
      })
      .catch(err => console.error(err))
    }

    recognition.onerror = function(event) {
      this.testBtn = ''
      // testBtn.textContent = 'Start new test';
      // diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
    }

  }

  render() {
    return (
      <div style={{backgroundColor: this.state.backgroundColor}}>
        <h1>Phrase matcher</h1>
        <p>Press the button then say the phrase to test the recognition.</p>
        <button onClick={this.handleClick}>Start new test</button>
        <div>
            <p className="phrase">Phrase...</p>
            <p className="output">...diagnostic messages</p>
        </div>
      </div>
    )
  }

}
