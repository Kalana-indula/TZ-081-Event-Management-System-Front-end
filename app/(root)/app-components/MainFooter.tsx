import React from 'react'
import Link from "next/link";
import {FaFacebook, FaLinkedin, FaWhatsapp} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {IoCall} from "react-icons/io5";
import {IoMdMail} from "react-icons/io";
import {FaLocationDot} from "react-icons/fa6";

const MainFooter = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/*details section*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/business & tech"
                                      className="text-gray-300 hover:text-white transition-colors">
                                    Business & Tech
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/educational" className="text-gray-300 hover:text-white transition-colors">
                                    Educational
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/entertainment"
                                      className="text-gray-300 hover:text-white transition-colors">
                                    Entertainment
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & FAQ Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Legal & FAQ</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy-policy"
                                      className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-conditions"
                                      className="text-gray-300 hover:text-white transition-colors">
                                    Terms & Condition
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center space-x-2">
                                <div><IoCall /></div>
                                <div>+94 421 312 421</div>
                            </li>
                            <li className="text-gray-300 flex items-center space-x-2">
                                <div><IoMdMail /></div>
                                <div>mail.ew@ewentwisp.com</div>
                            </li>
                            <li className="text-gray-300 flex items-center space-x-2">
                                <div><FaLocationDot /></div>
                                <div>532, Anywhere, Somewhere</div>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaFacebook size={28}/>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaLinkedin size={28}/>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaWhatsapp size={30}/>
                            </a>
                            <a href="mailto:your-email@example.com"
                               className="text-gray-300 hover:text-white transition-colors">
                                <MdEmail size={34}/>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-600 border-t-2 mx-4 my-5 shadow-sm"/>
                <div className="mt-4 pt-4 text-center text-sm text-gray-300">
                    <p>© 2025 EventWisp. All Rights Reserved</p>
                </div>
            </div>
        </>
    )
}
export default MainFooter;
