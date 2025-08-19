import React from "react";
import Link from "next/link";

interface Event {
    image: string;
    title: string;
    date: string;
    contentCount: string | number;
    description: string;
    link: string;
}

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span>{event.date}</span>
                    <span className="mx-2">|</span>
                    <span>{event.contentCount}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                </p>
                <Link
                    href={event.link}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                >
                    Your More →
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
