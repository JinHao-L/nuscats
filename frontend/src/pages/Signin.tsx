import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonToolbar,
} from '@ionic/react';
import {
  FORGET_PASSWORD_ROUTE,
  RESEND_EMAIL_ROUTE,
  ROOT_ROUTE,
} from 'app/routes';

const Signin: React.FC = () => {
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
        <div className="mx-5 mt-5 mb-5">
          <p className="mb-1 text-3xl font-bold">Welcome back!</p>
          <p>NUS cats are waiting for you</p>
        </div>
        <form>
          <div className="flex flex-col mt-5">
            <div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
              <label
                className="block pt-1 pl-3 text-xs text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
                required={true}
              />
            </div>
            <div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
              <label
                className="block pt-1 pl-3 text-xs text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
                required={true}
              />
            </div>
          </div>
          <IonButton
            className="mx-5 text-lg text-white cursor-pointer h-14"
            color="primary"
            expand="block"
            routerLink={ROOT_ROUTE}
            routerDirection="forward"
            type="submit"
          >
            Sign in
          </IonButton>
        </form>
        <div className="w-full mt-5 text-center">
          <IonRouterLink routerLink={FORGET_PASSWORD_ROUTE}>
            Forgot your password?
          </IonRouterLink>
        </div>
        <div className="w-full mt-2 text-center">
          <IonRouterLink routerLink={RESEND_EMAIL_ROUTE}>
            Resend email confirmation?
          </IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
