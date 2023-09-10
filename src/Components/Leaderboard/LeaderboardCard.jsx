import React from 'react';
import './LeaderboardCard.css'; // Import your CSS file
import coin from '../../assets/coin.png'

const LeaderboardCard = ({ position, name, rank, coins, imageUrl }) => {
  return (
    <div className="leaderboard-card">
      <div className="profile_grid">
        <img src={imageUrl} alt={name} />
        <div className="name">
          {name}
        </div>
      </div>
      <div className="rank">{`Rank: ${rank}`}</div>
      <div className="coins">
        <img src={coin} alt="" />
        <span>{coins}</span>
      </div>
    </div>
  );
};

export default LeaderboardCard;
