'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // read token safely
        const raw = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const token = raw && raw !== "undefined" && raw !== "null" ? raw : null;

        // if already on login, don't redirect again
        const isOnLogin = pathname?.startsWith("/admin/auth/login");

        if (!token) {
            if (!isOnLogin) router.replace("/admin/auth/login");
            return; // do not set checked; prevents rendering children
        }

        // optional: set axios default header for subsequent calls
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setChecked(true); // allow children to render
    }, [router, pathname]);

    if (!checked) return null; // or a skeleton/loader
    return <>{children}</>;
}
