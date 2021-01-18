import React from 'react';

const Leaderboards = () => {
  // TODO: Get top scores from server

  const scores = [
    {
      id: 1,
      name: 'Test A',
      score: 100,
    },
    {
      id: 2,
      name: 'Test B',
      score: 200,
    },
    {
      id: 3,
      name: 'Test C',
      score: 300,
    },
    {
      id: 4,
      name: 'Test D',
      score: 400,
    },
    {
      id: 5,
      name: 'Test E',
      score: 500,
    },
  ];

  return (
    <div className="leaderboards">
      <div className="leaderboards-track">
        {scores.map(({ name, score, id }) => (
          <p className="leaderboards__entry" key={id}>
            {name}: {score}
          </p>
        ))}
        <p className="leaderboards__entry">☆ Leaderboards ☆</p>
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

export default Leaderboards;
