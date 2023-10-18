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

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewRoot></NewRoot>,
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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProdiver>  <RouterProvider router={router} /></AuthProdiver>
  </React.StrictMode>,
)
