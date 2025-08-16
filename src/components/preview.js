import React, {useState} from "react";
import {IonButton, IonImg, IonItem, IonPage} from "@ionic/react";
import {useHistory} from "react-router-dom";
import '../styles/thankYou.scss';
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import ProgressBar from "@ramonak/react-progress-bar";

const Preview = () => {
    const [{img, resId}, dispatch] = useStateValue()
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)

    const history = useHistory()


    async function send() {
        setLoading(true)
        let data = new FormData()
        data.append('image', img)
        data.append('id', resId)

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor( (loaded * 100) / total )
                // console.log( `${loaded}kb of ${total}kb | ${percent}%` );
                setPercentage(percent) 
            }
        }

        await Api().post('/response', data,options).then(res => {
            if (res.status === 200) {
                setLoading(false)
                setPercentage(100)
                dispatch({type: "SET_IMG", item: null})
                history.push('/uploaded')
                dispatch({type: "SET_IMGUPPLOADED", item: true})
                setPercentage(0)
            } else {
                setPercentage(0)
                window.alert('Etwas ist schief gelaufen')
            }
        }).catch(e=>{
            window.alert('Etwas ist schief gelaufen...')
        })
    }

    function cancel(){
        history.push('/')
        dispatch({type: "SET_IMG", item: null})
    }

    return (
        <IonPage className='container' hidden={!img}>
            <IonImg src={img} className={'imageSection'}/>
            {
                percentage>0 &&
                <ProgressBar completed={percentage}
                             bgColor='black' baseBgColor='white'
                             isLabelVisible={false}
                             height={'5px'}
                />
            }
            <IonItem className={'sendOrCancelImage'}>
                <IonButton disabled={!img} color={'tertiary'} onClick={send}>{loading ? `jetzt senden...${percentage}%` : 'Senden'}</IonButton>
                <IonButton color={'dark'} onClick={cancel}>Abbrechen</IonButton>
            </IonItem>
        </IonPage>
    )
}
export default Preview