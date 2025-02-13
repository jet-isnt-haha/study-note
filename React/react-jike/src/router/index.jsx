import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/Layout/Home";
import Article from "@/pages/Layout/Article";
import Publish from "@/pages/Layout/Publish";
import { lazy, Suspense } from "react";


const Home=lazy(()=>import('@/pages/Layout/Home'))
const Article=lazy(()=>import('@/pages/Layout/Article'))
const Publish=lazy(()=>import('@/pages/Layout/Publish'))
const router =createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>,
        children:[
            {
                index:true,
                element:<Suspense fallback={'加载中'}><Home/></Suspense>
            },
            {
                path:'/article',
                element:<Suspense fallback={'加载中'}><Article/></Suspense>
            },
            {
                path:'publish',
                element:<Suspense fallback={'加载中'}><Publish/></Suspense>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    }
])

export default router
