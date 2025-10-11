'use client'
import React, {useEffect, useState} from 'react'
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import {UpdateBankDetails} from "@/types/entityTypes";
import AdminProtectedRoute from "@/utils/AdminProtectedRoutes";
import {useRouter} from "next/navigation";

const Page = () => {

    // State for form fields
    const [bankName, setBankName] = useState<string>('');
    const [accountHolderName, setAccountHolderName] = useState<string>('');
    const [branchName, setBranchName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');

    const router=useRouter();

    //route to cash flow page
    const routeToCashFlow = ()=>{
        router.push('/admin/cash-flow');
    }

    useEffect(() => {
        getBankDetails();
    }, []);


    // Handle input changes
    const handleBankName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBankName(event.target.value);
    };

    const handleAccountHolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountHolderName(event.target.value);
    };

    const handleBranchName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBranchName(event.target.value);
    };

    const handleAccountNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(event.target.value);
    };

    //load data
    const getBankDetails = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/system-banks`);
            console.log(response.data.entityData);
            setBankName(response.data.entityData.bankName);
            setAccountHolderName(response.data.entityData.accountHolderName);
            setBranchName(response.data.entityData.branchName);
            setAccountNumber(response.data.entityData.accountNumber);
        } catch (err) {
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
    }

    //update bank details
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const bankDetails: UpdateBankDetails = {
            bankName: bankName,
            accountHolderName: accountHolderName,
            branchName: branchName,
            accountNumber: accountNumber,
        }

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/system-banks`, bankDetails);
            console.log(response.data.entityData);
            toast.success("Bank details updated successfully");
            clearFields();
            routeToCashFlow();
        } catch (err) {
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
    }

    // Handle cancel
    const handleCancel = () => {
        // Reset form or navigate back
        clearFields();
        console.log('Form cancelled');
    };

    const clearFields = () => {
        setBankName('');
        setAccountHolderName('');
        setBranchName('');
        setAccountNumber('');
    }

    return (
        <>
            <AdminProtectedRoute>
                {/*Header section*/}
                <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                    <div className="text-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900">Update Bank Details</h1>
                    </div>
                </div>

                {/*main content*/}
                <div className="p-3 sm:p-4 md:p-6 bg-white min-h-screen">
                    <div className="bg-gray-200 border-l-4 border-blue-500 px-4 py-2 pb-6 mb-6 rounded-r-md shadow-sm">
                        <div>
                            <h3 className="text-gray-500 font-medium py-2">UPDATE BANK DETAILS</h3>
                        </div>

                        {/*    form content*/}
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
                                <form className="space-y-6" onSubmit={handleSubmit}>

                                    {/* Bank Name */}
                                    <div>
                                        <label htmlFor="bankName"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Bank Name
                                        </label>
                                        <input
                                            id="bankName"
                                            name="bankName"
                                            type="text"
                                            value={bankName}
                                            onChange={handleBankName}
                                            placeholder="e.g., Commercial Bank of Ceylon"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                            required
                                        />
                                    </div>

                                    {/* Account Holder's Name */}
                                    <div>
                                        <label htmlFor="accountHolderName"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Holder's Name
                                        </label>
                                        <input
                                            id="accountHolderName"
                                            name="accountHolderName"
                                            type="text"
                                            value={accountHolderName}
                                            onChange={handleAccountHolderName}
                                            placeholder="Enter full name as per bank records"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                            required
                                        />
                                    </div>

                                    {/* Branch Name */}
                                    <div>
                                        <label htmlFor="branchName"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Branch Name
                                        </label>
                                        <input
                                            id="branchName"
                                            name="branchName"
                                            type="text"
                                            value={branchName}
                                            onChange={handleBranchName}
                                            placeholder="e.g., Colombo Main Branch"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                            required
                                        />
                                    </div>

                                    {/* Account Number */}
                                    <div>
                                        <label htmlFor="accountNumber"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Number
                                        </label>
                                        <input
                                            id="accountNumber"
                                            name="accountNumber"
                                            type="text"
                                            value={accountNumber}
                                            onChange={handleAccountNumber}
                                            placeholder="Enter your account number"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                            required
                                        />
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
                                        >
                                            Update Details
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="flex-1 flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium bg-white transition-colors text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminProtectedRoute>
        </>
    )
}
export default Page
