'use client'

import React, {useEffect, useState} from 'react'
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import {Switch} from "@/components/ui/switch";

interface Manager {
    id: number;
    firstName: string;
    lastName: string;
    nic: string;
    phone: string;
    email: string;
    password: string;
    isAssigned: boolean;
}

const Page = () => {
    //store all available managers
    const [managers, setManagers] = useState<Manager[]>([]);
    const [assignedManager, setAssignedManager] = useState<Manager>();

    //fetch managers at loading
    useEffect(() => {
        getAllManagers();
        getAssignedManager();
    }, []);

    //fetch all managers
    const getAllManagers = async (): Promise<void> => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/managers`);
            // console.log(response.data);
            setManagers(response.data);

            // console.log(managers);
            toast.success("Successfully get all managers!");
        } catch (err) {
            if (err instanceof AxiosError) {
                // Check if it's a 404 (no assigned manager) vs actual error
                if (err.response?.status === 404) {
                    // 404 means no manager assigned - this is normal
                    setAssignedManager(undefined);
                    console.log("No manager currently assigned");
                } else {
                    // Actual error (500, network issues, etc.)
                    console.error("Error fetching assigned manager:", err);
                    const errorMessage = err.response?.data?.message || 'Failed to load assigned manager';
                    toast.error(errorMessage);
                }
            } else {
                console.error("Unexpected error:", err);
                toast.error('An unexpected error occurred');
            }
        }
    }

    //fetch assigned manager
    const getAssignedManager = async (): Promise<void> => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/managers/assigned`);

            setAssignedManager(response.data);
            toast.success("Successfully get assigned managers!");
        } catch (err) {
            if (err instanceof AxiosError) {

                if (err.response?.status === 404) {

                    setAssignedManager(undefined);
                    console.log("No manager currently assigned");
                } else {

                    console.error("Error fetching assigned manager:", err);
                    const errorMessage = err.response?.data?.message || 'Failed to load assigned manager';
                    toast.error(errorMessage);
                }
            } else {
                console.error("Unexpected error:", err);
                toast.error('An unexpected error occurred');
            }
        }
    }

    //assign manager
    const updateStatus = async (managerId:number): Promise<void> => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/managers/${managerId}/update-status`);
            console.log(response.data);
            toast.success("Manager status updated!");

            // Refresh data
            getAllManagers();
            getAssignedManager();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update manager status");
        }
    }

    // useEffect(() => {
    //     console.log(managers);
    // }, [managers]);

    return (
        <>
            {/*Header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-4 p-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Management Control</h1>
                    <p className="mt-1 text-gray-600">Control Manager Access</p>
                </div>
            </div>

            {/*currently assigned manager*/}
            <div className="p-3 sm:p-6 bg-gray-50 h-full">
                <div className="space-y-6 mb-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl text-center md:text-start font-semibold text-gray-800 mb-4">Currently Assigned</h2>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Manager
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Manager Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Assigned On
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Allow Access
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {assignedManager ? (
                                <tr className="hover:bg-gray-50 transition-colors duration-200"
                                    key={assignedManager.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{assignedManager.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{assignedManager.firstName} {assignedManager.lastName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">March 15, 2024</td>
                                    <td className="px-6 py-4 text-center">
                                        <Switch id={`switch-${assignedManager.id}`} checked={assignedManager.isAssigned}
                                                className="hover:cursor-pointer" onClick={()=>updateStatus(assignedManager.id)}/>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        No manager currently assigned
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {assignedManager ? (
                            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                                 key={assignedManager.id}>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{assignedManager.firstName} {assignedManager.lastName}</h3>
                                        <p className="text-gray-600">{assignedManager.id}</p>
                                    </div>
                                    <Switch id={`switch-${assignedManager.id}`} checked={assignedManager.isAssigned}
                                            className="hover:cursor-pointer" onClick={()=>updateStatus(assignedManager.id)}/>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="font-medium">Assigned: </span>March 15, 2024
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                <p className="text-center text-gray-500">No manager currently assigned</p>
                            </div>
                        )}
                    </div>
                </div>

                {/*All managers table*/}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">All Managers</h2>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Manager
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Manager Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Assigned On
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                                    Allow Access
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {(() => {
                                const unassignedManagers = managers?.filter((manager: Manager) => !manager.isAssigned) || [];

                                return unassignedManagers.length > 0
                                    ? unassignedManagers.map((manager: Manager) => (
                                        <tr className="hover:bg-gray-50 transition-colors duration-200"
                                            key={manager.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{manager.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{manager.firstName} {manager.lastName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">March 15, 2024</td>
                                            <td className="px-6 py-4 text-center">
                                                <Switch id={`switch-${manager.id}`} checked={manager.isAssigned}
                                                        className="hover:cursor-pointer" onClick={()=>updateStatus(manager.id)}/>
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                                No unassigned managers available
                                            </td>
                                        </tr>
                                    );
                            })()}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {(() => {
                            const unassignedManagers = managers?.filter((manager: Manager) => !manager.isAssigned) || [];

                            return unassignedManagers.length > 0
                                ? unassignedManagers.map((manager: Manager) => (
                                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                                         key={manager.id}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{manager.firstName} {manager.lastName}</h3>
                                                <p className="text-gray-600">{manager.id}</p>
                                            </div>
                                            <Switch id={`switch-${manager.id}`} checked={manager.isAssigned}
                                                    className="hover:cursor-pointer" onClick={()=>updateStatus(manager.id)}/>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium">Assigned: </span>March 15, 2024
                                        </div>
                                    </div>
                                ))
                                : (
                                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                        <p className="text-center text-gray-500">No unassigned managers available</p>
                                    </div>
                                );
                        })()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page