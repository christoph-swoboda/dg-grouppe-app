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
import {
    browsers,
    car,
    home,
    informationCircle,
    logoChrome,
    logoWebComponent,
    phonePortraitSharp,
    trainSharp, wifi
} from 'ionicons/icons';
import Login from './pages/login';
import Tab3 from './pages/Tab3';
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
import UserProfile from "./components/userProfile";

setupIonicReact();

const App = () => {

    // const user = JSON.parse(localStorage.getItem('user'));
    const user='user name'

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/">
                            {user? <Redirect to="/dashboard"/> : <Redirect to="/login" />}
                        </Route>
                        <Route  path="/phone">
                            <Dashboard />
                        </Route>
                        <Route  path="/train">
                            <Tab3 />
                        </Route>
                        <Route path="/car">
                            <Tab3 />
                        </Route>
                        <Route path="/info">
                            <Tab3 />
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard/>
                        </Route>
                        <Route path="/profile">
                            <UserProfile/>
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="dashboard" href="/dashboard">
                            <IonIcon icon={home} />
                            <IonLabel>Dashboard</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/info">
                            <IonIcon icon={wifi} />
                            <IonLabel>Internet </IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/mobile">
                            <IonIcon icon={phonePortraitSharp} />
                            <IonLabel>Mobile</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/car">
                            <IonIcon icon={car} />
                            <IonLabel>Car </IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/train">
                            <IonIcon icon={trainSharp} />
                            <IonLabel>Train </IonLabel>
                        </IonTabButton>
                    </IonTabBar>

                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
}

export default App