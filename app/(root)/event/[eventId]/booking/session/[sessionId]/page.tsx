'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

const Page = ({params}: { params: Promise<{ sessionId: number }> }) => {
    const {sessionId} = React.use(params);

    const router = useRouter();

    const routeToCheckout = (id: number) => {
        router.push(`/event/1/booking/session/${id}/checkout`);
    }

    // State for ticket quantities
    const [ticketCounts, setTicketCounts] = useState({VIP: 0, Normal: 0});

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
        <>
            <div className="min-h-screen bg-gray-50">
                {/*banner section - unchanged as requested*/}
                <div
                    className="event-banner flex justify-center h-[300px] w-full bg-cover bg-center bg-no-repeat">
                    <div
                        className="w-full relative pt-[20px] flex flex-col items-center gap-4 px-[40px] sm:flex-row sm:items-center sm:justify-start sm:pt-8">
                        <div className="event-image h-[200] w-[180] z-50 flex justify-center border-2 border-white">
                            <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
                                   alt="pending" height={200} width={180}/>
                        </div>
                        <div className="sm:ml-4 sm:mt-4">
                            <h2 className="text-white text-xl sm:text-3xl font-semibold">Event Name</h2>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 sm:px-6 md:px-8">
                    {/* seat count*/}
                    <div className="seat-count">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full lg:w-1/4 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seats Left</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">VIP</span>
                                    <span className="text-sm font-bold text-gray-900">{seatsLeft.VIP}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Normal</span>
                                    <span className="text-sm font-bold text-gray-900">{seatsLeft.Normal}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*    table*/}
                    <div className="buy-tickets">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Category</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Price</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">No.
                                            Of Tickets
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">VIP</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{ticketPrices.VIP.toFixed(2)} LKR</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDecrement('VIP')}
                                                    className="w-8 h-8 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={ticketCounts.VIP === 0}
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center font-medium">{ticketCounts.VIP}</span>
                                                <button
                                                    onClick={() => handleIncrement('VIP')}
                                                    className="w-8 h-8 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={ticketCounts.VIP >= seatsLeft.VIP}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{vipTotal.toFixed(2)} LKR</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Normal</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{ticketPrices.Normal.toFixed(2)} LKR</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDecrement('Normal')}
                                                    className="w-8 h-8 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={ticketCounts.Normal === 0}
                                                >
                                                    −
                                                </button>
                                                <span
                                                    className="w-8 text-center font-medium">{ticketCounts.Normal}</span>
                                                <button
                                                    onClick={() => handleIncrement('Normal')}
                                                    className="w-8 h-8 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={ticketCounts.Normal >= seatsLeft.Normal}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{normalTotal.toFixed(2)}LKR</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td colSpan={3}
                                            className="px-6 py-4 text-sm font-semibold text-gray-900">Total
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{grandTotal.toFixed(2)}LKR</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden p-4 space-y-4">
                                {/* Header */}
                                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 mb-4">
                                    <div>Category</div>
                                    <div>Price</div>
                                    <div>No. Of Tickets</div>
                                    <div>Amount</div>
                                </div>

                                {/* VIP Row */}
                                <div className="grid grid-cols-4 gap-2 items-center py-3 border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">VIP</div>
                                    <div className="text-xs text-gray-600">{ticketPrices.VIP.toFixed(2)} LKR</div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => handleDecrement('VIP')}
                                            className="w-6 h-6 border border-gray-300 rounded-l bg-gray-50 flex items-center justify-center text-gray-600 text-xs disabled:opacity-50"
                                            disabled={ticketCounts.VIP === 0}
                                        >
                                            −
                                        </button>
                                        <span
                                            className="w-8 h-6 border-t border-b border-gray-300 bg-white flex items-center justify-center text-xs">
                                            {ticketCounts.VIP}
                                        </span>
                                        <button
                                            onClick={() => handleIncrement('VIP')}
                                            className="w-6 h-6 border border-gray-300 rounded-r bg-gray-50 flex items-center justify-center text-gray-600 text-xs disabled:opacity-50"
                                            disabled={ticketCounts.VIP >= seatsLeft.VIP}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-600">{vipTotal.toFixed(2)} LKR</div>
                                </div>

                                {/* Normal Row */}
                                <div className="grid grid-cols-4 gap-2 items-center py-3 border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">Normal</div>
                                    <div className="text-xs text-gray-600">{ticketPrices.Normal.toFixed(2)} LKR</div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => handleDecrement('Normal')}
                                            className="w-6 h-6 border border-gray-300 rounded-l bg-gray-50 flex items-center justify-center text-gray-600 text-xs disabled:opacity-50"
                                            disabled={ticketCounts.Normal === 0}
                                        >
                                            −
                                        </button>
                                        <span
                                            className="w-8 h-6 border-t border-b border-gray-300 bg-white flex items-center justify-center text-xs">
                                            {ticketCounts.Normal}
                                        </span>
                                        <button
                                            onClick={() => handleIncrement('Normal')}
                                            className="w-6 h-6 border border-gray-300 rounded-r bg-gray-50 flex items-center justify-center text-gray-600 text-xs disabled:opacity-50"
                                            disabled={ticketCounts.Normal >= seatsLeft.Normal}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-600">{normalTotal.toFixed(2)}LKR</div>
                                </div>

                                {/* Total Row */}
                                <div className="grid grid-cols-4 gap-2 items-center py-3 bg-gray-100 -mx-4 px-4">
                                    <div className="text-sm font-semibold text-gray-900 col-span-3">Total</div>
                                    <div className="text-sm font-semibold text-gray-900">{grandTotal.toFixed(2)}LKR
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="mt-6">
                            <button
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                                disabled={grandTotal === 0}
                                onClick={() => routeToCheckout(sessionId)}>
                                Checkout &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;