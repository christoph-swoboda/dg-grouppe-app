import React, {useState} from 'react'
import '../../styles/registration.scss'
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {
    IonButton,
    IonCard,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput, IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import Api from "../../api/api";
import {useStateValue} from "../../states/StateProvider";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [Errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

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
            setErrors(user?.errors)
            if (user?.role === '2') {
                window.location.replace('/dashboard')
            } else {
                toast.error('No Access')
            }
        }
    };

    return (
        <IonPage>
            <IonContent className='login'>
                <IonCard className='login-box'>
                    <IonCardTitle>Login</IonCardTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonInput placeholder='Username'
                                  {...register('email', {
                                      required: 'Email is required',
                                      pattern: {
                                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                          message: 'Please enter a valid email',
                                      },
                                  })}
                                  type="email"
                                  required
                                  style={{border: errors.email && '1px solid red'}}
                        />
                        {errors.email && touchedFields && <p>{errors.email?.message}</p>}
                        <IonInput placeholder='Password'
                                  type='password'
                                  {...register('password', {required: 'your password is required'})}
                                  style={{border: errors.password && '1px solid red'}}
                        />
                        {errors.password && touchedFields && <p>{errors.password?.message}</p>}
                        <IonButton type="submit" color={'dark'} style={{padding: '0'}} className='enabled'>
                            {(!loading) ? 'Log In' : 'Verifying...'}
                        </IonButton>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Login
