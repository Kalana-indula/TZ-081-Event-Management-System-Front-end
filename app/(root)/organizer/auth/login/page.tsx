'use client'

import React, {useState} from 'react'
import Link from "next/link";
import {OrganizerLoginDetails} from "@/types/entityTypes";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import MainFooter from "@/app/(root)/app-components/MainFooter";
import {LogIn} from "lucide-react";
import OrganizerLoginButton from "@/app/(root)/app-components/OrganizerLoginButton";

const Page = () => {

    //fetch password details
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");

    const router=useRouter();

    //route to organizer dashboard
    const routeToDashboard= (id:number)=>{
        router.push(`/organizer/${id}/dashboard`);
    }

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setEmail(value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setPassword(value);
    }

    //handle organizer login
    const handleLogin = async (event:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        event.preventDefault();

        const loginPayload:OrganizerLoginDetails={
            email:email,
            password:password
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/organizers/login`,loginPayload,
                {
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

            //check if the login successful
            if(response.status === 200){
                if((response.data.userRole==='ORGANIZER') && (response.data.isApproved===true)){
                    //store the token in local storage
                    localStorage.setItem("token", response.data.authToken);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("userName", response.data.userName);
                    localStorage.setItem("userRole", response.data.userRole);

                    //set the token as default token for axios
                    axios.defaults.headers.common['Authorization']=`Bearer ${response.data.authToken}`;

                    console.log(response.data.authToken);

                    routeToDashboard(Number(response.data.userId));
                    toast.success("Login Successfully");
                }else if(response.data.userRole !== 'ORGANIZER'){
                    toast.error("Not a valid user type");
                }else {
                    toast.error("Your account is pending approval");
                }
            }

        }catch(err){
            if (err instanceof AxiosError) {
                // Handle Axios-specific errors
                const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
                toast.error(errorMessage);
            } else if (err instanceof Error) {
                // Handle generic errors
                toast.error(err.message);
            } else {
                // Handle unknown errors
                toast.error('An unknown error occurred');
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200/30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-4">
                        {/* Main Title */}
                        <div className="relative inline-block">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                    Organizer Login
                                </span>
                            </h1>
                            {/* Accent Line */}
                            <div
                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                                style={{backgroundColor: "#193cb8"}}>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="mt-3 flex justify-center items-center gap-2 opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            <div
                                className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#193cb8"}}></div>
                            <div
                                className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-8">
                {/* Subtitle section */}
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                        Welcome back! Sign in to manage your events
                    </p>
                </div>

                {/* Form section */}
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                            {/* Email field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required={true}
                                    value={email}
                                    onChange={handleEmail}
                                    placeholder="john.doe@example.com"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                    style={{focusRingColor: '#193cb8'}}
                                />
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required={true}
                                    value={password}
                                    onChange={handlePassword}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                    style={{focusRingColor: '#193cb8'}}
                                />
                            </div>

                            {/* Login button */}
                            <div className="space-y-4 pt-4">
                                <div className="space-y-4 pt-4">
                                    <OrganizerLoginButton email={email} password={password}/>
                                </div>
                            </div>

                            {/* Additional info */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href="/organizer/auth/register" className="font-semibold underline" style={{color: '#193cb8'}}>
                                        Register here
                                    </Link>
                                </p>
                            </div>

                            {/* Forgot password link */}
                            <div className="text-center">
                                <Link href="/forgot-password" className="text-sm font-medium hover:underline" style={{color: '#193cb8'}}>
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer section */}
            <footer className="mt-auto">
                <MainFooter/>
            </footer>
        </div>
    )
}

export default Page