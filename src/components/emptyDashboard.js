import React from "react";
import {IonCardTitle} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";

const EmptyDashboard = () => {
    return (
        <div className='dashboardTitle'>
            <IonCardTitle >Hi Yaroslav </IonCardTitle>
            {/*<p>All is good, you have 0 requests for today </p>*/}
            <ion-icon icon={checkmarkCircleOutline}/>
            <div className='requestStatus'>
                <h2 >All Is Good </h2>
                <p >You Dont Have Any Requests </p>
            </div>

        </div>
    )
}

export default EmptyDashboard