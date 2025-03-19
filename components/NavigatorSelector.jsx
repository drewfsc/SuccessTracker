import { useEffect, useState } from "react";

function NavigatorSelector() {
    const navigatorNames = [
        "Stacy Martinez",
        "Hailey Jester",
        "Ashleigh Chesney",
        "Rich Basche",
        "Rachael Banerdt",
        "Morgan Sole",
        "Kecia Thompson-Gorgon",
        "Drew McCauley"
    ];

    const [selectedNavigator, setSelectedNavigator] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
        }
    }, []);

    useEffect(() => {
        if (isMounted && typeof window !== "undefined" && selectedNavigator) {
            localStorage.setItem("navigatorName", selectedNavigator);
        }
    }, [selectedNavigator, isMounted]);

    if (!isMounted) return null; // ✅ Prevent rendering until hydration completes

    return (
        <div>
            {/*<label htmlFor="navigator-select">Navigator Selector</label>*/}
            <select
                id="navigator-select"
                value={selectedNavigator}
                className=" transition duration-300 border border-base-100 py-2 px-4 rounded text-white"
                onChange={(e) => setSelectedNavigator(e.target.value)}
            >
                <option value="" disabled>Select a navigator</option>
                {navigatorNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default NavigatorSelector;
