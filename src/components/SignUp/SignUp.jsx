import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth';
import { login, logout } from '../../store/authSlice';
import {Button, Input, Logo} from '../index';

function SignUp() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const create = async (data) => {
        setError("");
        try {
            const newUser = authService.createAccount(data);
            if(newUser){
                const userData = authService.getCurrentUser();
                dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            dispatch(logout());
            setError(error.message);
        }

    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to={"/login"} className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input 
                            label="Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />

                        <Input 
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter a valid email address",
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter a password"
                            {...register("password", {
                                required: true,
                                validate:{
                                    matchPattern: (value) => 
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and may contain special characters."
                                }
                            })}

                        />

                        <Button
                            text="Create Account"
                            type="submit"
                            className="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp