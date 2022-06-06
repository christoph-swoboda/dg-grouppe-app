import React from "react"
import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import ExploreContainer from "../components/ExploreContainer"
import '../styles/registration.scss'

const Tab1 = () => {
    return (
        <IonPage>
            <div className='loginContainer'>
                <h2>DG-GRUPPE ||||</h2>
                <p>Mehrwert schaffen. Fur Menschen und Unternehmen</p>
                <h3>Login</h3>
                <form>
                    <input placeholder='Username'/>
                    <input type="password" placeholder='Password'/>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </IonPage>
    )
}

export default Tab1