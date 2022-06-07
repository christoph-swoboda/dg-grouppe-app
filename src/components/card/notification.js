import React, {useEffect, useState} from "react";
import {IonCard} from "@ionic/react";
import '../../styles/notification.scss'
import {checkmarkCircleOutline, close, closeCircleOutline, hourglassOutline} from "ionicons/icons";
import {useStateValue} from "../../states/StateProvider";

const Notification = ({title, status, approved, updated, period, id}) => {

    const [{}, dispatch]=useStateValue()

    function toggleText() {
        dispatch(
            {
                type: "SET_NOTIFILTER",
                item: id,
            })
        setDeleteId(id)
        console.log('id', id)
    }
    const [deleteId,setDeleteId]=useState()

    return (
        <div>
            {
                deleteId!==id &&
                <IonCard className={status === 'rejected' ? 'notifications rejected' : 'notifications'} id='myId'>
                    <div className='hourGlass'>
                        {
                            status === 'pending' ?
                                <ion-icon icon={hourglassOutline}/>
                                :
                                status === 'approved' ?
                                    <ion-icon icon={checkmarkCircleOutline}/>
                                    :
                                    <ion-icon icon={closeCircleOutline}/>
                        }

                    </div>
                    <ion-icon onClick={toggleText} className='close' icon={close}/>
                    <div style={{marginLeft: '10vw'}}>
                        <h2>{title}</h2>
                        <h3>Date: {period}</h3>
                        <p>Updated: {updated}</p>
                        <p>Status: {status}</p>
                    </div>
                </IonCard>
            }
        </div>
    )
}

export default Notification