import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { apiFetch, refreshLoginKey, swrFetcher } from 'lib/api';
import { User } from '@api/users';
import { Profile } from '@api/profiles';

const loggedInKey = 'isLoggedIn';
const userIdKey = 'userId';

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        !!JSON.parse(localStorage.getItem(loggedInKey) || 'false'),
    );
    const [userId, setUserId] = useState<string | null>(
        localStorage.getItem(userIdKey),
    );

    const setLogin = (userId: string) => {
        localStorage.setItem(loggedInKey, 'true');
        setIsLoggedIn(true);

        localStorage.setItem(userIdKey, userId);
        setUserId(userId);
    };

    const setLogout = () => {
        localStorage.removeItem(loggedInKey);
        setIsLoggedIn(false);

        localStorage.removeItem(userIdKey);
        setUserId(null);
    };

    // Refresh token for persisting session
    const { data: refreshData, error: refreshError } = useSWR(
        isLoggedIn ? refreshLoginKey : null,
        swrFetcher<User>(null, { method: 'POST' }),
        {
            // Silently refresh token every 15 minutes
            refreshInterval: 1000 * 60 * 15,
            revalidateOnFocus: false,
        },
    );

    const user = isLoggedIn ? refreshData?.value : undefined
    const shouldCreateProfile = useMemo(() => {
        if (refreshData) {
            return !refreshData.value?.profile?.is_profile_setup;
        } else {
            return false;
        }
    }, [refreshData]);

    useEffect(() => {
        if (refreshData) {
            if (refreshData.success) {
                setLogin(refreshData.value.uuid);
            }

            if (!refreshData.success || refreshError) {
                console.log('logged out');
                console.log({ data: refreshData, err: refreshError });
                setLogout();
            }
        }
    }, [refreshData, refreshError]);

    useEffect(() => {
        function toggleLoggedIn(e: StorageEvent) {
            if (e.key === loggedInKey) {
                setIsLoggedIn(!!e.newValue);
            }

            if (e.key === userIdKey) {
                setUserId(e.newValue);
            }
        }

        // Sync all tabs on login or logout
        window.addEventListener('storage', toggleLoggedIn);
        return () => {
            window.removeEventListener('storage', toggleLoggedIn);
        };
    }, []);

    const {
        data: profileData,
        error: profileError,
        isValidating,
        mutate,
    } = useSWR(
        [userId, isLoggedIn, !shouldCreateProfile],
        (id, loggedIn, profileExists) => {
            return loggedIn && profileExists && id !== null
                ? apiFetch(`/users/${id}`).then(async (res) => {
                    return {
                        success: res.ok,
                        status: res.status,
                        profile: (await res.json()) as Profile,
                    };
                })
                : undefined;
        },
    );

    useEffect(() => {
        if (profileData && !profileData.success) {
            console.log({ profileError, profileData });
        }

        if (profileData && profileData.status === 403) {
            console.log('forbidden, logging out');
            console.log({ data: profileData, err: profileError });
            setLogout();
        }
    }, [profileData, profileError]);

    return {
        setLogin,
        setLogout,
        isLoggedIn,
        userId,
        user,
        shouldCreateProfile,
        userProfile: profileData?.profile,
        profileError,
        profileLoading: isValidating,
        profileUpdated(profile: Profile) {
            mutate({ success: true, status: 200, profile });
        },
    };
}
