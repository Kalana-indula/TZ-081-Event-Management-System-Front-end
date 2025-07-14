import React from 'react'
import Link from "next/link";

const Page = () => {
    return (
        <>
            <div className="">
                Home Page
            </div>
            <div>
                <h1>Tempory Links</h1>
                <ul>
                    <li>
                        <Link href="/admin/dashboard">Admin</Link>
                    </li>
                    <li>
                        <Link href="/manager">Manager</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Page;
