import React from "react";
import {IonPage, IonToolbar} from "@ionic/react";

const Information = ({data}) => {

    return (
        <IonPage className='container'>
            <IonToolbar className="faq"
                        dangerouslySetInnerHTML={{__html: data?.map(d => d.keyword === 'faq' && d.value)}}
            >
            </IonToolbar>
        </IonPage>
    )
}

export default Information