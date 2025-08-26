'use client'

import React, { useState } from 'react'

const Page = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nic: ''
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Sample booking data (in real app, this would come from props/context/state)
    const bookingData = {
        vipTickets: 1,
        vvipTickets: 1,
        vipPrice: 2000.00,
        vvipPrice: 4000.00
    };

    const total = (bookingData.vipTickets * bookingData.vipPrice) + (bookingData.vvipTickets * bookingData.vvipPrice);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptedTerms) {
            alert('Please accept terms and conditions');
            return;
        }
        // Handle payment processing
        console.log('Processing payment...', formData);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="px-4 py-2">
                            <h1 className="text-xl font-semibold text-gray-900">Event Name</h1>
                        </div>
                    </div>

                    {/* Main Content - Responsive Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Billing Details Section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Details</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="nic"
                                        placeholder="NIC"
                                        value={formData.nic}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Booking Summary Section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>

                            <div className="space-y-4 mb-6">
                                {/* VIP Tickets */}
                                {bookingData.vipTickets > 0 && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {bookingData.vipTickets} x VIP Ticket(s)
                                        </span>
                                        <span className="text-gray-900 font-medium">
                                            {(bookingData.vipTickets * bookingData.vipPrice).toFixed(2)} LKR
                                        </span>
                                    </div>
                                )}

                                {/* VVIP Tickets */}
                                {bookingData.vvipTickets > 0 && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {bookingData.vvipTickets} x VVIP Ticket(s)
                                        </span>
                                        <span className="text-gray-900 font-medium">
                                            {(bookingData.vvipTickets * bookingData.vvipPrice).toFixed(2)} LKR
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {total.toFixed(0)}LKR
                                    </span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {/* Visa Logo */}
                                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">
                                        VISA
                                    </div>
                                    {/* Mastercard Logo */}
                                    <div className="flex">
                                        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                                        <div className="w-6 h-6 bg-yellow-400 rounded-full -ml-2"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-6">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I accept and agree to terms and conditions
                                    </span>
                                </label>
                            </div>

                            {/* Proceed Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!acceptedTerms}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Proceed Pay &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page