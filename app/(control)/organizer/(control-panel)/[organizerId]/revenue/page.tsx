'use client'

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import {CreateTransactionRequest} from "@/types/entityTypes";
import {useParams} from "next/navigation";

interface BankDetails {
    bankName: string;
    branchCode: string;
    accountNumber: string;
}

const Page = () => {

    //states
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
    const [currentBalance, setCurrentBalance] = useState<number>(0);

    //get params
    const params = useParams();

    const organizerId = params.organizerId;

    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: "Some bank",
        branchCode: "ZZZ525",
        accountNumber: "xxx xxx xxx"
    });

    //convert value to meaningful financial values
    const getValueString=(value:number):string =>{
        return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    //load data at page loading
    useEffect(() => {
        getTotalEarnings();
    }, []);

    const handleWithdraw = async () => {
        try {
            const transactionData: CreateTransactionRequest = {
                amount: currentBalance,
                organizerId: Number(organizerId),
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
                transactionData
            );

            console.log("Transaction successful:", response.data);

            // After a successful withdrawal, refresh earnings
            getTotalEarnings();

        } catch (err) {
            console.error("Error during withdrawal:", err);
        }
    };


    const handleChangeBank = () => {
        // Handle change bank logic
        console.log('Changing bank details...');
    };

    const handleAddBank = () => {
        // Handle add bank logic
        console.log('Adding new bank...');
    };

    //fetch earnings by organizer
    const getTotalEarnings =async () => {

        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizers/${organizerId}/earnings`);
            console.log(response.data.entityData);
            setTotalEarnings(response.data.entityData.totalEarnings);
            setTotalWithdrawals(response.data.entityData.totalWithdrawals);
            setCurrentBalance(response.data.entityData.currentBalance);
        }catch (err){
            console.log(err);
        }
    }

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Revenue</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">View and manage revenue</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-3 sm:p-4 md:p-6 bg-white min-h-screen">

                {/*  Total revenue section  */}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">REVENUE DETAILS</h3>
                    </div>
                    <div
                        className="bg-white p-3 sm:p-4 rounded-lg my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 shadow-lg">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                Total Earnings - {getValueString(totalEarnings)} LKR
                            </span>
                        </div>
                    </div>

                    <div
                        className="bg-white p-3 sm:p-4 rounded-lg my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 shadow-lg">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                Total Withdrawals - {getValueString(totalWithdrawals)} LKR
                            </span>
                        </div>
                    </div>

                    <div
                        className="bg-white p-3 sm:p-4 rounded-lg my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 shadow-lg">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                Current Balance - {getValueString(currentBalance)} LKR
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handleWithdraw}
                                className="bg-white border border-black text-black hover:bg-black hover:text-white active:bg-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm w-full sm:w-auto hover:cursor-pointer"
                            >
                                Withdraw
                            </Button>
                        </div>
                    </div>
                </div>

                {/*    Bank details section*/}
                <div
                    className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium">YOUR BANK</h3>
                    </div>
                    <div className="bg-white shadow-xl text-black p-4 sm:p-6 rounded-lg my-[10px] relative">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex justify-center items-center sm:h-32 sm:w-32 p-[18px] sm:p-[20px] mx-[10px] bg-gray-300 rounded-full">
                                <Image src="/bank.png" alt="bank" height={64} width={64}/>
                            </div>
                            <div className="sm:py-[20px] flex-1">
                                <h2 className="text-lg sm:text-2xl font-semibold">Your Bank</h2>
                                <div className="break-words text-gray-700 text-sm sm:text-base">
                                    Bank name : {bankDetails?.bankName}
                                </div>
                                <div className="break-words text-gray-700 text-sm sm:text-base">
                                    Branch Code : {bankDetails?.branchCode}
                                </div>
                                <div className="break-words text-gray-700 text-sm sm:text-base">
                                    Account No : {bankDetails?.accountNumber}
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleChangeBank}
                            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white text-black border border-black sm:hover:bg-black sm:hover:text-white sm:active:bg-white sm:active:text-black active:bg-black hover:text-white active:text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm"
                        >
                            <span className="hidden sm:inline">Change Bank</span>
                            <span className="sm:hidden">Change</span>
                        </Button>
                    </div>
                </div>

                {/*    Add bank section */}
                <button
                    onClick={handleAddBank}
                    className="bg-white hover:bg-gray-200 active:shadow-xl transition-colors duration-300 border rounded-[10px] font-semibold border-gray-800 p-[20px] w-full flex items-center justify-center gap-4">
                    <div>
                        <Image src="/bank.png" height={24} width={24} alt="bank"/>
                    </div>
                    <div>
                        Add Bank +
                    </div>
                </button>
            </div>
        </>
    )
}

export default Page;