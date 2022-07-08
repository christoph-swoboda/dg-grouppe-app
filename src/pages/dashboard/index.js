import React, {useEffect, useState} from "react";
import {IonAvatar, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonModal, IonPage, IonText} from "@ionic/react";
import '../../styles/dashboard.scss'
import '../../styles/notification.scss'
import {close, informationCircleOutline, notificationsOutline} from "ionicons/icons";
import EmptyDashboard from "../../components/emptyDashboard";
import {Link} from "react-router-dom";
import Notification from "../../components/card/notification";
import Request from "../../components/card/request";
import Notifications from "../../data/notificationData";
import {useStateValue} from "../../states/StateProvider";
import Api from "../../api/api";
import {BeatLoader} from "react-spinners";

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [{filterIds}] = useStateValue()

    useEffect(async () => {
        setLoading(true)
        await Api().get('/requests/published').then(res => {
            setData(res.data.open)
        })
        await Api().get('/employee').then(res => {
            setUser(res.data)
            setLoading(false)
        })
        console.log('backendurl', process.env.REACT_APP_BACKEND_URL)
        // const filterId = filterIds.map(item => item);
        // const itemsToShow = Notifications.filter(item => filterId.indexOf(item.id) === -1);
        // setData(itemsToShow)
    }, [filterIds]);


    return (
        <IonPage className='container'>
            <div className='dashboard'>
                <IonCard className='header'>
                    <div className='userInfo'>
                        <Link to='/profile'>
                            <IonAvatar>
                                <img src={`http://127.0.0.1:8000/${user?.employees?.image}`} alt='avatar'/>
                            </IonAvatar>
                        </Link>
                        <IonCard>
                            {
                                loading ?
                                    <BeatLoader size={8} color={'#000000'}/>
                                    :
                                    <IonText>{user?.employees?.first_name}</IonText>
                            }
                            <IonCardSubtitle>{user?.employees?.company}</IonCardSubtitle>

                        </IonCard>
                    </div>

                    <div className='notification'>
                        <IonCard className='ion-badge' onClick={() => setShowModal(true)}
                                 color="dark">{data.data?.length}</IonCard>
                        <ion-icon onClick={() => setShowModal(true)} icon={notificationsOutline}/>
                        <Link to='/information'>
                            <ion-icon icon={informationCircleOutline}/>
                        </Link>
                    </div>
                </IonCard>
                {
                    data.data?.length === 0 ?
                        <EmptyDashboard/>
                        :
                        <IonCard style={{marginTop: '9rem', position: 'relative'}}>
                            <IonCardTitle style={{fontSize: '35px'}}>Hi {user?.employees?.first_name}</IonCardTitle>
                            <IonCardSubtitle>you
                                have {data.data?.reduce((amount, item) => item.requests.length + amount, 0)} requests
                                for today </IonCardSubtitle>
                            <hr/>
                            {
                                loading ?
                                    <BeatLoader size={12} color={'#000000'}/>
                                    :
                                    data?.data?.map((bill, i) => (
                                        bill.requests?.map(req => (
                                            <Request
                                                key={req.id}
                                                title={bill.title}
                                                type={bill?.type[i]?.title}
                                                month={new Date(bill.created_at).getMonth() + 1}
                                                year={new Date(bill.created_at).getFullYear()}
                                                updated={new Date(req.updated_at).toLocaleDateString()}
                                                status={req?.status}
                                                approved={bill.approved}
                                            />
                                        ))
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
                            Notifications.map(not => (
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