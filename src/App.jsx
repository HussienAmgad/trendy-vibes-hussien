// App.jsx
import React from 'react';
import './App.css';
import './loader.css';
import Layout from './components/Layout/Layout';
import Addproduct from './components/Addproduct';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/Home/Home';
import Editproduct from './components/EditProduct/EditProduct';
import Orders from './components/Orders/Orders';
import Oneorder from './components/Orders/Oneorder';

function App() {
  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          path: '/',
          element: (
            <Home />
          ),
        },
        {
          path: '/addproduct',
          element: (
            <Addproduct />
          ),
        },
        {
          path: '/editProduct',
          element: (
            <Editproduct />
          ),
        },
        {
          path: '/orders',
          element: (
            <Orders />
          ),
        },
        {
          path: '/oneorder',
          element: (
            <Oneorder />
          ),
        },
      ]
    }
  ]);

  return (
    <>
      <div>
        <RouterProvider router={routers} />
      </div>
    </>
  );
}

export default App;