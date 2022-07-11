import React, {useEffect, useState} from "react";
import {IonAvatar, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonModal, IonPage, IonText} from "@ionic/react";
import '../../styles/dashboard.scss'
import '../../styles/notification.scss'
import {close, informationCircleOutline, notificationsOutline} from "ionicons/icons";
import EmptyDashboard from "../../components/emptyDashboard";
import {Link} from "react-router-dom";
import Notification from "../../components/card/notification";
import Request from "../../components/card/request";
import Api from "../../api/api";
import qs from "qs"
import {BeatLoader} from "react-spinners";

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState([]);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const backend = process.env.REACT_APP_BACKEND_URL
    const [filter, setFilter] = useState({page: 1})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})

    useEffect(async () => {
        setLoading(true)
        await Api().get(`/requests/published?${query}`).then(res => {
            setRequests(filter.page === 1 ? res.data.open.data : [...requests, ...res.data.open.data])
            setTotal(res.data.open.total)
            setLoading(false)
            setLastPage(res.data.open.last_page)
        })
    }, [filter]);

    useEffect(async () => {
        setLoadingUser(true)
        Api().get('/employee').then(res => {
            setUser(res.data)
            setLoadingUser(false)
        })
        await Api().get('/notifications').then(res => {
            console.log('noti', res.data)
            setNotifications(res.data)
        })
    }, []);

    return (
        <IonPage className='container'>
            <div className='dashboard'>
                <IonCard className='header'>
                    <div className='userInfo'>
                        <Link to='/profile'>
                            <IonAvatar>
                                <img src={`${backend}/${user?.employees?.image}`} alt='avatar'/>
                            </IonAvatar>
                        </Link>
                        <IonCard>
                            {
                                loadingUser && filter.page === 1 ?
                                    <BeatLoader size={8} color={'#000000'}/>
                                    :
                                    <IonText>{user?.employees?.first_name}</IonText>
                            }
                            <IonCardSubtitle>{user?.employees?.company}</IonCardSubtitle>

                        </IonCard>
                    </div>

                    <div className='notification'>
                        <IonCard hidden={notifications?.length<1} className='ion-badge' onClick={() => setShowModal(true)}
                                 color="dark">{notifications?.length}</IonCard>
                        <ion-icon onClick={() => setShowModal(true)} icon={notificationsOutline}/>
                        <Link to='/information'>
                            <ion-icon icon={informationCircleOutline}/>
                        </Link>
                    </div>
                </IonCard>
                {
                    requests?.length === 0 && !loading ?
                        <EmptyDashboard name={user?.employees?.first_name}/>
                        :
                        <IonCard style={{marginTop: '9rem', position: 'relative'}}>
                            <IonCardTitle style={{fontSize: '35px'}}>Hi {user?.employees?.first_name}</IonCardTitle>
                            <IonCardSubtitle>you
                                have {total} requests
                                for today </IonCardSubtitle>
                            <hr/>
                            {
                                loading && filter.page === 1 ?
                                    <BeatLoader size={12} color={'#000000'}/>
                                    :
                                    requests?.map((req, i) => (
                                        <Request
                                            key={req.id}
                                            responseId={req.response?.id}
                                            title={req.bill?.title}
                                            message={req?.response?.message}
                                            type={req.type?.title}
                                            month={new Date(req.bill?.created_at).getMonth() + 1}
                                            year={new Date(req.bill?.created_at).getFullYear()}
                                            updated={new Date(req.updated_at).toLocaleDateString()}
                                            status={req?.status}
                                        />
                                    ))
                            }
                            <IonText className='loadMore' hidden={lastPage <= filter.page}
                                    onClick={() => setFilter({...filter, page: filter.page + 1})}>Load More
                            </IonText>
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
            {/*notification modal*/}
        </IonPage>
    )
}

export default Dashboard