import React, {useEffect} from "react";
import {IonContent, IonModal} from "@ionic/react";
import {close} from "ionicons/icons";
import Notification from "./card/notification";
import {useStateValue} from "../states/StateProvider";

const Notifications = ({notifications}) => {

    const [{showModal}, dispatch] = useStateValue()

    async function closeModal() {
        dispatch({type: "SET_SHOWMODAL", item: false})
    }

    useEffect(() => {
        return () => {
            dispatch({type: "SET_SHOWMODAL", item: false})
        };
    }, [dispatch]);

    return (
        <IonContent>
            <IonModal isOpen={showModal} className={'ion-modal'}>
                <div className='notificationContainer'>
                    <div className='notificationHeader'>
                        <h1>Benachrichtigungen</h1>
                        <ion-icon icon={close} onClick={() => closeModal()}/>
                    </div>
                    {
                        notifications?.map((not, i) => (
                            <Notification
                                key={not.id}
                                id={not.id}
                                type={not?.request?.type?.title}
                                title={not?.request?.response?.message}
                                status={not.request?.status}
                                month={new Date(not.request?.bill?.created_at).getMonth() + 1}
                                year={new Date(not.request?.bill?.created_at).getFullYear()}
                                updated={new Date(not.request?.response?.updated_at).toLocaleDateString()}
                            />
                        ))
                    }
                </div>
            </IonModal>
        </IonContent>
    )
}

export default Notifications