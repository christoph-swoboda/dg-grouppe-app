import React, {useEffect, useState} from "react"
import '../styles/uploadPopUp.scss'
import {IonCard, IonContent, IonImg, IonModal, IonText} from "@ionic/react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {useStateValue} from "../states/StateProvider";
import {useHistory} from "react-router-dom";
import {checkmarkCircleOutline} from "ionicons/icons";
import Api from "../api/api";
import { toast } from "react-toastify";

const UploadPopUp = ({title, responseId}) => {

    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')
    const [{uploaded}, dispatch] = useStateValue()
    const history = useHistory()
    const hiddenFileInput = React.useRef(null);
  
    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    async function takePicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        setUrl(imageUrl)
    }

    async function uploadPicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        setUrl(imageUrl)
    }

    async function fileInput(e) {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            await setImage(file);
            reader.onloadend = () => {
                setUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    }

    async function send() {

        let data=new FormData()
        data.append('image', url)
        data.append('id', responseId)

        console.log('sent', data)

        await Api().post('/response', data).then(res=>{
            if(res.status===200){
                dispatch({type: "SET_MODAL", item: false})
                history.push('/uploaded')
            }
            else{
                toast.error('Something Went Wrong')
            }
        })
    }

    return (
        <div className='uploadContainer'>
            <IonImg className={url ? 'uploadedImage' : 'hideImageSection'} src={url}/>
            {
                url &&
                <IonCard className='send' onClick={send}>send</IonCard>
            }
            <IonCard onClick={() => takePicture()}>Kamera</IonCard>
            <IonCard onClick={() => uploadPicture()}>Foto-und Videomediathek</IonCard>
            <input type="file" ref={hiddenFileInput} hidden onChange={fileInput}/>
            <IonCard onClick={handleClick}>Dokument</IonCard>
        </div>
    )
}

export default UploadPopUp