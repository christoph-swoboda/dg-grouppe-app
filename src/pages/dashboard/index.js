import React from "react";
import {IonAvatar, IonPage} from "@ionic/react";
import '../../styles/dashboard.scss'
import {close, informationCircleOutline, notificationsOutline} from "ionicons/icons";
import image from '../../assets/a2.jpg'
import EmptyDashboard from "../../components/emptyDashboard";
import { Link } from "react-router-dom";
import Notification from "../../components/card/notification";
import Request from "../../components/card/request";
import UserProfile from "../../components/userProfile";

const Dashboard = () => {

    const notification=2

    return (
        <IonPage>
            <div className='dashboard container'>
                <div className='header'>
                    <Link to='/profile'>
                    <IonAvatar>
                        <img src={image} alt='avatar' />
                    </IonAvatar>
                    </Link>

                    <div className='notification'>
                        <ion-badge color="dark">{notification}</ion-badge>
                        <ion-icon icon={notificationsOutline}/>
                        <Link to='/information'>
                            <ion-icon icon={informationCircleOutline} />
                        </Link>
                    </div>
                </div>
                {
                    notification===0?
                        <EmptyDashboard/>
                        :
                        <div>
                            <Request error={false}/>
                            <Request error={true}/>
                            <Request error={true}/>
                        </div>
                }
                {/*<div className='notificationHeader'>*/}
                {/*    <h1>Notifications</h1>*/}
                {/*    <ion-icon icon={close} style={{color:'black', fontSize:'35px'}}/>*/}
                {/*</div>*/}
                {/*<Notification/>*/}
                {/*<Notification/>*/}
                {/*<Notification/>*/}

            </div>
        </IonPage>
    )
}

export default Dashboard