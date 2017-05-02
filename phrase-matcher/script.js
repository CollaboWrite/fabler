var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'A very young Mouse, who had never seen anything of the world, almost came to grief the very first time he ventured out.',
  'And this is the story he told his mother about his adventures.'
]

var phrasePara = document.querySelector('.phrase');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('button');

var counter = -1
function nextPhrase() {
  counter++
  return counter
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phrase = phrases[nextPhrase()];
  phrasePara.textContent = phrase;

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.start();

  const ee = new EventEmitter()
  // const subj = new Rx.FuncSubject()  // Maybe that's what it's called

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript;
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';

    // With eventemitters
    ee.emit('speech', event)

    // With Rx
    // subj(event)

    console.log(speechResult)

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  return ee
  return subj

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    ee.emit('speech', speechResult) 
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }

}

testBtn.addEventListener('click', testSpeech);

// const recognizer = Speech.recognize()
//     , analyzer = Speech.analyze()

// recognizer
//   .on('speech', speech => analyzer.findEntities(speech).on('entities', console.log))

// .map(speech => analyzer.findEntities(speech))
//  .subscribe(console.log)