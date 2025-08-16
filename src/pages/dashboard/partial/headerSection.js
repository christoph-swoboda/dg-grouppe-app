import React from "react";
import {Link} from "react-router-dom";
import {IonAvatar, IonCard, IonCardSubtitle, IonText, IonToolbar} from "@ionic/react";
import NotificationIcon from "../../../assets/icons/notificationIcon";
import InfoIcon from "../../../assets/icons/infoIcon";
import {useStateValue} from "../../../states/StateProvider";
import image from '../../../assets/avatar.png'

const HeaderSection = ({notifications, user, loadingUser, filter, backend}) => {

    const [{avatar}, dispatch] = useStateValue()

    return (
        <IonCard className='header ion-no-margin'>
            <IonCard className='userInfo ion-no-margin'>
                <Link to='/profile'>
                    {
                        !avatar && !user?.employees?.image?
                            <IonAvatar>
                                <img src={image} alt='avatar'/>
                            </IonAvatar>
                            :
                            <IonAvatar>
                                <img src={ avatar? avatar:`${backend}/${user?.employees?.image}`} alt='avatar'/>
                            </IonAvatar>
                    }
                </Link>
                <IonCard className={'ion-no-margin ion-no-padding userInfo-card'}>
                    {
                        loadingUser && filter.page === 1 ?
                            <IonToolbar className={'username-toolbar'}>
                                Username
                            </IonToolbar>
                            :
                            <IonText
                                     className={'ion-text-xl-left username-text'}>{user?.employees?.first_name}</IonText>
                    }
                    <IonCardSubtitle>{user?.employees?.company}</IonCardSubtitle>
                </IonCard>
            </IonCard>

            <div className='notification'>
                {
                    notifications?.length > 0 &&
                    <IonCard className='ion-badge'
                             onClick={() => dispatch({type: "SET_SHOWMODAL", item: true})}
                             color="dark">
                        <IonCardSubtitle>
                            {notifications?.length}
                        </IonCardSubtitle>
                    </IonCard>
                }
                <span onClick={() => dispatch({type: "SET_SHOWMODAL", item: true})}>
                    <NotificationIcon/>
                </span>
                <Link to='/information' className='info-icon-link'>
                    <InfoIcon/>
                </Link>
            </div>
        </IonCard>
    )
}

export default HeaderSection