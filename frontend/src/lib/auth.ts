import { apiFetch, loginKey, logoutKey, signupKey } from "./api";
import { User } from "@api/users"

class LoginResponse {
    user?: User
    err?: Error
    unauthorized: boolean = false
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    let res = await apiFetch(
        loginKey,
        { email, password },
        { method: "POST" },
    )
    if (!res.ok) {
        let msg = ((await res.json()) as any).message
        return {
            err: new Error(msg),
            unauthorized: res.status === 401
        }
    }

    return {
        user: (await res.json()) as User,
        unauthorized: false
    }
}

export async function logout(): Promise<void> {
    await apiFetch(logoutKey, null)
}

export async function signup(email: string, username: string, password: string): Promise<Error | undefined> {
    let res = await apiFetch(
        signupKey,
        { email, username, password },
        { method: "POST" }
    )

    if (!res.ok) {
        let msg = ((await res.json()) as any).message
        return new Error(msg)
    }
}