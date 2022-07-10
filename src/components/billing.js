import React, {useEffect, useState} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import {IonCard, IonCardTitle, IonText} from "@ionic/react";
import Api from "../api/api";
import {useLocation} from "react-router";
import qs from "qs";
import {BeatLoader} from "react-spinners";

const Billing = ({header, data}) => {

    const [pending, setPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])
    const location = useLocation();
    const path = location.pathname.split('/').pop()
    const [filter, setFilter] = useState({page: path, status: '2'})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})

    useEffect(() => {
        setFilter({...filter, page: path})
    }, [path]);


    useEffect(() => {
        setLoading(true)
        Api().get(`/requests/categorized?${query}`).then(res => {
            console.log('res', res.data)
            setRequests(res.data)
            setLoading(false)
            console.log('query', query)
        })
    }, [filter]);

    function approved() {
        setFilter({...filter, status: '2'})
        setPending(false)
    }

    function rejected() {
        setFilter({...filter, status: '1'})
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
            {

                loading ?
                    <BeatLoader size={10} color={'#000000'}/>
                    :
                    requests.data && requests.data[0]?.type !== null ?
                        requests?.data?.map(req => (
                            req.type &&
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
                        :
                        'No Data Under This Filter'
            }

        </IonCard>
    )
}

export default Billing