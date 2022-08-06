import React from "react";
import {IonPage} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";
import {Link} from "react-router-dom";
import '../../styles/thankYou.scss';

const ThankYou = () => {
    return (
        <IonPage>
            <div className='thankYou'>
                <div className='contents'>
                    <ion-icon icon={checkmarkCircleOutline}/>
                    <h2>Thank You</h2>
                    <p>The document has been successfully uploaded and
                        awaiting approval
                    </p>
                    <Link to='/'>
                        <h3>Got it</h3>
                    </Link>
                </div>
            </div>
        </IonPage>
    )
}

export default ThankYou