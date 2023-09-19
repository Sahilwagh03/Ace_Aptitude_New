import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import Member_1 from '../../assets/Member_1.jpg'

const ProfilePage = () => {

    const [userData,setUserData] = useState([])

    useEffect(()=>{
        const userLocalInfo = localStorage.getItem('user')
        const data = JSON.parse(userLocalInfo)
        setUserData(data)
        const getUserTestData = async () => {
            try {
                const response = await fetch(`https://ace-aptitude.onrender.com/api/user/tests/${data._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData)
            } catch (error) {
                console.log(error);
            }
        }
        getUserTestData()
    },[])
    return (
        <section className='Profile_section'>
            <div className="Profile_Main_Container">
                <div className="Profile_Container">
                    <div className="Profile_sidebar">
                        <div className="Profile_user_info">
                            <img src={Member_1} alt="" />
                            <div className="Profile_user_info_flex">
                                <div className="Profile_username_name_flex">
                                    <h1>{userData.Name}</h1>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="Profile_user_rank">
                                    <span>Rank 1</span>
                                </div>
                            </div>
                        </div>
                        <div className='Profile_user_edit'>
                            <button>Edit Profile</button>
                        </div>
                    </div>
                    <div className='Profile_dashboard_container'>
                        <div className="Profile_dashboard_stats_badges_container">
                            <div className='Profile_dashboard_stats_container'>

                            </div>
                            <div className='Profile_dashboard_Badge_container'>

                            </div>
                        </div>
                        <div className="heapmap_container">

                        </div>
                        <div className="graph_performance_container">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage