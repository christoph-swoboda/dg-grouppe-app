import React, {useEffect, useState} from "react"
import '../../styles/userProfile.scss'
import {IonAvatar, IonPage} from "@ionic/react";
import {cameraOutline, close} from "ionicons/icons";
import {useHistory, useLocation} from "react-router-dom";
import {Camera, CameraResultType} from "@capacitor/camera";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import Api from "../../api/api";
import {useStateValue} from "../../states/StateProvider";
import image from "../../assets/avatar.png";

const UserProfile = () => {

    const history = useHistory()
    const [url, setUrl] = useState('')
    const [imageSize, setImageSize] = useState(0)
    const [user, setUser] = useState([])
    const [Errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingLogout, setLoadingLogOut] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const [showNumber, setShowNumber] = useState(true)
    let keys = ''
    const location = useLocation()
    const backend = process.env.REACT_APP_BACKEND_URL
    const [{},dispatch] = useStateValue()

    const {
        register, getValues, setValue, handleSubmit, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});

    const onSubmit = async (data) => {
        setErrors('')
        if (data.newPassword !== data.repeatPassword) {
            setErrors('Passwords didnt match')
        } else {
            setLoading(true)
            Api().post('/user/update', data).then(res => {
                setShowNumber(true)
                setShowPass(true)
                window.alert('Information Updated Successfully')
                setLoading(false)
            }).catch(err => {
                window.alert('Something Went Wrong!')
                setLoading(false)
            })
        }
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
        const stringLength = photo.dataUrl.length - 'data:image/png;base64,'.length;
        const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1000;
        let size = Math.floor(sizeInKb)
        setUrl(imageUrl)
        dispatch({type: "SET_AVATAR", item: imageUrl})
        setImageSize(size)

        let data = new FormData()
        data.append('image', imageUrl)

        if (size > 1025) {
            window.alert('Wählen Sie ein Bild unter 1 MB aus')
        } else {
            Api().post(`/employee/profileImage/${user?.employees?.id}`, data).then(res => {
                if (res.status === 201) {
                    alert('Profilbild aktualisiert')
                } else {
                    alert('Etwas ist schief gelaufen!!')
                    setUrl(null)
                }
            })
        }
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

    async function resetStates() {
        history.push('/dashboard')
        setShowNumber(true)
        setShowPass(true)
    }

    useEffect(() => {
        setShowNumber(true)
        setShowPass(true)
    }, [location]);


    return (
        <IonPage className='containerNoPadding'>
            <div className='profile'>
                <div className='profileContainer'>
                    <ion-icon icon={cameraOutline} onClick={() => takePicture()}/>
                    <ion-icon class='ion-float-right'
                              icon={close}
                              style={{padding: '6rem 2rem 0 0 ', cursor: 'pointer', backgroundColor: 'inherit'}}
                              onClick={() => resetStates()}
                    />
                    {
                        !url && imageSize < 1025 && !user?.employees?.image?
                            <IonAvatar>
                                <img src={image} alt='avatar'/>
                            </IonAvatar>
                            :
                            <IonAvatar>
                                <img src={ url && imageSize < 1025? url:`${backend}/${user?.employees?.image}`} alt='avatar'/>
                            </IonAvatar>
                    }

                </div>
                <div className='userName'>
                    <h2>{user?.employees?.first_name}</h2>
                    <h6>{user?.employees?.company}</h6>
                </div>
                <br/>
                <br/>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/*<input placeholder='Name'*/}
                    {/*       disabled*/}
                    {/*       type='text'*/}
                    {/*       {...register('name')}*/}
                    {/*/>*/}
                    {/*<input placeholder='Company'*/}
                    {/*       disabled*/}
                    {/*       type='text'*/}
                    {/*       {...register('company')}*/}
                    {/*/>*/}
                    <input {...register('email')}
                           disabled
                           type="email"
                           required
                           style={{border: errors.email && '1px solid red'}}
                    />
                    <input placeholder='Telefonnummer ändern  >'
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
                    <input placeholder='Passwort ändern  >'
                           onClick={() => setShowPass(false)}
                           hidden={!showPass}
                    />
                    <input placeholder='Altes Passwort eingeben'
                           hidden={showPass}
                           type='password'
                           autoFocus
                           {...register('currentPassword', {required: !showPass})}
                           style={{border: errors.currentPassword && '1px solid red'}}
                    />
                    {errors.currentPassword && touchedFields && <p>{errors.currentPassword.message}</p>}
                    <input placeholder='Neues Passwort eingeben'
                           hidden={showPass}
                           type='password'
                           autoFocus
                           {...register('newPassword', {
                               required: !showPass,
                               pattern: {
                                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                   message: 'Mindestens acht Zeichen, mindestens ein Großbuchstabe, ein Kleinbuchstabe und eine Zahl',
                               },})}
                           style={{border: errors.newPassword && '1px solid red'}}
                    />
                    {errors.newPassword && touchedFields && <p>{errors.newPassword.message}</p>}
                    <input placeholder='Neues Passwort wiederholen'
                           hidden={showPass}
                           type='password'
                           {...register('repeatPassword', {required: !showPass})}
                           style={{border: errors.repeatPassword && '1px solid red'}}
                    />
                    {errors.repeatPassword && touchedFields && <p>{errors.repeatPassword.message}</p>}
                    <p>{Errors}</p>
                    <button hidden={showPass && showNumber} className='update' onClick={handleSubmit(onSubmit)}>
                        {(!loading) ? 'Ändern Sie' : 'Aktualisierung von...'}
                    </button>
                    <button onClick={logout}>
                        {(!loadingLogout) ? 'Abmelden' : 'Abmeldung...'}
                    </button>
                </form>

            </div>
        </IonPage>
    )
}

export default UserProfile