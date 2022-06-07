import React, {useEffect, useState} from "react";
import {IonAvatar, IonContent, IonModal, IonPage} from "@ionic/react";
import '../../styles/dashboard.scss'
import {close, informationCircleOutline, notificationsOutline} from "ionicons/icons";
import image from '../../assets/a2.jpg'
import EmptyDashboard from "../../components/emptyDashboard";
import {Link} from "react-router-dom";
import Notification from "../../components/card/notification";
import Request from "../../components/card/request";
import Requests from "../../data/requestData";
import Notifications from "../../data/notificationData";
import {useStateValue} from "../../states/StateProvider";

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(Notifications);
    const [{filterIds}]=useStateValue()

    useEffect(() => {
        const filterId = filterIds.map(item => item);
        const itemsToShow = Notifications.filter(item => filterId.indexOf(item.id) === -1);
        setData(itemsToShow)
        console.log('filterids',filterIds)
    }, [filterIds]);


    return (
        <IonPage className='container'>
            <IonContent>
                <IonModal isOpen={showModal}>
                    <div className='notificationHeader'>
                        <h1>Notifications</h1>
                        <ion-icon icon={close} onClick={() => setShowModal(false)}/>
                    </div>
                    <div className='notificationContainer'>
                        {
                            data.map(not => (
                                <Notification
                                    key={not.id}
                                    id={not.id}
                                    approved={not.approved}
                                    title={not.title}
                                    status={not.status}
                                    period={not.period}
                                    updated={not.updated}
                                />
                            ))
                        }
                    </div>
                </IonModal>
            </IonContent>
            <div className='dashboard'>
                <div className='header'>
                    <Link to='/profile'>
                        <IonAvatar>
                            <img src={image} alt='avatar'/>
                        </IonAvatar>
                    </Link>

                    <div className='notification'>
                        <ion-badge onClick={() => setShowModal(true)} color="dark">{data.length}</ion-badge>
                        <ion-icon onClick={() => setShowModal(true)} icon={notificationsOutline}/>
                        <Link to='/information'>
                            <ion-icon icon={informationCircleOutline}/>
                        </Link>
                    </div>
                </div>
                {
                    data.length === 0 ?
                        <EmptyDashboard/>
                        :
                        <div>
                            {
                                Requests.map(req => (
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
            </div>
        </IonPage>
    )
}

export default Dashboard