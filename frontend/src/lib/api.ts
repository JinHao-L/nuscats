import { IsDev } from "./config";

export const ApiBaseUrl = IsDev ? "http://localhost:3001" : "http://localhost:3001" // TODO: update when deployed to prod

export const apiFetch = async (path: string, body?: any, options?: RequestInit): Promise<Response> => {
    return fetch(`${ApiBaseUrl}${path}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options?.headers
        },
        credentials: 'include',
        ...options,
        body: body ? JSON.stringify(body) : null
    })
}