import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiFetch } from "lib/api";

const loggedInKey = "isLoggedIn"

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!JSON.parse(localStorage.getItem(loggedInKey) || "false"));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setLogin = () => {
        localStorage.setItem(loggedInKey, "true");
        setIsLoggedIn(true);
    }

    const setLogout = () => {
        localStorage.removeItem(loggedInKey);
        setIsLoggedIn(false);
    };

    // Refresh token for persisting session
    const { data: success, error, isValidating } = useSWR(
        isLoggedIn ? "/auth/refresh" : null,
        key => apiFetch(key).then(res => res.ok),
        {
            // Silently refresh token every 15 minutes
            refreshInterval: 1000 * 60 * 15,
            revalidateOnFocus: false
        }
    );

    useEffect(() => {
        if (success) {
            setLogin()
        }

        if (success === false || error) {
            setLogout()
        }
        setIsLoading(isValidating);
    }, [success, error, isValidating]);

    useEffect(() => {
        // Sync all tabs on login or logout
        window.addEventListener("storage", e => {
            if (e.key === loggedInKey) {
                setIsLoggedIn(!!e.newValue);
            }
        });
    });

    return { setLogin, setLogout, isLoggedIn, isLoading };
}
