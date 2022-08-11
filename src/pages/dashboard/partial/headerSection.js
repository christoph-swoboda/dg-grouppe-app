import React from "react";
import {Link} from "react-router-dom";
import {IonAvatar, IonCard, IonCardSubtitle, IonText, IonToolbar} from "@ionic/react";
import NotificationIcon from "../../../assets/icons/notificationIcon";
import InfoIcon from "../../../assets/icons/infoIcon";
import {useStateValue} from "../../../states/StateProvider";

const HeaderSection = ({notifications, user, loadingUser, filter, backend}) => {

    const [{}, dispatch] = useStateValue()

    return (
        <IonCard className='header ion-no-margin'>
            <IonCard className='userInfo ion-no-margin'>
                <Link to='/profile'>
                    <IonAvatar>
                        <img src={`${backend}/${user?.employees?.image}`} alt='avatar'/>
                    </IonAvatar>
                </Link>
                <IonCard style={{paddingLeft: '10px'}} className={'ion-no-margin ion-no-padding'}>
                    {
                        loadingUser && filter.page === 1 ?
                            <IonToolbar style={{textAlign: 'center'}}>
                                Username
                            </IonToolbar>
                            :
                            <IonText style={{fontSize: '21px'}}
                                     className={'ion-text-xl-left '}>{user?.employees?.first_name}</IonText>
                    }
                    <IonCardSubtitle>{user?.employees?.company}</IonCardSubtitle>
                </IonCard>
            </IonCard>

            <div className='notification'>
                <IonCard hidden={notifications?.length < 1} className='ion-badge'
                         onClick={() => dispatch({type: "SET_SHOWMODAL", item: true})}
                         color="dark">
                    <IonCardSubtitle>
                        {notifications?.length}
                    </IonCardSubtitle>
                </IonCard>
                <span onClick={() => dispatch({type: "SET_SHOWMODAL", item: true})}>
                    <NotificationIcon/>
                </span>
                <Link to='/information'>
                    <InfoIcon/>
                </Link>
            </div>
        </IonCard>
    )
}

export default HeaderSection