import './ExploreContainer.css';
import React, {useState} from "react";
import {IonFabButton, IonImg} from "@ionic/react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


const ExploreContainer = ({name}) => {

    return (
        <div>
            <div className="container">
                <strong>{name}</strong>
                <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
            </div>
        </div>
    )
}

export default ExploreContainer
