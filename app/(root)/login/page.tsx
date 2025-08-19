'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = () => {

    //fetch password details
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");

    //handle cancel
    const handleCancel = ():void=>{
        setEmail('');
        setPassword('');

    }

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setEmail(value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setPassword(value);
    }

    return (
        <>
            <div>
                {/*header section*/}
                <div className="flex justify-center py-2">
                    <h2 className="text-3xl font-semibold">Login</h2>
                </div>

                {/*    form*/}
                <div className="max-w-md mx-auto">
                    <div className="bg-white shadow-2xl p-8 rounded-lg">
                        <form className="space-y-6">
                            {/*old password field*/}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required={true}
                                    value={email}
                                    onChange={handleEmail}
                                    placeholder="email@example.com"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                />
                            </div>

                            {/*password field*/}
                            <div>
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    id="Password"
                                    name="Password"
                                    type="password"
                                    required={true}
                                    value={password}
                                    onChange={handlePassword}
                                    placeholder="Your Password"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                {/*save button*/}
                                <Button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                                    Login
                                </Button>
                            </div>

                            <div>
                                <p className="mt-2 text-sm text-gray-500">
                                    <span>Don't have an account?</span>
                                    <span className="text-blue-600">
                                        <Link href={`/register`}>
                                            Register Here
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page
