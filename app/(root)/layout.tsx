import React from 'react'
import RootHeader from "@/app/app-components/RootHeader";
import RootFooter from "@/app/app-components/RootFooter";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 w-full z-50">
                <RootHeader />
            </div>

            {/* Scrollable Main Content */}
            <div className="flex-1 overflow-y-auto my-[10vh]">
                {children}
            </div>

            {/* Fixed Footer */}
            <div className="fixed bottom-0 w-full z-50">
                <RootFooter />
            </div>
        </div>
    )
}

export default Layout;
