import DashboardIcon from "../assets/icons/dashboardIcon";
import PhoneIcon from "../assets/icons/phoneIcon";
import InternetIcon from "../assets/icons/internetIcon";
import CarIcon from "../assets/icons/carIcon";
import TrainIcon from "../assets/icons/trainIcon";

export const NavLinks=[
    {
        id:0,
        path:'/dashboard',
        name:'armaturenbrett',
        icon:<DashboardIcon/>
    },
    {
        id:1,
        path:'/internet/internet',
        name:'internet',
        icon:<InternetIcon/>
    },
    {
        id:2,
        path:'/phone/phone',
        name:'telefono',
        icon:<PhoneIcon/>
    },
    {
        id:3,
        path:'/car/car',
        name:'wagen',
        icon:<CarIcon/>
    },
    {
        id:4,
        path:'/train/train',
        name:'zug',
        icon:<TrainIcon/>
    }
]