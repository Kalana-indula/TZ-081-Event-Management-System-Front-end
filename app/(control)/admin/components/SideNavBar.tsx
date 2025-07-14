'use client'

import React from 'react'
import {LuLayoutDashboard} from "react-icons/lu";
import {FaMoneyBillTransfer} from "react-icons/fa6";
import {MdOutlinePayment} from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi";
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosHome, IoIosLogOut} from "react-icons/io";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaUserCircle} from "react-icons/fa";

const SideNavBar = () => {

    //fetch current route
    const pathName = usePathname();

    const navItems = [
        {
            href: '/admin/dashboard',
            icon: LuLayoutDashboard,
            label: 'Dashboard'
        },
        {
            href: '/admin/cash-flow',
            icon: FaMoneyBillTransfer,
            label: 'Cash Flow'
        },
        {
            href: '/admin/payments',
            icon: MdOutlinePayment,
            label: 'Payments'
        },
        {
            href: '/admin/statistics',
            icon: TfiStatsUp,
            label: 'Statistics'
        },
        {
            href: '/admin/settings',
            icon: IoSettingsOutline,
            label: 'Settings'
        },
        {
            href: '/admin/logout',
            icon: IoIosLogOut,
            label: 'Logout'
        }
    ];

    return (
        <>
            <div className="h-[100vh] bg-[#3a86ff] w-[200px]">
                <div className="h-[10vh]">
                    Logo
                </div>

                <div className="block sm:hidden">
                    <div className="flex flex-col justify-center w-full text-white">
                        <Link className="w-full" href="/">
                            <div
                                className="flex items-center justify-start px-[20px] py-[10px] gap-4 hover:bg-[#195fc2] transition-colors duration-200">
                                <div className="text-[32px]">
                                    <IoIosHome/>
                                </div>
                                <div className="text-[20px]">
                                    Home
                                </div>
                            </div>
                        </Link>

                        <Link className="w-full" href="/user">
                            <div
                                className="flex items-center justify-start px-[20px] py-[10px] gap-4 hover:bg-[#195fc2] transition-colors duration-200">
                                <div className="text-[32px]">
                                    <FaUserCircle/>
                                </div>
                                <div className="text-[20px]">
                                    Username
                                </div>
                            </div>
                        </Link>
                    </div>
                    <hr className="border-white/40 border-t-2 mx-4 my-5 shadow-sm"/>
                </div>

                <div className="flex flex-col justify-center w-full">
                    {navItems.map((item) => {
                        //check if the current pathname is the active one
                        const isActive = pathName === item.href;
                        const IconComponent = item.icon;

                        return (
                            <Link href={item.href} key={item.href} className="w-full">
                                <div
                                    className={`flex items-center justify-start gap-4 h-[50px] px-[20px] py-[20px] w-full transition-colors duration-200 ${
                                        isActive ? 'bg-[#195fc2] text-white border-r-4 border-white' : 'text-white hover:bg-[#195fc2]'
                                    }`}>
                                    <div className="nav-icon text-[32px]">
                                        <IconComponent/>
                                    </div>
                                    <div className="page-name text-[20px]">
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
