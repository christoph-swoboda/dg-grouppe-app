import React, {useEffect, useState} from "react";
import {IonHeader, IonPage, IonToolbar} from "@ionic/react";
import Api from "../../api/api";
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";
import {arrowBack} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import '../../styles/information.scss';

const Information = () => {

    const [settings, setSettings] = useState([])
    const [{network}] = useStateValue()
    const history = useHistory()

    useEffect(() => {
        Api().get('/settings').then(res => {
            setSettings(res.data)
        })
    }, [network]);

    return (
        <IonPage className='infoContainer'>
            <ion-icon onClick={() => history.push('/dashboard')} className='back' icon={arrowBack}/>
            {
                settings.length > 0 ?
                    <IonToolbar className="faq"
                                dangerouslySetInnerHTML={{__html: settings?.map(d => d.keyword === 'faq' && d.value)}}
                    >
                    </IonToolbar>
                    :
                    <BeatLoader size={'10px'} style={{height: '40vh'}} color={'black'}/>
                    // 'loading...'
            }
        </IonPage>
    )
}

export default Information