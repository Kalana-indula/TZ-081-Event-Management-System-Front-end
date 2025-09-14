'use client'

import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import {SessionCardDetails} from "@/types/entityTypes";
import axios, {AxiosError} from "axios";
import EventCard from "@/app/(root)/app-components/EventCard";
import MainFooter from "@/app/(root)/app-components/MainFooter";

const Page = () => {

    //states
    const [pageHeader, setPageHeader] = useState<string>('');
    const [sessions,setSessions]=useState<SessionCardDetails[]>([])

    //get params
    const params=useParams();

    //get category id
    const categoryName=params.categoryName;

    useEffect(() => {
        console.log("categoryName: "+categoryName);
        if (categoryName) {
            getEventsByCategory();
        }
    }, [categoryName]);

    //get event details
    const getEventsByCategory = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/categories/${categoryName}/sessions`);
            console.log('Sessions By category:', response.data);
            setSessions(response.data.entityList);
            setPageHeader(response.data.remarks);
        } catch (error) {
            console.error('Error fetching events by category:', error);

            // Check if it's an AxiosError (HTTP error)
            if (error instanceof AxiosError) {
                console.log('This is an AxiosError');
                console.log('Status:', error.response?.status);
                console.log('Status Text:', error.response?.statusText);
                console.log('Response Data:', error.response?.data);

                if (error.response?.status === 404) {
                    // 404 means no events found for this category - this is normal
                    console.log("No events found for category:", categoryName);
                } else {
                    // Other HTTP errors (500, network issues, etc.)
                    console.error("HTTP Error:", error.response?.status, error.response?.data);
                }
            } else {
                // Non-HTTP errors (network timeout, etc.)
                console.error("Network or other error:", error);
            }

            // Always set empty array for any error
            setSessions([]);
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header section */}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{pageHeader}</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Discover amazing events happening around you</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 px-3 py-1 sm:px-4 sm:py-2 md:px-8 bg-white">
                {/* Events grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sessions && sessions.length > 0 ? (
                        sessions.map((session:SessionCardDetails) => (
                            <div key={session.sessionId} className="flex justify-center">
                                <EventCard session={session}/>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-gray-50 p-8 rounded-md text-center">
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No featured events available</h3>
                                <p className="text-sm text-gray-500">Check back later for upcoming events.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/*Footer section*/}
            <footer>
                <MainFooter/>
            </footer>
        </div>
    )
}
export default Page