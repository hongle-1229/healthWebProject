import { lazy } from "react";
import { RouteObject } from "react-router-dom";
// import AllHome from "../Home/AllHome";
// import AllAbout from "../About/AllAbout";
// import AllFirstAid from "../FirstAid/AllFirstAid";
// import AllProduct from "../Products/AllProduct";
// import AllBlog from "../Blog/AllBlog";
// import AllContact from "../Contact/AllContact";
import Headerr from "../layout/Headerr";
import DetailProduct from "../Products/DetailProduct";
import Dashboard from "../Admin/Dashboard";
import QuizDemo from "../TestCheck/QuizDemo";
import IntroTest from "../TestCheck/IntroTest";
// import { Navigate } from "react-router-dom";
// import Dashboard from "../Home/Dashboard";

// kiem tra dang nhap
// const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

// Lazy load các trang con để tối ưu hiệu suất
// const Login = lazy(() => import("../Log/Login"));
const AllHome = lazy(() => import("../Home/AllHome"));
const AllProduct = lazy(() => import("../Products/AllProduct"));
const AllFirstAid = lazy(() => import("../FirstAid/AllFirstAid"));
const AllBlog = lazy(() => import("../Blog/AllBlog"));
const AllContact = lazy(() => import("../Contact/AllContact"));
const AllAbout = lazy(()=> import ("../About/AllAbout"));
const Profile = lazy(()=> import ("../profile/Profile"));
const Register = lazy(() => import ("../Log/Register"));
const Cart = lazy(()=> import ("../MyCart/Cart"));
const Model = lazy(() => import("../Model/Model"));
const HomeDashboard = lazy(()=> import ("../Admin/HomeDashboard"));
const MangageUser = lazy(()=> import("../Admin/ManageUser"));
const ManageBlog = lazy(()=> import("../Admin/ManageBlog"));
const ManageProduct = lazy(()=> import ("../Admin/ManageProduct"));
const ManageFirstAid = lazy(()=> import ("../Admin/ManageFirstAid"));
const Account = lazy(()=> import("../Admin/Account"));

export const routes: RouteObject[] = [
    // {
    //   path: "/login",
    //   element: <Login></Login>
    // },
    { path: "/profile", element: <Profile></Profile>},
    { path: "/login", element: <Register></Register>},
    { 
        path: "/dashboard", element: <Dashboard></Dashboard>,
        children:[
            { path:"", element: <HomeDashboard></HomeDashboard>},
            { path: "dashboard/manage-user", element: <MangageUser></MangageUser>},
            { path: "dashboard/manage-blog", element: <ManageBlog></ManageBlog>},
            { path: "dashboard/manage-product", element: <ManageProduct></ManageProduct>},
            { path: "dashboard/manage-first-aid", element: <ManageFirstAid></ManageFirstAid>},
            { path: "dashboard/account", element: <Account></Account>}
        ]
    },
    {
        path: "/", element: <Headerr></Headerr>,
        children: [
            { index: true, element: <AllHome></AllHome>},
            { path: "/home", element: <AllHome></AllHome> },
            { path: "/about_us", element: <AllAbout></AllAbout> },
            { path: "/first_aid", element: <AllFirstAid></AllFirstAid> },
            { path: "/products", element: <AllProduct></AllProduct> },
            { path: "/product_detail/:id", element: <DetailProduct></DetailProduct>},
            { path: "/intro-test", element: <IntroTest></IntroTest>},
            { path: "/quizdemo/:testId", element: <QuizDemo></QuizDemo>},
            { path: "/blog", element: <AllBlog></AllBlog> },
            { path: "/contact", element: <AllContact></AllContact> },
            { path: "/cart", element: <Cart></Cart>},
            { path: "/body", element: <Model></Model>}
        ],
    }
    // element: isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace></Navigate>,
    // element: <Dashboard></Dashboard>,
    // children: [
    //   { path: "", element: <Home /> },
    //   { path: "device-data", element: <DeviceData /> },
    //   { path: "activity-history", element: <ActivityHistory /> },
    //   { path: "profile", element: <Profile /> },
    // ],
    // {
    //   path: "*",
    //   element: <Navigate to="/login" replace></Navigate>
    // }
];
