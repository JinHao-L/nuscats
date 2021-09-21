
type DiceBearAvatarType = "male" | "female" | "human" | "identicon" | "initials" | "bottts" | "avataaars" | "jdenticon" | "gridy" | "micah"

export function GetRandomAvatarUrl(seed: string, type: DiceBearAvatarType = "gridy"): string {
    return `https://avatars.dicebear.com/api/${type}/${seed}.svg`
}