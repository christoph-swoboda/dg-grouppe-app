import React from "react"
import {IonPage} from "@ionic/react";
import Billing from "../../components/billing";

const Train = () => {
    return (
        <IonPage>
            <Billing header={'Zug Rechnungen'}/>
        </IonPage>
    )
}

export default Train