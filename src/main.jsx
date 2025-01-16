import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewRoot from './components/NewRoot';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AuthProdiver from './components/AuthProvider/AuthProdiver';
import PrivateRoute from './components/PrivateRoute';
import ErrorPag from './components/ErrorPag';
import AllProduct from './components/SiamHetmet/AllProduct';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Invoice from './components/SiamHetmet/Invoice';
import InvoicePdf from './components/SiamHetmet/InvoicePdf';
import InvoiceHistory from './components/SiamHetmet/InvoiceHistory';
import AllClient from './components/SiamHetmet/AllClient';
import CilentProfile from './components/SiamHetmet/CilentProfile';
import SalesOverview from './components/SiamHetmet/SalesOverview';

// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <NewRoot></NewRoot>,  // Protect the root route
      errorElement: <ErrorPag></ErrorPag>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "products",
          element: <AllProduct></AllProduct>,  // Route for All Products
        },
        {
          path: "/clients",
          element: <AllClient></AllClient>,  // Route for All Products
        },
        {
          path: "invoice",
          element: <Invoice></Invoice> ,  // Route for All Products
        },
        {
          path: "invoicehistory",
          element: <InvoiceHistory></InvoiceHistory> ,  // Route for All Products
        },
        {
          path: "clientprofile/:clientId",
          element:<CilentProfile></CilentProfile> ,  // Route for All Products
        },
        {
          path: "overview",
          element:<SalesOverview></SalesOverview> ,  // Route for All Products
        },
       
      ],
    },
    {
      path: "invoice/:invoiceId",  // Dynamic Route for Invoice Details
      element: <InvoicePdf></InvoicePdf>,  // Fetch and display invoice by ID
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProdiver>  
        <RouterProvider router={router} />
      </AuthProdiver>
    </QueryClientProvider>
  </React.StrictMode>,
);
