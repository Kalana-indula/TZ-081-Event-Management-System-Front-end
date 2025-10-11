'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import AdminProtectedRoute from "@/utils/AdminProtectedRoutes";

const Page = () => {
    //set password state
    const [password, setPassword] = useState<string>('');

    // set email state
    const [email, setEmail] = useState<string>('');
    //handle cancel
    const handleCancel = (): void => {
        setEmail('');
        setPassword('');
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setEmail(value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setPassword(value);
    }

    return (
        <>
            <AdminProtectedRoute>
                {/*Header section*/}
                <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                    <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Delete Account</h1>
                    </div>
                </div>

                {/*    main content*/}
                <div className="p-3 sm:p-4 md:p-6 bg-white">
                    <div
                        className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 pb-6 mb-6 rounded-r-md shadow-sm">
                        <div>
                            <h3 className="text-gray-500 font-medium py-2">DELETE ACCOUNT</h3>
                        </div>

                        {/*    form*/}
                        <div className="max-w-md mx-auto">
                            <div className="bg-white shadow-2xl p-8 rounded-lg">
                                <form className="space-y-6">
                                    {/*email field*/}
                                    <div>
                                        <label htmlFor="current-email"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter Email <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="current-email"
                                            name="current-email"
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
                                        <label htmlFor="current-email"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter Password<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="current-email"
                                            name="current-email"
                                            type="password"
                                            required={true}
                                            value={password}
                                            onChange={handlePassword}
                                            placeholder="Minimum 8 characters"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                    </div>

                                    {/*buttons*/}
                                    <div className="space-y-2">
                                        {/*save button*/}
                                        <Button
                                            type="submit"
                                            className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                                            Delete Account
                                        </Button>

                                        {/*cancel button*/}
                                        <Button
                                            className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium bg-white text-black hover:bg-black hover:text-white active:text-black active:bg-white"
                                            onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminProtectedRoute>
        </>
    )
}
export default Page
