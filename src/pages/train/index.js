import React from "react"
import {IonPage} from "@ionic/react";
import Billing from "../../components/billing";

const Train = () => {
    return (
        <IonPage>
            <Billing header={'Train Bills'}/>
        </IonPage>
    )
}

export default Train