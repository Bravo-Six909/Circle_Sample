
/*
This component is responsible for setting the p,f value and to create the circle.

It contains 

  -> parent-body: Contains 2 parts
    1. Color Palette
    2. main section.
  -> color-palette-sec: Contains the Color Palette Component
  -> main-sec: It contains
      => canvas: for circle
      => p-block: which contains text for p value, slider for changing the p value
      => f-block: which contains text for p value, slider for changing the f value
      =>draw-btn: for drawing the button
*/ 


import './App.css';
import { useState, useEffect } from 'react';
import ColorPalette from './Color';


const App = () => {
  const [p, setP] = useState(0);  // Set p value
  const [f, setF] = useState(0);  // Set f value
  const [selectedColorInfo, setSelectedColorInfo] = useState({
    list: ['#9366FF', '#6633FF', '#AB99FF']
  });

  useEffect(() => {
  }, [setSelectedColorInfo.list]);

  const handleColorSelect = (colorInfo) => {
    setSelectedColorInfo(colorInfo);
  };

  //Function for changing the p value
  const handlePChange = (e) => {
    setP(parseInt(e.target.value));
  };


  //Function for changing the f value
  const handleFChange = (e) => {
    setF(parseInt(e.target.value));
  };


  //Function for drawing circle using context
  const drawCircle = () => {
    const canvas = document.getElementById('circleCanvas');
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const angle = (2 * Math.PI) / p;
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < p; i++) {
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, i * angle, (i + 1) * angle);
      context.closePath();
      if (i < f) {
        context.fillStyle = selectedColorInfo.list[0];
      } else {
        context.fillStyle = '#e3cdf3';
      }
  
      context.fill();
    }
  };



  //Styling to give to components

  //1. Gradient colors which is given to main-sec
  const gradientStyle = {
    background: `linear-gradient(45deg, ${selectedColorInfo.list[1]} 0%,${selectedColorInfo.list[2]} 0%, #aebaf8 100%, white)`
  };

  //2. Thumb style which is given to the slider for both p and f value.
  const styles = {
    thumb: {
      background: `${selectedColorInfo.list[1]}`,
    }
  };

  return (
  <div className='parent-body'>

    <div className='color-palette-sec'>
      <ColorPalette className='color-palette' onColorSelect={handleColorSelect}/>
    </div>

    <div className='main-sec-body'>

      <div className="main-sec" style={gradientStyle}>
        
        {/* Circle section */}
        <canvas id="circleCanvas" width="300" height="300"></canvas>

        {/* p -slider */}
        <div className='p-block'>
          <p className='label'>Choose the value of p (1-25)</p>
          <input style={styles.thumb}  type="range" id="pSlider" name="pSlider" min="1" max="25" value={p} onChange={handlePChange}/>
          <span className='slider-val'>{p}</span>
        </div>

        {/* f-slider */}
        <div className='f-block'>
          <p className='label'>Choose the value of f (0-p):</p>
          <input style={styles.thumb} type="range" id="fSlider" name="fSlider" min="0" max={p} value={f} onChange={handleFChange}/>
          <span className='slider-val'>{f}</span>
          <button style={{color:selectedColorInfo.list[1]}} className='draw-btn' onClick={drawCircle}>Draw Circle</button>
        </div>

      </div>
    </div>

  </div>
  );
};

export default App;
