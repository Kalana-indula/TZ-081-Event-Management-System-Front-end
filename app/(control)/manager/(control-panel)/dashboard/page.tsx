'use client'

import React, {useEffect, useState} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import axios from "axios";



interface EventDetails {
    eventId: number;
    eventName: string;
    eventType: string;
    organizer: string;
    dateAdded: string;
    status: string;
}

const Page = () => {

    //set event details state
    const [eventDetails, setEventDetails] = useState<EventDetails[]>([]);

    useEffect(() => {
        getEventDetails();
    }, []);

    //fetch event details
    const getEventDetails = async (): Promise<void> => {

        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/details`);
            console.log(response.data.eventDetails);
            setEventDetails(response.data.eventDetails);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-[10px] p-[10px]">    
                    <h1 className="text-2xl font-semibold text-gray-900">Manager Dashboard</h1>
                    <p className="mt-1 text-gray-600">Events List</p>
                </div>
            </div>

            {/*    main content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                {/*    search bar*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    {/*    Search Organizer*/}
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SEARCH ORGANIZER</h3>
                    </div>
                    <div className="flex justify-center sm:justify-start">
                        <div className="flex flex-col sm:flex-row w-full max-w-sm items-center gap-2">
                            <Input type="email"
                                   placeholder="Event ID"
                                   className="bg-white shadow-lg"
                            />
                            <Button type="submit"
                                    variant="outline"
                                    className="bg-black text-white w-full sm:w-1/5 active:bg-black active:text-white shadow-lg"
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/*    sort*/}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                {/*    area title*/}
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SORT</h3>
                    </div>

                    {/*drop downs*/}
                    <div className="flex items-start flex-col sm:flex-row space-y-4 space-x-4">

                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white shadow-lg">
                                    <SelectValue placeholder="Select Status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/*    table*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    {/*    area title*/}
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">EVENT DETAILS</h3>
                    </div>

                    <div>
                        {/*    desktop table view*/}
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
                                        Organizer
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Date Added
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {eventDetails && eventDetails.length > 0 ? (
                                    eventDetails.map((event: EventDetails) => (
                                        <tr className="hvoer:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={event.eventId}>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.eventId}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.eventName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.eventType}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.organizer}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.dateAdded}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-sm">{event.status}</td>
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
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments
                                                    available</h3>
                                                <p className="text-sm text-gray-500">There are currently no payment
                                                    records to display.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/*mobile card view*/}
                        <div className="md:hidden space-y-4">
                            {(()=>{
                                return eventDetails && eventDetails.length > 0
                                ? eventDetails.map((event: EventDetails) => (
                                        <div
                                            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                            key={event.eventId}>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-900">ID:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.eventId}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-900">Name:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.eventName}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-900">Type:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.eventType}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className="text-sm font-medium text-gray-900">Organizer:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.organizer}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className="text-sm font-medium text-gray-900">Date Added:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.dateAdded}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className="text-sm font-medium text-gray-900">Status:</span>
                                                    <span
                                                        className="text-sm text-gray-600 font-sm">{event.status}</span>
                                                </div>
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
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments
                                                    available</h3>
                                                <p className="text-sm text-gray-500 text-center">There are currently no
                                                    payment records to display.</p>
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
   