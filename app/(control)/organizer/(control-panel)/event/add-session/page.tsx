'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

const Page = () => {
    const [formData, setFormData] = useState({
        venue: '',
        date: '',
        startTime: '',
        endTime: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        // Reset form or navigate back
        setFormData({
            venue: '',
            date: '',
            startTime: '',
            endTime: ''
        });
    };

    const handleSaveEvent = () => {
        // Handle save logic here
        console.log('Saving event:', formData);
    };

    return (
        <>
            {/*   header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Create Session</h1>
                </div>
            </div>

            {/*    main content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white min-h-screen">

                {/* Form Container */}
                <div className="session-form bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SESSION DETAILS</h3>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-md">
                        <div className="max-w-md mx-auto space-y-4">

                            {/* Venue Field */}
                            <div className="space-y-2">
                                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Enter venue name"
                                />
                            </div>

                            {/* Date Field */}
                            <div className="space-y-2">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            {/* Start Time Field */}
                            <div className="space-y-2">
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            {/* End Time Field */}
                            <div className="space-y-2">
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    id="endTime"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveEvent}
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Save Event
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;