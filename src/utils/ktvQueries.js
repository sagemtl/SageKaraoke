export const getAllSongs = async () => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(`http://localhost:5000/ktv-api/songs`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export const getSongByTitleId = async (titleId) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `http://localhost:5000/ktv-api/song-info/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export const getLyricsByTitleId = async (titleId) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `http://localhost:5000/ktv-api/lyrics/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};
