import React, {useState} from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, close, hourglassOutline} from "ionicons/icons";
import {IonCard, IonContent, IonModal} from "@ionic/react";
import Notification from "./notification";
import UploadPopUp from "../UploadPopUp";

const Request = ({title, status, approved, updated, period}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <IonContent>
                <IonModal isOpen={showModal} className='modal'>
                    <UploadPopUp title={title}/>
                    <IonCard className='cancelUpload' onClick={() => setShowModal(false)}>
                        Cancel
                    </IonCard>
                </IonModal>
            </IonContent>

            <div className='request' onClick={() => setShowModal(true)}>
                <div className={approved ? 'card' : 'cardError'}>
                    {
                        !approved ?
                            <ion-icon icon={hourglassOutline}/>
                            :
                            <ion-icon icon={checkmarkCircleOutline}/>
                    }
                    <h2>{title}</h2>
                    <h3>Date: {period}</h3>
                    <p>Updated: {updated}</p>
                    <p>Status: {status}</p>
                </div>
            </div>
        </div>
    )
}

export default Request