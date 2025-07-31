'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";

const Page = () => {
    //current contact details
    const [currentContactDetails, setCurrentContactDetails] = useState<string>("+94 710 754 343");
    const [newContactDetails, setNewContactDetails] = useState<string>("");

    const handleContactDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setNewContactDetails(value);
    }

    const handleCancel = () => {
        setNewContactDetails("");
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Contact</h1>
                </div>
            </div>

            {/*main content*/}
            <div className="p-3 sm:p-4 md:p-6 bg-white">
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 pb-6 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">UPDATE   CONTACT DETAILS</h3>
                    </div>

                    {/*form*/}
                    <div className="max-w-md mx-auto">
                        <div className="bg-white shadow-2xl p-8 rounded-lg">
                            <div className="mb-3 flex flex-col sm:flex-row gap-2">
                                <p className="block text-sm font-medium text-gray-700 ">Your Current Contact Details
                                    : </p>
                                <p className="text-sm">{currentContactDetails}</p>
                            </div>

                            <form className="space-y-6">
                                {/*New contact details section*/}
                                <div>
                                    <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Contact <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="new-email"
                                        name="email"
                                        type="email"
                                        required={true}
                                        value={newContactDetails}
                                        onChange={handleContactDetails}
                                        placeholder="+94 XXX XXX XXX"
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    {/*save button*/}
                                    <Button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                                        Save
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
        </>
    )
}
export default Page
