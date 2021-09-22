import { IonHeader, IonTitle, IonToolbar } from "@ionic/react"

type NavBarProps = {
    title: string
}

const NavBar: React.FC<NavBarProps> = ({ title, children }) => {
    return (
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
                {children}
            </IonToolbar>
        </IonHeader>
    )
}

export default NavBar;

