import { lazy } from "react";
import { RouteObject } from "react-router-dom";
// import AllHome from "../Home/AllHome";
// import AllAbout from "../About/AllAbout";
// import AllFirstAid from "../FirstAid/AllFirstAid";
// import AllProduct from "../Products/AllProduct";
// import AllBlog from "../Blog/AllBlog";
// import AllContact from "../Contact/AllContact";
import Headerr from "../layout/Headerr";
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

export const routes: RouteObject[] = [
    // {
    //   path: "/login",
    //   element: <Login></Login>
    // },
    {
        path: "/", element: <Headerr></Headerr>,
        children: [
            { path: "/home", element: <AllHome></AllHome> },
            
            { path: "/about_us", element: <AllAbout></AllAbout> },
            { path: "/first_aid", element: <AllFirstAid></AllFirstAid> },
            { path: "/products", element: <AllProduct></AllProduct> },
            { path: "/blog", element: <AllBlog></AllBlog> },
            { path: "/contact", element: <AllContact></AllContact> }
        ]
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
