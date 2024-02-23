import React, { useEffect } from 'react';
import useGoogleAuthCallback from '../../Hooks/userAuthHooks/googleAuthCallback';
import '../../Components/QuestionsPage/QuestionPage.css';
const GoogleAuthCallbackScreen = () => {
    const { googleAuthCallbackHandler, isLoading, error, responseData } = useGoogleAuthCallback();

    useEffect(() => {
        const extractIdTokenFromUrl = async () => {
            // Get the fragment part of the URL
            const fragment = window.location.hash.substring(1);
            // Split the fragment by '&' to get key-value pairs
            const params = fragment.split('&');
            let idToken = null;
            // Iterate over key-value pairs to find the id_token parameter
            params.forEach(param => {
                const [key, value] = param.split('=');
                if (key === 'id_token') {
                    idToken = value;
                }
            });

            if (idToken) {
                console.log(idToken)
                await googleAuthCallbackHandler(idToken);
            } else {
                console.error('id_token not found in URL');
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
                    <></>
            }
        </>
    );
};

export default GoogleAuthCallbackScreen;
