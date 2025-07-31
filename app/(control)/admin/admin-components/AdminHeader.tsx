'use client'

import React from 'react'
import Link from "next/link";
import {IoIosHome, IoIosMenu, IoIosNotifications} from "react-icons/io";
import {useRouter} from "next/navigation";
import {LuMessageSquareText} from "react-icons/lu";
import {Bell, CircleUserRound, House, Mail} from "lucide-react";

interface AdminHeaderProps {
    isNavBarOpen: boolean;
    toggleNavBar: () => void;
}

const AdminHeader = ({isNavBarOpen, toggleNavBar}: AdminHeaderProps) => {

    const router = useRouter();

    const navigateToUser = () => {
        router.push("/user");
    }

    return (
        <>
            <div className="h-[10vh] flex items-center justify-between px-[10px] w-full relative">
                {/* Left Section - Home Link */}
                <div className="hidden sm:block">
                    <Link className="flex items-center hover:cursor-pointer" href="/">
                        <div className="text-[25px]">
                            <House />
                        </div>
                        <div className="text-[16px]">
                            Home
                        </div>
                    </Link>
                </div>
                <div className="block sm:hidden">
                    <button
                        className="p-[5px] bg-white rounded-full text-[25px] hover:cursor-pointer border border-gray-200 hover:bg-gray-100 transition-colors duration-300 active:bg-gray-300"
                        onClick={toggleNavBar}>
                        <IoIosMenu/>
                    </button>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-[30px] text-center font-bold text-gray-900">Admin Control Panel</h1>
                </div>

                {/* Right Section - User Link */}
                <div className="hidden sm:block">
                    <div className="flex justify-center items-center gap-[20px]">
                        <button onClick={navigateToUser} className="hidden lg:block hover:cursor-pointer">
                            <div className="text-[25px]">
                                <Bell />
                            </div>
                        </button>
                        <button onClick={navigateToUser} className="hidden lg:block hover:cursor-pointer">
                            <div className="text-[25px]">
                                <Mail />
                            </div>
                        </button>

                        <button className="flex items-center hover:cursor-pointer"
                                onClick={navigateToUser}
                        >
                            <div className="text-[25px]">
                                <CircleUserRound />
                            </div>
                            <div className="text-[16px]">
                                Username
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminHeader;