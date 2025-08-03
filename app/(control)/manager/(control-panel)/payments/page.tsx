'use client'
// payment code
import React, {useState} from 'react'

interface PaymentDetails {
    eventId: number;
    eventName: string;
    eventStatus: string;
    dateFinished: string;
    paymentStatus: string;
}

const Page = () => {

    //payment details state
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails[]>([]);
    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-[10px] p-[10px]">
                    <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
                    <p className="mt-1 text-gray-600">View payment details</p>
                </div>
            </div>

            {/*    main content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                <div className="display-payments bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">PAYMENT DETAILS</h3>
                    </div>

                    {/*desktop table view*/}
                    <div className="hidden md:block overflow-x-auto shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Event ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Event Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Date Finished
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Payments
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {paymentDetails && paymentDetails.length > 0 ? (
                                paymentDetails.map((payment: PaymentDetails) => (
                                    <tr className="hvoer:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                                        key={payment.eventId}>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.eventId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.eventName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.eventStatus}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.dateFinished}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.paymentStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div
                                                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments
                                                available</h3>
                                            <p className="text-sm text-gray-500">There are currently no payment
                                                records to display.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/*    mobile view*/}
                    <div className="md:hidden space-y-4">
                        {(() => {
                            return paymentDetails && paymentDetails.length > 0
                                ? paymentDetails.map((event: PaymentDetails) => (
                                    <div
                                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:cursor-pointer"
                                        key={event.eventId}>
                                        <div>

                                        </div>
                                    </div>
                                ))
                                : (
                                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                                        <div className="flex flex-col items-center justify-center">
                                            <div
                                                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments
                                                available</h3>
                                            <p className="text-sm text-gray-500 text-center">There are currently no
                                                payment records to display.</p>
                                        </div>
                                    </div>
                                )
                        })()}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page
