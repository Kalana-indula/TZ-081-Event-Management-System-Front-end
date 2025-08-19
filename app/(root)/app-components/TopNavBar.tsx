'use client'

import React from 'react'
import Link from "next/link";
import {IoIosMenu} from "react-icons/io";
import {useRouter} from "next/navigation";
import { House} from "lucide-react";

interface OrganizerHeaderProps {
    isNavBarOpen: boolean;
    toggleNavBar: () => void;
}

const TopNavBar = ({isNavBarOpen, toggleNavBar}: OrganizerHeaderProps) => {

    const router = useRouter();

    const navigateToRegister = () => {
        router.push("/register");
    }

    const navigateToLogin = () => {
        router.push("/login");
    }

    return (
        <>
            <div className="h-[10vh] flex items-center justify-between bg-gray-700 px-[10px] w-full relative">
                {/* Left Section - Home Link */}
                <div className="hidden sm:block">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Link className="text-[25px] text-white" href="/">
                                <House/>
                            </Link>
                            <Link className="hover:cursor-pointer" href="/">
                                <div className="text-[25px] text-white font-bold">
                                    EventWisp
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link className="hover:cursor-pointer" href="/">
                                <div className="text-[18px] text-white font-semibold">
                                    Entertainment
                                </div>
                            </Link>
                            <Link className="hover:cursor-pointer" href="/">
                                <div className="text-[18px] text-white font-semibold">
                                    Educational
                                </div>
                            </Link>
                            <Link className="hover:cursor-pointer" href="/">
                                <div className="text-[18px] text-white font-medium">
                                    Business & Tech
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="block sm:hidden">
                    <button
                        className="p-[5px] bg-gray-700 rounded-full text-[25px] text-white hover:cursor-pointer border border-gray-500 hover:bg-gray-600 transition-colors duration-300 active:bg-gray-300"
                        onClick={toggleNavBar}>
                        <IoIosMenu/>
                    </button>
                </div>

                {/*middle heading*/}
                <div className="block sm:hidden absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-[25px] text-white sm:text-[30px] text-center font-bold">EventWisp</h1>
                </div>

                {/* Right Section - User Link */}
                <div className="hidden sm:block">
                    <div className="flex justify-center items-center gap-[20px]">
                        <button className="flex items-center hover:cursor-pointer"
                                onClick={navigateToRegister}
                        >
                            <div className="text-[16px] text-white">
                                Register
                            </div>
                        </button>

                        <button className="flex items-center hover:cursor-pointer"
                                onClick={navigateToLogin}
                        >
                            <div className="text-[16px] text-white">
                                Login
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopNavBar;