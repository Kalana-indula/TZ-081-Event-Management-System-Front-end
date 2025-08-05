// organizer events

'use client'

import React, {useEffect, useState} from 'react';
import eventData from "@/data/OrganizerEventDetails";

interface EventDetails {
    eventId:number;
    eventName:string;
    eventType:string;
    dateRequested:string;
    dateStarted:string;
    dateCompleted:string;
}

const Page = () => {

    //event states
    const [isOngoing,setIsOngoing] = useState<boolean>(false);
    const [isPendingApproval,setIsPendingApproval] = useState<boolean>(false);
    const [isCompleted,setIsCompleted] = useState<boolean>(false);

    //event details state
    const [eventDetails, setEventDetails] = useState<EventDetails[]>([]);

    useEffect(() => {
        setEventDetails(eventData);
        setIsOngoing(true);
    }, []);

    const handleOngoingTab = ()=>{
        setIsOngoing(true);
        setIsPendingApproval(false);
        setIsCompleted(false);
    }

    const handlePendingApprovalTab = ()=>{
        setIsOngoing(false);
        setIsPendingApproval(true);
        setIsCompleted(false);
    }

    const handleCompletedTab = ()=>{
        setIsOngoing(false);
        setIsPendingApproval(false);
        setIsCompleted(true);
    }

    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center p-[10px]">
                    <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
                    <p className="mt-1 text-gray-600">View all events</p>
                </div>
            </div>

            {/*main scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">EVENT DETAILS</h3>
                    </div>

                    {/* Tab navigation*/}
                    <div className="mb-4">
                        <div className="flex border-b border-gray-300">
                            <button
                                onClick={handleOngoingTab}
                                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                                    isOngoing ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                Ongoing Events
                            </button>
                            <button
                                onClick={handlePendingApprovalTab}
                                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                                    isPendingApproval ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                Pending Approval
                            </button>
                            <button
                                onClick={handleCompletedTab}
                                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                                    isCompleted ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                Completed Events
                            </button>
                        </div>
                    </div>

                    {/*desktop table view*/}
                    <div className="hidden md:block overflow-x-auto shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Event ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Event Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Event Type
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    { isOngoing ?  'Date Started' : isPendingApproval ? 'Date Requested' :  'Date Completed'}
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {eventDetails.length > 0 ? (
                                eventDetails.map((event) => (
                                    <tr
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                        key={event.eventId}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{event.eventId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{event.eventName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{event.eventType}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                            {isOngoing ? `${event.dateStarted}`: isPendingApproval ? `${event.dateRequested}`:`${event.dateCompleted}`}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                No events found
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                There are currently no event records to display.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/*mobile view*/}
                    <div className="md:hidden space-y-4">
                        {eventDetails.length > 0 ? (
                            eventDetails.map((event) => (
                                <div
                                    className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                                    key={event.eventId}
                                >
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">ID:</span>
                                            <span className="text-sm text-gray-900 font-medium">{event.eventId}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">Name:</span>
                                            <span className="text-sm text-gray-900 font-medium">{event.eventName}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">Type:</span>
                                            <span className="text-sm text-gray-900 font-medium">{event.eventType}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">Started:</span>
                                            <span className="text-sm text-gray-900 font-medium">
                                                {isOngoing ? `${event.dateStarted}`: isPendingApproval ? `${event.dateRequested}`:`${event.dateCompleted}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No events found
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                        There are currently no event records to display.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Page
