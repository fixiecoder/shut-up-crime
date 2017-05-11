import React from 'react';
import propTypes from 'prop-types';

export default function Marker(props) {
  const size = 25 + (props.crimeGroup.count);
  const style = {
    width: size,
    height: size,
    top: size / 2,
    left: size / 2,
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer'
  };

  return (
    <div style={style} onClick={() => { props.displayCrimeGroup(props.crimeGroup.groupId); }}>
      {props.crimeGroup.count}
    </div>
  );
}

Marker.propTypes = {
  crimeGroup: propTypes.object,
  displayCrimeGroup: propTypes.func
};
