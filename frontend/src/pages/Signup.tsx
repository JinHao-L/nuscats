import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonLoading,
	IonPage,
	IonToolbar,
	useIonAlert,
} from "@ionic/react";
import { signup } from "lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "components/map/form/TextInput";
import { useState } from "react";
import { useHistory } from "react-router";
import { MAP_ROUTE } from "app/routes";

type SignupInputs = {
	email: string
	username: string
	password: string
	confirmPassword: string
}

const Signup: React.FC = () => {

	const [showAlert] = useIonAlert()
	const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupInputs>()
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const onSubmit: SubmitHandler<SignupInputs> = async data => {
		setLoading(true);
		const signupErr = await signup(data.email, data.username, data.password)
		setLoading(false);

		if (signupErr) {
			showAlert(`${signupErr}. Please try signing up again`, [{ text: 'Ok' }])
			console.log({ signupErr })
			return
		}

		showAlert({
			message: 'Sign up successful! Please check your email to verify your account',
			onDidDismiss: () => history.push(MAP_ROUTE),
			buttons: [{ text: 'Ok' }]
		})

		// const { user, err: loginErr, unauthorized } = await login(data.email, data.password)
		// if (loginErr || unauthorized) {
		// 	console.log({ loginErr, unauthorized })
		// 	return
		// }

		// if (user) {
		// 	setLogin(user.uuid)
		// 	history.push(MAP_ROUTE)
		// }
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="flex flex-col items-center">
					<div className="m-5 text-center">
						<p className="mb-1 text-2xl font-semibold text-transparent bg-clip-text sm:text-3xl md:text-4xl bg-gradient-to-br from-primary-600 to-secondary-600">
							Join the awesome cat community
						</p>
						<p className="my-2 text-lg font-bold tracking-wide text-gray-800 sm:text-xl md:text-2xl">Fill in your details to begin</p>
					</div>
					<div className="w-full max-w-md mt-2">
						<IonLoading isOpen={loading} message={'Please wait...'} />
						<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
							<TextInput
								id="email"
								type="email"
								label="Email"
								register={register("email", { required: true })}
								errors={[{ isError: !!errors.email, msg: "Email is required" }]}
							/>
							<TextInput
								id="username"
								type="text"
								label="Username"
								register={register("username", { required: true, minLength: 4 })}
								errors={[
									{ isError: errors.username?.type === "required", msg: "Username is required" },
									{ isError: errors.username?.type === "minLength", msg: "Username must be at least 4 characters long" },
								]}
							/>
							<TextInput
								id="password"
								type="password"
								label="Password"
								register={register("password", { required: true, minLength: 8 })}
								errors={[
									{ isError: errors.password?.type === "required", msg: "Password is required" },
									{ isError: errors.password?.type === "minLength", msg: "Password must be at least 8 characters long" },
								]}
							/>
							<TextInput
								id="cfmPassword"
								type="password"
								label="Confirm password"
								register={register("confirmPassword", {
									required: true,
									minLength: 8,
									validate: val => val === watch("password")
								})}
								errors={[
									{ isError: errors.confirmPassword?.type === "required", msg: "Please confirm your password" },
									{ isError: errors.confirmPassword?.type === "validate", msg: "Passwords do not match" }
								]}
							/>
							<input
								id="submit"
								className="mx-5 text-lg font-medium text-white h-14 rounded-xl bg-primary-400"
								type="submit"
								value="Sign up"
							/>
						</form>
						{/* <p className="my-2 text-lg font-semibold text-center">
							or
						</p>
						<IonButton
							className="mx-5 mb-3 text-lg cursor-pointer h-14"
							color="facebook"
							expand="block"
							routerLink={ROOT_ROUTE}
							routerDirection="forward"
						>
							Connect with Facebook
						</IonButton>
						<IonButton
							className="mx-5 mb-3 text-lg text-black border border-gray-400 cursor-pointer rounded-xl h-14"
							expand="block"
							color="white"
							routerLink={ROOT_ROUTE}
							routerDirection="forward"
						>
							Connect with Google
						</IonButton> */}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Signup;