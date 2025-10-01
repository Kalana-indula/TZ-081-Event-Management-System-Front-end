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
import { useRouter} from "next/navigation";
import {OrganizerEarningDetails} from "@/types/entityTypes";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import {getValueString} from "@/lib/utils";
import {FileText} from "lucide-react";

const Page = () => {

    const [organizerEarnings,setOrganizerEarnings] = useState<OrganizerEarningDetails[]>([]);

    //get params
    const route=useRouter();

    //load data at the page loading
    useEffect(() => {
        getOrganizerEarningDetails();
    }, []);

    //get organizer earning details
    const getOrganizerEarningDetails= async () => {
        try {
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizers/earnings`);
            setOrganizerEarnings(response.data.entityList);
            console.log(response.data.entityList);
        }catch (err){
            if (err instanceof AxiosError) {
                // Handle Axios-specific errors
                const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
                toast.error(errorMessage);
            } else if (err instanceof Error) {
                // Handle generic errors
                toast.error(err.message);
            } else {
                // Handle unknown errors
                toast.error('An unknown error occurred');
            }
        }
    }

    const roteToUser = (id:number)=>{
        route.push(`/admin/statistics/organizer/${id}`);
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Statistics</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Analyze Financial Data</p>
                </div>
            </div>

            {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white min-h-screen">
                {/*sort*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SORT</h3>
                    </div>
                    <div className="flex items-start flex-col sm:flex-row space-y-4 space-x-4">
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white shadow-lg">
                                    <SelectValue placeholder="Select Year" />
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
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white shadow-lg">
                                    <SelectValue placeholder="Select Month" />
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

                {/*table*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">EARNING DETAILS</h3>
                    </div>
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Organizer
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Organizer
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Total Revenue (LKR.)
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {organizerEarnings && organizerEarnings.length > 0 ? (
                                    organizerEarnings.map((earning:OrganizerEarningDetails)=> (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                            key={earning.organizerId}
                                            onClick={()=>roteToUser(earning.organizerId)}>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-sm">{earning.organizerId}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-sm">{earning.organizerName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-sm">{getValueString(earning.totalEarnings)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-600">
                                                    <FileText strokeWidth={1} size={40}/>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments available</h3>
                                                <p className="text-sm text-gray-500">There are currently no payment records to display.</p>
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
                                return organizerEarnings && organizerEarnings.length > 0
                                    ? organizerEarnings.map((earning: OrganizerEarningDetails) => (
                                        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                             key={earning.organizerId}
                                             onClick={()=>roteToUser(earning.organizerId)}>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className="text-sm font-medium text-gray-500">Organizer ID:</span>
                                                    <span
                                                        className="text-sm text-gray-900 font-sm">{earning.organizerId}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                <span
                                                    className="text-sm font-medium text-gray-500">Organizer Name:</span>
                                                    <span
                                                        className="text-sm text-gray-900 font-sm">{earning.organizerName}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500">Total Revenue (LKR.) :</span>
                                                    <span
                                                        className="text-sm text-gray-900 font-sm">{getValueString(earning.totalEarnings)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : (
                                        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                            <div className="flex flex-col items-center justify-center">
                                                <div
                                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-600">
                                                    <FileText strokeWidth={1} size={40}/>
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
                </div>
            </div>

        </>
    )
}
export default Page
