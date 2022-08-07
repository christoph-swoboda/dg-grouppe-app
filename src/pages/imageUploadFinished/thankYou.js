import React, {useEffect} from "react";
import {IonPage} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";
import {Link, useHistory} from "react-router-dom";
import '../../styles/thankYou.scss';
import {useStateValue} from "../../states/StateProvider";

const ThankYou = () => {

    const [{imgUploaded}] = useStateValue()

    return (
        <IonPage>
            <div className='thankYou' hidden={!imgUploaded}>
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