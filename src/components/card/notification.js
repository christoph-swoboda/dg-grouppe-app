import React, {useEffect, useState} from "react";
import {IonCard} from "@ionic/react";
import '../../styles/notification.scss'
import {checkmarkCircleOutline, close, closeCircleOutline, hourglassOutline} from "ionicons/icons";
import {useStateValue} from "../../states/StateProvider";
import {getPeriod} from "../../helpers/calculatePeriod&Deadline";

const Notification = ({title, status, type, updated,  month, year, id}) => {

    const [{}, dispatch]=useStateValue()
    const [period,setPeriod]= useState('')

    useEffect(() => {
        setPeriod(getPeriod(month, year))
    }, []);

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
                <IonCard className={status === 'rejected' ? 'notifications rejected' : 'notifications'}>
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
                        <h2 style={{color:status==='1'?'black': status==='2'?'green':'red'}}>{title}</h2>
                        <h3>Period: {period}</h3>
                        <p>Type: {type}</p>
                        <p>Updated: {updated}</p>
                    </div>
                </IonCard>
            }
        </div>
    )
}

export default Notification