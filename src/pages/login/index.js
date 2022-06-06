import React from "react"
import {IonPage} from "@ionic/react"
import '../../styles/registration.scss'

const Login = () => {
    return (
        <IonPage>
            <div className='loginContainer container'>
                <h2>DG-GRUPPE ||||</h2>
                <p>Mehrwert schaffen. Fur Menschen und Unternehmen</p>
                <h3>Login</h3>
                <form>
                    <input placeholder='Username'/>
                    <input type="password" placeholder='Password'/>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </IonPage>
    )
}

export default Login