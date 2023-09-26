import React from 'react';
import './LeaderboardCard.css'; // Import your CSS file
import CoinThender from '../../assets/coinThender.svg'

const LeaderboardCard = ({ position, name, rank, coins, imageUrl }) => {
  return (
    <div className="leaderboard-card">
      <div className="profile_grid">
        <img src={imageUrl} alt={name} />
        <div className="name">
          {name ||"User"}
        </div>
      </div>
      <div className="rank">{`Rank: ${position}`}</div>
      <div className="coins">
        <img src={CoinThender} alt="" />
        <span>{coins}</span>
      </div>
    </div>
  );
};

export default LeaderboardCard;
