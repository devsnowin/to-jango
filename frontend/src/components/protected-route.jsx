import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

export default function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(err => {
            console.error(err);
            setIsAuthorized(false);
        })
    }, []);

    async function refreshToken() {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error(error);
            setIsAuthorized(false);
        }
    }
    
    async function auth() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false); 
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) await refreshToken();
        else setIsAuthorized(true);
    }

    if (isAuthorized === null) {
        return <div>loading...</div>
    }

    return isAuthorized ? children : <Navigate to='/login' />
}