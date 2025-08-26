'use client'

import React from 'react';

interface Event {
    id?: number;
    date?: string;
    time?: string;
    title?: string;
    venue?: string;
    type?: string;
    ticketPrice?: string;
    currency?: string;
    image?: string;
    onBookNow?: () => void;
}

interface EventCardProps {
    event: Event;
}

const EventCardDemo = ({ event }:EventCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Crown/Premium Badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
            </div>

            {/* Event Content */}
            <div className="p-5">
                {/* Date and Time */}
                <div className="flex items-center justify-between mb-3">
                    <div className="text-blue-600 font-semibold text-sm">
                        {event.date}
                    </div>
                    <div className="text-gray-600 text-sm">
                        {event.time}
                    </div>
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {event.title}
                </h3>

                {/* Venue */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {event.venue}
                </p>

                {/* Event Type and Tickets */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                            {event.type}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            <span className="text-gray-500">Tickets</span>
                            <div className="font-semibold text-gray-900">
                                {event.ticketPrice} {event.currency} <span className="text-xs text-gray-500">Upwards</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    onClick={event.onBookNow}
                    className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:cursor-pointer hover:scale-105 shadow-md hover:shadow-lg"
                >
                    Book Now ≫
                </button>
            </div>
        </div>
    );
};

export default EventCardDemo;
