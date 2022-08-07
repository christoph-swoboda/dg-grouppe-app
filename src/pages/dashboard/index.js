import React, {useEffect, useState} from "react";
import {
    IonCardSubtitle,
    IonCardTitle,
    IonContent, IonHeader,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonText, IonTitle, IonToolbar
} from "@ionic/react";
import '../../styles/dashboard.scss'
import '../../styles/notification.scss'
import {chevronDownCircleOutline} from "ionicons/icons";
import EmptyDashboard from "../../components/emptyDashboard";
import Request from "../../components/card/request";
import Api from "../../api/api";
import qs from "qs"
import {BeatLoader} from "react-spinners";
import {useStateValue} from "../../states/StateProvider";
import Notifications from "../../components/notificationModal";
import HeaderSection from "./partial/headerSection";
import {useHistory} from "react-router-dom";

const Dashboard = () => {

    const [{filterIds, showModal, img, network}] = useStateValue()
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
    const history=useHistory()

    async function getRequests() {
        await Api().get(`/requests/published?${query}`).then(res => {
            setRequests(filter.page === 1 ? res.data.open.data : [...requests, ...res.data.open.data])
            setTotal(res.data.open.total)
            setLastPage(res.data.open.last_page)
        })
    }

    async function getEmployee() {
        Api().get('/employee').then(res => {
            setUser(res.data)
        })
    }

    async function getNotifications() {
        await Api().get('/notifications').then(res => {
            setNotifications(res.data)
        })
    }

    useEffect(async () => {
        setLoading(true)
        await getRequests()
        setLoading(false)
    }, [filter, network]);


    useEffect(async () => {
        setLoadingUser(true)
        await getEmployee()
        setLoadingUser(false)
    }, [network]);

    useEffect(async () => {
        await getNotifications()
    }, [filterIds, showModal, img, network]);

    async function doRefresh(event) {
        await getNotifications()
        await getRequests()
        await getEmployee()
        history.push('/dashboard')
        event.detail.complete();
    }

    return (
        <IonPage className='container dashboard'>
            <IonContent hidden={network==='offline'}>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}>
                    </IonRefresherContent>
                    {/*notification modal*/}
                    <IonContent>
                        <IonModal isOpen={showModal}>
                            <Notifications notifications={notifications}/>
                        </IonModal>
                    </IonContent>
                    {/*notification modal*/}
                </IonRefresher>

                <HeaderSection notifications={notifications}
                               user={user}
                               backend={backend}
                               loadingUser={loadingUser}
                               filter={filter}
                />
                {
                    requests?.length === 0 && !loading ?
                        <EmptyDashboard name={user?.employees?.first_name}/>
                        :
                        <div style={{paddingTop: '6rem', backgroundColor: '#eeeeee', minHeight: '90vh'}}>
                            <IonCardTitle style={{fontSize: '35px'}}>
                                Hi {user?.employees?.first_name}
                            </IonCardTitle>
                            <IonCardSubtitle style={{fontSize: '18px', marginTop:'5px'}}>
                                you have {total} {total>1?'requests':'request'} for today
                            </IonCardSubtitle>
                            <hr/>
                            {
                                loading && filter.page === 1 ?
                                    <BeatLoader size={'10px'} style={{height: '40vh'}} color={'black'}/>
                                    :
                                    requests?.map((req, i) => (
                                        <Request
                                            key={req.id}
                                            len={total}
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
                        </div>
                }
            </IonContent>
            <IonTitle hidden={network==='online'}>
                You are offline at the moment!!
            </IonTitle>
        </IonPage>
    )
}

export default Dashboard