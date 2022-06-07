import React, {useEffect, useState} from "react"
import '../styles/uploadPopUp.scss'
import {IonCard, IonContent, IonImg, IonModal} from "@ionic/react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {useStateValue} from "../states/StateProvider";
import {useHistory} from "react-router-dom";
import {checkmarkCircleOutline} from "ionicons/icons";

const UploadPopUp = ({title}) => {

    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')
    const [{uploaded}, dispatch] =useStateValue()
    const history=useHistory()
    const [showModal, setShowModal] = useState(false);

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
                console.log('img', file)
            };

            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    }

    return (
        <div className='uploadContainer'>
            <IonImg className={url ? 'uploadedImage' : 'hideImageSection'} src={url}/>
            {
                url &&
                <IonCard className='send' onClick={()=>{
                    dispatch(
                        {
                            type: "SET_MODAL",
                            item: false,
                        })
                    history.push('/uploaded')
                }
                }>send</IonCard>
            }
            <IonCard onClick={() => takePicture()}>Kamera</IonCard>
            <IonCard onClick={() => uploadPicture()}>Foto-und Videomediathek</IonCard>
            <input type='file' id='file' hidden onChange={fileInput}/>
            <label htmlFor="file"><IonCard>Dokument</IonCard></label>
        </div>
    )
}

export default UploadPopUp