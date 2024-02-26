/*

This component is used to generate the color palette. The color Palette contains 9 differnet colors.

*/


import React, { useState } from 'react';
import './Color.css'; // Import CSS file

const ColorPalette = ({ onColorSelect }) => {
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // Dictionary of 9 colors with three different shades for each color
  const colors = {
    red: ['#FF5733', '#FF2800', '#FF8050'],
    yellow: ['#FFBD33', '#FFA700', '#FFD966'],
    green: ['#56FF33', '#00E600', '#80FF7A'],
    blue: ['#33C6FF', '#0080FF', '#66D9FF'],
    purple: ['#9366FF', '#6633FF', '#AB99FF'],
    orange: ['#FFA633', '#FF8500', '#FFB366'],
    pink: ['#FF33A6', '#FF0080', '#FF66B3'],
    cyan: ['#33FFEB', '#00E6C0', '#80FFFC'],
    gray: ['#BFBFBF', '#808080', '#D9D9D9'],
  };

  const togglePaletteVisibility = () => {
    setPaletteVisible(!paletteVisible);
  };


  //Function to show the color palette
  const handleColorClick = (color) => {
    const selectedColorList = colors[Object.keys(colors).find(key => colors[key].includes(color))];
    setSelectedColor({ color, list: selectedColorList });
    setPaletteVisible(false);
    if (typeof onColorSelect === 'function') {
      onColorSelect({ color, list: selectedColorList });
    }
  };

  return (
    <div className="palette-container">
      <button onClick={togglePaletteVisibility} className="palette-button">
        {paletteVisible ? <img className='icon' src='./icons/close.png' alt='Open Color Palette'/> : <img className='icon' src='./icons/rainbow.png' alt='Close Color Palette'/>}
      </button>

      {/* Generates the color grid. Selecting the color will change the whole color combinations.*/}
      {paletteVisible && (
        <div className="palette-dropdown">
          <div className="palette-grid">
            {Object.keys(colors).map((colorName, index) => (
              <div
                key={index}
                className="palette-color"
                style={{ backgroundColor: colors[colorName][0] }}
                onClick={() => handleColorClick(colors[colorName][0])}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ColorPalette;
