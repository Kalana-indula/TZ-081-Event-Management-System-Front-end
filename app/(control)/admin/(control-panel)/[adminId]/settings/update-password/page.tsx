'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import AdminProtectedRoute from "@/utils/AdminProtectedRoutes";
import {UpdatePasswordForm, updatePasswordSchema} from "@/lib/validation";
import toast from "react-hot-toast";
import axios, {AxiosError} from "axios";
import {useParams, useRouter} from "next/navigation";

interface UpdatePasswordDetails {
    currentPassword: string;
    newPassword: string;
}

const Page = () => {
    //fetch password details
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const params=useParams();

    const adminId = params.adminId;

    const router=useRouter();

    const routeToSettings = ()=>{
        router.push(`/admin/${adminId}/settings`);
    }

    //handle cancel
    const handleCancel = (): void => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCurrentPassword(value);
    }

    const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setNewPassword(value);
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setConfirmPassword(value);
    }

    const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        //build data object
        const passwordData: UpdatePasswordForm = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }

        //zod validation
        const parsed=updatePasswordSchema.safeParse(passwordData);

        if(!parsed.success){
            //collect error message
            const firstError = parsed.error.issues[0]?.message || "Invalid form input";
            toast.error(firstError);
            return;
        }

        const passwordDetails :UpdatePasswordDetails={
            currentPassword:parsed.data.currentPassword,
            newPassword:parsed.data.newPassword
        }

        try{
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admins/${adminId}`, passwordDetails);
            console.log(response.data);
            toast.success("Password updated successfully!");
            routeToSettings();
        }catch (err) {
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

    return (
        <>
            <AdminProtectedRoute>
                {/*Header section*/}
                <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                    <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Update Password</h1>
                    </div>
                </div>

                {/*    main content*/}
                <div className="p-3 sm:p-4 md:p-6 bg-white">
                    <div
                        className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 pb-6 mb-6 rounded-r-md shadow-sm">
                        <div>
                            <h3 className="text-gray-500 font-medium py-2">UPDATE PASSWORD</h3>
                        </div>

                        {/*    form*/}
                        <div className="max-w-md mx-auto">
                            <div className="bg-white shadow-2xl p-8 rounded-lg">
                                <form className="space-y-6" onSubmit={handleUpdatePassword}>
                                    {/*old password field*/}
                                    <div>
                                        <label htmlFor="current-password"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Password <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="current-password"
                                            name="Password"
                                            type="password"
                                            required={true}
                                            value={currentPassword}
                                            onChange={handleCurrentPassword}
                                            placeholder="Minimum 8 characters"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                    </div>

                                    {/*password field*/}
                                    <div>
                                        <label htmlFor="Password"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="Password"
                                            name="Password"
                                            type="password"
                                            required={true}
                                            value={newPassword}
                                            onChange={handleNewPassword}
                                            placeholder="Minimum 8 characters"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                    </div>

                                    {/*confirm password field*/}
                                    <div>
                                        <label htmlFor="confirm-pw"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="confirm-pw"
                                            name="confirm-pw"
                                            type="password"
                                            required={true}
                                            onChange={handleConfirmPassword}
                                            value={confirmPassword}
                                            placeholder="Minimum 8 characters"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-400"
                                        />
                                        <p className="mt-2 text-xs text-gray-500">
                                            Password must contain at least one uppercase letter, one lowercase letter,
                                            and
                                            one
                                            number
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        {/*save button*/}
                                        <Button
                                            type="submit"
                                            className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                                            Save
                                        </Button>

                                        {/*cancel button*/}
                                        <Button
                                            className="w-full flex justify-center py-3 px-4 border border-black rounded-lg shadow-sm text-sm font-medium bg-white text-black hover:bg-black hover:text-white active:text-black active:bg-white"
                                            onClick={handleCancel}>
                                            Cancel
                                        </Button>
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
