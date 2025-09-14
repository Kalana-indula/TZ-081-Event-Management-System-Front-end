'use client'

import React, {useEffect, useState} from 'react'
import {SessionCardDetails} from "@/types/entityTypes";
import EventCard from "@/app/(root)/app-components/EventCard";
import axios from "axios";
import MainFooter from "@/app/(root)/app-components/MainFooter";

const Page = () => {

    //states
    const [sessions,setSessions]=useState<SessionCardDetails[]>([]);

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
                <div className="bg-white py-1">
                    <div className="px-3 py-1 sm:px-4 sm:py-3 md:px-8 bg-white">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">ALL EVENTS</h2>
                        </div>
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