import React from "react";
import '../../styles/request.scss'
import {checkmarkCircleOutline, hourglassOutline} from "ionicons/icons";

const Request = ({title, status, approved, updated, period}) => {

    return (
        <div className='request'>
            <div className={approved? 'card' : 'cardError'}>
                {
                    !approved?
                        <ion-icon icon={hourglassOutline}/>
                        :
                        <ion-icon icon={checkmarkCircleOutline}/>
                }
                <h2>{title}</h2>
                <h3>Date: {period}</h3>
                <p>Updated: {updated}</p>
                <p>Status: {status}</p>
            </div>
        </div>
    )
}

export default Request