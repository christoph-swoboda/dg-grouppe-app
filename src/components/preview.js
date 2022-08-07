import React, {useEffect, useState} from "react";
import {IonButton, IonImg, IonItem, IonPage} from "@ionic/react";
import {useHistory} from "react-router-dom";
import '../styles/thankYou.scss';
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";

const Preview = () => {
    const [{img, resId}, dispatch] = useStateValue()
    const [loading, setLoading] = useState(false)
    const [imageSize, setImageSize] = useState(0)
    const history = useHistory()

    // async function getImageSize(url) {
    //     const stringLength = url.length - 'data:image/png;base64,'.length;
    //     const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    //     const sizeInKb = sizeInBytes / 1000;
    //     let size = Math.floor(sizeInKb)
    //     console.log('size', size)
    //     setImageSize(size)
    // }

    async function send() {
        setLoading(true)
        let data = new FormData()
        data.append('image', img)
        data.append('id', resId)

        // if(imageSize>1025){
        //     window.alert('Select an image under 1 MB')
        //     setLoading(false)
        //     history.push('/')
        // }
        // else{
        await Api().post('/response', data).then(res => {
            if (res.status === 200) {
                setLoading(false)
                dispatch({type: "SET_IMG", item: null})
                history.push('/uploaded')
                dispatch({type: "SET_IMGUPPLOADED", item: true})
            } else {
                window.alert('Something Went Wrong')
            }
            setImageSize(0)
        })
        // }
    }

    // useEffect(async () => {
    //     await getImageSize(img)
    // }, [img]);

    return (
        <IonPage className='container' hidden={!img}>
            <IonImg src={img} className={'imageSection'}/>
            <IonItem className={'sendOrCancelImage'}>
                <IonButton disabled={!img} color={'tertiary'} onClick={send}>{loading ? 'Sending...' : 'Send'}</IonButton>
                <IonButton color={'dark'} onClick={() => history.push('/')}>Cancel</IonButton>
            </IonItem>
        </IonPage>
    )
}

export default Preview