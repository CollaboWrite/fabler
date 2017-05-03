// import axios from 'axios'

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
// const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// const phrases = [
//   'A very young Mouse, who had never seen anything of the world, almost came to grief the very first time he ventured out.',
//   'And this is the story he told his mother about his adventures.'
// ]

// const phrasePara = document.querySelector('.phrase');
// const diagnosticPara = document.querySelector('.output');

// const testBtn = document.querySelector('button');

// let counter = -1
// function nextPhrase() {
//   counter++
//   return counter
// }


function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  const phrase = phrases[nextPhrase()];
  phrasePara.textContent = phrase;

  const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
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
    diagnosticPara.textContent = 'Speech received: ' + speechCompiler + '.';

    sentence = speechCompiler

    console.log(speechCompiler)

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    axios.post('/input', {sentence})
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }

}

testBtn.addEventListener('click', testSpeech);
