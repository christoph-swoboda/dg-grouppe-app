import DashboardIcon from "../assets/icons/dashboardIcon";
import PhoneIcon from "../assets/icons/phoneIcon";
import InternetIcon from "../assets/icons/internetIcon";
import CarIcon from "../assets/icons/carIcon";
import TrainIcon from "../assets/icons/trainIcon";

export const NavLinks=[
    {
        id:0,
        path:'/dashboard',
        name:'Übersicht',
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
        path:'/Telefon/Telefon',
        name:'Telefon',
        icon:<PhoneIcon/>
    },
    {
        id:3,
        path:'/PKW/PKW',
        name:'PKW',
        icon:<CarIcon/>
    },
    {
        id:4,
        path:'/bahn/bahn',
        name:'Bahn',
        icon:<TrainIcon/>
    }
]