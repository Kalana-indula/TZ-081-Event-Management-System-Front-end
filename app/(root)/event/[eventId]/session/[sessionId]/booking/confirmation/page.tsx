'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import MainFooter from '@/app/(root)/app-components/MainFooter';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';

const Page = () => {
    const searchParams = useSearchParams();

    // booking id
    const bookingId = searchParams.get('bookingId');

    // parse the whole response you passed as "?savedBookingDetails=..."
    const { bookingDetails } = React.useMemo(() => {
        try {
            const raw = searchParams.get('savedBookingDetails');
            const parsed = raw ? JSON.parse(raw) : {};
            // we only need bookingDetails from the response object
            return { bookingDetails: parsed?.bookingDetails ?? null };
        } catch {
            return { bookingDetails: null };
        }
    }, [searchParams]);

    //ref to QR wrapper
    const qrRef = React.useRef<HTMLDivElement | null>(null);

    //download QR as pdf
    const downLoadQrCode = async () => {
        try {
            if (!qrRef.current) return;

            // grab the SVG inside the QR wrapper
            const svgEl = qrRef.current.querySelector('svg');
            if (!svgEl) return;

            // serialize SVG
            const svgString = new XMLSerializer().serializeToString(svgEl);

            // SVG -> Image (PNG) via canvas
            const svgDataUrl =
                'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

            // Create an image to draw onto canvas
            const img = new Image();
            // ensure crisp rendering
            img.width = svgEl.clientWidth || 220;
            img.height = svgEl.clientHeight || 220;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // upscale a bit for print clarity
                const scale = 3; // increase if you want even sharper
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // white background for print
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const pngDataUrl = canvas.toDataURL('image/png');

                // Build the PDF
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

                const pageW = pdf.internal.pageSize.getWidth();
                const pageH = pdf.internal.pageSize.getHeight();
                const margin = 40;

                // fit the QR nicely; keep it square
                const maxSize = Math.min(pageW - margin * 2, pageH - margin * 2);
                const imgW = maxSize;
                const imgH = maxSize;

                // center on page
                const x = (pageW - imgW) / 2;
                const y = (pageH - imgH) / 2;

                pdf.addImage(pngDataUrl, 'PNG', x, y, imgW, imgH);
                pdf.save(`booking-${bookingId ?? 'qr'}.pdf`);
            };
            img.src = svgDataUrl;
        } catch (e) {
            console.error('Failed to download QR PDF:', e);
        }
    };


    // QR should include ONLY the bookingDetails object, exactly as specified
    const qrValue = React.useMemo(() => {
        return bookingDetails ? JSON.stringify(bookingDetails) : '';
    }, [bookingDetails]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200/30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-4">
                        <div className="relative inline-block">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Booking Confirmed
                </span>
                            </h1>
                            <div
                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                                style={{ backgroundColor: '#193cb8' }}
                            />
                        </div>
                        <div className="mt-3 text-sm sm:text-base text-gray-600 font-light max-w-xl mx-auto">
                            <p>Thank you for your booking! Your tickets are confirmed.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div
                                    className="w-24 h-24 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: '#193cb8' }}
                                >
                                    <CheckCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
                                </div>
                                <div className="absolute inset-0 rounded-full opacity-20" style={{ backgroundColor: '#193cb8' }} />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
                            <p className="text-gray-600 text-lg">Your tickets have been confirmed and are ready to use.</p>
                        </div>

                        {/* Booking ID */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#193cb8' }} />
                                <h3 className="text-lg font-bold text-gray-900">Your Booking ID</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: '#193cb8' }}>
                                <p className="text-sm text-gray-600 mb-1">Reference Number</p>
                                <p className="text-3xl font-bold text-gray-900 font-mono">{bookingId ?? '—'}</p>
                                <p className="text-xs text-gray-500 mt-2">Keep this ID for your records and check-in</p>
                            </div>
                        </div>

                        {/* Booking QR (ONLY bookingDetails in payload) */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#193cb8' }} />
                                <h3 className="text-lg font-bold text-gray-900">Booking QR</h3>
                            </div>
                            <div
                                ref={qrRef}
                                className="bg-white rounded-lg p-4 border-2 flex flex-col items-center gap-3"
                                style={{ borderColor: '#193cb8' }}
                            >
                                {qrValue ? (
                                    <QRCode
                                        value={qrValue}
                                        size={220}
                                        level="M" // L, M, Q, H
                                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                    />
                                ) : (
                                    <p className="text-sm text-gray-500">QR not available</p>
                                )}
                                <p className="text-xs text-gray-500">Download or get a screenshot of this QR</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/"
                                className="flex-1 py-4 px-6 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-center"
                                style={{ backgroundColor: '#193cb8' }}
                            >
                                <div className="flex items-center justify-center gap-2">Browse More Events</div>
                            </Link>

                            <button
                                onClick={downLoadQrCode}
                                className="flex-1 py-4 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
                                style={{ borderColor: '#193cb8', color: '#193cb8', backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#193cb8';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#193cb8';
                                }}
                            >
                                <div className="flex items-center justify-center gap-2">Download QR Code </div>
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-500">🔒 Your booking information is secure and encrypted</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <MainFooter />
            </footer>
        </div>
    );
};

export default Page;
