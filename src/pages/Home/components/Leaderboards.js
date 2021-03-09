import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLeaderboardByTitleId } from 'utils/ktvQueries';

const Leaderboards = ({ albums, selectedAlbum }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (albums[selectedAlbum]) {
      getLeaderboardByTitleId(albums[selectedAlbum].title_id).then((res) => {
        setScores(res);
      });
    }
  }, [albums, selectedAlbum]);

  return (
    <div className="leaderboards">
      <div className="leaderboards-track">
        {scores.map(({ name, score, id }, i) => {
          if (i < 5) {
            return (
              <p className="leaderboards__entry" key={id}>
                {name}: {score}
              </p>
            );
          }
          return <></>;
        })}
        <p className="leaderboards__entry">☆ Top 5 Scores ☆</p>
        {scores.map(({ name, score, id }) => (
          <p className="leaderboards__entry" key={`${id}-2`}>
            {name}: {score}
          </p>
        ))}
        <p className="leaderboards__entry">☆ Leaderboards ☆</p>
      </div>
    </div>
  );
};

Leaderboards.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedAlbum: PropTypes.number.isRequired,
};

export default Leaderboards;
