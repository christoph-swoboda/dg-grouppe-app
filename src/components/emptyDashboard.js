import React from "react";
import {IonCard, IonCardSubtitle, IonCardTitle, IonToolbar} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";

const EmptyDashboard = ({name}) => {
    return (
        <IonCard className='emptyDashboardTitle'>
            <ion-icon icon={checkmarkCircleOutline}/>
            <IonCard className='requestStatus'>
                <IonCardTitle >Hi {name}</IonCardTitle>
                <IonCardSubtitle >All is good, you have 0 requests for today</IonCardSubtitle>
                {/* <IonCardSubtitle >You Dont Have Any Requests </IonCardSubtitle> */}
            </IonCard>
        </IonCard>
    )
}

export default EmptyDashboard