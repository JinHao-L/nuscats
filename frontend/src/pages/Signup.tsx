import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
	useIonAlert,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ROOT_ROUTE } from "app/routes";
import useAuth from "hooks/useAuth";
import { login, signup } from "lib/auth";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { signup } from "lib/auth";

type SignupInputs = {
	email: string
	username: string
	password: string
	confirmPassword: string
}

const Signup: React.FC = () => {

	const [showErrorAlert] = useIonAlert()
	const { setLogin } = useAuth()
	const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupInputs>()
	const history = useHistory()

	const onSubmit: SubmitHandler<SignupInputs> = async data => {
		const signupErr = await signup(data.email, data.username, data.password)
		if (signupErr) {
			showErrorAlert(`${signupErr}. Please try signing up again`, [{ text: 'Ok' }])
			console.log({ signupErr })
			return
		}

		const { user, err: loginErr, unauthorized } = await login("admin@gmail.com", "admin")
		if (loginErr || unauthorized) {
			console.log({ loginErr, unauthorized })
			return
		}

		if (user) {
			setLogin(user.uuid)
			history.push("/home")
		}
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
						<p className="my-2 text-lg font-bold tracking-wide text-gray-900 sm:text-xl md:text-2xl">Fill in your details to begin</p>
					</div>
					<div className="w-full max-w-md mt-3">
						<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
							<div className="block mx-5 mb-6 h-14">
								<div className={"bg-gray-200 rounded-xl " + (errors.email ? "border border-red-700" : "")}>
									<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="email">
										Email
									</label>
									<input
										id="email"
										type="email"
										className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
										{...register("email", { required: true })}
									/>
								</div>
								{errors.email && <span className="ml-1 text-xs font-medium text-red-700">Email is required</span>}
							</div>
							<div className="block mx-5 mb-6 h-14">
								<div className={"bg-gray-200 rounded-xl " + (errors.username ? "border border-red-700" : "")}>
									<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="username">
										Username
									</label>
									<input
										id="username"
										type="text"
										className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
										{...register("username", { required: true, minLength: 3 })}
									/>
								</div>
								{errors.username?.type === "required" && <span className="ml-1 text-xs font-medium text-red-700">Username is required</span>}
								{errors.username?.type === "minLength" && <span className="ml-1 text-xs font-medium text-red-700">Username must be at least 3 characters long</span>}
							</div>
							<div className="block mx-5 mb-6 h-14">
								<div className={"bg-gray-200 rounded-xl " + (errors.password ? "border border-red-700" : "")}>
									<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="password">
										Password
									</label>
									<input
										id="password"
										type="password"
										className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
										{...register("password", { required: true, minLength: 8 })}
									/>
								</div>
								{errors.password?.type === "required" && <span className="ml-1 text-xs font-medium text-red-700">Password is required</span>}
								{errors.password?.type === "minLength" && <span className="ml-1 text-xs font-medium text-red-700">Password must be at least 8 characters long</span>}
							</div>
							<div className="block mx-5 mb-6 h-14">
								<div className={"bg-gray-200 rounded-xl " + (errors.confirmPassword ? "border border-red-700" : "")}>
									<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="cfmPassword">
										Confirm password
									</label>
									<input
										id="cfmPassword"
										type="password"
										className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
										{...register("confirmPassword", {
											required: true,
											minLength: 8,
											validate: val => val === watch("password")
										})}
									/>
								</div>
								{errors.confirmPassword?.type === "required" && <span className="ml-1 text-xs font-medium text-red-700">Please confirm your password</span>}
								{errors.confirmPassword?.type === "validate" && <span className="ml-1 text-xs font-medium text-red-700">Passwords do not match</span>}
							</div>
							<input
								id="submit"
								className="mx-5 text-lg font-medium text-white h-14 rounded-xl bg-primary-400"
								type="submit"
								value="Sign up"
							/>
						</form>
						<p className="my-2 text-lg font-semibold text-center">
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
						</IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Signup;