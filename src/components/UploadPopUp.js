import React, {useState} from "react"
import '../styles/uploadPopUp.scss'
import {IonButton} from "@ionic/react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {useStateValue} from "../states/StateProvider";
import {useHistory} from "react-router-dom";

const UploadPopUp = ({title, responseId}) => {

    const [image, setImage] = useState('')
    const [{}, dispatch] = useStateValue()
    const history = useHistory()
    const hiddenFileInput = React.useRef(null);

    const auToClickHander = () => {
        hiddenFileInput.current.click();
    };

    async function takePicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        dispatch({type: "SET_MODAL", item: false})
        history.push('/preview')
        dispatch({type: "SET_IMG", item: imageUrl})
        dispatch({type: "SET_RESID", item: responseId})
    }

    async function uploadPicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        dispatch({type: "SET_MODAL", item: false})
        history.push('/preview')
        dispatch({type: "SET_IMG", item: imageUrl})
        dispatch({type: "SET_RESID", item: responseId})
    }

    async function fileInput(e) {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            await setImage(file);
            reader.onloadend = () => {
                dispatch({type: "SET_MODAL", item: false})
                history.push('/preview')
                dispatch({type: "SET_IMG", item: reader.result})
                dispatch({type: "SET_RESID", item: responseId})
            };

            reader.readAsDataURL(file);
        } else {
            window.alert('Something Went Wrong!');
        }
    }

    return (
        <div className='uploadContainer'>
            <IonButton color={'light'} onClick={() => takePicture()}>Kamera</IonButton>
            <IonButton color={'light'} onClick={() => uploadPicture()}>Foto-und Videomediathek</IonButton>
            <input type="file" ref={hiddenFileInput} hidden onChange={fileInput}/>
            <IonButton color={'light'} onClick={auToClickHander}>Dokument</IonButton>
        </div>
    )
}

export default UploadPopUp