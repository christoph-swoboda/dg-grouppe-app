import React from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, hourglassOutline} from "ionicons/icons";
import {IonCard, IonContent, IonModal} from "@ionic/react";
import UploadPopUp from "../UploadPopUp";
import {useStateValue} from "../../states/StateProvider";

const Request = ({title, status, approved, updated, period}) => {

    const [{modal}, dispatch]= useStateValue()

    return (
        <div>
            <IonContent>
                <IonModal isOpen={modal} className='modal'>
                    <UploadPopUp title={title}/>
                    <IonCard className='cancelUpload' onClick={() =>
                        dispatch(
                            {
                                type: "SET_MODAL",
                                item: false,
                            })
                    }>
                        Cancel
                    </IonCard>
                </IonModal>
            </IonContent>

            <div className='request' onClick={() =>
                dispatch(
                {
                    type: "SET_MODAL",
                    item: true,
                })}>
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