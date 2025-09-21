import React, {useCallback, useEffect, useState} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import {
    IonButton,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonRefresher,
    IonRefresherContent,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import Api from "../api/api";
import {useParams} from "react-router";
import qs from "qs";
import {BeatLoader} from "react-spinners";
import {chevronDownCircleOutline} from "ionicons/icons";
import {useStateValue} from "../states/StateProvider";

const Billing = ({header}) => {

    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])
    const params = useParams()
    const [{network, img, pushOpened}] = useStateValue()
    const [filter, setFilter] = useState({type: params.page, status: 1, page: 1})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})
    const [lastPage, setLastPage] = useState(0);
    const [total, setTotal] = useState(0);

    const getRequests = useCallback(
        async () => {
            setLoading(true)
            Api().get(`/requests/categorized?${query}`).then(res => {
                setRequests(filter.page === 1 ? res.data.data.filter(req => req.type !== null) : [...requests, ...res.data.data.filter(req => req.type !== null)])
                setLastPage(res.data.last_page)
                setTotal(res.data?.total)
                setLoading(false)
            }).catch(e => {
                if (e.response.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.replace('/login')
                }
            })
        },
        [filter]
    );

    useEffect(() => {
        getRequests().then(r => r)
    }, [getRequests, network, img, pushOpened]);

    function approve() {
        setFilter({...filter, status: 2, page: 1})
        setRequests([])
        setPending(false)
    }

    function reject() {
        setFilter({...filter, status: 1, page: 1})
        setRequests([])
        setPending(true)
    }

    function doRefresh(event) {
        getRequests().then(r => r)
        event.detail.complete();
    }

    return (
        <IonContent className='billingContainer'>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent
                    pullingIcon={chevronDownCircleOutline}
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                >
                </IonRefresherContent>
            </IonRefresher>

            <IonCard hidden={network === 'offline'}>
                <IonCardTitle style={{fontSize: '22px'}}>{header}</IonCardTitle>
                <IonCard style={{display: 'flex'}}>
                    <IonText className={pending ? 'approved inActive' : 'active approved'}
                             onClick={approve}>Genehmigte Rechnungen</IonText>
                    <IonText className={pending ? 'active pending' : 'inActive pending'}
                             onClick={reject}>Ausstehende Rechnungen</IonText>
                </IonCard>
                <IonCard className='requestsContainer' style={{minHeight: '10vh'}}>
                    {

                        loading && filter.page === 1 ?
                            <BeatLoader size={'10px'} style={{height: '40vh'}} color={'black'}/>
                            :
                            requests.length === 0 ?
                                <IonTitle >
                                    <span style={{ whiteSpace: 'normal' }}>keine Uploads</span>
                                </IonTitle>
                                :
                                requests?.map(req => (
                                    <Request
                                        key={req.id}
                                        len={total}
                                        responseId={req.response?.id}
                                        title={req.bill?.title}
                                        type={req.type?.title}
                                        period={req.period}
                                        published={req.published}
                                        message={req.response?.message}
                                        month={new Date(req.bill?.created_at).getMonth() + 1}
                                        year={new Date(req.bill?.created_at).getFullYear()}
                                        updated={new Date(req.bill?.updated_at).toLocaleDateString()}
                                        status={req.status}
                                    />
                                ))
                    }

                    {
                        !(lastPage <= filter.page || requests.length === 0) &&
                        <IonButton expand="full" onClick={() => setFilter({...filter, page: filter.page + 1})}>
                            Mehr sehen
                        </IonButton>
                    }
                </IonCard>
            </IonCard>
            {
                network === 'offline' &&
                <IonToolbar>
                    <IonTitle>
                        Sie sind im Moment offline!!
                    </IonTitle>
                    {/* <br/>
                    <IonCardSubtitle>
                        Connect To The Internet
                    </IonCardSubtitle> */}
                </IonToolbar>
            }
        </IonContent>
    )
}

export default Billing