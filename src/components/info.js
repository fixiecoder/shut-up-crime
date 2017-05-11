import React from 'react';
import infoIcon from '../assets/images/info-icon.png';

export default function Info() {
  const wrapperStyle = {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 5
  };

  const messageStyle = {
    fontSize: '1.5em',
    paddingLeft: 5
  };

  const imageStyle = {
    width: 30
  };

  return (
    <div style={wrapperStyle}>
      <img style={imageStyle} src={infoIcon} alt=""/>
      <span style={messageStyle}>Either search or zoom in closer to display crime data</span>
    </div>
  );
}
