'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {CircleCheck} from "lucide-react";
import { SlClose } from "react-icons/sl";


interface SessionDetails {
    sessionId:number;
    sessionNumber:number;
    venue:string;
    date:string;
    startingTime:string;
    endingTime:string;
    status:string;
}


const Page = ({params}: { params: Promise<{ eventId: number }> }) => {

    const {eventId} = React.use(params);

    //approval state
    const [eventApproval,setEventApproval]=useState<string>('disapproved')

    //session state
    const [sessionInfo,setSessionInfo]=useState<SessionDetails[]>([]);

    //pending approval badge elements
    const approvalStates = [
        {
            state:"pending",
            src:"/pending-approval.png",
            message:"Pending Approval"
        },
        {
            state:"approved",
            src:"/ok.png",
            message:"Approved"
        },
        {
            state:"disapproved",
            src:"/disapproved-event.png",
            message:"Disapproved"
        }
    ]

    return (
        <>
            {/*header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-[10px] p-[10px]">
                    <h1 className="text-2xl font-semibold text-gray-900">Event</h1>
                    <p className="mt-1 text-gray-600">View event details</p>
                </div>
            </div>

            {/*scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                {/*event details section*/}
                <div className="display-event bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">EVENT DETAILS</h3>
                    </div>
                    <div className="bg-white shadow-xl text-black p-4 sm:p-6 rounded-lg my-[10px] relative">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex justify-center items-center sm:h-32 sm:w-32 p-[18px] sm:p-[20px] mx-[10px] bg-gray-300 rounded-full">
                                <Image src="/calendar.png" alt="event" height={64} width={64}/>
                            </div>
                            <div className="sm:py-[20px] flex-1">
                                <h2 className="text-lg sm:text-2xl font-semibold">Event Name</h2>
                                <div className="break-words text-gray-700 text-sm sm:text-base">Organizer ID : xxxxxx
                                    xxxx
                                </div>
                                <div className="break-words text-gray-700 mt-2 text-sm sm:text-base">
                                    Event Description<br/>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
                                    nibh tortor. Mauris pharetra efficitur euismod. Aenean eu dui aliquet
                                    rhetus interdum interdum. Proin lacinia faucibus est vitae viverra.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
                                    nibh tortor. Mauris pharetra efficitur euismod. Aenean eu dui aliquet
                                    rhetus interdum interdum. Proin lacinia faucibus est vitae viverra.Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Mauris non
                                    nibh tortor. Mauris pharetra efficitur euismod. Aenean eu dui aliquet
                                    rhetus interdum interdum. Proin lacinia faucibus est vitae viverra.
                                </div>
                            </div>
                        </div>

                        {/* Desktop status display - positioned absolute top right */}
                        {/* Desktop status display - positioned absolute top right */}
                        <div className="hidden sm:flex absolute top-4 right-4 flex-col items-center justify-center bg-gray-100 rounded-lg p-4 min-w-[120px]">
                            {approvalStates.map((eventState) => {
                                const isCurrentState = eventApproval === eventState.state;

                                // Only render the current state
                                if (!isCurrentState) return null;

                                return (
                                    <React.Fragment key={eventState.state}>
                                        <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full mb-2 shadow-lg">
                                            <Image src={eventState.src} alt={eventState.state} height={24} width={24}/>
                                        </div>
                                        <div className="text-center text-sm font-medium">{eventState.message}</div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Mobile status display */}
                        <div className="sm:hidden mt-4 flex items-center justify-center bg-gray-100 rounded-lg p-3">
                            {approvalStates.map((eventState) => {
                                const isCurrentState = eventApproval === eventState.state;

                                // Only render the current state
                                if (!isCurrentState) return null;

                                return (
                                    <React.Fragment key={eventState.state}>
                                        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full mr-2 shadow-lg">
                                            <Image src={eventState.src} alt={eventState.state} height={16} width={16}/>
                                        </div>
                                        <div className="text-sm font-medium">{eventState.message}</div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button className="rounded">
                                <CircleCheck/> Approve Event
                            </Button>
                            <Button className="rounded">
                                <SlClose /> Disapprove Event
                            </Button>
                        </div>
                    </div>
                </div>
                {/*sessions table section*/}
                <div className="display-sessions bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SESSIONS</h3>
                    </div>

                    <div>
                        {/*    desktop table view*/}
                        <div className="hidden md:block overflow-x-auto shadow-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Session Number
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Venue
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Starting Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Ending Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {sessionInfo && sessionInfo.length > 0 ? (
                                    sessionInfo.map((session: SessionDetails) => (
                                        <tr className="hvoer:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={session.sessionId}>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.sessionNumber}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.venue}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.startingTime}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.endingTime}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div
                                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
                                                <p className="text-sm text-gray-500">There are currently no sessions to display.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/*mobile card view*/}
                        <div className="md:hidden space-y-4">
                            {(() => {
                                return sessionInfo && sessionInfo.length > 0
                                    ? sessionInfo.map((session: SessionDetails) => (
                                        <div
                                            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                            key={session.sessionId}>
                                            <div>

                                            </div>
                                        </div>
                                    ))
                                    : (
                                        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                            <div className="flex flex-col items-center justify-center">
                                                <div
                                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
                                                <p className="text-sm text-gray-500 text-center">There are currently no sessions to display.</p>
                                            </div>
                                        </div>
                                    )
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page
