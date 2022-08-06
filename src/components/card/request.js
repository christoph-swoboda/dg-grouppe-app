import React, {useEffect, useState} from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, hourglassOutline, warningOutline} from "ionicons/icons";
import {IonButton, IonCard, IonContent, IonHeader, IonModal, IonToolbar} from "@ionic/react";
import UploadPopUp from "../UploadPopUp";
import {useStateValue} from "../../states/StateProvider";
import {getPeriod} from "../../helpers/calculatePeriod&Deadline";

const Request = ({title, status, responseId, updated, month, year, type, message, len}) => {

    const [{modal}, dispatch] = useStateValue()
    const [period, setPeriod] = useState('')

    useEffect(() => {
        setPeriod(getPeriod(month, year))
    }, [type]);

    return (
        <IonCard className='ion-no-margin' style={{marginBottom:'10px'}}>
            <IonContent>
                <IonModal isOpen={modal} className='modal'>
                    <UploadPopUp title={title} responseId={responseId}/>
                    <IonButton color={'light'} style={{padding:0}} className='cancelUpload'
                             onClick={() => dispatch({type: "SET_MODAL", item: false})}
                    >
                        Cancel
                    </IonButton>
                </IonModal>
            </IonContent>

            <IonHeader className='request'
                       onClick={() => status !== '2' && dispatch({type: "SET_MODAL", item: true})}
            >
                <IonToolbar className={status !== '3' ? 'card' : 'cardError'}>
                    {/*<div className='card' >*/}
                    {
                        status === '1' ?
                            <ion-icon icon={hourglassOutline}/>
                            :
                            status === '2' ?
                                <ion-icon icon={checkmarkCircleOutline}/>
                                :
                                <ion-icon icon={warningOutline}/>

                    }
                    <h2>{title} {type} Bill</h2>
                    <h3>Period: {period}</h3>
                    {/*<p hidden={status !== '3'}>Reason: {message}</p>*/}
                    <p>{status!=='1' && 'Updated: '+ updated}</p>
                    <p>Status: {status === '1' ? 'Pending' : status === '2' ? 'Approved' : 'Rejected'}</p>
                </IonToolbar>
            </IonHeader>
        </IonCard>
    )
}

export default Request