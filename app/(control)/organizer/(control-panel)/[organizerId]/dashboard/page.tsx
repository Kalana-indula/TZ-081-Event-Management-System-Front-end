'use client'

import React from 'react'
import {CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface StatData {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

const data: StatData[] = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]


const Page = () => {
    return (
        <>
        {/*    header section*/}
            <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="text-center mb-2 sm:mb-4 pt-3 sm:p-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">Manage and control organizer actions</p>
                </div>
            </div>

        {/*    scrollable content*/}
            <div className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 bg-white">
                {/*    chart section*/}
                <div className="display-organizers bg-gray-200 border-l-4 border-blue-500 px-4 py-2 mb-6 rounded-r-md shadow-sm">
                    <div>
                        <h3 className="text-gray-500 font-medium py-2">ANNUAL FINANCIAL DATA</h3>
                    </div>

                    {/*chart*/}
                    <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-md">
                        <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 0,
                                        bottom: 30
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis
                                        dataKey="name"
                                        tick={{fontSize: 12}}
                                        interval="preserveStartEnd"
                                    />
                                    <Label
                                        value="Month"
                                        offset={-70}
                                        position="insideBottom"
                                        style={{fontSize: 15}}
                                    />
                                    <YAxis
                                        tick={{fontSize: 12}}
                                        width={70}
                                    />
                                    <Label
                                        value="Amount"
                                        offset={-50}
                                        angle={-90}
                                        position="insideLeft"
                                        style={{fontSize: 15}}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            fontSize: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{fontSize: '12px'}}
                                    />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2}/>
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                {/*    report generation button repo*/}
                </div>
            </div>
        </>
    )
}
export default Page;
