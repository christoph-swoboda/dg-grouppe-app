import React, {useState} from "react";
import {IonAvatar, IonContent, IonModal, IonPage} from "@ionic/react";
import '../../styles/dashboard.scss'
import {close, informationCircleOutline, notificationsOutline} from "ionicons/icons";
import image from '../../assets/a2.jpg'
import EmptyDashboard from "../../components/emptyDashboard";
import {Link} from "react-router-dom";
import Notification from "../../components/card/notification";
import Request from "../../components/card/request";
import Requests from "../../data/requestData";

const Dashboard = () => {

    const notification = 2
    const [showModal, setShowModal] = useState(false);

    return (
        <IonPage>
            <IonContent>
                <IonModal isOpen={showModal}>
                    <div className='notificationHeader'>
                        <h1>Notifications</h1>
                        <ion-icon icon={close} onClick={() => setShowModal(false)}
                                  style={{color: 'black', fontSize: '35px'}}
                        />
                    </div>
                    <Notification pending={false}/>
                    <Notification pending={true}/>
                    <Notification pending={false}/>
                </IonModal>
            </IonContent>
            <div className='dashboard container'>
                <div className='header'>
                    <Link to='/profile'>
                        <IonAvatar>
                            <img src={image} alt='avatar'/>
                        </IonAvatar>
                    </Link>

                    <div className='notification'>
                        <ion-badge onClick={() => setShowModal(true)} color="dark">{notification}</ion-badge>
                        <ion-icon onClick={() => setShowModal(true)} icon={notificationsOutline}/>
                        <Link to='/information'>
                            <ion-icon icon={informationCircleOutline}/>
                        </Link>
                    </div>
                </div>
                {
                    notification === 0 ?
                        <EmptyDashboard/>
                        :
                        <div>
                            {
                                Requests.map(req=>(
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