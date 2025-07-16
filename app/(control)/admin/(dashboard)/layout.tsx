'use client'

import React, {useState} from 'react'
import AdminHeader from "@/app/(control)/admin/components/AdminHeader";
import SideNavBar from "@/app/(control)/admin/components/SideNavBar";

const Layout = ({children}: { children: React.ReactNode }) => {
    // check navbar status
    const [isNavBarOpen,setIsNavBarOpen]=useState<boolean>(false);

    const toggleNavBar=()=>{
        setIsNavBarOpen(!isNavBarOpen);
        console.log(isNavBarOpen);
    }
    return (
        <div className="flex relative">
            {/*add overlay effect on mobile screens*/}
            {/*sm:relative enables the sidebar to behave normally on larger screen sizes*/}
            <div className={`
                fixed sm:relative
                z-50
                transition-transform duration-200 ease-in-out
                ${isNavBarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
            `}>
                <SideNavBar isNavBarOpen={isNavBarOpen} setIsNavBarOpen={setIsNavBarOpen}/>
            </div>

            {/*overlay backdrop for mobile*/}
            {isNavBarOpen && (
                <div className="fixed inset-0 bg-black/25 z-40 sm:hidden"
                     onClick={()=>setIsNavBarOpen(false)}
                />
            )}
            <div className="flex-1 h-screen flex flex-col sm:ml-0">
                {/* Fixed Header */}
                <div className="top-0 flex justify-center z-30 bg-white w-full">
                    <AdminHeader isNavBarOpen={isNavBarOpen} toggleNavBar={toggleNavBar}/>
                </div>

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-y-auto px-[10px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Layout;