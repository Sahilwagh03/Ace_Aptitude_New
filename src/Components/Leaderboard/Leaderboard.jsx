import React, { useEffect } from 'react'
import './Leaderboard.css'
import LeaderboardCard from './LeaderboardCard'

const Leaderboard = () => {
    const leaderboardData = [
        {
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU',
            name: 'John Doe',
            rank: 'Diamond',
            coins: 1000,
        },
        {
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU',
            name: 'Alice Smith',
            rank: 'Gold',
            coins: 800,
        },
        {
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU',
            name: 'Bob Johnson',
            rank: 'Silver',
            coins: 600,
        },
    ];

    useEffect(()=>{
        window.scrollTo(0, 0);

        const handleLeaderboard = async () => {
            const response = await fetch('https://ace-aptitude.onrender.com/api/Alltests');
            const AnalyzingData = await response.json();
        
            const userReponse = await fetch('https://ace-aptitude.onrender.com/api/Allusers');
            const AllUserData = await userReponse.json();
        
            // Create a map to match user IDs to their corresponding coins
            const coinsMap = {};
            AnalyzingData.forEach(item => {
              coinsMap[item.userId] = item.coins;
            });
        
            // Sort AllUserData based on coins using the map
            AllUserData.sort((a, b) => {
              const coinsA = coinsMap[a._id] || 0; // Default to 0 if coins not found
              const coinsB = coinsMap[b._id] || 0; // Default to 0 if coins not found
              return coinsB - coinsA;
            });
        
            // Now AllUserData is sorted according to the coins in AnalyzingData
            // console.log(AllUserData);
          };
        
          handleLeaderboard();
    },[])

    return (
        <>
            <div className='LeaderBoard_main_container'>
                <div className="Leaderboard_container">
                    <div className="leaderboard_Top">
                        <LeaderboardCard position="1" name='Player 1'
                            rank='Diamond'
                            coins='1000'
                            imageUrl='https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg' />
                        <LeaderboardCard position="2" name='Player 1'
                            rank='Diamond'
                            coins='1000'
                            imageUrl='https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg' />
                        <LeaderboardCard position="3" name='Player 1'
                            rank='Diamond'
                            coins='1000'
                            imageUrl='https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg' />
                    </div>
                    <div className="leaderboard_mobile_top">
                        <div className="profile_circle">
                            <img src="https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg" alt="Profile 1" />
                            <span>John smith</span>
                            <span>1000</span>
                            <div className="empty_bar"></div>
                        </div>
                        <div className="profile_circle">
                            <img src="https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg" alt="Profile 2" />
                            <span>John smith</span>
                            <span>1000</span>
                            <div className="tall_bar"></div>
                        </div>
                        <div className="profile_circle">
                            <img src="https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg" alt="Profile 3" />
                            <span>John smith</span>
                            <span>1000</span>
                            <div className="empty_bar"></div>
                        </div>
                    </div>
                    <div className="leaderboard_list">
                        <div className="leaderboard_heading">
                            <span>Name</span>
                            <span>Rank</span>
                            <span>Coins</span>
                        </div>
                        <div className='problem_heading'></div>
                        <div className="leaderboard_list_container">
                            {leaderboardData.map((data, index) => (
                                <div className="leaderboard_card_horizontal" key={index}>
                                    <div className='user_name_grid'>
                                        <img src={data.imageUrl} alt={data.name} width='50' />
                                        <div className="users_name">
                                            <span>{data.name}</span>
                                        </div>
                                    </div>
                                    <div className="users_rank">
                                        <span>{data.rank}</span>
                                    </div>
                                    <div className="users_coin">
                                        <span>{data.coins}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard