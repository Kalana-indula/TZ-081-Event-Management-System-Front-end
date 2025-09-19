'use client'

import React, {useEffect, useState} from 'react'
import {useParams, useSearchParams} from "next/navigation";
import {BookedTicketDetails,BookingDto} from "@/types/entityTypes";
import {getValueString} from "@/lib/utils";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import MainFooter from "@/app/(root)/app-components/MainFooter";

const Page = () => {

    //get search params
    const searchParams=useSearchParams();

    //store the fetched data from parameters
    const [tickets]=useState(()=>JSON.parse(searchParams.get("tickets") || "[]"));
    const [bookedTicketDetails]=useState(()=>JSON.parse(searchParams.get("bookedTickets") || "{}"));
    
    //states
    const [selectedTicketDetails, setSelectedTicketDetails] = useState<BookedTicketDetails[]>([]);
    const [totalTicketPrice, setTotalTicketPrice] = useState<number>(0);

    //form data states
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [nic, setNic] = useState<string>("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const params=useParams();

    const sessionId = params.sessionId;

    useEffect(() => {
        setSelectedTicketDetails(bookedTicketDetails.ticketDetails);
        setTotalTicketPrice(bookedTicketDetails.totalPrice);
        console.log("Tickets:", tickets);
        console.log("Booked Details:", bookedTicketDetails);

    }, []);


    //handle data in text fields
    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setFirstName(event.target.value);
    }

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setLastName(event.target.value);
    }

    const handleEmail=(event: React.ChangeEvent<HTMLInputElement>):void => {
        setEmail(event.target.value);
    }

    const handlePhoneNumber=(event: React.ChangeEvent<HTMLInputElement>):void => {
        setPhoneNumber(event.target.value);
    }

    const handleNic=(event: React.ChangeEvent<HTMLInputElement>):void => {
        setNic(event.target.value);
    }

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();

        const BookingDataPayload:BookingDto= {
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phoneNumber,
            idNumber:nic,
            sessionId:Number(sessionId),
            ticketIdList:tickets
        }

        try{
            const response=await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`,BookingDataPayload,
                {
                 headers:{
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }
                });
            console.log(response.data);
            toast.success(response.data.message);

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setNic('');

        }catch(err){
            if (err instanceof AxiosError) {
                // Handle Axios-specific errors
                const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
                toast.error(errorMessage);
            } else if (err instanceof Error) {
                // Handle generic errors
                toast.error(err.message);
            } else {
                // Handle unknown errors
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

            {/*heder*/}
            <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200/30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-4">
                        {/* Main Title */}
                        <div className="relative inline-block">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                 <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                     Complete Your Booking
                                 </span>
                            </h1>
                            {/* Accent Line */}
                            <div
                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                                style={{backgroundColor: "#193cb8"}}>
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div className="mt-3 text-sm sm:text-base text-gray-600 font-light max-w-xl mx-auto">
                            <p className="text-gray-600 text-lg">{bookedTicketDetails.eventName} - Secure Checkout</p>
                        </div>

                        {/* Decorative Elements */}
                        <div className="mt-3 flex justify-center items-center gap-2 opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            <div
                                className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#193cb8"}}></div>
                            <div
                                className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Main Content - Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Billing Details Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#193cb8'}}></div>
                                Billing Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={handleFirstName}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                            style={{focusRingColor: '#193cb8'}}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={handleLastName}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                            style={{focusRingColor: '#193cb8'}}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={handleEmail}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                        style={{focusRingColor: '#193cb8'}}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumber}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                            style={{focusRingColor: '#193cb8'}}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">National ID (NIC)</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            placeholder="Enter your NIC number"
                                            value={nic}
                                            onChange={handleNic}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:border-gray-300 transition-all"
                                            style={{focusRingColor: '#193cb8'}}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Booking Summary Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#193cb8'}}></div>
                                Order Summary
                            </h2>

                            {/* Ticket Items */}
                            <div className="space-y-4 mb-6">
                                {selectedTicketDetails.map((ticket) => (
                                    <div key={ticket.ticketId} className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded-full"
                                                         style={{backgroundColor: '#193cb8'}}>
                                                    </div>
                                                    <span className="font-semibold text-gray-900">
                                                        {ticket.ticketType} Tickets
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {ticket.count} × LKR {getValueString(ticket.price)}
                                                </span>
                                            </div>
                                            <span className="font-bold text-gray-900">
                                                LKR {(getValueString(ticket.count * ticket.price))}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="border-t-2 pt-4 mb-6" style={{borderColor: '#193cb8'}}>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Grand Total</span>
                                    <span className="text-2xl font-bold" style={{color: '#193cb8'}}>
                                        LKR {getValueString(totalTicketPrice)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Accepted Payment Methods</h3>
                                <div className="flex items-center gap-3">
                                    {/* Visa */}
                                    <div
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                                        VISA
                                    </div>
                                    {/* Mastercard */}
                                    <div
                                        className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                                        <div className="flex">
                                            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                                            <div className="w-6 h-6 bg-yellow-400 rounded-full -ml-2"></div>
                                        </div>
                                    </div>
                                    {/* Security Badge */}
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        Secure
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-6">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={acceptedTerms}
                                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                                            className="w-5 h-5 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 checked:border-transparent"
                                            style={{
                                                backgroundColor: acceptedTerms ? '#193cb8' : 'white',
                                                focusRingColor: '#193cb8'
                                            }}
                                        />
                                        {acceptedTerms && (
                                            <svg className="absolute inset-0 w-5 h-5 text-white pointer-events-none"
                                                 fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                        I accept and agree to the{' '}
                                        <span className="font-semibold underline" style={{color: '#193cb8'}}>
                                            terms and conditions
                                        </span>
                                        {' '}and{' '}
                                        <span className="font-semibold underline" style={{color: '#193cb8'}}>
                                            privacy policy
                                        </span>
                                    </span>
                                </label>
                            </div>

                            {/* Proceed Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!acceptedTerms}
                                className="w-full py-4 px-6 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 hover:cursor-pointer"
                                style={{backgroundColor: '#193cb8'}}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    Proceed to Payment
                                </div>
                            </button>

                            {/* Security Notice */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">
                                    🔒 Your payment information is encrypted and secure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                    <div
                        className="inline-flex items-center gap-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 px-8 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            SSL Encrypted
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            Secure Payment
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            24/7 Support
                        </div>
                    </div>
                </div>
            </div>

            {/*    footer*/}
            <footer>
                <MainFooter/>
            </footer>
        </div>
    );
};

export default Page;