import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewRoot from './components/NewRoot';
import Home from './components/Home';

import MyCart from './components/MyCart';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Register from './components/Register';
import AuthProdiver from './components/AuthProvider/AuthProdiver';
import PrivateRoute from './components/PrivateRoute';
import CollectionCard from './components/CollectionCard';
import Details from './components/Details';
import UpdateData from './components/UpdateData';
import ErrorPag from './components/ErrorPag';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewRoot></NewRoot>,
    errorElement:<ErrorPag></ErrorPag>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        
      },
      {
        path: "/addProduct",
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute> ,
        
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart></MyCart></PrivateRoute> ,
        loader:()=> fetch('http://localhost:5000/cartId'),
        
      },
      {
        path: "/login",
        element: <Login></Login>,
        
      },
      {
        path: "/register",
        element: <Register></Register>,
        
      },
      {
        path: "/collection/:title",
        element: <CollectionCard></CollectionCard>,
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader:()=> fetch('http://localhost:5000/users'),
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdateData></UpdateData></PrivateRoute>,
        loader:({params})=> fetch(`http://localhost:5000/users/${params.id}`),
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProdiver>  <RouterProvider router={router} /></AuthProdiver>
  </React.StrictMode>,
)
