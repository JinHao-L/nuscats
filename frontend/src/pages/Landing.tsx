import { IonPage, IonContent, IonButton, IonRouterLink } from '@ionic/react';
import { MAP_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from 'app/routes';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const Landing: React.FC = () => {
  const history = useHistory()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home")
    }

  }, [isLoggedIn, history])

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <main className="relative flex flex-col items-center w-full h-full bg-black">
          <div className="relative w-full h-full sm:w-5/6 md:w-2/3 lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1607242792481-37f27e1d74e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80"
              alt="cute cat as background"
              className="absolute top-0 left-0 object-cover object-center w-full h-full"
            />
            <div className="absolute top-0 left-0 hidden w-full h-full sm:flex sm:justify-between">
              <div className="w-1/3 h-full transform -translate-x-5 bg-gradient-to-l from-transparent to-black" />
              <div className="w-1/3 h-full transform translate-x-5 bg-gradient-to-r from-transparent to-black" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-90">
              <div className="flex flex-col h-full pb-20 mx-5">
                <p className="mt-auto mb-6 text-3xl font-bold text-center text-white">
                  Insert tagline here
                </p>
                <IonButton
                  className="mx-5 mb-6 text-base font-semibold cursor-pointer h-14 md:text-lg"
                  color="primary"
                  expand="block"
                  routerLink={SIGNUP_ROUTE}
                  routerDirection="forward"
                >
                  Join our community
                </IonButton>
                <p className="mb-6 text-sm text-center text-white">
                  Already a member?{' '}
                  <IonRouterLink
                    routerLink={SIGNIN_ROUTE}
                    routerDirection="forward"
                    className="font-semibold tracking-wide"
                  >
                    Sign in
                  </IonRouterLink>
                </p>
                <p className="mb-6 text-sm text-center text-white">
                  <IonRouterLink
                    routerLink={MAP_ROUTE}
                    routerDirection="forward"
                    className="font-medium tracking-wide"
                  >
                    Continue as Guest
                  </IonRouterLink>
                </p>
              </div>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage >
  );
};

export default Landing;
