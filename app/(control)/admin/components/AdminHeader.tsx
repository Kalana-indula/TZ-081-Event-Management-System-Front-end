'use client'

import React from 'react'
import Link from "next/link";
import {IoIosHome, IoIosMenu, IoIosNotifications} from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {LuMessageSquareText} from "react-icons/lu";

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
                    <Link className="flex items-center" href="/">
                        <div className="text-[25px]">
                            <IoIosHome/>
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
                    <h1 className="text-[30px] text-center">Admin Control Panel</h1>
                </div>

                {/* Right Section - User Link */}
                <div className="hidden sm:block">
                    <div className="flex justify-center items-center gap-[20px]">
                        <button onClick={navigateToUser} className="hidden lg:block">
                            <div className="text-[25px]">
                                <IoIosNotifications/>
                            </div>
                        </button>
                        <button onClick={navigateToUser} className="hidden lg:block">
                            <div className="text-[25px]">
                                <LuMessageSquareText/>
                            </div>
                        </button>

                        <button className="flex items-center"
                                onClick={navigateToUser}
                        >
                            <div className="text-[25px]">
                                <FaUserCircle/>
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