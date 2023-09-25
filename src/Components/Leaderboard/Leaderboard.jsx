import React, { useEffect, useState } from 'react'
import './Leaderboard.css'
import LeaderboardCard from './LeaderboardCard'
import Rank_stand from '../../assets/Rank stand.png'
const Leaderboard = () => {

    const [topLeaderboardData, setTopLeaderboardData] = useState([]);
    const [remainingLeaderboardData, setRemainingLeaderboardData] = useState([]);
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleLeaderboard = async () => {
            const response = await fetch('https://ace-aptitude.onrender.com/api/Alltests');
            const AnalyzingData = await response.json();

            const userReponse = await fetch('https://ace-aptitude.onrender.com/api/Allusers');
            const AllUserData = await userReponse.json();

            // Create a map to match user IDs to their corresponding coins
            const coinsMap = {};
            AnalyzingData.forEach((item) => {
                coinsMap[item.userId] = item.coins;
            });

            // Sort AllUserData based on coins using the map
            AllUserData.sort((a, b) => {
                const coinsA = coinsMap[a._id] || 0; // Default to 0 if coins not found
                const coinsB = coinsMap[b._id] || 0; // Default to 0 if coins not found
                return coinsB - coinsA;
            });

            // Now AllUserData is sorted according to the coins in AnalyzingData
            // Split the sorted data into top 3 and the rest, including coins
            const topData = AllUserData.slice(0, 3).map((user) => ({
                ...user,
                coins: coinsMap[user._id] || 0, // Add coins data to each user
            }));

            // Rearrange topData in the order 2, 1, 3
            const arrangedTopData = [topData[1], topData[0], topData[2]];

            const remainingData = AllUserData.slice(3).map((user) => ({
                ...user,
                coins: coinsMap[user._id] || 0, // Add coins data to each user
            }));

            setTopLeaderboardData(arrangedTopData);
            setRemainingLeaderboardData(remainingData);

            if (AnalyzingData && AllUserData) {
                setisLoading(false)
            }
        };

        handleLeaderboard();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <>
                        <div className='loader_container'>
                            <span className="loader"></span>
                        </div>
                    </>
                    :
                    <div className='LeaderBoard_main_container'>
                        <div className="Leaderboard_container">
                            <div className="leaderboard_Top">
                                {topLeaderboardData.map((data, index) => (
                                    <LeaderboardCard
                                        key={index}
                                        position={index == 0 ? 2 : '' || index == 1 ? 1 : '' || index == 2 ? 3 : ""}
                                        name={data.name}
                                        coins={data.coins}
                                        imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU'
                                    />
                                ))}
                            </div>
                            <div className="leaderboard_mobile_top">
                                {topLeaderboardData.map((data, index) => (
                                    <div className="profile_circle" key={index}>
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU' alt={`Profile ${index + 1}`} />
                                        <span>{data.name}</span>
                                        <span>{index == 0 ? 2 : '' || index == 1 ? 1 : '' || index == 2 ? 3 : ""}</span>
                                        <div className={index === 1 ? "tall_bar" : "empty_bar"}></div>
                                    </div>
                                ))}
                            </div>
                            {/* <div>
                    <img src={Rank_stand} alt="" />
                </div> */}
                            <div className="leaderboard_list">
                                <div className="leaderboard_heading">
                                    <span className='w-300'>Name</span>
                                    <span>Rank</span>
                                    <span>Coins</span>
                                </div>
                                <div className='problem_heading'></div>
                                <div className="leaderboard_list_container">
                                    {remainingLeaderboardData.map((data, index) => (
                                        <div className="leaderboard_card_horizontal" key={index}>
                                            <div className='user_name_grid'>
                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPczo_vgoWlnlzBDeqS-pne-zeV3UZ3j0UA&usqp=CAU' alt={data.name} width='50' />
                                                <div className="users_name">
                                                    <span>{data.name || `User ${index + 4}`}</span>
                                                </div>
                                            </div>
                                            <div className="users_rank">
                                                <span>{index + 4}</span>
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
            }

        </>
    )
}

export default Leaderboard