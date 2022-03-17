/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';



const apiToken = 'BQATKM6ael24gFjGvtiYjcgByrq7xPXG3joDedy7uTC2EbjG3M-y9UxfSIQyxydDN-Bd__21YggtBWlo8APpmj2RHNRHJfSHY73U7_pjMGaDqxuZIv9TH_jOZgb70bofRnLJ2UM34WGU3UwupqxgKvKm0Cqjnlc13b5NiHo_mYG_Hd5q';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState([])
  const [songsLoaded, setsongsLoaded] = useState(false)
  const i = getRandomNumber(20);

  useEffect(() => {fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
     Authorization: 'Bearer ' + apiToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      setTracks(data['items']);
      setsongsLoaded(true);
      
    })}, [])
  
  const button0 = tracks[getRandomNumber(20)];
  const button1 = tracks[i];
  const button2 = tracks[getRandomNumber(20)];

  if (songsLoaded){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <p> {tracks[i].track.name}, {tracks[i].track.album.name}
          </p>
          <AlbumCover track={tracks[i]} />
          <Sound url={tracks[i].track.preview_url} playStatus={Sound.status.PLAYING}/>
        </div>
        <div className="App-buttons">
          <Button onClick={() => swal('Dommage', "C'est perdu...", 'error')}>{button0.track.name}</Button>
          <Button onClick={() => swal('Bravo', 'Tu as trouvé !','success')}>{button1.track.name}</Button>
          <Button onClick={() => swal('Dommage', "C'est perdu...", 'error')}>{button2.track.name}</Button>
        </div>
      </div>
    );
  }
  else {
    return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <img src={loading} className="App-logo" alt="logo"/>
        </div>
        <div className="App-buttons">
        </div>
      </div>)
  }
  
}

const AlbumCover = (props) =>  {
  const t = props.track;
  const src = t.track.album.images[0].url; // A changer ;)
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

export default App;
