import React from "react"
import '../styles/userProfile.scss'
import {IonAvatar, IonPage} from "@ionic/react";
import image from "../assets/a2.jpg";
import {arrowForward, arrowForwardCircle, cameraOutline, closeCircle, play} from "ionicons/icons";

const UserProfile = () => {
    return (
        <IonPage>
            <div className='container'>
                <div className='profileContainer'>
                    <ion-icon icon={cameraOutline}/>
                    <IonAvatar>
                        <img src={image} alt='avatar'/>
                    </IonAvatar>
                </div>
                <div className='userName'>
                    <h2>User Name</h2>
                    <p>Company Name</p>
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