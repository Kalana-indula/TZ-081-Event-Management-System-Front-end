'use client'

import React, {useState} from 'react'

const Page = () => {

    //states
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [companyName, setCompanyName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = ()=>{

    }

    const handleFirstName = ()=>{

    }

    const handleLastName = ()=>{

    }

    const handleEmail = ()=>{

    }

    const handlePhone = ()=>{

    }

    const handleCompanyName = ()=>{

    }

    const handlePassword = ()=>{

    }

    const handleConfirmPassword = ()=>{

    }

    const handleCancel = ()=>{

    }

    return (
        <>
            <div>
                {/*header section*/}
                <div className="flex justify-center py-2">
                    <h2 className="text-3xl font-semibold">Register As Organizer</h2>
                </div>
            {/*    form section*/}
                <div>

                    <div className="max-w-md mx-auto">
                        <div className="bg-white shadow-2xl p-8 rounded-lg">
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                {/*first name and last name*/}
                                <div className="grid grid-cols-1 space-y-6 sm:space-y-0 sm:grid-cols-2 sm:gap-6">
                                    <div>
                                        <label htmlFor="firstName"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={firstName}
                                            required={true}
                                            onChange={handleFirstName}
                                            placeholder="John"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name Name<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={lastName}
                                            required={true}
                                            onChange={handleLastName}
                                            placeholder="Doe"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                    </div>
                                </div>

                                {/*nic field*/}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        value={companyName}
                                        onChange={handleCompanyName}
                                        placeholder="Your Company"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*contact details field*/}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={phone}
                                        required={true}
                                        onChange={handlePhone}
                                        placeholder="0771234567 or +94771234567"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*email field*/}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        E Mail <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        required={true}
                                        onChange={handleEmail}
                                        placeholder="john.doe@example.com"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*password field*/}
                                <div>
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="Password"
                                        name="Password"
                                        type="password"
                                        value={password}
                                        required={true}
                                        onChange={handlePassword}
                                        placeholder="Minimum 8 characters"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*confirm password field*/}
                                <div>
                                    <label htmlFor="confirm-pw"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="confirm-pw"
                                        name="confirm-pw"
                                        type="password"
                                        value={confirmPassword}
                                        required={true}
                                        onChange={handleConfirmPassword}
                                        placeholder="Minimum 8 characters"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Password must contain at least one uppercase letter, one lowercase letter, and
                                        one
                                        number
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {/*save button*/}
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer">
                                        Save
                                    </button>

                                    {/*cancel button*/}
                                    <button
                                        onClick={handleCancel}
                                        className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium bg-white transition-colors text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer">
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Page
