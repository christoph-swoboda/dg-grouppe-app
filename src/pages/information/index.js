import React from "react";
import {IonCard, IonCardSubtitle, IonCardTitle, IonPage, IonText} from "@ionic/react";

const Information = () => {
    return (
        <IonPage className='container'>
            <IonCard style={{boxShadow:'none'}}>
                <IonCardTitle  style={{fontSize:'25px'}}> Frequently Asked Questions</IonCardTitle>
                <br/>
                <IonCardSubtitle style={{fontSize:'18px'}}>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it
                    to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like
                    Aldus PageMaker including versions of Lorem Ipsum.</IonCardSubtitle>
            </IonCard>
        </IonPage>
    )
}

export default Information