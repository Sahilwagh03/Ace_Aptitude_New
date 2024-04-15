import React, { useState } from 'react';
import './Edit_Profile_Form.css';
import close from '../../assets/close.svg';
import { MdModeEdit } from "react-icons/md";
const Edit_Profile_Form = ({ onClose }) => {

    const user = localStorage.getItem('user')
    const userDetails = JSON.parse(user)
    const id = userDetails._id
    const [name, setName] = useState(userDetails.Name); // State for the name input
    const [email, setEmail] = useState(userDetails.email); // State for the email input

    const handleClose = () => {
        onClose(false);
    };

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const data = { Name: name, email, id }; // Data to be sent in the PUT request

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/editProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedUserData = {
                    ...userDetails, // Keep the existing user data
                    Name: name, // Update the name
                    email, // Update the email
                };

                // Store the updated user data back in localStorage
                localStorage.setItem('user', JSON.stringify(updatedUserData));
                // Profile updated successfully
                onClose(false);
            } else {
                // Handle errors, e.g., display an error message
                console.error('Failed to update profile.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const handleImageUpload = (e)=>{
        e.preventDefault()
        console.log('image upload')
    }
    return (
        <section className="custom-container signUp-container forms popup_container">
            <div className="custom-form login">
                <div className="custom-form-content">
                    <div className='header_img_flex'>
                        <header className="login">Edit Profile</header>
                        <img src={close} alt="" onClick={handleClose} />
                    </div>
                    <form>
                        <div className='Profile_Image_Container'>
                            <div style={{ position: 'relative' }}>
                                <img src={userDetails.profileImage} width='100%' className='userProfile' />
                                <button className='editIconContainer' onClick={handleImageUpload}>
                                    <MdModeEdit className='editIcon' size={'16px'} />
                                </button>
                            </div>
                        </div>
                        <div className="field input-field login">
                            <input
                                type="text"
                                placeholder="Name"
                                className="input login"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field button-field login">
                            <button className="login" onClick={handleSave}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Edit_Profile_Form;
