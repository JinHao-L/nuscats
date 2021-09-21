import { Profile } from "@api/profiles";
import { apiFetch } from "./api";

type CreateProfileResponse = {
    err?: Error
    profile?: Profile
}

export async function createProfile(
    firstName: string,
    lastName: string,
    profilePicUrl: string,
): Promise<CreateProfileResponse> {
    let res = await apiFetch(
        "/users",
        {
            first_name: firstName,
            last_name: lastName,
            profile_pic: profilePicUrl,
        },
        { method: "POST" },
    )

    if (!res.ok) {
        let msg = ((await res.json()) as any).message
        return {
            err: new Error(msg)
        }
    }

    return {
        profile: (await res.json()) as Profile,
    }
}