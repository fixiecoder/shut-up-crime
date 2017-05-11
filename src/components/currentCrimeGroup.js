import React from 'react';
import propTypes from 'prop-types';
import closeIcon from '../assets/images/close-icon.png';

export default function CurrentCrimeGroup(props) {
  const wrapperStyle = {
    boxSizing: 'border-box',
    width: 250,
    maxHeight: 'calc(66vh - 20px)',
    position: 'absolute',
    top: 10,
    left: 30,
    zIndex: 3,
    backgroundColor: 'white',
    padding: 10,
    overflowY: 'auto',
    boxShadow: '0px 0px 34px -6px rgba(0,0,0,0.75)'
  };

  const closeButtonStyle = {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer'
  };

  const iconStyle = {
    width: '100%'
  };

  const crimes = props.crimeGroup.crimes.map(crime => <li key={crime.key}>{crime.category}</li>);

  return (
    <div style={wrapperStyle}>
      <div style={closeButtonStyle} onClick={() => props.displayCrimeGroup(null)}>
        <img style={iconStyle} src={closeIcon} alt="" />
      </div>
      <h3 style={{ textAlign: 'center' }}>{props.crimeGroup.street}</h3>
      <ul>
        {crimes}
      </ul>
    </div>
  );
}

CurrentCrimeGroup.propTypes = {
  crimeGroup: propTypes.object,
  displayCrimeGroup: propTypes.func
};
