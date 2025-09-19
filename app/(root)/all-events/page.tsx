'use client'

import React, {useEffect, useState} from 'react'
import {SessionCardDetails} from "@/types/entityTypes";
import EventCard from "@/app/(root)/app-components/EventCard";
import axios from "axios";
import MainFooter from "@/app/(root)/app-components/MainFooter";

const Page = () => {

    //states
    const [sessions, setSessions] = useState<SessionCardDetails[]>([]);

    useEffect(() => {
        getAllSessions();
    }, []);

//fetch all latest sessions
    const getAllSessions = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions`);
            console.log(response.data.entityList);
            setSessions(response.data.entityList)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {/*    Main content wrapper*/}
            <div className="bg-white">

                {/*header section*/}
                <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200/30 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-4">
                            {/* Main Title */}
                            <div className="relative inline-block">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                    <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                        All Events
                                     </span>
                                </h1>
                                {/* Accent Line */}
                                <div
                                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                                    style={{backgroundColor: "#193cb8"}}>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="mt-3 flex justify-center items-center gap-2 opacity-60">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <div
                                    className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#193cb8"}}></div>
                                <div
                                    className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-1">
                    <div className="px-3 py-1 sm:px-4 sm:py-3 md:px-8 bg-white">
                        {/*cards section*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sessions.map((session: SessionCardDetails) => (
                                <div key={session.sessionId} className="flex justify-center">
                                    <EventCard session={session}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <footer>
                    <MainFooter/>
                </footer>
            </div>
        </>
    )
}
export default Page