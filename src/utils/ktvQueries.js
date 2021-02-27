export const getAllSongs = async () => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/songs`,
    requestOptions,
  )
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
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/song-info/${titleId}`,
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
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/lyrics/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export const getScore = async (titleId, audioData) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify({ audioData }),
  };
  return fetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/score/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export const getLeaderboardByTitleId = async (titleId) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/leaderboard/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export const updateLeaderboard = async (titleId, name, score) => {
  const scores = {};
  scores.name = name;
  scores.score = score;
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(scores),
  };
  return fetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/ktv-api/leaderboard/${titleId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('in error KTVQueries', error));
};
