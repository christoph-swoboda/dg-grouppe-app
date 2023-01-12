import React, {useEffect, useState} from "react";
import {IonCard} from "@ionic/react";
import '../../styles/notification.scss'
import {checkmarkCircleOutline, close, closeCircleOutline, hourglassOutline} from "ionicons/icons";
import {useStateValue} from "../../states/StateProvider";
import {getPeriod} from "../../helpers/calculatePeriod&Deadline";
import Api from "../../api/api";

const Notification = ({title, status, type, updated,  month, year, id}) => {

    const [{filterIds}, dispatch]=useStateValue()
    const [period,setPeriod]= useState('')
    const [deleteId,setDeleteId]=useState()

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

        Api().post(`/notifications/seen/${id}`).then(res => {
            console.log('res', res)
        })
    }

    return (
        <div>
            {
                deleteId!==id &&
                <IonCard className={status === 'rejected' ? 'notifications rejected' : 'notifications'}>
                    <div className='hourGlass'>
                        {
                            status === '1' || title==='1 Bild wurde hochgeladen'?
                                <ion-icon icon={hourglassOutline}/>
                                :
                                status === '2' ?
                                    <ion-icon icon={checkmarkCircleOutline}/>
                                    :
                                    <ion-icon icon={closeCircleOutline}/>
                        }

                    </div>
                    <ion-icon onClick={toggleText} className='close' icon={close}/>
                    <div style={{marginLeft: '10vw'}}>
                        <h2>{title}</h2>
                        <h3>Zeitraum: {period}</h3>
                        <p>Typen: {type}</p>
                        <p>{status==='2'?'Datum Genehmigt: ':status==='3' && title!=='1 Bild wurde hochgeladen'?'Datum Abgelehnt: ':'Hochgeladen: '} {updated}</p>
                    </div>
                </IonCard>
            }
        </div>
    )
}

export default Notification