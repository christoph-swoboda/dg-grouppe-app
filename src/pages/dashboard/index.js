import React, {useEffect, useState} from "react";
import {IonAvatar, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonModal, IonPage, IonText} from "@ionic/react";
import '../../styles/dashboard.scss'
import '../../styles/notification.scss'
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
    }, [filterIds]);


    return (
        <IonPage className='container'>
            <div className='dashboard'>
                <div className='header'>
                    <div className='userInfo'>
                    <Link to='/profile'>
                        <IonAvatar>
                            <img src={image} alt='avatar'/>
                        </IonAvatar>
                    </Link>
                        <IonCard>
                            <IonText>Yaroslav</IonText>
                            <IonCardSubtitle>Company</IonCardSubtitle>
                        </IonCard>
                    </div>

                    <div className='notification'>
                        <IonCard className='ion-badge' onClick={() => setShowModal(true)} color="dark">{data.length}</IonCard>
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
                        <IonCard style={{marginTop:'6rem', position:'relative'}}>
                            <IonCardTitle style={{fontSize:'35px'}} >Hi Yaroslav </IonCardTitle>
                            <IonCardSubtitle>you have {Requests.length} requests for today </IonCardSubtitle>
                            <hr/>
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
                        </IonCard>
                }
            </div>

            {/*notification modal*/}
            <IonContent>
                <IonModal isOpen={showModal}>
                    <div className='notificationContainer'>
                        <div className='notificationHeader'>
                            <h1>Notifications</h1>
                            <ion-icon icon={close} onClick={() => setShowModal(false)}/>
                        </div>
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
            {/*notification modal*/}
        </IonPage>
    )
}

export default Dashboard