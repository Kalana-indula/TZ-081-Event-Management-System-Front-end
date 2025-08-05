'use client'

import React, { useState } from 'react'
import {useRouter} from "next/navigation";

const Page = () => {
    // State for form fields
    const [eventName, setEventName] = useState('')
    const [startingDate, setStartingDate] = useState('')
    const [eventType, setEventType] = useState('Conference')
    const [bannerImage, setBannerImage] = useState('')
    const [enableVipTickets, setEnableVipTickets] = useState(false)
    const [description, setDescription] = useState('')
    const [ticketTypes, setTicketTypes] = useState([
        { type: '', price: '', count: '' }
    ])

    //configure navigation
    const route=useRouter();

    //handle routing
    const routeToDashboard = (eventId:number)=>{
        route.push(`/organizer/event/${eventId}/dashboard`);
    }

    // Handle input changes
    const handleEventName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value)
    }

    const handleStartingDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStartingDate(e.target.value)
    }

    const handleEventType = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setEventType(e.target.value)
    }

    const handleBannerImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setBannerImage(e.target.value)
    }

    const handleDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    // Handle ticket type changes
    const handleTicketTypeChange = (
        index:number,
        field:`type`|`price`|`count`,
        value:string) => {
        const updatedTicketTypes = ticketTypes.map((ticket, i) =>
            i === index ? { ...ticket, [field]: value } : ticket
        )
        setTicketTypes(updatedTicketTypes)
    }

    const addTicketType = () => {
        setTicketTypes([...ticketTypes, { type: '', price: '', count: '' }])
    }

    const removeTicketType = (index:number) => {
        if (ticketTypes.length > 1) {
            setTicketTypes(ticketTypes.filter((_, i) => i !== index))
        }
    }

    // Handle form submission
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Event data:', {
            eventName,
            startingDate,
            eventType,
            bannerImage,
            enableVipTickets,
            description,
            ticketTypes
        })
        // Add your submission logic here
    }

    const handleCancel = () => {
        setEventName('')
        setStartingDate('')
        setEventType('Conference')
        setBannerImage('')
        setEnableVipTickets(false)
        setDescription('')
        setTicketTypes([{ type: '', price: '', count: '' }])
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Add Event</h1>
                </div>
            </div>

            {/*main scrollable content*/}
            <div className="p-3 sm:p-4 md:p-6 bg-white">
                <div className="bg-gray-200 border-l-4 border-blue-500 px-4 py-2 pb-6 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">EVENT DETAILS</h3>
                    </div>

                    {/*form content*/}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white shadow-2xl p-6 sm:p-8 rounded-lg">
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                {/*Event name*/}
                                <div>
                                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Event name
                                    </label>
                                    <input
                                        id="eventName"
                                        name="eventName"
                                        type="text"
                                        value={eventName}
                                        onChange={handleEventName}
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*Starting date*/}
                                <div>
                                    <label htmlFor="startingDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Starting date
                                    </label>
                                    <input
                                        id="startingDate"
                                        name="startingDate"
                                        type="date"
                                        value={startingDate}
                                        onChange={handleStartingDate}
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                    />
                                </div>

                                {/*Event type*/}
                                <div>
                                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Event type
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="eventType"
                                            name="eventType"
                                            value={eventType}
                                            onChange={handleEventType}
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400 appearance-none bg-white"
                                        >
                                            <option value="Conference">Conference</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Seminar">Seminar</option>
                                            <option value="Webinar">Webinar</option>
                                            <option value="Concert">Concert</option>
                                            <option value="Exhibition">Exhibition</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/*Banner Image*/}
                                <div>
                                    <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-2">
                                        Banner Image
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            id="bannerImage"
                                            name="bannerImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerImage}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="bannerImage"
                                            className="px-4 py-2 border border-gray-400 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        >
                                            Browse
                                        </label>
                                        <span className="text-sm text-gray-500">
                                            {bannerImage ? 'File selected' : 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/*Ticket Types Section*/}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-700">Ticket Information</h3>
                                    </div>

                                    {ticketTypes.map((ticket, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ticket Type
                                                </label>
                                                <input
                                                    type="text"
                                                    value={ticket.type}
                                                    onChange={(e) => handleTicketTypeChange(index, 'type', e.target.value)}
                                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ticket price
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500 mr-2">LKR</span>
                                                    <input
                                                        type="number"
                                                        value={ticket.price}
                                                        onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ticket count
                                                </label>
                                                <input
                                                    type="number"
                                                    value={ticket.count}
                                                    onChange={(e) => handleTicketTypeChange(index, 'count', e.target.value)}
                                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                {ticketTypes.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTicketType(index)}
                                                        className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addTicketType}
                                        className="w-full py-2 px-4 border border-blue-600 rounded-lg text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Add Ticket Type
                                    </button>
                                </div>

                                {/*Description*/}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={description}
                                        onChange={handleDescription}
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400 resize-vertical"
                                    />
                                </div>

                                {/*Action buttons*/}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium bg-white transition-colors text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page