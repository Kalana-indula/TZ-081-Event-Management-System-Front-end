// organizer dashboard
'use client'

import React, {useEffect, useState} from 'react'
import {CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Button} from "@/components/ui/button";
import {IoDocumentTextOutline} from "react-icons/io5";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {handleApiError} from "@/lib/utils";
import {EventDetails} from "@/types/entityTypes";

interface StatData {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

const data: StatData[] = [
    {
        "name": "Jan",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Feb",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Mar",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Apr",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "May",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Jun",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Jul",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Aug",
        "uv": 3200,
        "pv": 4100,
        "amt": 2300
    },
    {
        "name": "Sep",
        "uv": 3800,
        "pv": 4500,
        "amt": 2600
    },
    {
        "name": "Oct",
        "uv": 4200,
        "pv": 4800,
        "amt": 2800
    },
    {
        "name": "Nov",
        "uv": 4500,
        "pv": 5200,
        "amt": 3000
    },
    {
        "name": "Dec",
        "uv": 4800,
        "pv": 5500,
        "amt": 3200
    }
]

const Page = () => {
    //get event count
    const [totalEvents, setTotalEvents] = useState<number>(0);
    const [totalEarnings, setTotalEarnings] = useState<number|string>(0);
    const [scheduledEvents, setScheduledEvents] = useState<number>(0);
    const [onGoingEvents, setOnGoingEvents] = useState<EventDetails[]>([]);

    //get user id from params
    const params = useParams();

    const organizerId = params.organizerId as string;

    //configure navigation
    const route = useRouter();

    useEffect(() => {
        //     load all events at page reload
        //     getEventsList();
        getEventCounts();
        getEventsByOrganizer();
    }, []);

    //format financial metrics
    const formatFinancialValues = (value: number) => {

        setTotalEarnings(value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    //fetch event counts
    const getEventCounts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizer/${organizerId}/events/counts`);
            setTotalEvents(response.data.allEventsCount);
            setScheduledEvents(response.data.approvedEventsCount);
        } catch (err) {
            handleApiError(err, "Failed to load events");
        }
    }

    //fetch events by organizer
    const getEventsByOrganizer = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizers/${organizerId}/events`);
            setOnGoingEvents(response.data.onGoingEvents);
            formatFinancialValues(response.data.totalEarnings);

        } catch (err) {
            handleApiError(err, "Failed to load events");
        }
    }

    //route to all events
    const routeToAllEvents = (id: string) => {
        route.push(`/organizer/${id}/all-events`);
    }

    //route to add event
    const routeToAddEvent = () => {
        route.push(`/organizer/${organizerId}/add-event`);
    }

    //route to event dashboard
    const routeToEventDashboard = (eventId: number) => {
        route.push(`/organizer/event/${eventId}/dashboard`);
    }

    return (
        <>
            {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Manage and control organizer actions</p>
                </div>
            </div>

            {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">

                {/*earnings and events count*/}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* Scheduled Events */}
                    <div className="bg-blue-600 text-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-90">Scheduled Events</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-semibold">{scheduledEvents}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Events */}
                    <div className="bg-blue-600 text-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-90">Total Events</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-semibold">{totalEvents}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Earnings */}
                    <div className="bg-blue-600 text-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-90">Total Earnings</p>
                                <p className="text-xs opacity-75">(LKR)</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-semibold">{totalEarnings}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*    chart section*/}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">ANNUAL FINANCIAL DATA</h3>
                    </div>

                    {/*chart*/}
                    <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-md">
                        <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 0,
                                        bottom: 30
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis
                                        dataKey="name"
                                        tick={{fontSize: 12}}
                                        interval="preserveStartEnd"
                                    />
                                    <Label
                                        value="Month"
                                        offset={-70}
                                        position="insideBottom"
                                        style={{fontSize: 15}}
                                    />
                                    <YAxis
                                        tick={{fontSize: 12}}
                                        width={70}
                                    />
                                    <Label
                                        value="Amount"
                                        offset={-50}
                                        angle={-90}
                                        position="insideLeft"
                                        style={{fontSize: 15}}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            fontSize: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{fontSize: '12px'}}
                                    />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/*    report generation button*/}
                    <div className="my-[20px] flex justify-center items-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <IoDocumentTextOutline className="mr-2"/>
                            Generate Report
                        </Button>
                    </div>
                </div>

                {/*    table section*/}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div className="flex justify-between items-center py-2">
                        <h3 className="text-gray-500 font-medium">Ongoing Events</h3>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 hover:cursor-pointer"
                            onClick={routeToAddEvent}
                        >
                            + Create New Event
                        </Button>
                    </div>

                    <div>
                        {/*    desktop table view*/}
                        <div className="hidden md:block overflow-x-auto shadow-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Event Id
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Event Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Event Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Date Started
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {onGoingEvents && onGoingEvents.length > 0 ? (
                                    onGoingEvents.map((event: EventDetails) => (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={event.eventId}
                                            onClick={() => routeToEventDashboard(event.eventId)}>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-sm">{event.eventId}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-sm">{event.eventName}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-sm">{event.eventType}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-sm">{event.startingDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
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
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No events
                                                    available</h3>
                                                <p className="text-sm text-gray-500">There are currently no event
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
                            {onGoingEvents && onGoingEvents.length > 0 ? (
                                onGoingEvents.map((event: EventDetails) => (
                                    <div
                                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                        key={event.eventId}
                                        onClick={() => routeToEventDashboard(event.eventId)}>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-gray-900 text-sm">Event
                                                    ID: {event.eventId}</h4>
                                                <span className="text-xs text-gray-500">{event.startingDate}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{event.eventName}</p>
                                                <p className="text-sm text-gray-600">{event.eventType}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
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
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events available</h3>
                                        <p className="text-sm text-gray-500 text-center">There are currently no event
                                            records to display.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* All Events Button */}
                        <div className="mt-4 flex justify-center">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                                    onClick={() => routeToAllEvents(organizerId)}
                            >
                                All Events
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;