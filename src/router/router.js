import Dashboard from "../pages/dashboard";
import Phone from "../pages/phone";
import Car from "../pages/car";
import Internet from "../pages/internet";
import Train from "../pages/train";
import ThankYou from "../pages/imageUploadFinished/thankYou";
import Preview from "../components/preview";
import Information from "../pages/information";
import Login from "../pages/login";
import UserProfile from "../pages/profile";

export const Routes=[
    {
        id:0,
        path:'/dashboard',
        name:'home',
        component:<Dashboard/>
    },
    {
        id:1,
        path:'/Telefon/:page',
        name:'phone',
        component:<Phone/>
    },
    {
        id:2,
        path:'/PKW/:page',
        name:'car',
        component:<Car/>
    },
    {
        id:3,
        path:'/internet/:page',
        name:'internet',
        component:<Internet/>
    },
    {
        id:4,
        path:'/bahn/:page',
        name:'train',
        component:<Train/>
    },
    {
        id:5,
        path:'/uploaded',
        name:'uploaded',
        component:<ThankYou/>
    },
    {
        id:6,
        path:'/preview',
        name:'preview',
        component:<Preview/>
    },
    {
        id:7,
        path:'/information',
        name:'information',
        component:<Information/>
    },
    {
        id:8,
        path:'/login',
        name:'login',
        component:<Login/>
    },
    {
        id:9,
        path:'/profile',
        name:'profile',
        component:<UserProfile/>
    }

]