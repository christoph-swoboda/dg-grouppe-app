import React, {useState} from "react";
import {IonButton, IonHeader, IonImg, IonItem, IonPage, IonToolbar} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";
import {Link, useHistory} from "react-router-dom";
import '../styles/thankYou.scss';
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import {toast} from "react-toastify";

const Preview = () => {
    const [{img, resId}, dispatch] = useStateValue()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function send() {
        setLoading(true)
        let data = new FormData()
        data.append('image', img)
        data.append('id', resId)

        await Api().post('/response', data).then(res => {
            if (res.status === 200) {
                setLoading(false)
                dispatch({type: "SET_IMG", item: ''})
                history.push('/uploaded')
            } else {
                toast.error('Something Went Wrong')
            }
        })
    }

    return (
        <IonPage >
            <IonImg src={img} className={'imageSection'}/>
            <IonItem className={'sendOrCancelImage'}>
                    <IonButton color={'tertiary'}  onClick={send}>{loading ? 'Sending...' : 'Send'}</IonButton>
                    <IonButton color={'dark'} onClick={() => history.push('/')}>Cancel</IonButton>
            </IonItem>
        </IonPage>
    )
}

export default Preview