'use client'

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";

interface SessionDetails {
    sessionNumber:number;
    venue:string;
    date:string;
    startingTime:string;
    endingTime:string;
}

const sessionData: SessionDetails[] = [
    {
        sessionNumber: 1,
        venue: "Main Hall",
        date: "02/10/2023",
        startingTime: "10:30 AM",
        endingTime: "12:30 PM"
    },
    {
        sessionNumber: 2,
        venue: "Conference Room A",
        date: "02/10/2023",
        startingTime: "02:00 PM",
        endingTime: "04:00 PM"
    },
    {
        sessionNumber: 3,
        venue: "Auditorium",
        date: "03/10/2023",
        startingTime: "09:00 AM",
        endingTime: "11:00 AM"
    }
];

const Page = () => {
    //states
    const [sessionDetails, setSessionDetails] = useState<SessionDetails[]>([]);
    const [timeLeft, setTimeLeft] = useState({
        days: 12,
        hours: 12,
        minutes: 0,
        seconds: 0
    });
    const [isCompleted, setIsCompleted] = useState(false);

    //load the data at page loading
    useEffect(() => {
        setSessionDetails(sessionData);
    }, []);

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Event Dashboard</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">View event details and manage sessions</p>
                </div>
            </div>

            {/*    main scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">

                {/*    action buttons*/}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                        + Add new session
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                        View event statistics
                    </Button>
                </div>

                {/*count down section*/}
                <div className="display-countdown bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">EVENT STARTS ON</h3>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-md">
                        <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
                            {/* Days */}
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-md min-w-[60px] sm:min-w-[70px] md:min-w-[80px] text-center">
                                    {String(timeLeft.days).padStart(2, '0')}
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2">DAYS</span>
                            </div>

                            {/* Hours */}
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-md min-w-[60px] sm:min-w-[70px] md:min-w-[80px] text-center">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2">HOURS</span>
                            </div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-md min-w-[60px] sm:min-w-[70px] md:min-w-[80px] text-center">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2">MINS</span>
                            </div>

                            {/* Seconds */}
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-md min-w-[60px] sm:min-w-[70px] md:min-w-[80px] text-center">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2">SECS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/*table section*/}
                <div className="display-sessions bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SESSION DATA</h3>
                    </div>

                    <div>
                        {/*    desktop table view*/}
                        <div className="hidden md:block overflow-x-auto shadow-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Session no
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Venue
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Starting time
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Ending time
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {sessionDetails && sessionDetails.length > 0 ? (
                                    sessionDetails.map((session: SessionDetails, index) => (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={index}>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">Session{session.sessionNumber}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{session.venue}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{session.date}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{session.startingTime}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{session.endingTime}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
                                                <p className="text-sm text-gray-500">There are currently no session records to display.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/*mobile card view*/}
                        <div className="md:hidden space-y-4">
                            {sessionDetails && sessionDetails.length > 0 ? (
                                sessionDetails.map((session: SessionDetails, index) => (
                                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                         key={index}>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-gray-900 text-sm">Session{session.sessionNumber}</h4>
                                                <span className="text-xs text-gray-500">{session.date}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{session.venue}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="text-sm text-gray-600">Start: {session.startingTime}</p>
                                                    <p className="text-sm text-gray-600">End: {session.endingTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none"
                                                 stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
                                        <p className="text-sm text-gray-500 text-center">There are currently no session records to display.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/*mark event as completed*/}
                <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                    <label className="text-sm sm:text-base font-medium text-gray-700">Mark Event Has Completed</label>
                    <Switch
                        checked={isCompleted}
                        onCheckedChange={setIsCompleted}
                    />
                </div>
            </div>
        </>
    )
}

export default Page;