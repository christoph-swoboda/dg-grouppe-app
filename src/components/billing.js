import React, {useState, useEffect} from "react";
import Request from "./card/request";
import '../styles/billingPage.scss';

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
                    <div>
                        <Request error pending/>
                        <Request pending/>
                    </div>
                    :
                    <div>
                        <Request error/>
                        <Request error/>
                    </div>
            }

        </div>
    )
}

export default Billing