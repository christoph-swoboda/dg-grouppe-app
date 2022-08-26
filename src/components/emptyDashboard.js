import React from "react";
import {IonCard, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";

const EmptyDashboard = ({name}) => {
    return (
        <IonCard className='emptyDashboardTitle'>
            <ion-icon icon={checkmarkCircleOutline}/>
            <IonCard className='requestStatus'>
                <IonCardTitle>Hallo {name}</IonCardTitle>
                <IonCardSubtitle>Alles ist gut, Sie haben 0 Anfragen für heute</IonCardSubtitle>
                {/* <IonCardSubtitle >You Dont Have Any Requests </IonCardSubtitle> */}
            </IonCard>
        </IonCard>
    )
}

export default EmptyDashboard