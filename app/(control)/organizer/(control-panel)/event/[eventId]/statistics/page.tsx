'use client'

import React from 'react'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const Page = () => {
    // Sample data
    const ticketTypes = {
        normal: 55,
        vip: 44
    };


    const sessionStats = []; // Empty array to simulate no sessions
    // Uncomment below to test with data:
    // const sessionStats = [
    //     { sessionNo: "Session1", attendees: 32, revenue: "24,500.00", profit: "12,250.00" },
    //     { sessionNo: "Session2", attendees: 28, revenue: "21,000.00", profit: "10,500.00" },
    //     { sessionNo: "Session3", attendees: 39, revenue: "29,250.00", profit: "14,625.00" }
    // ];

    const totalStats = {
        attendees: 99,
        revenue: "74,750.00",
        profit: "37,375.00"
    };

    //configure routes
    const route = useRouter();

    //route to attendees details
    const routeToAttendees = (eventId: number) => {
        route.push(`/organizer/event/${eventId}/attendees`);
    }

    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Event Statistics</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">View event activities</p>
                </div>
            </div>

            {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">

                {/*sold ticket details section*/}
                <div className="bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <h3 className="text-gray-500 font-medium py-2">EVENT NAME</h3>
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Name</h2>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-blue-50 p-3 rounded-md flex-1">
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Normal Tickets</h4>
                                <p className="text-xl font-semibold text-gray-900">{ticketTypes.normal}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-md flex-1">
                                <h4 className="text-sm font-medium text-gray-500 mb-1">VIP Tickets</h4>
                                <p className="text-xl font-semibold text-gray-900">{ticketTypes.vip}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*    session details table section*/}
                <div className="bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <h3 className="text-gray-500 font-medium py-2">SESSION DETAILS</h3>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Session
                                    no
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Attendees</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Revenue</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Profit</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {sessionStats.length > 0 ? (
                                <>
                                    {sessionStats.map((session, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm font-medium text-gray-900">{session.sessionNo}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900">{session.attendees}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900">{session.revenue}.LKR</td>
                                            <td className="px-6 py-3 text-sm text-gray-900">{session.profit}.LKR</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100 font-semibold">
                                        <td className="px-6 py-3 text-sm text-gray-900">Total</td>
                                        <td className="px-6 py-3 text-sm text-gray-900">{totalStats.attendees}</td>
                                        <td className="px-6 py-3 text-sm text-gray-900">{totalStats.revenue}.LKR</td>
                                        <td className="px-6 py-3 text-sm text-gray-900">{totalStats.profit}.LKR</td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div
                                                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions
                                                available</h3>
                                            <p className="text-sm text-gray-500">There are currently no session records
                                                to display.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {sessionStats.length > 0 ? (
                            <>
                                {sessionStats.map((session, index) => (
                                    <div key={index}
                                         className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-gray-900 text-sm">{session.sessionNo}</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <p className="text-xs text-gray-500">Attendees</p>
                                                    <p className="text-sm font-medium text-gray-900">{session.attendees}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Revenue</p>
                                                    <p className="text-sm font-medium text-gray-900">{session.revenue}.LKR</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Profit</p>
                                                    <p className="text-sm font-medium text-gray-900">{session.profit}.LKR</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div
                                    className="bg-gray-100 rounded-lg shadow-md p-4 border border-gray-200 font-semibold">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Total Attendees</p>
                                            <p className="text-sm text-gray-900">{totalStats.attendees}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Total Revenue</p>
                                            <p className="text-sm text-gray-900">{totalStats.revenue}.LKR</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Total Profit</p>
                                            <p className="text-sm text-gray-900">{totalStats.profit}.LKR</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
                                    <p className="text-sm text-gray-500 text-center">There are currently no session
                                        records to display.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/*    buttons section*/}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                        Check Revenue
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                            onClick={() => routeToAttendees(1)}
                    >
                        Attendee Details
                    </Button>
                </div>

            </div>
        </>
    )
}
export default Page;