import React from 'react'

const Page = ({params}:{params:{organizerId:number}}) => {

    const {organizerId}=params;
    return (
        <div>{organizerId}</div>
    )
}
export default Page
