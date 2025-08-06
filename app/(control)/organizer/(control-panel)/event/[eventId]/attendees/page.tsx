'use client'

import React, {useEffect, useState} from 'react'
import attendeeData from "@/data/EventAttendence";

interface AttendeeDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
}

const Page = () => {
    // states
    const [attendeeDetails, setAttendeeDetails] = useState<AttendeeDetails[]>([]);

    //load attendees data at page loading
    useEffect(() => {
        setAttendeeDetails(attendeeData);
    }, []);

    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Attendees</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">View event attendees details</p>
                </div>
            </div>

            {/*    main scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">ATTENDEE DETAILS</h3>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    First Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Last Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Phone
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    NIC
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {attendeeDetails && attendeeDetails.length > 0 ? (
                                attendeeDetails.map((attendee, index) => (
                                    <tr
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                        key={index}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">{attendee.firstName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{attendee.lastName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{attendee.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{attendee.phoneNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{attendee.nic}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg
                                                    className="w-8 h-8 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No attendees available</h3>
                                            <p className="text-sm text-gray-500">There are currently no attendee records to display.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {attendeeDetails && attendeeDetails.length > 0 ? (
                            attendeeDetails.map((attendee, index) => (
                                <div
                                    className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                                    key={index}
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                    {attendee.firstName} {attendee.lastName}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{attendee.email}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Phone</p>
                                                <p className="text-sm font-medium text-gray-900">{attendee.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">NIC</p>
                                                <p className="text-sm font-medium text-gray-900">{attendee.nic}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No attendees available</h3>
                                    <p className="text-sm text-gray-500 text-center">There are currently no attendee records to display.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page;