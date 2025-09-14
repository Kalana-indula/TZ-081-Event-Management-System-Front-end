'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import EventCard from "@/app/(root)/app-components/EventCard";
import axios from "axios";
import {SessionCardDetails} from "@/types/entityTypes";
import MainFooter from "@/app/(root)/app-components/MainFooter";

const Page = () => {

    //states
    const [sessions,setSessions]=useState<SessionCardDetails[]>([]);

    useEffect(() => {
        getLatestSessions();
    }, []);

    //fetch all latest sessions
    const getLatestSessions = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/sessions/latest`);
            console.log(response.data.entityList);
            setSessions(response.data.entityList)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {/* Main content wrapper */}
            <div className="bg-white">
                {/* Hero section with background image and search bar */}
                <div className="relative h-[400px] w-full bg-cover bg-center bg-no-repeat">
                    {/* Content container - centered search bar */}
                    <div
                        className="bg-picture relative h-full flex flex-col items-center justify-center px-4"
                        style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)'
                        }}
                    >
                        {/* Content (on top of overlay) */}
                        <div className="relative z-10 w-full flex flex-col items-center">
                            <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-8">
                                Find your event
                            </h1>
                            {/* Search bar */}
                            <div className="w-full max-w-xl">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search for Events........."
                                        className="w-full px-4 py-3 pr-12 text-gray-700 bg-white rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        className="px-6 py-3 bg-blue-900 text-white font-medium rounded-r-lg hover:bg-blue-800 transition-colors duration-200 border border-blue-900 hover:cursor-pointer"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card sections */}
                <div className="bg-gray-50 py-5">
                    {/*Latest Events */}
                    <div className="px-3 py-1 sm:px-4 sm:py-5 md:px-8 bg-white">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">LATEST EVENTS</h2>
                            <Link className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:cursor-pointer"
                                  href={`/all-events`}
                            >
                                VIEW ALL
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sessions.map((session:SessionCardDetails) => (
                                <div key={session.sessionId} className="flex justify-center">
                                    <EventCard session={session}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Admin/Manager Links */}
                <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex gap-4">
                        <Link
                            href="/admin/dashboard"
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                            Admin
                        </Link>
                        <Link
                            href="/manager/dashboard"
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                            Manager
                        </Link>
                    </div>
                </div>

                {/* Footer section */}
                <footer>
                    <MainFooter/>
                </footer>
            </div>
        </>
    );
};

export default Page;