import React, { useEffect } from 'react';
import useGoogleAuthCallback from '../../Hooks/userAuthHooks/googleAuthCallback';
import '../../Components/QuestionsPage/QuestionPage.css';
const GoogleAuthCallbackScreen = () => {
    const { googleAuthCallbackHandler, isLoading, error, responseData } = useGoogleAuthCallback();

    useEffect(() => {
        const extractIdTokenFromUrl = async () => {
            // Parse URL to get query parameters
            const searchParams = new URLSearchParams(window.location.search);
            // Get the value of the 'code' parameter
            const code = searchParams.get('code');

            if (code) {
                console.log(code);
                await googleAuthCallbackHandler(code);
            } else {
                console.error('code not found in URL');
            }
        };

        extractIdTokenFromUrl();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <div className='loader_container_questions'>
                        <span className="loader"></span>
                    </div>
                    :
                    <div style={{height:'100vh'}}>

                    </div>
            }
        </>
    );
};

export default GoogleAuthCallbackScreen;
