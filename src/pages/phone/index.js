import React from "react"
import {IonPage} from "@ionic/react";
import Billing from "../../components/billing";

const Phone = () => {
    return (
        <IonPage>
            <Billing header={'Phone Bills'}/>
        </IonPage>
    )
}

export default Phone