import React from "react";
import {IonCard} from "@ionic/react";
import '../../styles/notification.scss'
import {checkmarkCircleOutline, close, hourglassOutline} from "ionicons/icons";

const Notification = ({pending}) => {

    function toggleText() {
        const x = document.getElementById("myId");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    return (
        <IonCard className='ion-padding notifications' id='myId'>
            <div className='hourGlass'>
                {
                    pending ?
                        <ion-icon icon={hourglassOutline}/>
                        :
                        <ion-icon icon={checkmarkCircleOutline}/>
                }

            </div>
            <ion-icon onClick={toggleText} className='close' icon={close}/>
            <div style={{marginLeft: '10vw'}}>
                <h2>Notification Header</h2>
                <p>notification body</p>
            </div>
        </IonCard>
    )
}

export default Notification