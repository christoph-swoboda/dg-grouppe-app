import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {car, home, phonePortraitSharp, trainSharp, wifi} from 'ionicons/icons';
import Login from './pages/login';
import Dashboard from "./pages/dashboard";

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
import React from "react";
import Index from "./pages/profile";
import Phone from "./pages/phone";
import Train from "./pages/train";
import Car from "./pages/car";
import Internet from "./pages/internet";
import Information from "./pages/information";
import ThankYou from "./components/thankYou";
import {ToastContainer} from "react-toastify";
import UserProfile from "./pages/profile";

setupIonicReact();

const App = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/">
                            {user ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
                        </Route>
                        <Route path="/phone/:page">
                            {user ? <Phone/>: <Redirect to="/login"/>}
                        </Route>
                        <Route path="/train/:page">
                            {user ? <Train/>: <Redirect to="/login"/>}
                        </Route>
                        <Route path="/uploaded">
                            {user ? <ThankYou/>: <Redirect to="/login"/>}
                        </Route>
                        <Route path="/car/:page">
                            {user ? <Car/>: <Redirect to="/login"/>}
                        </Route>
                        <Route path="/internet/:page">
                            {user ? <Internet/>: <Redirect to="/login"/>}
                        </Route>
                        <Route path="/information">
                            {user ?  <Information/> : <Redirect to="/login"/>}
                        </Route>
                        <Route path="/login">
                            {!user ? <Login/> : <Redirect to="/dashboard"/>}
                        </Route>
                        <Route path="/dashboard">
                            {user ?  <Dashboard/> : <Redirect to="/login"/>}
                        </Route>
                        <Route path="/profile">
                            {user ?  <UserProfile/> : <Redirect to="/login"/>}
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="dashboard" href="/dashboard">
                            <IonIcon icon={home}/>
                            <IonLabel>Dashboard</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="internet" href="/internet/internet">
                            <IonIcon icon={wifi}/>
                            <IonLabel>Internet </IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="phone" href="/phone/phone">
                            <IonIcon icon={phonePortraitSharp}/>
                            <IonLabel>Phone</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="car" href="/car/car">
                            <IonIcon icon={car}/>
                            <IonLabel>Car </IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="mobile" href="/train/train">
                            <IonIcon icon={trainSharp}/>
                            <IonLabel>Train </IonLabel>
                        </IonTabButton>
                    </IonTabBar>

                </IonTabs>
            </IonReactRouter>
            <ToastContainer/>
        </IonApp>
    )
}

export default App