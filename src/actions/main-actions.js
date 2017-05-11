import uuid from 'uuid';
import randomColor from 'randomcolor';
import * as types from './types/main-actions-types';

export function getCrimeData(boundsData) {
  return (dispatch) => {
    if(boundsData.zoom >= 14) {
      dispatch({ type: 'LOADING_STARTED' });
      const { nw, ne, sw, se } = boundsData.bounds;
      const poly = `${nw.lat},${nw.lng}:${ne.lat},${ne.lng}:${se.lat},${se.lng}:${sw.lat},${sw.lng}`;
      const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${poly}`;
      return fetch(url)
        .then(result => {
          if(result.status !== 200) {
            throw new Error('API request failed');
          } else {
            return result.json();
          }
        })
        .then(data => {
          const crimeGroupedByStreet = {};
          const graphData = {};
          data.forEach(crime => {
            if(!graphData[crime.category]) {
              graphData[crime.category] = 1;
            } else {
              graphData[crime.category] += 1;
            }
            if(!crimeGroupedByStreet[crime.location.street.id]) {
              crimeGroupedByStreet[crime.location.street.id] = {
                groupId: crime.location.street.id,
                count: 1,
                street: crime.location.street.name,
                lat: crime.location.latitude,
                lng: crime.location.longitude,
                crimes: [
                  { key: uuid.v4(), id: crime.id, category: crime.category, outcomeStatus: crime.outcome_status }
                ]
              };
            } else {
              crimeGroupedByStreet[crime.location.street.id].crimes.push(
                { key: uuid.v4(), id: crime.id, category: crime.category, outcomeStatus: crime.outcome_status }
              );
              crimeGroupedByStreet[crime.location.street.id].count += 1;
            }

          });

          let maxCrimeCount = 0;
          const mappedGraphData = Object.keys(graphData).map(crimeType => {
            if(maxCrimeCount < graphData[crimeType]) {
              maxCrimeCount = graphData[crimeType];
            }
            return { crimeType, count: graphData[crimeType], color: randomColor() };
          });

          const graphData2 = { data: mappedGraphData, maxCrimeCount };

          dispatch({ type: types.LOADING_FINISHED });
          dispatch({ type: types.CRIME_DATA, data: crimeGroupedByStreet, graphData, graphData2 });
        })
        .catch(e => {
          window.console.error(e);
          dispatch({ type: types.LOADING_FINISHED });
          dispatch({ type: types.UNABLE_TO_DISPLAY_CRIMES });
        });
    } else {
      return dispatch({ type: types.UNABLE_TO_DISPLAY_CRIMES });
    }
  };
}

export function goToPlace(places) {
  if(places && places.length > 0) {
    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();
    return { type: types.GO_TO, center: { lat, lng }, zoom: 15 };
  } else {
    return { type: 'NONE' };
  }
}

export function displayCrimeGroup(crimeGroupId) {
  return { type: 'DISPLAY_CRIME_GROUP', crimeGroupId };
}
