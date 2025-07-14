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
                <div className="fixed top-0 left-[200px] right-0 z-50 bg-white">
                    <AdminHeader/>
                </div>

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-y-auto mt-[10vh] px-[10px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Layout;