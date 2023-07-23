import axios from 'axios';
const URL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common['x-api-key'] =
  'live_fQ8YJh2VeEBnVwOjQC7UUWW0QEoBi9QSalf8kxrCeYPzTc7kQDVlPTwoplmK9hQa';

function fetchBreeds() {
  return fetch(URL, {
    headers: {
      'x-api-key': ['x-api-key'],
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error();
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=live_fQ8YJh2VeEBnVwOjQC7UUWW0QEoBi9QSalf8kxrCeYPzTc7kQDVlPTwoplmK9hQa&breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error();
    }

    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
