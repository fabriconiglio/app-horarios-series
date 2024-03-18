import React from 'react';
import './App.css';
import SeriesCarousel from './SeriesCarousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <SeriesCarousel />
        </header>
      </div>
  );
}

export default App;

