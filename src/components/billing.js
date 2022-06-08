import React, {useState, useEffect} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import Requests from "../data/requestData";
import {IonCard, IonCardTitle, IonText} from "@ionic/react";

const Billing = ({header}) => {

    const [pending, setPending] = useState(false)

    return (
        <IonCard className='billingContainer'>
            <IonCardTitle>{header}</IonCardTitle>
            <IonCard style={{display: 'flex'}}>
                <IonText className={pending ? 'approved inActive' : 'active approved'}
                    onClick={() => setPending(false)}>Approved Uploads</IonText>
                <IonText className={pending ? 'active pending' : 'inActive pending'}
                    onClick={() => setPending(true)}>Pending Uploads</IonText>
            </IonCard>
            {
                pending ?
                        Requests.map(req=>(
                            !req.approved &&
                            <Request
                                key={req.id}
                                title={req.title}
                                period={req.period}
                                updated={req.updated}
                                status={req.status}
                                approved={req.approved}
                            />
                        ))
                    :
                    <div>
                        {
                            Requests.map(req=>(
                                req.approved &&
                                <Request
                                    key={req.id}
                                    title={req.title}
                                    period={req.period}
                                    updated={req.updated}
                                    status={req.status}
                                    approved={req.approved}
                                />
                            ))
                        }
                    </div>
            }

        </IonCard>
    )
}

export default Billing