import React from "react";
import '../../styles/request.scss'

const Request = ({error}) => {
    return (
        <div className='request'>
            <div className={error?'card':'cardError'}>
                <h2>Request Title</h2>
                <p>Request description</p>
            </div>
        </div>
    )
}

export default Request