import React, {useEffect, useState} from "react";
import {IonPage, IonToolbar} from "@ionic/react";
import Api from "../../api/api";
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";

const Information = () => {

    const [settings, setSettings] = useState([])
    const [{network}] = useStateValue()

    useEffect(() => {
        Api().get('/settings').then(res => {
            setSettings(res.data)
        })
    }, [network]);

    return (
        <IonPage className='container'>
            {
                settings.length>0?
                    <IonToolbar className="faq"
                                dangerouslySetInnerHTML={{__html: settings?.map(d => d.keyword === 'faq' && d.value)}}
                    >
                    </IonToolbar>
                    :
                    <BeatLoader size={'10px'} style={{height: '40vh'}} color={'black'}/>
            }

        </IonPage>
    )
}

export default Information