import React, {useState, useEffect} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';
import Requests from "../data/requestData";

const Billing = ({header}) => {

    const [pending, setPending] = useState(false)

    return (
        <div className='billingContainer'>
            <h2>{header}</h2>
            <div style={{display: 'flex'}}>
                <h4 className={pending ? 'approved inActive' : 'active approved'}
                    onClick={() => setPending(false)}>Approved Uploads</h4>
                <h4 className={pending ? 'active pending' : 'inActive pending'}
                    onClick={() => setPending(true)}>Pending Uploads</h4>
            </div>
            {
                pending ?
                        Requests.map(req=>(
                            !req.approved &&
                            <Request
                                key={req.id}
                                title={req.title}
                                period={req.period}
                                updated={req.updated}
                                status={req.status}
                                approved={req.approved}
                            />
                        ))
                    :
                    <div>
                        {
                            Requests.map(req=>(
                                req.approved &&
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
    )
}

export default Billing