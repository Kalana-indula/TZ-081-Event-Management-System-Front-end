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
            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
                {/* Hero section with modern styling */}
                <div className="relative h-[500px] w-full overflow-hidden">
                    {/* Background with modern gradient */}
                    <div
                        className="relative h-full flex flex-col items-center justify-center px-4"
                        style={{
                            background: `linear-gradient(135deg, #193cb8 0%, #2563eb 30%, #3b82f6 70%, #193cb8 100%)`
                        }}
                    >
                        {/* Decorative background elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                            <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                        </div>

                        {/* Content (on top of background) */}
                        <div className="relative z-10 w-full flex flex-col items-center text-center">
                            {/* Main heading */}
                            <div className="mb-8">
                                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                        Find Your Event
                                    </span>
                                </h1>
                                <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
                                    Discover amazing experiences and create unforgettable memories
                                </p>
                            </div>

                            {/* Modern search bar */}
                            <div className="w-full max-w-2xl">
                                <div className="relative">
                                    <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                                        <div className="flex-1 relative">
                                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="Search for events, venues, categories..."
                                                className="w-full pl-12 pr-4 py-4 text-gray-700 bg-transparent focus:outline-none text-lg placeholder-gray-400"
                                            />
                                        </div>
                                        <button
                                            className="px-8 py-4 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                            style={{ backgroundColor: '#193cb8' }}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-8">
                    {/* Modern header section */}
                    <div className="sticky top-0 bg-white/90 backdrop-blur-lg z-20 border-b border-gray-200/50 shadow-lg">
                        <div className="px-3 sm:px-4 md:px-8">
                            <div className="flex justify-between items-center py-4">
                                <div className="relative inline-block">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                        <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                            Latest Events
                                        </span>
                                    </h2>
                                    {/* Accent Line */}
                                    <div className="absolute -bottom-1 left-0 w-16 h-1 rounded-full"
                                         style={{backgroundColor: "#193cb8"}}>
                                    </div>
                                </div>

                                <Link
                                    className="group relative overflow-hidden font-semibold text-sm sm:text-base px-6 py-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        color: "#193cb8",
                                        borderColor: "#193cb8",
                                        backgroundColor: "transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#193cb8";
                                        e.target.style.color = "white";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "transparent";
                                        e.target.style.color = "#193cb8";
                                    }}
                                    href={`/all-events`}
                                >
                                    <span className="relative flex items-center gap-2">
                                        View All Events
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>

                            {/* Enhanced decorative elements */}
                            <div className="pb-3 flex justify-center items-center gap-3 opacity-70">
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: "#193cb8"}}></div>
                                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="px-3 sm:px-4 md:px-8 py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sessions.map((session: SessionCardDetails) => (
                                <div key={session.sessionId} className="flex justify-center transform transition-transform duration-200 hover:scale-105">
                                    <EventCard session={session}/>
                                </div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {sessions.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                                <p className="text-gray-600">Check back later for upcoming events.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Admin/Manager Links */}
                <div className="px-3 sm:px-4 md:px-8 py-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                        <div className="flex gap-6 justify-center">
                            <Link
                                href="/admin/dashboard"
                                className="group flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 font-medium transition-all duration-200 hover:scale-105 hover:shadow-md hover:border-gray-300"
                            >
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Admin Dashboard
                            </Link>
                            <Link
                                href="/manager/dashboard"
                                className="group flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 font-medium transition-all duration-200 hover:scale-105 hover:shadow-md hover:border-gray-300"
                            >
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Manager Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <footer className="mt-16">
                    <MainFooter/>
                </footer>
            </div>
        </>
    );
};

export default Page;