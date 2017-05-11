import React, { Component } from 'react';
import propTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import SearchBox from './search-box';
import Loading from './loading';
import CurrentCrimeGroup from './currentCrimeGroup';
import Info from './info';
import Graph from './graph';
import { maps as mapsAPIKey } from '../constants/constants';

export default class SimpleMap extends Component {
  render() {
    const infoMessage = this.props.unableToDisplayCrimes === true ? <Info /> : null;
    const crimeGroups = Object.keys(this.props.crimeData);
    const crimeGroupElement = this.props.currentCrimeGroup !== null ?
      <CurrentCrimeGroup
        crimeGroup={this.props.crimeData[this.props.currentCrimeGroup]}
        displayCrimeGroup={this.props.displayCrimeGroup}
      /> : null;

    const loadingElement = this.props.loading ? <Loading /> : null;
    const markers = crimeGroups.length > 0 ? crimeGroups.map(crimeId => {
      const crimeGroup = this.props.crimeData[crimeId];
      return (
        <Marker
          key={crimeGroup.groupId}
          lat={crimeGroup.lat}
          lng={crimeGroup.lng}
          crimeGroup={crimeGroup}
          displayCrimeGroup={this.props.displayCrimeGroup}
        />
      );
    }) : null;

    return (
      <div style={{ height: '100vh' }}>
        {infoMessage}
        {loadingElement}
        {crimeGroupElement}
        <Graph graphData={this.props.graphData}/>
        <SearchBox onPlacesChanged={this.props.goToPlace} changeSearchValue={this.props.changeSearchValue} />
        <GoogleMapReact
          onChange={this.props.getCrimeData}
          bootstrapURLKeys={{
            key: mapsAPIKey,
            language: 'en',
          }}
          center={this.props.center}
          zoom={this.props.zoom}
        >
        {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

SimpleMap.propTypes = {
  getCrimeData: propTypes.func,
  goToPlace: propTypes.func,
  unableToDisplayCrimes: propTypes.bool,
  zoom: propTypes.number,
  center: propTypes.object,
  crimeData: propTypes.object,
  currentCrimeGroup: propTypes.number,
  loading: propTypes.number,
  displayCrimeGroup: propTypes.func,
  graphData: propTypes.object,
};
