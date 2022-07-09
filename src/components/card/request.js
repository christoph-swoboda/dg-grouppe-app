import React, {useEffect, useState} from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, hourglassOutline, warningOutline} from "ionicons/icons";
import {IonCard, IonContent, IonModal} from "@ionic/react";
import UploadPopUp from "../UploadPopUp";
import {useStateValue} from "../../states/StateProvider";
import {getPeriod} from "../../helpers/calculatePeriod&Deadline";

const Request = ({title, status, approved, updated, month, year, type}) => {

    const [{modal}, dispatch] = useStateValue()
    const [period,setPeriod]= useState('')

    useEffect(() => {
        setPeriod(getPeriod(month, year))

        console.log('type', type)
    }, [type]);

    return (
        <IonCard style={{marginLeft: 'auto'}}>
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
                <div className={status !== '3' ? 'card' : 'cardError'}>
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
                    <p>Updated: {updated}</p>
                    <p>Status: {status==='1'?'Pending':status==='2'?'Approved':'Rejected'}</p>
                </div>
            </div>
        </IonCard>
    )
}

export default Request