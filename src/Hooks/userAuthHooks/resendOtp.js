import { useState } from "react";

export const useResendOtp = () => {
    //   const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [error, setError] = useState(false);
    
    const resendOTP = async (email) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/resend-otp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}), // Send only email
              });
        
        
              if (response.ok) {
                const data = await response.json();
                setResponseData(data);
                setLoading(false);
              } else {
                setError(true);
                setLoading(false);
              }
        } catch (error) {
            console.log(error);
        }
    }
    return { loading, error, responseData, resendOTP };
}

