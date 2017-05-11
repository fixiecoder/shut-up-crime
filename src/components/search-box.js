import propTypes from 'prop-types';
import React from 'react';

const inputStyle = {
  height: '100%',
  outline: 'none',
  border: 'none',
  width: '100%',
  paddingLeft: 15,
  fontSize: '1.2em',
  boxShadow: '0px 0px 34px -6px rgba(0,0,0,0.75)'
};

const formStyle = {
  zIndex: 2,
  top: 10,
  right: 40,
  position: 'absolute',
  width: 500,
  height: 40,
  display: 'inline-block'
};

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }

  render() {
    return (
      <form style={formStyle} onSubmit={this.onPlacesChanged}>
        <input style={inputStyle} ref={el => (this.input = el)} type="text" placeholder="search for a location" />
      </form>
    );
  }

  onPlacesChanged(e) {
    if(e) {
      e.preventDefault();
    }
    if(this.props.onPlacesChanged) {
      const places = this.searchBox.getPlaces();
      this.props.onPlacesChanged(places);
    }
  }

  componentDidMount() {
    this.searchBox = new window.google.maps.places.SearchBox(this.input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
}

SearchBox.propTypes = {
  onPlacesChanged: propTypes.func
};
