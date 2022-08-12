import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {PushNotifications} from "@capacitor/push-notifications";
import Api from "./api/api";
import {useStateValue} from "./states/StateProvider";
import {Routes} from "./router/router";
import {NavLinks} from "./router/navLinks";
import Login from "./pages/login";

setupIonicReact();

const App = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const deviceID = localStorage.DEVICEID
    const [{network, img}, dispatch] = useStateValue()

    useEffect(() => {
        PushNotifications.checkPermissions().then(async (res) => {
            if (res.receive !== 'granted') {
                PushNotifications.requestPermissions().then(async (res) => {
                    if (res.receive === 'denied') {
                        window.alert('Push Notification permission denied');
                    } else {
                        window.alert('Push Notification permission granted');
                        await register();
                    }
                });
            } else {
                await register();
            }
        });
    }, [])

    useEffect(() => {
        ['load', 'online', 'offline'].forEach(function (e) {
            window.addEventListener(e, () => dispatch({
                type: "SET_NETWORK",
                item: navigator.onLine ? "online" : "offline"
            }));
        });
    }, [network]);

    useEffect(() => {
        if (deviceID) {
            Api().post(`/save-device-id/${deviceID}`).then(res => {
                // window.alert('Registered for push notification')
            }).catch(e => {
                // if(e)
            })
        }
    }, [deviceID]);

    const register = async () => {

        await PushNotifications.register();
        await PushNotifications.addListener('registration', token => {
            localStorage.setItem('DEVICEID', token.value)
        });
        await PushNotifications.addListener('registrationError',
            (error) => {
                window.alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        await PushNotifications.addListener('pushNotificationActionPerformed',
            (notification) => {
                dispatch({type: "SET_PUSHOPENED", item: true})
            }
        );
    }

    return (
        <IonApp className='ion-app'>
            <IonReactRouter>
                <IonTabs style={{padding:'2rem'}}>
                    <IonRouterOutlet>
                        <Route exact path="/"><Redirect to="/dashboard"/></Route>
                        {
                            Routes.map(route => (
                                <Route key={route.id} path={route.path}>
                                    {user ? route.component : <Redirect to="/login"/>}
                                </Route>
                            ))
                        }
                        <Route path="/login">{!user ? <Login/> : <Redirect to="/dashboard"/>}</Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" hidden={!user || img}>
                        {
                            NavLinks.map(link => (
                                <IonTabButton key={link.id} tab={link.name} href={link.path}>
                                    {link.icon}
                                    <IonLabel style={{textTransform: 'capitalize'}}>{link.name}</IonLabel>
                                </IonTabButton>
                            ))
                        }
                    </IonTabBar>

                </IonTabs>
            </IonReactRouter>
            <ToastContainer/>
        </IonApp>
    )
}

export default App