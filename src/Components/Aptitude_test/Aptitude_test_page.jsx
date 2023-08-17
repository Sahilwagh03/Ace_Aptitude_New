import React, { useEffect, useState } from 'react'
import './Aptitude_test_page.css'
const Aptitude_test_page = () => {

    const [MainData, setMainData] = useState([])

    const [selectedDifficulty, setSelectedDifficulty] = useState('')
    const [isDifficultOpen, setIsDifficultOpen] = useState(false)
    const difficultyoptions = ["Easy", "Medium", "Hard"]


    const handleDropDifficult = () => {
        setIsDifficultOpen(!isDifficultOpen)
    }

    const handleSelectedOption = (option) => {
        setSelectedDifficulty(option)
        setIsDifficultOpen(false)
        const lowerCaseOption = option.toLowerCase();
        difficultyApi(lowerCaseOption)
    }

    const difficultyApi = async (option) => {
        try {
            const response = await fetch(`http://localhost:5000/api/Difficulty/${option}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setMainData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.log(error);
        }
    }

    const categoryApi = async (category) => {
        try {
            const response = await fetch(`http://localhost:5000/api//Category/${category}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setMainData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCategory = (category) =>{
        categoryApi(category)
    }





    useEffect(() => {
        const getAllquestion = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/Allcategory`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setMainData(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.log(error);
            }
        }
        getAllquestion()
    }, [])

    return (
        <>
            <section>
                <div className="aptitude_Main">
                    <h1 className='aptitude_heading'>APTITUDE QUESTIONS</h1>
                    <div className="filter_container">
                        <div className='search_div'>
                            <input type="text" placeholder='Search Topics' className='searchbar' />
                        </div>
                        <div className="filter_input">
                            <div className='dropdown'>
                                <input type="text" placeholder='Difficulty' value={selectedDifficulty} onClick={handleDropDifficult} readOnly />
                                <i className={`bx bx-chevron-down ${isDifficultOpen ? 'ArrowRotate' : ''}`} onClick={handleDropDifficult} id="inputArrow"></i>
                                <div className={`dropdown-content ${isDifficultOpen ? 'show' : ''}`} id="difficultyMenu">
                                    {
                                        difficultyoptions.map((option, index) =>
                                            <>
                                                <a key={index} onClick={() => handleSelectedOption(option)}>{option}</a>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <input type="text" placeholder='Sorted by' />
                        </div>
                    </div>
                    <div className="aptitude_container">
                        <div className="sideBar_container">
                            <div className="category_container">
                                <h3 className='category_heading'>Category</h3>
                                <ul className='category_ul'>
                                    <li className='category_li' onClick={()=> handleCategory("All")}>ALL</li>
                                    <li className='category_li' onClick={()=> handleCategory("General Aptitude")}>General Aptitude</li>
                                    <li className='category_li' onClick={()=> handleCategory("Programming")}>Programming</li>
                                    <li className='category_li' onClick={()=> handleCategory("Verbal")}>Verbal</li>
                                    <li className='category_li' onClick={()=> handleCategory("Logical Reasoning")}>Logical Reasoning</li>
                                </ul>
                            </div>
                        </div>
                        <div className="problem_container">
                            <div className='problem_heading'></div>
                            <div className='problem_main'>
                                {
                                    MainData.map((data, index) =>
                                        <div className="problem_card" key={index}>
                                            <div className="problem_category"><span>{data.category}</span></div>
                                            <div className="problem_level"><span style={data.difficulty=='easy'? {background:'rgb(158 255 158)'} : {background:'#f0f0f0'} && data.difficulty=='medium'? {background:'rgb(253 235 100)'} : {background:'#f0f0f0'} && data.difficulty=="hard" ? {background:'#ff6f6f'}: {background:'#f0f0f0'}}>{data.difficulty}</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Aptitude_test_page