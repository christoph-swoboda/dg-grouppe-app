import React, {useEffect} from "react";
import {IonPage} from "@ionic/react";
import {checkmarkCircleOutline} from "ionicons/icons";
import {Link} from "react-router-dom";
import '../../styles/thankYou.scss';
import {useStateValue} from "../../states/StateProvider";

const ThankYou = () => {

    const [{imgUploaded}, dispatch] = useStateValue()

    useEffect(() => {
        return () => {
            dispatch({type: "SET_RESID", item: null})
        };
    }, []);

    return (
        <IonPage>
            <div className='thankYou' hidden={!imgUploaded}>
                <div className='contents'>
                    <ion-icon icon={checkmarkCircleOutline}/>
                    <h2>Dankeschön</h2>
                    <p>Das Dokument wurde erfolgreich hochgeladen und
                        wartet auf die Genehmigung
                    </p>
                    <Link to='/'>
                        <h3>Verstanden</h3>
                    </Link>
                </div>
            </div>
        </IonPage>
    )
}

export default ThankYou