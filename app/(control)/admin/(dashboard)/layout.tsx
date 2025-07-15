import React from 'react'
import AdminHeader from "@/app/(control)/admin/components/AdminHeader";
import SideNavBar from "@/app/(control)/admin/components/SideNavBar";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div>
                <SideNavBar/>
            </div>
            <div className="flex-1 h-screen flex flex-col">
                {/* Fixed Header */}
                <div className="top-0 flex justify-center z-50 bg-white w-full">
                    <AdminHeader/>
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