import * as types from '../actions/types/main-actions-types';

function setCrimeData(state, action) {
  return Object.assign(
    {},
    state,
    {
      crimeData: action.data,
      currentCrimeGroup: null,
      unableToDisplayCrimes: false,
      graphData: action.graphData2
    }
  );
}

function setUnableToDisplayCrimes(state) {
  return Object.assign({}, state, { unableToDisplayCrimes: true });
}

function goTo(state, action) {
  return Object.assign({}, state, { center: action.center, zoom: action.zoom });
}

function loadingStarted(state) {
  const loading = state.loading + 1;
  return Object.assign({}, state, { loading });
}

function loadingFinished(state) {
  const loading = state.loading === 0 ? 0 : state.loading -= 1;
  return Object.assign({}, state, { loading });
}

function setCurrentCrimeGroup(state, action) {
  return Object.assign({}, state, { currentCrimeGroup: action.crimeGroupId });
}

const initialState = {
  message: '',
  crimeData: {},
  unableToDisplayCrimes: false,
  center: { lat: 51.772, lng: -1.79733 },
  zoom: 8,
  loading: 0,
  currentCrimeGroup: null,
  graphData: {},
  searchValue: ''
};

export default function calendar(state = initialState, action) {
  switch(action.type) {

    case types.SET_CURRENT_CRIME_GROUP:
      return setCurrentCrimeGroup(state, action);

    case types.CRIME_DATA:
      return setCrimeData(state, action);

    case types.UNABLE_TO_DISPLAY_CRIMES:
      return setUnableToDisplayCrimes(state, action);

    case types.GO_TO:
      return goTo(state, action);

    case types.LOADING_STARTED:
      return loadingStarted(state, action);

    case types.LOADING_FINISHED:
      return loadingFinished(state, action);

    case types.DISPLAY_CRIME_GROUP:
      return setCurrentCrimeGroup(state, action);

    default:
      return state;
  }
}
