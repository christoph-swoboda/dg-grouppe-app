import React, {useCallback, useEffect, useState} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import {IonCard, IonCardTitle, IonText} from "@ionic/react";
import Api from "../api/api";
import {useParams} from "react-router";
import qs from "qs";
import {BeatLoader} from "react-spinners";

const Billing = ({header, data}) => {

    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])
    const params= useParams()
    const [filter, setFilter] = useState({page: params.page, status: 1})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})

    const getRequests= useCallback(
        async () => {
            setLoading(true)
            Api().get(`/requests/categorized?${query}`).then(res => {
                setRequests(res.data)
                setLoading(false)
            })
        },
        [filter]
    );

    useEffect(() => {
        getRequests().then(r => r)
    }, [getRequests]);

    function approved() {
        setFilter({...filter, status: 2})
        setRequests([])
        setPending(false)
    }

    function rejected() {
        setFilter({...filter, status: 1})
        setRequests([])
        setPending(true)
    }

    return (
        <IonCard className='billingContainer'>
            <IonCardTitle>{header}</IonCardTitle>
            <IonCard style={{display: 'flex'}}>
                <IonText className={pending ? 'approved inActive' : 'active approved'}
                         onClick={approved}>Approved Uploads</IonText>
                <IonText className={pending ? 'active pending' : 'inActive pending'}
                         onClick={rejected}>Pending Uploads</IonText>
            </IonCard>
            <IonCard className='requestsContainer'>
            {

                loading ?
                    <BeatLoader size={10} color={'#000000'}/>
                    :
                    requests.length ===0?
                        'No Data Under This Filter'
                        :

                        requests?.map(req => (
                            <Request
                                key={req.id}
                                responseId={req.response?.id}
                                title={req.bill?.title}
                                type={req.type?.title}
                                period={req.period}
                                month={new Date(req.bill?.created_at).getMonth() + 1}
                                year={new Date(req.bill?.created_at).getFullYear()}
                                updated={new Date(req.bill?.updated_at).toLocaleDateString()}
                                status={req.status}
                            />
                        ))
            }
            </IonCard>
        </IonCard>
    )
}

export default Billing