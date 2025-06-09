import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status );
    
    useEffect(()=>{
        // if(authentication && authentication !== authStatus) navigate("/login"); 
        // else if(!authentication && authentication !== authStatus) navigate("/");

        // Protected route & NOT logged in → redirect to login
        if(authentication && !authStatus) navigate("/login");
        // Public route but logged in → redirect to home/dashboard
        else if(!authentication && authStatus) navigate("/");

    }, [navigate, authStatus, authentication])

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected;