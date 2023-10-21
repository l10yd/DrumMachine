import './App.css';
import React, { useState, useEffect } from 'react';
import useKeyPress from './useKeyPress';

export default function App() {
  const [displayText, setDisplayText] = useState('Drum Machine');
  const [isPressed, setIsPressed] = useState(null);

  const drumPads = [
    {
      id: 'Q',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    },
    {
      id: 'W',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    },
    {
      id: 'E',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },
    {
      id: 'A',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    },
    {
      id: 'S',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    },
    {
      id: 'D',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    },
    {
      id: 'Z',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },
    {
      id: 'X',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },
    {
      id: 'C',
      audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    },
  ];


  
const playSound = (id, audioSrc) => {
  const audioElement = new Audio(audioSrc);
  audioElement.play();
  const text = audioSrc.split('/').slice(-1)[0].replace('.mp3', '');
  setDisplayText(text);
};

useEffect(() => {
  const keyPressHandler = (event) => {
    const pressedKey = event.key.toUpperCase();

    const drumPad = drumPads.find((pad) => pad.id === pressedKey);
    if (drumPad) {
      playSound(drumPad.id, drumPad.audioSrc);
    }
  };

  window.addEventListener('keydown', keyPressHandler);

  return () => {
    window.removeEventListener('keydown', keyPressHandler);
  };
}, [drumPads]);

return (
  <div id="drum-machine">
    <div id="display">{displayText}</div>
    {drumPads.map((drumPad) => (
      <div
        key={drumPad.id}
        className="drum-pad"
        onClick={() => playSound(drumPad.id, drumPad.audioSrc)}
      >
        {drumPad.id}
      </div>
    ))}
  </div>
);
}