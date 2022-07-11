import React, {useEffect, useState} from "react"
import '../../styles/userProfile.scss'
import {IonAvatar, IonCard, IonPage} from "@ionic/react";
import image from "../../assets/a2.jpg";
import {arrowForward, cameraOutline, close} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {Camera, CameraResultType} from "@capacitor/camera";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import Api from "../../api/api";
import {toast} from "react-toastify";

const UserProfile = () => {

    const history = useHistory()
    const [url, setUrl] = useState('')
    const [user, setUser] = useState([])
    const [Errors, setErrors] = useState('')
    const [notFound, setNotFound] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingLogout, setLoadingLogOut] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const [showNumber, setShowNumber] = useState(true)
    let keys = ''
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setErrors('')
        if(data.password!==data.repeat_password){
            setErrors('Passwords didnt match')
        }
        // setLoading(true)
        console.log('data', data)
    };

    useEffect(() => {
        Api().get('/employee').then(res => {
            setUser(res.data)
        })
    }, []);

    useEffect(() => {
        keys = getValues()
        setValue("name", user?.employees?.first_name)
        setValue("company", user?.employees?.company)
        setValue("email", user?.email)
        setValue("phone-input", user.employees?.phone)
    }, [keys, user]);

    async function takePicture() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 100,
        });
        const imageUrl = photo.dataUrl;
        setUrl(imageUrl)
    }

    async function logout() {
        setLoadingLogOut(true)
        await Api().post('/logout')
            .then(res => {
                window.localStorage.clear();
                window.location.replace('/login')
                setLoadingLogOut(false)
            })
    }

    return (
        <IonPage className='containerNoPadding'>
            <div className='profile'>
                <div className='profileContainer'>
                    <ion-icon icon={cameraOutline} onClick={() => takePicture()}/>
                    <ion-icon class='ion-float-right'
                              icon={close}
                              style={{padding: '1.5rem 2rem 0 0 ', cursor: 'pointer', backgroundColor: 'inherit'}}
                              onClick={() => history.push('/dashboard')}
                    />
                    <IonAvatar onClick={() => takePicture()}>
                        <img src={url ? url : image} alt='avatar'/>
                    </IonAvatar>
                </div>
                <div className='userName'>
                    <h2>{user?.employees?.first_name}</h2>
                    <h6>{user?.employees?.company}</h6>
                </div>
                <br/>
                <br/>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input placeholder='Name'
                           disabled
                           type='text'
                           {...register('name')}
                    />
                    <input placeholder='Company'
                           disabled
                           type='text'
                           {...register('company')}
                    />
                    <input placeholder='Change Email'
                           {...register('email')}
                           disabled
                           type="email"
                           required
                           style={{border: errors.email && '1px solid red'}}
                    />
                    <input placeholder='Change Phone Number  >'
                           onClick={() => setShowNumber(false)}
                           hidden={!showNumber}
                    />
                    <div style={{marginLeft: '1rem'}} hidden={showNumber}>
                        <Controller
                            name="phone-input"
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}}) => (
                                <PhoneInput
                                    style={{width: '82vw'}}
                                    value={value}
                                    onChange={onChange}
                                    defaultCountry="DE"
                                    id="phone-input"
                                />
                            )}
                        />
                        {errors.phone && <p>Invalid Phone Number</p>}
                    </div>
                    {/*<ion-icon icon={arrowForward}/>*/}
                    <input placeholder='Change Password  >'
                           onClick={() => setShowPass(false)}
                           hidden={!showPass}
                    />
                    <input placeholder='Enter New Password'
                           hidden={showPass}
                           type='password'
                           autoFocus
                           {...register('password', {required: !showPass})}
                           style={{border: errors.password && '1px solid red'}}
                    />
                    {errors.password && touchedFields && <p>{errors.password.message}</p>}
                    <input placeholder='Repeat Password'
                           hidden={showPass}
                           type='password'
                           {...register('repeat_password', {required: !showPass})}
                           style={{border: errors.password && '1px solid red'}}
                    />
                    {errors.repeat_password && touchedFields && <p>{errors.repeat_password.message}</p>}
                    <p>{Errors}</p>
                    <button hidden={showPass && showNumber} className='update' onClick={handleSubmit(onSubmit)}>
                        {(!loading) ? 'Change' : 'Updating...'}
                    </button>
                    <button onClick={logout}>
                        {(!loadingLogout) ? 'Log Out' : 'Logging Out...'}
                    </button>
                </form>

            </div>
        </IonPage>
    )
}

export default UserProfile