import React, { useState, useEffect } from "react";

//page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";

//Layout
import Navbar from "./components/layouts/Navbar";

// V.6
import { Routes, Route } from "react-router-dom";

// pages admin
import HomeAdmin from './components/pages/admin/Home';
import MangeAdmin from './components/pages/admin/MangeAdmin';
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCatrgory from "./components/pages/admin/category/UpdateCatrgory";
import CreateProduct from "./components/pages/admin/product/CreateProduct"
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";

// pages user
import HomeUser from './components/pages/user/Home';

//function
import { currentUser } from "./components/functions/auth";

//redux
import { useDispatch } from 'react-redux';

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

//react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err);
      });
  }


  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/index" element={
          <AdminRoute>
            <HomeAdmin />
          </AdminRoute>}
        />

        <Route path="/admin/mange-admin" element={
          <AdminRoute>
            <MangeAdmin />
          </AdminRoute>}
        />

        <Route path="/admin/create-category" element={
          <AdminRoute>
            <CreateCategory />
          </AdminRoute>}
        />

        <Route path="/admin/update-category/:id" element={
          <AdminRoute>
            <UpdateCatrgory />
          </AdminRoute>}
        />

        <Route path="/admin/create-product" element={
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>}
        />

        <Route path="/admin/update-product/:id" element={
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>}
        />

        <Route path="/user/index" element={
          <UserRoute>
            <HomeUser />
          </UserRoute>

        } />
      </Routes>
    </div>
  );
}

export default App;
