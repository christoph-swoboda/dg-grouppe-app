import React, {useEffect, useState} from "react"
import '../../styles/userProfile.scss'
import {IonAvatar, IonPage} from "@ionic/react";
import image from "../../assets/a2.jpg";
import {cameraOutline, close} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {Camera, CameraResultType} from "@capacitor/camera";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import Api from "../../api/api";

const UserProfile = () => {

    const history = useHistory()
    const [url, setUrl] = useState('')
    const [user, setUser] = useState([])
    const [Errors, setErrors] = useState('')
    const [loadingData, setLoadingData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingLogout, setLoadingLogOut] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const [showNumber, setShowNumber] = useState(true)
    let keys = ''
    const backend = process.env.REACT_APP_BACKEND_URL
    // const backend='http://localhost:8000'
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {

        setErrors('')
        if (data.newPassword !== data.repeatPassword) {
            setErrors('Passwords didnt match')
        } else {
            setLoading(true)
            Api().post('/user/update', data).then(res => {
                window.alert('Information Updated Successfully')
                setLoading(false)
            }).catch(err => {
                window.alert('Something Went Wrong!')
                setLoading(false)
            })
        }
    };

    useEffect(() => {
        setLoadingData(true)
        Api().get('/employee').then(res => {
            setUser(res.data)
            setLoadingData(false)
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

        let data = new FormData()
        data.append('image', imageUrl)
        Api().post(`/employee/profileImage/${user?.employees?.id}`, data).then(res => {
            if (res.status === 201) {
                alert('Profile Image Updated')
            } else {
                alert('Something went wrong')
            }
        })
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

    async function resetStates(){
        history.push('/dashboard')
        setShowNumber(true)
        setShowPass(true)
    }

    return (
        <IonPage className='containerNoPadding'>
            <div className='profile'>
                <div className='profileContainer'>
                    <ion-icon icon={cameraOutline} onClick={() => takePicture()}/>
                    <ion-icon class='ion-float-right'
                              icon={close}
                              style={{padding: '4rem 2rem 0 0 ', cursor: 'pointer', backgroundColor: 'inherit'}}
                              onClick={() => resetStates()}
                    />
                    <IonAvatar onClick={() => takePicture()}>
                        <img src={url ? url : `${backend}/${user?.employees?.image}`} alt='avatar'/>
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
                    <input placeholder='Enter Old Password'
                           hidden={showPass}
                           type='password'
                           autoFocus
                           {...register('currentPassword', {required: !showPass})}
                           style={{border: errors.currentPassword && '1px solid red'}}
                    />
                    {errors.currentPassword && touchedFields && <p>{errors.currentPassword.message}</p>}
                    <input placeholder='Enter New Password'
                           hidden={showPass}
                           type='password'
                           autoFocus
                           {...register('newPassword', {required: !showPass})}
                           style={{border: errors.newPassword && '1px solid red'}}
                    />
                    {errors.newPassword && touchedFields && <p>{errors.newPassword.message}</p>}
                    <input placeholder='Repeat New Password'
                           hidden={showPass}
                           type='password'
                           {...register('repeatPassword', {required: !showPass})}
                           style={{border: errors.repeatPassword && '1px solid red'}}
                    />
                    {errors.repeatPassword && touchedFields && <p>{errors.repeatPassword.message}</p>}
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