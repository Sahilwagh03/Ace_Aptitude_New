import React, { useEffect } from 'react';
import useGoogleAuthCallback from '../../Hooks/userAuthHooks/googleAuthCallback';
import '../../Components/QuestionsPage/QuestionPage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Toast from '../../Components/Toast/Toast'

const GoogleAuthCallbackScreen = () => {
    const { googleAuthCallbackHandler, isLoading, error, responseData } = useGoogleAuthCallback();
    const navigate = useNavigate();
    useEffect(() => {
        const extractIdTokenFromUrl = async () => {
            // Parse URL to get query parameters
            const searchParams = new URLSearchParams(window.location.search);
            // Get the value of the 'code' parameter
            const code = searchParams.get('code');

            if (code) {
                await googleAuthCallbackHandler(code);
            } else {
                console.error('code not found in URL');
            }
        };

        extractIdTokenFromUrl();
    }, []);

    useEffect(() => {
        if (!isLoading && responseData) {
            // Store the user object as a JSON string in local storage
            localStorage.setItem('user', JSON.stringify(responseData));
            // Show a success toast
            toast.success('Login successful');

            setTimeout(() => {
                navigate('/')
            }, 3200)

        }
    }, [isLoading])

    return (
        <>
            {
                isLoading ?
                    <div className='loader_container_questions'>
                        <span className="loader"></span>
                    </div>
                    :
                    <div style={{ height: '100vh' }}>
                        <Toast />
                    </div>
            }
        </>
    );
};

export default GoogleAuthCallbackScreen;
