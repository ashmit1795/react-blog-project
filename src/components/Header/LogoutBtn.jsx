import React from 'react';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice'
import { useDispatch } from 'react-redux';

function LogoutBtn() {

    const logoutHandler = () => {
        authService.logout().then(
            () => {
                useDispatch(logout());
            }
        )
    }


    return (
        <div 
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </div>
    )
}

export default LogoutBtn