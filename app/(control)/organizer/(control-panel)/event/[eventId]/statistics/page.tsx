'use client'

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {useParams, useRouter} from "next/navigation";
import {EventDetails, Session, TicketDetails} from "@/types/entityTypes";
import axios from "axios";
import {handleApiError} from "@/lib/utils";

const Page = () => {

    //states
    const [ticketDetails, setTicketDetails] = useState<TicketDetails[]>([]);
    const [eventDetails, setEventDetails] = useState<EventDetails>();
    const [sessionDetails, setSessionDetails] = useState<Session[]>([]);

    const params = useParams();

    const eventId = params.eventId;

    useEffect(() => {
        getEventDetails();
        getTicketDetails();
        getSessionDetails();
    }, []);

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

    //route to revenue details
    const routeToRevenue = (eventId:number)=>{
        route.push(`/organizer/${eventId}/revenue`);
    }

    //fetch event details
    const getEventDetails = async ()=>{
        try {
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}/details`);
            console.log(response.data.entityData.eventName);
            setEventDetails(response.data.entityData);
        }catch (err){
            console.log(err);
        }
    }

    //fetch session details
    const getSessionDetails = async ()=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}/sessions`);
            console.log(response.data.sessionList);
            setSessionDetails(response.data.sessionList);
        }catch(err){
            handleApiError(err,"No sessions available");
        }
    }

    //fetch ticket details
    const getTicketDetails = async ()=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}/tickets`);
            console.log(response.data.entityList);
            setTicketDetails(response.data.entityList);
        }catch (err){
            console.log(err);
        }
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
                    <h3 className="text-gray-500 font-medium py-2">TICKETS SOLD</h3>
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">{eventDetails?.eventName}</h2>

                        {/*cards section*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {ticketDetails && ticketDetails.length > 0 ? (
                                ticketDetails.map((ticket, index) => (
                                    <div key={ticket.id || index} className="bg-blue-50 p-3 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">{ticket.ticketType}</h4>
                                        <div className="space-y-1">
                                            <p className="text-xl font-semibold text-gray-900">
                                                {ticket.soldCount !== undefined ? ticket.soldCount : 0}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Sold / Total: {ticket.soldCount !== undefined ? ticket.soldCount : 0} / {ticket.ticketCount}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Price: LKR {ticket.ticketPrice.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full bg-gray-50 p-8 rounded-md text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No ticket data available</h3>
                                        <p className="text-sm text-gray-500">There are currently no ticket records to display.</p>
                                    </div>
                                </div>
                            )}
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
                            {sessionDetails.length > 0 ? (
                                <>
                                    {sessionDetails.map((session, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm font-medium text-gray-900">{session.sessionNumber}</td>
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
                        {sessionDetails.length > 0 ? (
                            <>
                                {sessionDetails.map((session, index) => (
                                    <div key={index}
                                         className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-gray-900 text-sm">{session.sessionNumber}</h4>
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
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 hover:cursor-pointer"
                            onClick={() => routeToRevenue(1)}
                    >
                        Check Revenue
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 hover:cursor-pointer"
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