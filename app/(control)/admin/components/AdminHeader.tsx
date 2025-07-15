'use client'

import React, {useState} from 'react'
import Link from "next/link";
import {IoIosHome, IoIosMenu} from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";

const AdminHeader = () => {

    const [isNavBarOpen,setIsNavBarOpen] = useState<boolean>(false);

    const navBarControl=()=>{
        setIsNavBarOpen(!isNavBarOpen);
        console.log(isNavBarOpen);
    }
    return (
        <>
            <div className="h-[10vh] flex items-center justify-between px-[10px] w-full relative">
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
                <div className="block sm:hidden">
                    <button
                        className="p-[5px] bg-white rounded-full text-[25px] hover:cursor-pointer border border-gray-200 hover:bg-gray-100 transition-colors duration-300 active:bg-gray-300"
                        onClick={navBarControl}>
                        <IoIosMenu/>
                    </button>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-[30px] text-center">Admin Dashboard</h1>
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
            </div>
        </>
    )
}
export default AdminHeader;