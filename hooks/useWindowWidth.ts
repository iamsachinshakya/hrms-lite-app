"use client";

import { useState, useEffect } from "react";

export function useWindowWidth() {
    const [w, setW] = useState<number | null>(null);

    useEffect(() => {
        setW(window.innerWidth);
        const h = () => setW(window.innerWidth);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);
    return w;
}
