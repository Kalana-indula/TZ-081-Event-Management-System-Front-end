'use client'

import React, {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {MdEdit, MdClose, MdSave} from "react-icons/md"
import Image from "next/image";

const CashFlow = () => {
    const [commission, setCommission] = useState(20)
    const [isEditingCommission, setIsEditingCommission] = useState(false)
    const [tempCommission, setTempCommission] = useState(commission)
    const [totalRevenue, setTotalRevenue] = useState(35000000)
    const [totalProfit, setTotalProfit] = useState(15000000)
    const [bankInfo, setBankInfo] = useState({
        name: "Some bank",
        branchCode: "222525",
        accountNo: "xxx xxx xxx"
    })

    // Handle commission editing
    const handleEditCommission = () => {
        setIsEditingCommission(true)
        setTempCommission(commission)
    }

    const handleSaveCommission = () => {
        setCommission(tempCommission)
        setIsEditingCommission(false)
        // Here you would typically make an API call to save the commission
        console.log("Commission saved:", tempCommission)
    }

    const handleCancelCommission = () => {
        setTempCommission(commission)
        setIsEditingCommission(false)
    }

    const handleChangeBankInfo = () => {
        // Handle bank info change logic
        console.log("Change bank info clicked")
    }

    const handleAddBank = () => {
        // Handle add bank logic
        console.log("Add bank clicked")
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 p-3 sm:p-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Cash Flow</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Manage And Control The Cash Flow</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-3 sm:p-4 md:p-6 bg-white min-h-screen">
                {/* Commission Section */}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">COMMISSION DATA</h3>
                    </div>
                    <div
                        className="bg-white p-3 sm:p-4 rounded-lg my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-gray-700 font-medium text-sm sm:text-base">Current commission :</span>
                            {isEditingCommission ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={tempCommission}
                                        onChange={(e) => setTempCommission(Number(e.target.value))}
                                        className="w-16 px-2 py-1 border border-gray-400 rounded text-center text-sm sm:text-base"
                                        min="0"
                                        max="100"
                                    />
                                    <span className="text-gray-700 text-sm sm:text-base">%</span>
                                </div>
                            ) : (
                                <span className="text-gray-900 font-semibold text-sm sm:text-base">{commission} %</span>
                            )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {isEditingCommission ? (
                                <>
                                    <Button
                                        onClick={handleSaveCommission}
                                        className="bg-green-white border border-black hover:bg-black text-black hover:text-white px-2 sm:px-3 py-1 text-xs sm:text-sm flex-1 sm:flex-none"
                                    >
                                        <MdSave className="mr-1"/>
                                        Save
                                    </Button>
                                    <Button
                                        onClick={handleCancelCommission}
                                        className="bg-gray-white border border-black hover:bg-black text-black hover:text-white px-2 sm:px-3 py-1 text-xs sm:text-sm flex-1 sm:flex-none"
                                    >
                                        <MdClose className="mr-1"/>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={handleEditCommission}
                                    className="bg-white border border-black text-black hover:bg-black hover:text-white active:bg-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm w-full sm:w-auto"
                                >
                                    <MdEdit className="mr-1"/>
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Revenue Section */}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">REVENUE DATA</h3>
                    </div>
                    {/*Total revenue*/}

                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-[30px]">
                        <div
                            className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                            <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                <Image src="/current-revenue.png" alt="pending" height={32} width={32}/>
                            </div>
                            <div>
                                <div className="font-medium">
                                    Current Revenue
                                </div>
                                {totalRevenue ? (
                                    <div className="text-gray-700">
                                        {totalRevenue} LKR.
                                    </div>
                                ) : (
                                    <div className="text-gray-700">
                                        N/A
                                    </div>
                                )}

                            </div>
                        </div>
                        {/* Profit Section */}
                        <div
                            className="card flex items-center bg-white px-[10px] py-[30px] rounded-[8px] shadow-lg my-[5px] mx-[10px] relative">
                            <div className="p-[12px] mx-[10px] bg-gray-300 rounded-full">
                                <Image src="/current-profit.png" alt="pending" height={32} width={32}/>
                            </div>
                            <div>
                                <div className="font-medium">
                                    Current Profit
                                </div>
                                {totalRevenue ? (
                                    <div className="text-gray-700">
                                        {totalProfit} LKR.
                                    </div>
                                ) : (
                                    <div className="text-gray-700">
                                        N/A
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bank Information Section */}

                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">BANK DETAILS</h3>
                    </div>
                    <div className="bg-white shadow-xl text-black p-4 sm:p-6 rounded-lg my-[10px] relative">
                        <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center sm:h-32 sm:w-32 p-[18px] sm:p-[20px] mx-[10px] bg-gray-300 rounded-full">
                                    <Image src="/bank.png" alt="pending" height={64} width={64}/>
                                </div>
                                <div className="sm:py-[20px]">
                                    <h2 className="text-lg sm:text-2xl font-semibold">Your Bank</h2>
                                    <div className="break-words text-gray-700">{bankInfo.name}</div>
                                    <div className="break-words text-gray-700">Branch Code : {bankInfo.branchCode}</div>
                                    <div className="break-words text-gray-700">Account No : {bankInfo.accountNo}</div>

                            </div>
                        </div>
                        <Button
                            onClick={handleChangeBankInfo}
                            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white text-black border border-black sm:hover:bg-black sm:hover:text-white sm:active:bg-white sm:active:text-black active:bg-black hover:text-white active:text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm"
                        >
                            <span className="hidden sm:inline">Change Bank</span>
                            <span className="sm:hidden">Change</span>
                        </Button>
                    </div>
                </div>

                {/* Add Bank Section */}
                <button
                    className="bg-white hover:bg-gray-200 active:shadow-xl transition-colors duration-300 border rounded-[10px] font-semibold border-gray-800 p-[20px] w-full flex items-center justify-center gap-4">
                    <div>
                        <Image src="/bank.png" height={24} width={24} alt="pending"/>
                    </div>
                    <div>
                        Add Bank +
                    </div>
                </button>
            </div>
        </>
    )
}

export default CashFlow