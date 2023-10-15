import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import Badge from '../../assets/badge.svg'
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


const ProfilePage = () => {
    window.scrollTo(0, 0);

    const [userData, setUserData] = useState([]);
    const [totalTests, setTotalTests] = useState({
        datasets: [{
            label: 'Total Tests',
            data: [],
            backgroundColor: [
                '#e6e6fa',
                '#4e18ce',
            ]
        }]
    })
    const [testPerformance, setTestPerformance] = useState(
        {
            labels: [],
            datasets: [
                {
                    label: 'Test Data',
                    data: [],
                },
            ],
        }
    );
    const options = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Test Analysis',
            },
        },
    };

    const donutOptions = {
        responsive: true,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: 'Total Test Count'
            }
        }
    };



    useEffect(() => {
        const userLocalInfo = localStorage.getItem('user');
        const data = JSON.parse(userLocalInfo);
        setUserData(data);

        const getUserTestData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/tests/${data._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.tests)
                if (jsonData) {
                    const performance = jsonData.tests.map((test) => ({
                        testName: test.category,
                        testScore: test.score
                    }))
                    const totalTestCount = jsonData.tests.length
                    setTotalTests({
                        labels: ['Solved', 'Remaining'],
                        datasets: [{
                            label: 'Total Tests',
                            data: [totalTestCount, 100 - totalTestCount],
                        }],
                    })
                    setTestPerformance(
                        {
                            labels: performance.map(item => item.testName),
                            datasets: [
                                {
                                    label: 'Test Scores',
                                    data: performance.map(item => item.testScore),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 205, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(201, 203, 207, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',
                                        'rgb(75, 192, 192)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgb(201, 203, 207)'
                                    ],
                                }
                            ]
                        }
                    )
                }

            } catch (error) {
                console.log(error);
            }
        };

        getUserTestData();
    }, []);

    return (
        <section className='Profile_section'>
            <div className="Profile_Main_Container">
                <div className="Profile_Container">
                    <div className="Profile_sidebar">
                        <div className="Profile_user_info">
                            <img src={userData.ProfilePic} alt="" />
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
                                <Doughnut data={totalTests} options={donutOptions} />
                            </div>
                            <div className='Profile_dashboard_Badge_container'>
                            <h3>Badge</h3>
                                <div className="Profile_Badge">
                                    <div className="badge-details">
                                        <div>
                                            <img
                                                src={Badge}
                                                alt="Achievement Badge"
                                                className='badge_img'
                                            />
                                        </div>
                                        <div>
                                            <p className='badge_level'>2</p>
                                            <p className='badge_name'>Ronin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="heapmap_container">
                            <img src={HeapMap} alt="" />
                        </div> */}
                        <div className="graph_performance_container">
                            <Bar data={testPerformance} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage