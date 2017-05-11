import { connect } from 'react-redux';
import MainComponent from '../components/main-component';
import { getCrimeData, goToPlace, displayCrimeGroup, changeSearchValue } from '../actions/main-actions';

const mapStateToProps = (state) => ({
  crimeData: state.mainReducer.crimeData,
  graphData: state.mainReducer.graphData,
  unableToDisplayCrimes: state.mainReducer.unableToDisplayCrimes,
  center: state.mainReducer.center,
  zoom: state.mainReducer.zoom,
  loading: state.mainReducer.loading,
  currentCrimeGroup: state.mainReducer.currentCrimeGroup,
});

const mapDispatchToProps = (dispatch) => ({
  goToPlace: (place) => { dispatch(goToPlace(place)); },
  displayCrimeGroup: (crimeGroupId) => { dispatch(displayCrimeGroup(crimeGroupId)); },
  changeSearchValue: (value) => { dispatch(changeSearchValue(value)); },
  getCrimeData: (boundsData) => { dispatch(getCrimeData(boundsData)); }
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

export default MainContainer;
