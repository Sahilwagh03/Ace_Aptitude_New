import { useState } from "react";

const useGoogleAuthCallback = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const googleAuthCallbackHandler = async (id_token) => {
        setIsLoading(true);
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for user registration
            const response = await fetch(`https://ace-aptitude-v1.onrender.com/api/googlecallback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_token}),
            });

            if (!response.ok) {
                throw new Error('User already registered');
            }
            else {
                const data = await response.json();
                setResponseData(data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setError(error);
            setIsLoading(false);
        }
    }


    return { responseData, error, isLoading, googleAuthCallbackHandler };
}


export default useGoogleAuthCallback;