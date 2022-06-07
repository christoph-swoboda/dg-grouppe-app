import React from "react"
import '../styles/uploadPopUp.scss'
import {IonCard} from "@ionic/react";

const UploadPopUp = ({title}) => {

    return (
        <div className='uploadContainer'>
            {/*<IonCard>Upload for request: {title}</IonCard>*/}
            <IonCard>Kamera</IonCard>
            <IonCard>Foto-und Videomediathek</IonCard>
            <IonCard>Dokument</IonCard>
        </div>
    )
}

export default UploadPopUp