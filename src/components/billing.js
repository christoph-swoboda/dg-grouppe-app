import React, {useCallback, useEffect, useState} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import {
    IonCard,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonText,
    IonLoading
} from "@ionic/react";
import Api from "../api/api";
import {useParams} from "react-router";
import qs from "qs";
import {BeatLoader} from "react-spinners";
import {chevronDownCircleOutline} from "ionicons/icons";

const Billing = ({header}) => {

    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])
    const params = useParams()
    const [filter, setFilter] = useState({type: params.page, status: 1, page: 1})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})
    const [lastPage, setLastPage] = useState(0);
    const [total, setTotal] = useState(0);

    const getRequests = useCallback(
        async () => {
            setLoading(true)
            Api().get(`/requests/categorized?${query}`).then(res => {
                console.log('req', res.data?.total)
                setRequests(filter.page === 1 ? res.data.data.filter(req => req.type !== null) : [...requests, ...res.data.data.filter(req => req.type !== null)])
                setLastPage(res.data.last_page)
                setTotal(res.data?.total)
                setLoading(false)
            }).catch(e => {
                console.log('err', e)
            })
        },
        [filter]
    );

    useEffect(() => {
        getRequests().then(r => r)
    }, [getRequests]);

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

            <IonCard >
                <IonCardTitle style={{fontSize:'22px'}}>{header}</IonCardTitle>
                <IonCard style={{display: 'flex'}}>
                    <IonText className={pending ? 'approved inActive' : 'active approved'}
                             onClick={approve}>Approved Uploads</IonText>
                    <IonText className={pending ? 'active pending' : 'inActive pending'}
                             onClick={reject}>Pending Uploads</IonText>
                </IonCard>
                <IonCard className='requestsContainer'>
                    {

                        loading && filter.page === 1 ?
                            <BeatLoader size={'10px'} style={{height: '40vh'}} color={'black'}/>
                            :
                            requests.length === 0 ?
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>No Data Found</IonTitle>
                                    </IonToolbar>
                                </IonHeader>
                                :
                                requests?.map(req => (
                                    <Request
                                        key={req.id}
                                        len={total}
                                        responseId={req.response?.id}
                                        title={req.bill?.title}
                                        type={req.type?.title}
                                        period={req.period}
                                        message={req.response?.message}
                                        month={new Date(req.bill?.created_at).getMonth() + 1}
                                        year={new Date(req.bill?.created_at).getFullYear()}
                                        updated={new Date(req.bill?.updated_at).toLocaleDateString()}
                                        status={req.status}
                                    />
                                ))
                    }
                    <button hidden={lastPage <= filter.page || requests.length === 0}
                            onClick={() => setFilter({...filter, page: filter.page + 1})}>Load More
                    </button>
                </IonCard>
            </IonCard>
        </IonContent>
    )
}

export default Billing