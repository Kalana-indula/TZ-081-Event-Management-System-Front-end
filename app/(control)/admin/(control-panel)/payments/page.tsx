'use client'

import React, {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Payment {
    id: number;
    organizerName:string;
    paymentDate:string;
    commission:number;
    amount:number;
}

const Payments = () => {
    
    const [completedPayments,setCompletedPayments] = useState<Payment[]>([]);
    
    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 p-3 sm:p-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Payments</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">View Payment Details</p>
                </div>
            </div>

            {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white min-h-screen">
                {/*sort*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">SORT</h3>
                    </div>
                    <div className="flex items-start flex-col sm:flex-row space-y-4 space-x-4">
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white shadow-lg">
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white shadow-lg">
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {/*table*/}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">PAYMENT DETAILS</h3>
                    </div>
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Payment
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Organizer
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Payment Date
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Commission (%)
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        Amount
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {completedPayments && completedPayments.length > 0 ? (
                                    completedPayments.map((payment:Payment)=> (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200"
                                            key={payment.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{payment.organizerName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{payment.paymentDate}</td>
                                            <td className="px-6 py-4 text-center">{payment.commission}</td>
                                            <td className="px-6 py-4 text-center">{payment.amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments available</h3>
                                                <p className="text-sm text-gray-500">There are currently no payment records to display.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {(() => {
                                return completedPayments && completedPayments.length > 0
                                    ? completedPayments.map((payment: Payment) => (
                                        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                                             key={payment.id}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">Payment #{payment.id}</h3>
                                                    <p className="text-gray-600">{payment.organizerName}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold text-green-600">${payment.amount}</div>
                                                    <div className="text-sm text-gray-500">{payment.commission}% commission</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                <span className="font-medium">Payment Date: </span>{payment.paymentDate}
                                            </div>
                                        </div>
                                    ))
                                    : (
                                        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments available</h3>
                                                <p className="text-sm text-gray-500 text-center">There are currently no payment records to display.</p>
                                            </div>
                                        </div>
                                    );
                            })()}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Payments;
