import React from 'react'
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";

const AdminHeader = () => {
    return (
        <>
            <div className="h-[10vh] flex items-center justify-between px-[10px] relative">
                {/* Left Section - Home Link */}
                <div className="hidden sm:block">
                    <Link className="flex items-center" href="/">
                        <div className="text-[25px]">
                            <IoIosHome />
                        </div>
                        <div className="text-[16px]">
                            Home
                        </div>
                    </Link>
                </div>

                {/* Spacer for mobile screens */}
                <div className="sm:hidden w-[50px]"></div>

                {/* Center Section - Title (Always Centered) */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-[30px] whitespace-nowrap">Admin Dashboard</h1>
                </div>

                {/* Right Section - User Link */}
                <div className="hidden sm:block">
                    <Link className="flex items-center" href="/user">
                        <div className="text-[25px]">
                            <FaUserCircle/>
                        </div>
                        <div className="text-[16px]">
                            Username
                        </div>
                    </Link>
                </div>

                {/* Spacer for mobile screens */}
                <div className="sm:hidden w-[50px]"></div>
            </div>
        </>
    )
}
export default AdminHeader;