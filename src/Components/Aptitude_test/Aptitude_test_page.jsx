import React, { useEffect, useState } from 'react'
import './Aptitude_test_page.css'
import { useNavigate } from 'react-router-dom'

const Aptitude_test_page = () => {

    const navigate = useNavigate()

    const [MainData, setMainData] = useState([])
    const [SelectedCategory, setSelectedCategory] = useState("All")

    const [selectedDifficulty, setSelectedDifficulty] = useState('')
    const [selectedSort, setSelectedSort] = useState('')
    const [isDifficultOpen, setIsDifficultOpen] = useState(false)
    const [isSortByOpen, setIsSortByOpen] = useState(false)

    const [dropdownOption, setdropdownOption] = useState({
        "General Aptitude": false,
        "Programming": false,
        "Verbal": false,
        "Logical Reasoning": false,
    })

    const difficultyoptions = ["Easy", "Medium", "Hard"]
    const sotrtBy = ["A-Z", "Number"]
    const generalAptitudeSubtopics = [
        "Problems on Trains",
        "Time and Distance",
        "Height and Distance",
        "Time and Work",
        "Simple Interest",
        "Compound Interest"
    ];
    const programmingSubtopics = [
        "Declarations and Initializations",
        "Control Instructions",
        "Expressions",
        "Arrays",
        "Strings",
        "Pointers",
        "Bitwise Operators",
        "C Preprocessor",
        "Functions",
        "Structures, Unions, Enums",
        "Input / Output",
        "Command Line Arguments"
    ];
    const LogicalSubtopics = [
        "Essential Part",
        "Analogies",
        "Verbal Classification",
        "Letter and Symbol Series"
    ];


    const handleDropDifficult = () => {
        setIsDifficultOpen(!isDifficultOpen)
    }

    const handleDropSortBy = () => {
        setIsSortByOpen(!isSortByOpen)
    }


    const handleSelectedOption = (option) => {
        setSelectedDifficulty(option)
        setIsDifficultOpen(false)
        const lowerCaseOption = option.toLowerCase();
        handleCategoriesAndLevel(SelectedCategory, lowerCaseOption)
    }

    const handleSelectedSort = (option) => {
        setSelectedSort(option)
        setIsSortByOpen(false)
        const lowerCaseSort = option.toLowerCase()
        if (lowerCaseSort == 'a-z') {
            const sortedData = MainData.sort((a, b) => a.category.localeCompare(b.category))
            setMainData(sortedData)
        } else {
            const sortedData = MainData.sort((a, b) => parseInt(a._id) - parseInt(b._id))
            setMainData(sortedData)
        }
        console.log(lowerCaseSort)
    }


    const handleCategoriesAndLevel = async (category, difficulty) => {
        let url = `http://localhost:5000/api/FilterData/`;

        if (category) {
            url += category + '/';
        } else {
            url += 'All/';
        }

        if (difficulty) {
            url += difficulty;
        } else {
            url += 'All';
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setMainData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log(error);
        }
    };


    const handleCategory = (category) => {
        setSelectedCategory(category)
        if (category == "All") {
            setSelectedDifficulty('')
        }

        setdropdownOption(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));

        const lowerCasesDifficulty = selectedDifficulty.toLowerCase();
        handleCategoriesAndLevel(category, lowerCasesDifficulty)
    }





    useEffect(() => {
        const getAllcategory = async () => {
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
        getAllcategory()
    }, [])

    const handleQuestionRoute = (category, level) => {
        navigate(`/aptitude/${category}/${level}`)
    }

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
                            <div className='dropdown'>
                                <input type="text" placeholder='Sort By' value={selectedSort} onClick={handleDropSortBy} readOnly />
                                <i className={`bx bx-chevron-down ${isSortByOpen ? 'ArrowRotate' : ''}`} onClick={handleDropSortBy} id="inputArrow"></i>
                                <div className={`dropdown-content ${isSortByOpen ? 'show' : ''}`} id="difficultyMenu">
                                    {
                                        sotrtBy.map((option, index) =>
                                            <>
                                                <a key={index} onClick={() => handleSelectedSort(option)}>{option}</a>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="aptitude_container">
                        <div className="sideBar_container">
                            <div className="category_container">
                                <h3 className='category_heading'>Category</h3>
                                <ul className='category_ul'>
                                    <li className='category_li' onClick={() => handleCategory("All")}>ALL</li>
                                    <li className='category_li' onClick={() => handleCategory("General Aptitude")}>General Aptitude <i className={`bx bx-chevron-down ${dropdownOption["General Aptitude"] ? 'ArrowRotate' : ''}`} id="inputArrow"></i></li>
                                        {
                                            dropdownOption["General Aptitude"] ?
                                                <>
                                                <div className='dropdownContainer'>
                                                    {
                                                        generalAptitudeSubtopics.map((subtopic, index) => (
                                                            <>
                                                                <span className='subtopic-btn' key={index}>{subtopic}</span>
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                                </>
                                                :
                                                ""
                                        }
                                    <li className='category_li' onClick={() => handleCategory("Programming")}>Programming  <i className={`bx bx-chevron-down ${dropdownOption["Programming"] ? 'ArrowRotate' : ''}`} id="inputArrow"></i></li>
                                    {
                                            dropdownOption["Programming"] ?
                                            <>
                                             <div className='dropdownContainer'>
                                                {
                                                    programmingSubtopics.map((subtopic, index) => (
                                                        <>
                                                            <span className='subtopic-btn' key={index}>{subtopic}</span>
                                                        </>
                                                    ))
                                                }
                                                </div>
                                            </>
                                            :
                                            ""  
                                    }

                                    <li className='category_li' onClick={() => handleCategory("Verbal")}>Verbal  <i className={`bx bx-chevron-down ${dropdownOption["Verbal"] ? 'ArrowRotate' : ''}`} id="inputArrow"></i></li>
                                        {
                                            dropdownOption["Verbal"] ?
                                                <>
                                                <div className='dropdownContainer'>
                                                    {
                                                        generalAptitudeSubtopics.map((subtopic, index) => (
                                                            <>
                                                                <span className='subtopic-btn' key={index}>{subtopic}</span>
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                                </>
                                                :
                                                ""
                                        }
                                    <li className='category_li' onClick={() => handleCategory("Logical Reasoning")}>Logical Reasoning  <i className={`bx bx-chevron-down ${dropdownOption["Logical Reasoning"] ? 'ArrowRotate' : ''}`} id="inputArrow"></i></li>
                                        {
                                            dropdownOption["Logical Reasoning"] ?
                                                <>
                                                 <div className='dropdownContainer'>
                                                    {
                                                        LogicalSubtopics.map((subtopic, index) => (
                                                            <>
                                                                <span className='subtopic-btn' key={index}>{subtopic}</span>
                                                            </>
                                                        ))
                                                    }
                                                    </div>
                                                </>
                                                :
                                                ""
                                        }
                                </ul>
                            </div>
                        </div>
                        <div className="problem_container">
                            <div className='problem_heading'></div>
                            <div className='problem_main'>
                                {
                                    MainData.map((data, index) =>
                                        <div onClick={() => handleQuestionRoute(data.category, data.difficulty)} className="problem_card" key={index}>
                                            <div className="problem_category"><span>{data.category}</span></div>
                                            <div className="problem_level"><span style={data.difficulty == 'easy' ? { background: 'rgb(158 255 158)' } : { background: '#f0f0f0' } && data.difficulty == 'medium' ? { background: 'rgb(253 235 100)' } : { background: '#f0f0f0' } && data.difficulty == "hard" ? { background: '#ff6f6f' } : { background: '#f0f0f0' }}>{data.difficulty}</span></div>
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