'use client'

import React, {useState} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {CircleCheck, CircleSlash, Trash2} from "lucide-react";
import {SlClose} from "react-icons/sl";

const Page = ({params}: { params: Promise<{ organizerId: number }> }) => {

    const {organizerId} = React.use(params);

    //approval state
    const [organizerApproval, setOrganizerApproval] = useState<string>('pending')

    // approval badge elements
    const approvalStates = [
        {
            state: "pending",
            src: "/pending-approval.png",
            message: "Pending Approval"
        },
        {
            state: "approved",
            src: "/ok.png",
            message: "Approved"
        },
        {
            state: "disapproved",
            src: "/disapproved-event.png",
            message: "Disapproved"
        }
    ]


    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-[10px] p-[10px]">
                    <h1 className="text-2xl font-semibold text-gray-900">Organizer </h1>
                    <p className="mt-1 text-gray-600">Organizer {organizerId} details</p>
                </div>
            </div>

            {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                {/*event details section*/}
                <div
                    className="display-event bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">ORGANIZER DETAILS</h3>
                    </div>
                    <div className="bg-white shadow-xl text-black p-4 sm:p-6 rounded-lg my-[10px] relative">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex justify-center items-center sm:h-32 sm:w-32 p-[18px] sm:p-[20px] mx-[10px] bg-gray-300 rounded-full">
                                <Image src="/organizer.png" alt="event" height={64} width={64}/>
                            </div>
                            <div className="sm:py-[20px] flex-1">
                                <h2 className="text-lg sm:text-2xl font-semibold">Organizer Name</h2>
                                <div className="break-words text-gray-700 text-sm sm:text-base">Company Name : xxxxxx
                                    xxxx
                                </div>
                                <div className="break-words text-gray-700 mt-2 text-sm sm:text-base space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div>
                                            <Image src="/organizer-id.png" alt="event" height={32} width={32}/>
                                        </div>
                                        <div>
                                            Organizer Name
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <div>
                                            <Image src="/email.png" alt="event" height={32} width={32}/>
                                        </div>
                                        <div>
                                            Organizer Name
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <div>
                                            <Image src="/contact.png" alt="event" height={32} width={32}/>
                                        </div>
                                        <div>
                                            Organizer Name
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop status display - positioned absolute top right */}
                        {/* Desktop status display - positioned absolute top right */}
                        <div className="hidden sm:flex absolute top-4 right-4 flex-col items-center justify-center bg-gray-100 rounded-lg p-4 min-w-[120px]">
                            {approvalStates.map((approvalState) => {
                                const isCurrentState = organizerApproval === approvalState.state;

                                // Only render the current state
                                if (!isCurrentState) return null;

                                return (
                                    <React.Fragment key={approvalState.state}>
                                        <div
                                            className="flex justify-center items-center w-12 h-12 bg-white rounded-full mb-2 shadow-lg">
                                            <Image src={approvalState.src} alt={approvalState.state} height={24}
                                                   width={24}/>
                                        </div>
                                        <div className="text-center text-sm font-medium">{approvalState.message}</div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Mobile status display */}
                        <div className="sm:hidden mt-4 flex items-center justify-center bg-gray-100 rounded-lg p-3">
                            {approvalStates.map((eventState) => {
                                const isCurrentState = organizerApproval === eventState.state;

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
                            <Button
                                className={`${organizerApproval === 'pending' ? 'block' :'hidden'} bg-blue-500 hover:bg-blue-600 text-white border-blue-500`}
                            >
                                <div className="flex items-center justify-center">
                                    <CircleCheck className="mr-2" /> Approve Organizer
                                </div>
                            </Button>
                            <Button
                                className={`${organizerApproval === 'pending' ? 'block' :'hidden'} bg-gray-600 hover:bg-gray-700 text-white border-gray-600`}
                            >
                                <div className="flex items-center justify-center">
                                    <SlClose className="mr-2" /> Disapprove Organizer
                                </div>
                            </Button>
                            <Button
                                className={`${organizerApproval === 'pending' ? 'hidden' : 'block'} bg-gray-500 hover:bg-gray-600 text-white border-gray-500`}
                            >
                                <div className="flex items-center justify-center">
                                    <CircleSlash strokeWidth={1.5} className="mr-2" /> Disable Account
                                </div>
                            </Button>
                            <Button
                                className={`${organizerApproval === 'pending' ? 'hidden' : 'block'} bg-gray-700 hover:bg-gray-800 text-white border-gray-700`}
                            >
                                <div className="flex items-center justify-center">
                                    <Trash2 strokeWidth={1.5} className="mr-2" /> Delete Account
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page