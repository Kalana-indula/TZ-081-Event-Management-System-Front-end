'use client'

import React, {useEffect, useState} from 'react'
import {MdManageAccounts} from "react-icons/md";
import {RiUserAddLine} from "react-icons/ri";
import {MdOutlineDashboard} from "react-icons/md";
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const Page = () => {
    //get current date and format it
    const getCurrentDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear());
        return `${day}/${month}/${year}`;
    }

    //fetch organizer count
    const [organizers, setOrganizers] = useState<number | string>(0);
    const [onGoingEvents, setOnGoingEvents] = useState<number | string>(0);

    //configure navigation
    const router = useRouter();

    //navigate
    const routeToAddAdmin = () => {
        router.push("/admin/add-admin");
    }

    const routeToAddManager = (): void => {
        router.push("/admin/add-manager");
    }

    const routeToManagerControl=():void=>{
        router.push("/admin/manager-control");
    }

    const routeToManagerDachboard=():void=>{
        router.push("/manager/dashboard");
    }

    //load data at page loading
    useEffect(() => {
        getOrganizerCount();
        getOngoingEvents();
    }, []);

    //fetch organizers count from api
    const getOrganizerCount = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizers/count`);
            console.log(response.data);
            setOrganizers(response.data);

        } catch (error) {
            console.log(error);

            //check the error
            if (axios.isAxiosError(error) && error.response) {
                //display the message from back end
                setOrganizers(error.response.data);
            } else {
                //handle other errors
                setOrganizers("Error Loading Data");
            }
        }
    }

    //fetch ongoing events
    const getOngoingEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/on-going/events`);
            setOnGoingEvents(response.data);
        } catch (error) {
            console.log(error);

            //check the error
            if (axios.isAxiosError(error) && error.response) {
                //display message
                setOnGoingEvents(error.response.data);
            } else {
                setOnGoingEvents("Error Loading Data");
            }
        }
    }
    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="flex justify-center items-center text-[20px] h-[50px] py-[30px]">
                    <h1>Admin Dashboard</h1>
                </div>
            </div>
            {/*scrollable content*/}
            <div className="p-3 sm:p-4 md:p-6 ">
                <div>
                    <div className="display-date bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                        <span className="text-gray-500 font-medium">DATE:</span>
                        <span className="text-gray-800 font-semibold ml-2">{getCurrentDate()}</span>
                    </div>

                    {/*Organizer Details*/}
                    <div
                        className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                        <div>
                            <h3 className="text-gray-500 font-medium">ORGANIZER STATUS</h3>
                        </div>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-[30px]">
                            <div
                                className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                                <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                    <Image src="/pending.png" alt="pending" height={32} width={32}/>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Pending Approvals
                                    </div>
                                    <div>Count</div>
                                </div>
                                <Button
                                    className="border border-black bg-white text-black px-[10px] py-[10px] rounded-[5px] hover:bg-black hover:text-white transition-colors duration-300 absolute right-[20px] bottom-[20px] active:bg-white active:text-black">
                                    View All
                                </Button>
                            </div>
                            <div
                                className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                                <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                    <Image src="/approved.png" alt="pending" height={32} width={32}/>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Approved Organizers
                                    </div>
                                    <div>{organizers}</div>
                                </div>
                                <Button
                                    className="border border-black bg-white text-black px-[10px] py-[10px] rounded-[5px] hover:bg-black hover:text-white transition-colors duration-300 absolute right-[20px] bottom-[20px] active:bg-white active:text-black">
                                    View All
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/*Event details*/}
                    <div
                        className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                        <div>
                            <h3 className="text-gray-500 font-medium">EVENT STATUS</h3>
                        </div>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-[30px]">
                            <div
                                className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                                <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                    <Image src="/pending.png" alt="pending" height={32} width={32}/>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Pending Approvals
                                    </div>
                                    <div>Count</div>
                                </div>
                                <Button
                                    className="border border-black bg-white text-black px-[10px] py-[10px] rounded-[5px] hover:bg-black hover:text-white transition-colors duration-300 absolute right-[20px] bottom-[20px] active:bg-white active:text-black">
                                    View All
                                </Button>
                            </div>
                            <div
                                className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                                <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                    <Image src="/ongoing.png" alt="pending" height={32} width={32}/>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        On Going Events
                                    </div>
                                    <div>{onGoingEvents}</div>
                                </div>
                                <Button
                                    className="border border-black bg-white text-black px-[10px] py-[10px] rounded-[5px] hover:bg-black hover:text-white transition-colors duration-300 absolute right-[20px] bottom-[20px] active:bg-white active:text-black">
                                    View All
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
                <div>

                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-[20px] gap-[20px] mx-[10px]">

                    <button
                        className="h-[150px] bg-[#3a86ff] text-white flex flex-col justify-center items-center my-[5px] hover:bg-[#195fc2] transition-colors duration-200 rounded-[5px] cursor-pointer"
                        onClick={routeToAddAdmin}>
                        <div className="text-4xl sm:text-2xl md:text-[40px]">
                            <MdManageAccounts/>
                        </div>
                        <div className="text-base sm:text-sm md:text-base mt-2">
                            Add Admin
                        </div>
                    </button>
                    <button
                        className="h-[150px] bg-[#3a86ff] text-white flex flex-col justify-center items-center my-[5px] hover:bg-[#195fc2] transition-colors duration-200 rounded-[5px] cursor-pointer"
                        onClick={routeToManagerControl}>
                        <div className="text-4xl sm:text-2xl md:text-[40px]">
                            <MdManageAccounts/>
                        </div>
                        <div className="text-base sm:text-sm md:text-base mt-2">
                            Manager Control
                        </div>
                    </button>
                    <button
                        className="h-[150px] bg-[#3a86ff] text-white flex flex-col justify-center items-center my-[5px] hover:bg-[#195fc2] transition-colors duration-200 rounded-[5px] cursor-pointer"
                        onClick={routeToAddManager}
                    >
                        <div className="text-4xl sm:text-2xl md:text-[40px]">
                            <RiUserAddLine/>
                        </div>
                        <div className="text-base sm:text-sm md:text-base mt-2">
                            Add Manager
                        </div>
                    </button>
                    <div
                        className="h-[150px] bg-[#3a86ff] text-white flex flex-col justify-center items-center my-[5px] hover:bg-[#195fc2] transition-colors duration-200 rounded-[5px] cursor-pointer"
                    onClick={routeToManagerDachboard}>
                        <div className="text-4xl sm:text-2xl md:text-[40px]">
                            <MdOutlineDashboard/>
                        </div>
                        <div className="text-base sm:text-sm md:text-base mt-2">
                            Manager Dashboard
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Page;