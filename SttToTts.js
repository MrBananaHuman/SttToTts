var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();

let currentTxt = null;
let synth = speechSynthesis;

let imgs = [];
let frame = 0;

let start_flag = 0;


let isRecord = false;

function preload(){
  for(let i=0; i<9; i++){
    imgs.push(loadImage('parrot'+i+'.png.gif'));
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  background(225);
  frameRate(30);
  image(imgs[frame%imgs.length], width/2, height/2);
}

function speak(txt){
  synth.pause();
  currentTxt = txt;
  
  let utterance = new SpeechSynthesisUtterance(txt);
  
  utterance.pitch = 1;
  utterance.rate = 1;
  
  let voices = synth.getVoices();
  utterance.voice = voices[5];
  
  synth.speak(utterance);  
  utterance.onend = function(event) {
    start_flag = 0;
  }
  utterance.onstart = function(event) {
    start_flag = 1;
  }
  
  synth.resume();
}

function draw() {
  if(start_flag == 1){
    background(random(0, 225), random(0, 225), random(0, 225));
    nextFrame();
  }
}

function mouseClicked(){
  isRecord = true;
  recognition.start();
}

recognition.onresult = function(event) {
  currentTxt = event.results[0][0].transcript;
  print(currentTxt);
  speak(currentTxt);
  isRecord = false;
}

function nextFrame(){
  frame++;
  image(imgs[frame%imgs.length], width/2, height/2);
}
