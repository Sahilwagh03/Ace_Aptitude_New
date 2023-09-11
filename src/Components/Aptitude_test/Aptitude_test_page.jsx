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
    const [isFilterOpen, setisFilterOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [dropdownOption, setdropdownOption] = useState({
        "General Aptitude": false,
        "Programming": false,
        "Verbal": false,
        "Logical Reasoning": false,
    })

    const [selectedSubtopic, setSelectedSubtopic] = useState({
        "General Aptitude": '',
        "Programming": '',
        "Verbal": '',
        "Logical Reasoning": '',
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

    const handleActive = (subtopic, category) => {
        setSelectedSubtopic((prevSelectedSubtopic) => {
            const updatedSubtopics = { ...prevSelectedSubtopic };
            if (updatedSubtopics[category] === subtopic) {
                // If the clicked subtopic is already selected, deselect it
                updatedSubtopics[category] = '';
            } else {
                // Otherwise, select the clicked subtopic
                updatedSubtopics[category] = subtopic;
            }
            return updatedSubtopics;
        });
    };

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
        let url = `https://ace-aptitude.onrender.com/api/FilterData/`;

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
        setTimeout(()=>{
            setIsLoading(false)
        },500)
    };


    const handleCategory = (category) => {

        setIsLoading(true)

        setSelectedCategory(category)
        if (category == "All") {
            setSelectedDifficulty('')
            setdropdownOption(false)
        }

        setdropdownOption(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));

        if (setdropdownOption) {
            setSelectedSubtopic({
                ...selectedSubtopic,
                [category]: ''
            })
        }
        const lowerCasesDifficulty = selectedDifficulty.toLowerCase();
        handleCategoriesAndLevel(category, lowerCasesDifficulty)
    }





    useEffect(() => {
        const getAllcategory = async () => {
            try {
                const response = await fetch(`https://ace-aptitude.onrender.com/api/Allcategory`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setMainData(jsonData);
                console.log(jsonData)
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        getAllcategory()
        window.scrollTo(0, 0);
    }, [])

    const handleQuestionRoute = (category, level) => {
        navigate(`/test/${category}/${level}`)
    }

    const handleSearchInput = async (topic) => {
        try {
            const response = await fetch(`https://ace-aptitude.onrender.com/api/Search/${topic}`);
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

    return (
        <>
            <section>
                <div className="aptitude_Main">
                    <h1 className='aptitude_heading'>APTITUDE QUESTIONS</h1>
                    <div className="filter_container">
                        <div className='search_div'>
                            <input onChange={(e) => handleSearchInput(e.target.value)} type="text" placeholder='Search Topics' className='searchbar' />
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
                                                                <span className={`subtopic-btn  ${selectedSubtopic["General Aptitude"] === subtopic ? 'active' : ''}`}
                                                                    onClick={() => handleActive(subtopic, 'General Aptitude')}
                                                                    key={index}>{subtopic}</span>
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
                                                                <span className={`subtopic-btn  ${selectedSubtopic["Programming"] === subtopic ? 'active' : ''}`}
                                                                    onClick={() => handleActive(subtopic, 'Programming')} key={index}>{subtopic}</span>
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
                                                                <span className={`subtopic-btn  ${selectedSubtopic["Verbal"] === subtopic ? 'active' : ''}`}
                                                                    onClick={() => handleActive(subtopic, 'Verbal')} key={index}>{subtopic}</span>
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
                                                                <span className={`subtopic-btn  ${selectedSubtopic["Logical Reasoning"] === subtopic ? 'active' : ''}`}
                                                                    onClick={() => handleActive(subtopic, 'Logical Reasoning')} key={index}>{subtopic}</span>
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

                        <div className='filter'>
                            <button onClick={() => setisFilterOpen(!isFilterOpen)}><i className='bx bx-menu-alt-right'></i></button>
                        </div>
                        {

                            <div className={`filter-section ${isFilterOpen ? 'open' : ''}`}>
                                <div className="mobile_category_container">
                                    <div className='mobile_heading_grid'>
                                        <h3 className='category_heading'>Category</h3>
                                        <img onClick={() => setisFilterOpen(!isFilterOpen)} src="/static/media/close.6f8b0621c325d307e9d486f8740d96b4.svg" alt="" width="25"></img>
                                    </div>
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
                                                                    <span className={`subtopic-btn  ${selectedSubtopic["General Aptitude"] === subtopic ? 'active' : ''}`}
                                                                        onClick={() => handleActive(subtopic, 'General Aptitude')}
                                                                        key={index}>{subtopic}</span>
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
                                                                    <span className={`subtopic-btn  ${selectedSubtopic["Programming"] === subtopic ? 'active' : ''}`}
                                                                        onClick={() => handleActive(subtopic, 'Programming')} key={index}>{subtopic}</span>
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
                                                                    <span className={`subtopic-btn  ${selectedSubtopic["Verbal"] === subtopic ? 'active' : ''}`}
                                                                        onClick={() => handleActive(subtopic, 'Verbal')} key={index}>{subtopic}</span>
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
                                                                    <span className={`subtopic-btn  ${selectedSubtopic["Logical Reasoning"] === subtopic ? 'active' : ''}`}
                                                                        onClick={() => handleActive(subtopic, 'Logical Reasoning')} key={index}>{subtopic}</span>
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

                        }
                        <div className="problem_container">
                            <div className="headline_problem_container">
                                <div className="problem_category">
                                    <span>Topics</span>
                                    <span className='ml-95'>SubTopics</span>
                                </div>
                                <div className="problem_level"><span>Level</span></div>
                            </div>
                            <div className='problem_heading'></div>
                            {
                                isLoading ?
                                    <div className='loader_container'>
                                        <span className="loader"></span>
                                    </div>
                                    :
                                    <div className='problem_main'>
                                        {
                                            MainData.map((data, index) =>
                                                <div onClick={() => handleQuestionRoute(data.category, data.difficulty)} className="problem_card" key={index}>
                                                    <div className="problem_category">
                                                        <span>{data.category}</span>
                                                        <span className='ml-2'>{selectedSubtopic[data.category]}</span>
                                                    </div>
                                                    <div className="problem_level"><span style={data.difficulty == 'easy' ? { background: 'rgb(158 255 158)' } : { background: '#f0f0f0' } && data.difficulty == 'medium' ? { background: 'rgb(253 235 100)' } : { background: '#f0f0f0' } && data.difficulty == "hard" ? { background: '#ff6f6f' } : { background: '#f0f0f0' }}>{data.difficulty}</span></div>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Aptitude_test_page