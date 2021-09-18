import { IonPage, IonContent, IonButton, IonRouterLink } from '@ionic/react';
import { MAP_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from 'app/routes';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-cover-cat">
          <div className="h-full bg-gradient-to-b from-transparent to-black">
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
      </IonContent>
    </IonPage>
  );
};

export default Landing;
