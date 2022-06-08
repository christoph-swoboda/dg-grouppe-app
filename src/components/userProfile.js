import React, {useState} from "react"
import '../styles/userProfile.scss'
import {IonAvatar, IonCard, IonPage} from "@ionic/react";
import image from "../assets/a2.jpg";
import {arrowForward, cameraOutline, close} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

const UserProfile = () => {

    const history = useHistory()
    const [url, setUrl] = useState('')

    async function takePicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        setUrl(imageUrl)
    }

    return (
        <IonPage className='containerNoPadding'>
            <div>
                <div className='profileContainer'>
                    <ion-icon icon={cameraOutline} onClick={() => takePicture()}/>
                    <ion-icon class='ion-float-right'
                              icon={close}
                              style={{padding:'1.5rem 2rem 0 0 ', cursor:'pointer', backgroundColor:'inherit'}}
                              onClick={() => history.push('/dashboard')}
                    />
                    <IonAvatar onClick={() => takePicture()}>
                        <img src={url?url: image} alt='avatar'/>
                    </IonAvatar>
                </div>
                <div className='userName'>
                    <h2>Yaroslav</h2>
                    <p>Dg-Gruppe</p>
                </div>

                <div className='formContainer'>
                    <form>
                        <input disabled placeholder='Name'/>
                        <input disabled placeholder='Company'/>
                        <input placeholder='Change Phone Number'/>
                        <ion-icon icon={arrowForward}/>
                        <input placeholder='Change Email'/>
                        <ion-icon icon={arrowForward}/>
                        <input placeholder='Change Password'/>
                        <ion-icon icon={arrowForward}/>
                        <input placeholder='Logout'/>
                        <ion-icon icon={arrowForward}/>
                    </form>
                </div>
            </div>
        </IonPage>
    )
}

export default UserProfile