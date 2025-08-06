'use client'

import React, {useEffect, useState} from 'react'

import activityData from '@/data/OrganizerActivityDetails';
import {Button} from "@/components/ui/button";
import {ChartSpline} from "lucide-react";
import {useRouter} from "next/navigation";

interface OrganizerActivity {
    eventId: number;
    eventName: string;
    eventType: string;
    startedDate: string;
    totalRevenue: number;
    profit: number;
    commission: number;
}


const Page = ({params}: { params: Promise<{ organizerId: number }> }) => {

    const [organizerDetails, setOrganizerDetails] = useState<OrganizerActivity[]>([]);
    const {organizerId} = React.use(params);

    //configure navigation
    const route=useRouter();

    useEffect(() => {
        setOrganizerDetails(activityData);
    }, []);

    const routeToOrganizerStats=()=>{
        route.push(`/admin/statistics/organizer/${organizerId}/organizer-stats`);
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Revenue Insights
                        - {organizerId}</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Activities And Earnings By Organizer</p>
                </div>
            </div>

            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white min-h-screen">
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">PAYMENT DETAILS</h3>
                    </div>
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Event
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Event Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Event Type
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Started On
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Total Revenue
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Profit
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {organizerDetails && organizerDetails.length > 0 ? (
                                    organizerDetails.map((detail: OrganizerActivity) => (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={detail.eventId}>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{detail.eventId}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{detail.eventType}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{detail.startedDate}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{detail.totalRevenue}</td>
                                            <td className="px-6 py-4 text-center">{detail.profit}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{detail.commission}</td>
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

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {(() => {
                                return organizerDetails && organizerDetails.length > 0
                                    ? organizerDetails.map((detail: OrganizerActivity) => (
                                        <div
                                            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer space-y-2"
                                            key={detail.eventId}>
                                            {/*header section*/}
                                            <div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">{detail.eventName}</h3>
                                                        <p className="text-gray-600">{detail.eventType}</p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <span className="font-semibold">Event Id : </span>
                                                            <span className="text-gray-600">{detail.eventId}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr className="border-gray/40 border-t-1 mx-4 my-1"/>
                                            </div>
                                            {/*details section*/}
                                            <div className="flex justify-between">
                                                <div>
                                                    <p>Started On</p>
                                                    <p>Total Revenue</p>
                                                    <p>Profit</p>
                                                    <p>Commission</p>
                                                </div>
                                                <div className="text-gray-600">
                                                    <p>{detail.startedDate}</p>
                                                    <p>{detail.totalRevenue}</p>
                                                    <p>{detail.profit}</p>
                                                    <p>{detail.commission} %</p>
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
                                    );
                            })()}
                        </div>

                    </div>
                    <div className="flex justify-center items-center my-5">
                        <Button className="bg-white border border-black text-black hover:text-white active:bg-white active:text-black"
                        onClick={routeToOrganizerStats}>
                            <ChartSpline strokeWidth={2} />
                            Organizer Statistics
                        </Button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Page
