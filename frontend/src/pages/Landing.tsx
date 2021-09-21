import { IonPage, IonContent, IonButton, IonRouterLink } from '@ionic/react';
import { MAP_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from 'app/routes';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent scrollY={false}>
        <main className="flex flex-col items-center w-full h-full bg-black">
          <div className="relative w-full h-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <img
              src="https://placekitten.com/400/908"
              alt="cute cat as background"
              className="absolute top-0 left-0 object-cover object-center w-full h-full"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-90">
              <div className="flex flex-col h-full pb-20 mx-5">
                <p className="mt-auto mb-6 text-3xl font-bold text-center text-white">
                  Insert tagline here
                </p>
                <IonButton
                  className="mx-5 mb-6 font-bold cursor-pointer h-14"
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
                  >
                    Sign in
                  </IonRouterLink>
                </p>
                <p className="mb-6 text-sm text-center text-white">
                  <IonRouterLink
                    routerLink={MAP_ROUTE}
                    routerDirection="forward"
                  >
                    Continue as Guest
                  </IonRouterLink>
                </p>
              </div>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
