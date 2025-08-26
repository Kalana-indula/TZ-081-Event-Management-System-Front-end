'use client'

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import SessionCard from "@/app/(root)/app-components/SessionCard";
import {SessionCardDetails} from "@/types/entityTypes";
import {useRouter} from "next/navigation";

const initialSessions: SessionCardDetails[] = [
    {
        sessionId: 1,
        sessionName: "Session 1",
        date: "2025-09-01",
        time: "10:00 AM",
        location: "Hall A",
        onBookNow: () => {}, // placeholder, will override in component
    },
    {
        sessionId: 2,
        sessionName: "Session 2",
        date: "2025-09-02",
        time: "1:00 PM",
        location: "Hall B",
        onBookNow: () => {},
    },
    {
        sessionId: 3,
        sessionName: "Session 3",
        date: "2025-09-03",
        time: "3:00 PM",
        location: "Hall C",
        onBookNow: () => {},
    },
];


const Page = ({params}: { params: Promise<{ eventId: number }> }) => {

    //states
    const [sessions,setSessions]=useState<SessionCardDetails[]>([]);

    const {eventId} = React.use(params);
    const router=useRouter();

    useEffect(() => {

        // Enhance each session with a proper onBookNow handler
        const enhancedSessions:SessionCardDetails[] = initialSessions.map(session => ({
            ...session,
            onBookNow: () => {
                router.push(`/event/${eventId}/booking/session/${session.sessionId}`);
            }
        }));
        setSessions(enhancedSessions);
    }, [eventId,router]);

    console.log(eventId);
    return (
        <>
            <div className="min-h-screen bg-background">
                {/*banner section - unchanged as requested*/}
                <div
                    className="event-banner flex justify-center h-[300px] w-full bg-cover bg-center bg-no-repeat">
                    <div className="w-full relative pt-[20px] flex flex-col items-center gap-4 px-[40px] sm:flex-row sm:items-center sm:justify-start sm:pt-8">
                        <div className="event-image h-[200] w-[180] z-50 flex justify-center border-2 border-white">
                            <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop" alt="pending" height={200} width={180}/>
                        </div>
                        <div className="sm:ml-4 sm:mt-4">
                            <h2 className="text-white text-xl sm:text-3xl font-semibold">Title</h2>
                        </div>
                    </div>
                </div>

                {/*count down section - updated layout*/}
                <div className="px-8 py-2">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Event Starts On</h3>
                    <div className="flex justify-between max-w-md mb-4">
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-primary-foreground rounded-lg px-6 py-4 text-center min-w-[80px]">
                                <div className="text-3xl font-bold">12</div>
                            </div>
                            <div className="text-xs uppercase text-muted-foreground mt-2">DAYS</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-primary-foreground rounded-lg px-6 py-4 text-center min-w-[80px]">
                                <div className="text-3xl font-bold">12</div>
                            </div>
                            <div className="text-xs uppercase text-muted-foreground mt-2">HOURS</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-primary-foreground rounded-lg px-6 py-4 text-center min-w-[80px]">
                                <div className="text-3xl font-bold">00</div>
                            </div>
                            <div className="text-xs uppercase text-muted-foreground mt-2">MINS</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-primary-foreground rounded-lg px-6 py-4 text-center min-w-[80px]">
                                <div className="text-3xl font-bold">00</div>
                            </div>
                            <div className="text-xs uppercase text-muted-foreground mt-2">SECS</div>
                        </div>
                    </div>
                </div>

                {/*event description - updated to match image content*/}
                <div className="px-8 py-2">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non nibh tortor. Mauris pharetra efficitur euismod. Aenean eu dui aliquet metus interdum interdum. Proin lacinia faucibus est vitae viverra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non nibh tortor.
                    </p>
                </div>

                {/*ticket price section - updated layout*/}
                <div className="px-8 py-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Price</h3>
                    <div className="bg-muted rounded-lg p-4 space-y-3 max-w-md">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Normal</span>
                            <span className="text-sm font-bold text-foreground">xxxx LKR.</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">VIP</span>
                            <span className="text-sm font-bold text-foreground">xxxx LKR.</span>
                        </div>
                    </div>
                </div>

                {/*session section - updated layout*/}
                <div className="px-8 py-4">
                    <h2 className="text-lg font-semibold mb-4">Sessions</h2>

                    <hr className="border-gray-400 border-t-1 my-4 shadow-sm"/>

                    {/* session card */}
                    <div className="space-y-4">
                        {sessions.map(session => (
                            <SessionCard
                                key={session.sessionId}
                                session={session}
                                eventId={Number(eventId)}
                            />
                        ))}
                    </div>
                </div>

                <div className="px-8 py-4">
                    <p className="text-muted-foreground">Booking Page {eventId}</p>
                </div>
            </div>
        </>
    )
}
export default Page;