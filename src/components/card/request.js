import React from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, hourglassOutline} from "ionicons/icons";

const Request = ({error,pending}) => {

    return (
        <div className='request'>
            <div className={error ? 'card' : 'cardError'}>
                {
                    pending ?
                        <ion-icon icon={hourglassOutline}/>
                        :
                        <ion-icon icon={checkmarkCircleOutline}/>
                }
                <h2>Request to upload Internet bills</h2>
                <h3>Date: Time period 1 of 2022</h3>
                <p>Updated: 06/01/2022</p>
                <p>Status: confirmed</p>
            </div>
        </div>
    )
}

export default Request