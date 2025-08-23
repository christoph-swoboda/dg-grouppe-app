import React from "react"
import {IonPage} from "@ionic/react";
import Billing from "../../components/billing";

const Car = () => {
    return (
        <IonPage>
            <Billing header={'PKW Rechnungen'}/>
        </IonPage>
    )
}

export default Car