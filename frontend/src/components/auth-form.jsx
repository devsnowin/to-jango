import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import Spinner from './spinner'

export default function AuthForm({method}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        setLoading(true)
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {
            username: formData.get("username"),
            password: formData.get("password")
        }

        const route = method === "login" ? "/api/token/" : "/api/user/create/"
        try {
            const res = await api.post(route, data)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false)
        }
        
    }
    
    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" className="border border-zinc-800 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="border border-zinc-800 rounded-md p-2" />
            </div>
            
            <div className="w-full">
                <button className="w-full grid place-items-center capitalize font-medium bg-zinc-800 text-white px-4 py-2 rounded-md" disabled={loading}>
                    {loading ? <Spinner /> : method}
                </button>
                {method === "login" ? (
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                ) : (
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                )}
            </div>
        </form>
    )
}