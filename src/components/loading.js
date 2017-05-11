import React from 'react';
import loadingGif from '../assets/images/loading.svg';

export default function Loading() {
  const style = {
    width: 200,
    height: 200,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
    pointerEvents: 'none'
  };

  const imageStyle = {
    width: '100%'
  };

  return (
    <div style={style}>
      <img style={imageStyle} alt="" src={loadingGif} draggable="false" />
    </div>
  );
}
