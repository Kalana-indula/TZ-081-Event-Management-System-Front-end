'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {SessionCardDetails} from "@/types/entityTypes";
import MainFooter from "@/app/(root)/app-components/MainFooter";

// sample data
const initialSessions: SessionCardDetails[] = [
    {
        sessionId: 1,
        sessionName: "Session 1",
        date: "2025-09-01",
        time: "10:00 AM",
        location: "Hall A",
        onBookNow: () => {}, // placeholder, will override in component
    }
];

const Page = () => {
    //states
    const [sessions,setSessions]=useState<SessionCardDetails[]>([]);
    // State for ticket quantities
    const [ticketCounts, setTicketCounts] = useState({VIP: 0, Normal: 0});

    const params=useParams();
    const sessionId=params.sessionId;
    const eventId=params.eventId;
    const router = useRouter();

    useEffect(() => {
        setSessions(initialSessions);
    }, []);

    const routeToCheckout = (id: number) => {
        router.push(`/event/${eventId}/session/${id}/booking/checkout`);
    }

    // Ticket prices and available seats
    const ticketPrices = {VIP: 2000, Normal: 1000};
    const seatsLeft = {VIP: 20, Normal: 30};

    // Handler functions
    const handleIncrement = (category: 'VIP' | 'Normal') => {
        setTicketCounts((prev) => ({
            ...prev,
            [category]: Math.min(prev[category] + 1, seatsLeft[category]),
        }));
    };

    const handleDecrement = (category: 'VIP' | 'Normal') => {
        setTicketCounts((prev) => ({
            ...prev,
            [category]: Math.max(prev[category] - 1, 0),
        }));
    };

    // Calculate totals
    const vipTotal = ticketCounts.VIP * ticketPrices.VIP;
    const normalTotal = ticketCounts.Normal * ticketPrices.Normal;
    const grandTotal = vipTotal + normalTotal;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

            {/* Banner section - unchanged as requested */}
            <div className="event-banner flex justify-center h-[300px] w-full bg-cover bg-center bg-no-repeat">
                <div className="w-full relative pt-[20px] flex flex-col items-center gap-4 px-[40px] sm:flex-row sm:items-center sm:justify-start sm:pt-8">
                    <div className="event-image h-[200] w-[180] z-50 flex justify-center border-2 border-white">
                        <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
                               alt="pending" height={200} width={180}/>
                    </div>
                    <div className="sm:ml-4 sm:mt-4">
                        <h2 className="text-white text-xl sm:text-3xl font-semibold">Event Name</h2>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Countdown Section */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Event Starts In</h3>
                                <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
                                <div className="text-center">
                                    <div className="rounded-2xl p-4 mb-3 shadow-lg border border-gray-100"
                                         style={{ backgroundColor: '#193cb8' }}>
                                        <div className="text-3xl font-bold text-white">12</div>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">DAYS</div>
                                </div>
                                <div className="text-center">
                                    <div className="rounded-2xl p-4 mb-3 shadow-lg border border-gray-100"
                                         style={{ backgroundColor: '#193cb8' }}>
                                        <div className="text-3xl font-bold text-white">12</div>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">HOURS</div>
                                </div>
                                <div className="text-center">
                                    <div className="rounded-2xl p-4 mb-3 shadow-lg border border-gray-100"
                                         style={{ backgroundColor: '#193cb8' }}>
                                        <div className="text-3xl font-bold text-white">00</div>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">MINS</div>
                                </div>
                                <div className="text-center">
                                    <div className="rounded-2xl p-4 mb-3 shadow-lg border border-gray-100"
                                         style={{ backgroundColor: '#193cb8' }}>
                                        <div className="text-3xl font-bold text-white">00</div>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SECS</div>
                                </div>
                            </div>
                        </div>

                        {/* Event Description */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#193cb8'}}></div>
                                    About This Event
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non nibh tortor.
                                    Mauris
                                    pharetra efficitur euismod. Aenean eu dui aliquet metus interdum interdum. Proin
                                    lacinia
                                    faucibus est vitae viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Mauris
                                    non nibh tortor.
                                </p>
                            </div>
                        </div>

                        {/* Ticket Selection Table */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                            <div className="p-8 pb-0">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#193cb8'}}></div>
                                    Select Your Tickets
                                </h3>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                        <tr className="border-t border-gray-200" style={{ backgroundColor: '#f8fafc' }}>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-900">Category</th>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-900">Price</th>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-900">Quantity</th>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-900">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                    <span className="font-semibold text-gray-900">VIP Seats</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-gray-700 font-medium">
                                                LKR {ticketPrices.VIP.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleDecrement('VIP')}
                                                        className="w-10 h-10 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
                                                        disabled={ticketCounts.VIP === 0}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-gray-900 text-lg">{ticketCounts.VIP}</span>
                                                    <button
                                                        onClick={() => handleIncrement('VIP')}
                                                        className="w-10 h-10 rounded-lg border-2 flex items-center justify-center text-white font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                                        style={{
                                                            backgroundColor: '#193cb8',
                                                            borderColor: '#193cb8'
                                                        }}
                                                        disabled={ticketCounts.VIP >= seatsLeft.VIP}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-gray-900">
                                                LKR {vipTotal.toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                    <span className="font-semibold text-gray-900">Regular Seats</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-gray-700 font-medium">
                                                LKR {ticketPrices.Normal.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleDecrement('Normal')}
                                                        className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
                                                        disabled={ticketCounts.Normal === 0}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-gray-900 text-lg">{ticketCounts.Normal}</span>
                                                    <button
                                                        onClick={() => handleIncrement('Normal')}
                                                        className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-white font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                                        style={{
                                                            backgroundColor: '#193cb8',
                                                            borderColor: '#193cb8'
                                                        }}
                                                        disabled={ticketCounts.Normal >= seatsLeft.Normal}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-gray-900">
                                                LKR {normalTotal.toLocaleString()}
                                            </td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr className="border-t-2" style={{ backgroundColor: '#f8fafc', borderColor: '#193cb8' }}>
                                            <td colSpan={3} className="px-8 py-6 text-lg font-bold text-gray-900">
                                                Grand Total
                                            </td>
                                            <td className="px-8 py-6 text-xl font-bold" style={{ color: '#193cb8' }}>
                                                LKR {grandTotal.toLocaleString()}
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden p-6 space-y-6">
                                {/* VIP Card */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                <span className="font-bold text-gray-900">VIP Seats</span>
                                            </div>
                                            <p className="text-gray-600 font-medium">LKR {ticketPrices.VIP.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-bold text-gray-900">LKR {vipTotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleDecrement('VIP')}
                                            className="w-12 h-12 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold"
                                            disabled={ticketCounts.VIP === 0}
                                        >
                                            −
                                        </button>
                                        <span className="w-16 text-center font-bold text-gray-900 text-2xl">{ticketCounts.VIP}</span>
                                        <button
                                            onClick={() => handleIncrement('VIP')}
                                            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-white font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            style={{
                                                backgroundColor: '#193cb8',
                                                borderColor: '#193cb8'
                                            }}
                                            disabled={ticketCounts.VIP >= seatsLeft.VIP}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Normal Card */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                <span className="font-bold text-gray-900">Regular Seats</span>
                                            </div>
                                            <p className="text-gray-600 font-medium">LKR {ticketPrices.Normal.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-bold text-gray-900">LKR {normalTotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleDecrement('Normal')}
                                            className="w-12 h-12 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold"
                                            disabled={ticketCounts.Normal === 0}
                                        >
                                            −
                                        </button>
                                        <span className="w-16 text-center font-bold text-gray-900 text-2xl">{ticketCounts.Normal}</span>
                                        <button
                                            onClick={() => handleIncrement('Normal')}
                                            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-white font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            style={{
                                                backgroundColor: '#193cb8',
                                                borderColor: '#193cb8'
                                            }}
                                            disabled={ticketCounts.Normal >= seatsLeft.Normal}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile Total */}
                                <div className="border-t-2 pt-4" style={{ borderColor: '#193cb8' }}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Grand Total</span>
                                        <span className="text-xl font-bold" style={{ color: '#193cb8' }}>
                                            LKR {grandTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <div className="p-8 pt-0">
                                <button
                                    className="w-full py-4 px-8 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                                    style={{ backgroundColor: '#193cb8' }}
                                    disabled={grandTotal === 0}
                                    onClick={() => routeToCheckout(sessionId)}
                                >
                                    Proceed to Checkout • LKR {grandTotal.toLocaleString()}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Event Details & Seat Count */}
                    <div className="space-y-6">

                        {/* Event Details Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 sticky top-6">
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                    Event Details
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Date</p>
                                            <p className="font-semibold text-gray-900">September 1, 2025</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Time</p>
                                            <p className="font-semibold text-gray-900">10:00 AM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Venue</p>
                                            <p className="font-semibold text-gray-900">Hall A</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Seats Available Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-gray-900">Seats Available</h4>
                                    <div className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#193cb8' }}>
                                        Live Count
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* VIP Seats */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                <span className="font-semibold text-gray-800">VIP Seats</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-gray-900">{seatsLeft.VIP}</span>
                                                <span className="text-sm text-gray-500 ml-1">left</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Total: 50</span>
                                            <span className="text-xs text-gray-600 font-medium">
                                                {seatsLeft.VIP < 10 ? 'Few left!' : 'Available'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Regular Seats */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#193cb8' }}></div>
                                                <span className="font-semibold text-gray-800">Regular Seats</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-gray-900">{seatsLeft.Normal}</span>
                                                <span className="text-sm text-gray-500 ml-1">left</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Total: 100</span>
                                            <span className="text-xs text-gray-600 font-medium">
                                                {seatsLeft.Normal < 15 ? 'Filling up!' : 'Available'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Stats */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">Total Seats Left</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-bold text-gray-900">{seatsLeft.VIP + seatsLeft.Normal}</span>
                                            <span className="text-sm text-gray-500">/ 150</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {/*    footer section*/}
            <footer>
                <MainFooter/>
            </footer>
        </div>
    );
};

export default Page;