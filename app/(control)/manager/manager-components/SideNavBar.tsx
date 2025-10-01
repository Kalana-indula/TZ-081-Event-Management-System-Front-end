'use client'

import React from 'react'
import {LuMessageSquareText} from "react-icons/lu";
import {MdOutlinePayment} from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosClose, IoIosHome, IoIosLogOut, IoIosNotifications} from "react-icons/io";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {FaUserCircle} from "react-icons/fa";
import {MdEventAvailable} from "react-icons/md";
import {LayoutDashboard} from "lucide-react";
import {GrTransaction} from "react-icons/gr";

interface SideNavBarProps {
    isNavBarOpen: boolean;
    setIsNavBarOpen: (value: boolean) => void;
}

const SideNavBar = ({isNavBarOpen, setIsNavBarOpen}: SideNavBarProps) => {

    //fetch current route
    const pathName = usePathname();

    const router = useRouter();

    const navItems = [
        {
            href: '/manager/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard'
        },
        {
            href: '/manager/organizers',
            icon: LuUserRound,
            label: 'Organizers'
        },
        {
            href: '/manager/transactions',
            icon: GrTransaction,
            label: 'Transactions'
        },
        {
            href: '/manager/settings',
            icon: IoSettingsOutline,
            label: 'Settings'
        },
        {
            href: '/manager/logout',
            icon: IoIosLogOut,
            label: 'Logout'
        }
    ];

    //close nav bar when link is clicked
    const handleLinkClick = () => {
        setIsNavBarOpen(false);
    }

    const navigateToUser = () => {
        router.push("/user");
    }

    return (
        <>
            <div className={`h-screen bg-gray-700 w-[100px] lg:w-[200px] sm:block
                            ${isNavBarOpen ? "w-[200px]" : "hidden"}`}>
                <div className="w-full relative py-[10px] block sm:hidden">
                    <div className="text-gray-100 text-[32px] absolute right-[20px] hover:cursor-pointer hover:text-gray-300 transition-colors duration-200"
                         onClick={handleLinkClick}>
                        <IoIosClose/>
                    </div>
                </div>
                <div className="h-[10vh] flex justify-center items-center">
                    <div className="text-blue-500 text-[32px]">
                        <MdEventAvailable/>
                    </div>
                </div>

                <div className="block sm:hidden">
                    <div className="flex flex-col justify-center w-full text-gray-100">
                        {/*Home*/}
                        <Link className="w-full" href="/">
                            <div
                                className="flex items-center justify-start px-[20px] py-[10px] gap-4 hover:bg-gray-600 transition-colors duration-200">
                                <div className="text-[32px]">
                                    <IoIosHome/>
                                </div>
                                <div className="text-[20px]">
                                    Home
                                </div>
                            </div>
                        </Link>

                        {/*Username*/}
                        <Link className="w-full" href="/user">
                            <div
                                className="flex items-center justify-start px-[20px] py-[10px] gap-4 hover:bg-gray-600 transition-colors duration-200">
                                <div className="text-[32px]">
                                    <FaUserCircle/>
                                </div>
                                <div className="text-[20px]">
                                    Username
                                </div>
                            </div>
                        </Link>

                    </div>
                    <hr className="border-gray-600 border-t-2 mx-4 my-5 shadow-sm"/>
                </div>

                {/*notifications and messages*/}
                <div className="flex flex-col justify-center text-gray-100 lg:hidden">
                    <button
                        className="flex items-center justify-start sm:justify-center px-[20px] py-[10px] gap-4 hover:bg-gray-600 transition-colors duration-200"
                        onClick={navigateToUser}>
                        <div className="text-[32px]">
                            <IoIosNotifications/>
                        </div>
                        <div className="text-[20px] sm:hidden">
                            Notifications
                        </div>
                    </button>
                    <button
                        className="flex items-center justify-start sm:justify-center px-[20px] py-[10px] gap-4 hover:bg-gray-600 transition-colors duration-200"
                        onClick={navigateToUser}>
                        <div className="text-[32px]">
                            <LuMessageSquareText/>
                        </div>
                        <div className="text-[20px] sm:hidden">
                            Messages
                        </div>
                    </button>
                    <hr className="border-gray-600 border-t-2 mx-4 my-5 shadow-sm"/>
                </div>

                <div className="flex flex-col justify-center w-full">
                    {navItems.map((item) => {
                        //check if the current pathname is the active one
                        const isActive = pathName === item.href;
                        const IconComponent = item.icon;

                        return (
                            <Link href={item.href} key={item.href} className="w-full">
                                <div
                                    className={`flex items-center justify-center lg:justify-start gap-4 h-[50px] px-[20px] py-[20px] w-full transition-colors duration-200 ${
                                        isActive ? 'bg-gray-600 text-white border-r-4 border-blue-500' : 'text-gray-100 hover:bg-gray-600'
                                    }
                                    ${isNavBarOpen ? "justify-start" : ""}`}>
                                    <div className="nav-icon text-[32px]">
                                        <IconComponent strokeWidth={1}/>
                                    </div>
                                    <div
                                        className={`page-name text-[20px] lg:block ${isNavBarOpen ? "block" : "hidden"}`}>
                                        {item.label}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
export default SideNavBar;