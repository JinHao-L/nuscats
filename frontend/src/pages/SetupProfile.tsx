import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { MAP_ROUTE } from "app/routes"
import TextInput from "components/map/form/TextInput"
import useAuth from "hooks/useAuth"
import { camera } from "ionicons/icons"
import { GetRandomAvatarUrl } from "lib/avatar"
import { createProfile } from "lib/profile"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { takePhoto, UserPhoto } from "utils/takePhoto"
import { getUserProfileImageUpload, uploadImage } from "lib/uploads"


type SetupProfileInputs = {
    firstName: string
    lastName: string
}

type ProfilePicState = {
    url: string
    uploaded: boolean
}


const uploadProfilePic = async (userId: string, photo: UserPhoto): Promise<{ profileUrl?: string, err?: Error }> => {
    const { res, err } = await getUserProfileImageUpload(userId)
    if (err) {
        console.log(`Errored while getting user profile upload link ${err}`)
        return { err }
    }

    if (res) {
        try {
            uploadImage(res.signedUrl, photo)
        } catch (e) {
            console.log(`Errored while upload user profile ${e}`)
            return { err: new Error(`${e}`) }
        }

        return { profileUrl: res.imageUrl }
    }

    return { err: new Error("unexpected error") }
}

const SetupProfile: React.FC = () => {
    const [showErrorAlert] = useIonAlert()
    const [loading, setLoading] = useState(false)
    const { userId, profileUpdated } = useAuth()
    const [profilePicState, setProfilePicState] = useState<ProfilePicState>(
        { url: GetRandomAvatarUrl(userId || "1"), uploaded: true }
    )
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm<SetupProfileInputs>()

    const onSubmit: SubmitHandler<SetupProfileInputs> = async data => {
        if (!userId) {
            showErrorAlert({
                message: "No user id found",
                onDidDismiss: () => history.push(MAP_ROUTE),
                buttons: ['Ok']
            })
            return
        }
        setLoading(true)
        let url: string
        if (!profilePicState.uploaded) {
            const { profileUrl, err } = await uploadProfilePic(userId, { dataUrl: profilePicState.url })
            if (err) {
                setLoading(false)
                showErrorAlert("Error uploading profile pic. Please try again!")
                return
            }

            url = profileUrl!
        } else {
            url = profilePicState.url
        }

        console.log({ data, url })
        const { err, profile } = await createProfile(userId, data.firstName, data.lastName, url)
        if (err) {
            console.log(`Errored creating profile: ${err}`)
            setLoading(false)
            showErrorAlert(`${err}. Please try again`)
            return
        }

        if (profile) {
            setLoading(false)
            profileUpdated(profile)
            history.push(MAP_ROUTE)
        }

    }

    const takeProfilePic: React.MouseEventHandler<HTMLDivElement> = async e => {
        let photo: UserPhoto | undefined
        try {
            photo = await takePhoto()
        } catch (e) {
            console.log({ e })
        }

        if (photo) {
            setProfilePicState({ url: photo.dataUrl, uploaded: false })
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={MAP_ROUTE} />
                    </IonButtons>
                    <IonTitle className="-ml-6 text-center">
                        Setup Your Profile
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                <div className="relative w-full h-full">
                    <div className="sticky top-0 flex items-start justify-center w-full pt-5 h-28 bg-secondary-400">
                        <p className="font-medium text-white text-md md:text-lg">Let us know more about you!</p>
                    </div>
                    <div className="absolute left-0 right-0 flex flex-col items-center w-5/6 max-w-xl py-3 m-auto bg-white shadow-md rounded-xl top-16">
                        <div className="relative mt-1">
                            <img
                                className="object-cover object-center w-40 h-40 border-2 rounded-full shadow border-primary-400 md:w-52 md:h-52"
                                src={profilePicState.url}
                                alt="your profile pic"
                            />
                            <div
                                className="absolute flex items-center justify-center p-1.5 rounded-full shadow-md bg-primary-400 bottom-1.5 right-1.5"
                                onClick={takeProfilePic}
                            >
                                <IonIcon icon={camera} size="large" color="light" />
                            </div>
                        </div>
                        <form className="flex flex-col w-full max-w-sm mt-6" onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                id="firstName"
                                type="text"
                                label="First Name"
                                register={register("firstName", { "required": true })}
                                errors={[{ isError: !!errors.firstName, msg: "First Name is required" }]}
                            />
                            <TextInput
                                id="lastName"
                                type="text"
                                label="Last Name"
                                register={register("lastName", { "required": true })}
                                errors={[{ isError: !!errors.lastName, msg: "Last Name is required" }]}
                            />
                            <input
                                id="submit"
                                className="mx-5 text-lg font-medium text-white shadow h-14 rounded-xl bg-primary-400"
                                type="submit"
                                value="Create profile"
                            />
                        </form>
                        <IonLoading isOpen={loading} message={'Please wait...'} />
                        <Link className="mt-4 text-sm font-medium text-primary-500" to={MAP_ROUTE}> Maybe another time!</Link>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default SetupProfile