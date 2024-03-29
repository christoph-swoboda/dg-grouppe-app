import React, {useState} from 'react'
import '../../styles/registration.scss'
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"

import {IonButton, IonCard, IonCardTitle, IonImg, IonInput, IonPage} from "@ionic/react";
import Api from "../../api/api";
import image from '../../assets/bg.png';

const Login = () => {

    const [loading, setLoading] = useState(false)
    const {
        register, handleSubmit, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});

    const onSubmit = async (data) => {
        setLoading(true)
        await Api().post('/login', data)
            .then(async (res) => {
                console.log('res', res)
                const Data = res.data
                const role = Data.user?.role

                if (role === '2') {
                    if (Data.access_token) {
                        const token = `${Data.token_type} ${Data.access_token}`
                        const user = Data.user
                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))
                    } else {
                        window.alert('something_went_wrong')
                    }

                }
            })
            .catch(e => {
                if (e.response?.status === 401) {
                    window.alert(e.response?.data?.message)
                } else {
                    window.alert('something went wrong!!')
                }
                setLoading(false)
            })

        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            if (user?.role === '2') {
                window.location.replace('/dashboard')
            } else {
                toast.error('No Access')
            }
        }
    };

    return (
        <IonPage className='container'>
            <div className='login'>
                <IonImg src={image}/>
                <IonCard className='login-box'>
                    <IonCardTitle>Einloggen</IonCardTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonInput placeholder='Username'
                                  {...register('email', {
                                      required: 'E-Mail ist erforderlich',
                                      pattern: {
                                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                          message: 'Bitte geben Sie eine gültige E-Mail ein',
                                      },
                                  })}
                                  type="email"
                                  required
                                  style={{border: errors.email && '1px solid red'}}
                        />
                        {errors.email && touchedFields && <p>{errors.email?.message}</p>}
                        <IonInput placeholder='Password'
                                  type='password'
                                  {...register('password', {required: 'Passwort ist erforderlich'})}
                                  style={{border: errors.password && '1px solid red'}}
                        />
                        {errors.password && touchedFields && <p>{errors.password?.message}</p>}
                        <IonButton color={'black'} style={{padding: '0'}} type="submit">
                            {(!loading) ? 'Einloggen' : 'Überprüfen Sie...'}
                        </IonButton>
                    </form>
                </IonCard>
            </div>
        </IonPage>
    )
}

export default Login
