import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/userComponents/Header";
import Body from './src/components/userComponents/Body';
import UserProfile from "./src/components/userComponents/userProfile/userDetails";
import Cart from "./src/components/userComponents/cartComponents/cart";
import Footer from "./src/components/userComponents/footerComponents/Footer";
import About from "./src/components/userComponents/About";
import Signup from "./src/components/userComponents/loginComponents/signup";
import Login from "./src/components/userComponents/loginComponents/login";
import Error from "./src/components/userComponents/Error";
import AdminHeader from "./src/components/adminComponents/adminLayouts/header";
import AdminLogin from "./src/components/adminComponents/login";
import AdminLanding from "./src/components/adminComponents/adminLanding";
import Users from "./src/components/adminComponents/users";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import Contact from "./src/components/userComponents/Contact";
import RestaurantDetails from "./src/components/userComponents/restaurantDetails";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import './src/components/userComponents/app.css'
import { UserStatusContext } from "./src/constants/context";


const SwiggyHome = () => {
  return (
    <>
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
    </>
  );
};
const AdminHome = ()=>{
  const [updated,setUpdated] = useState(false)
  return(
    <>
    <UserStatusContext.Provider value = {{ updated, setUpdated }}>
    <AdminHeader />
    <Outlet/>
    </UserStatusContext.Provider>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<SwiggyHome />,
    errorElement:<Error />,
    children:[
      {
        path:'/',
        element:<Body />
      },
      {
        path:'about',
        element: <About />
      },
      {
        path:'contact',
        element:<Contact />
      },
      {
        path:'restaurant/:id',
        element: <RestaurantDetails />
      },
      {
        path:'user-info',
        element:<UserProfile />
      },
      {
        path:'my-cart',
        element:<Cart />
      },
      
    ]
  },
  {
    path:'/signup',
    element : <Signup />
  },
  {
    path:'/login',
    element:(<Provider store={store}><Login /></Provider>)
  },
  
  
  {
    path:'/admin',
    element:<AdminHome />,
    children:[
      {
        path:"/admin",
        element:<AdminLanding />
      },
      {
        path:'/admin/login',
        element:<AdminLogin />
      },
      {
        path:'/admin/users',
        element:<Users />
      }
    ]
  }
 
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
