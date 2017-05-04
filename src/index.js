import React from 'react'
import axios from 'axios'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import { render } from 'react-dom'

const sentimentDb = require('../server/db/seed')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

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
      color: 'white',
    }
    this.testSpeech = this.testSpeech.bind(this)
    this.changeColor = this.changeColor.bind(this)
  }

  changeColor() {
    this.testSpeech()
  }

  testSpeech() {
    // const self = this
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

    // let sentence = '';
    recognition.onresult = (event) => {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at position 0.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      const sentence = event.results[0][0].transcript;
      // diagnosticPara.textContent = 'Speech received: ' + speechCompiler + '.';

      // sentence = speechCompiler

      console.log(sentence)

      // console.log('Confidence: ' + event.results[0][0].confidence);

      axios.post('/input', {sentence})
      .then((nlpObj) => {
        let sentiment = nlpObj.data.sentiment
        if (sentiment < 0) {
          sentiment = 'negative'
        } else if (sentiment > 0.25) {
          sentiment = 'positive'
        } else {
          sentiment = 'neutral'
        }
        let bgColor
        sentimentDb.orderByChild('name').equalTo(sentiment).once('value')
        .then((snapshot) => {
          bgColor = snapshot.val()
          nlpObj.bgColor = bgColor[sentiment].color
          return nlpObj
        })
        .then((nlpObj) => {
          this.setState({color: nlpObj.bgColor})
        })
        // return nlpObj.data    if we need to do further Firebase queries!!!
      })
      .catch(err => console.error(err))
    }

    recognition.onspeechend = () => {
      recognition.stop();
    }

    recognition.onerror = function(event) {
      console.log('there was a speech recognition error', event.error)
    }

  }

  render() {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        <Entity text={{value: 'Texty text', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

        <Entity id="box"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          position={{x: 0, y: 1, z: -3}}
          events={{click: this.changeColor.bind(this)}}>
          <Entity 
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </Scene>
    )
  }

}

render(<Root />,
  document.querySelector('#sceneContainer'))

// Animation in box entity on line 124
// animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
// animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}

// Animation in box entity on line 129
// animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}