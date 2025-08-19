'use client'

import React from 'react'

const Page = ({params}:{params:Promise<{eventId:number}>}) => {

    const {eventId}=React.use(params);
    return (
        <div>Booking Page {eventId}</div>
    )
}
export default Page;
