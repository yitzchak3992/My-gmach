import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/navigation components/Header";
import AddGmach from "../pages/AddGmach";
import HandleGmach from "../pages/handleGmach";
import MyGmach from "../pages/MyGmach";
import EditPage from "../components/Management components/EditPage";
import AdminReportsPage from "../pages/AdminReportsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/My-Gmach" />} />
        <Route path="/My-Gmach" element={<MyGmach />} />
        <Route path="/addGmach" element={<AddGmach />} />
        <Route path="/handleGmach" element={<HandleGmach />} />
        <Route path="/EditPage" element={<EditPage />} />
        <Route path="/AdminReportsPage" element={<AdminReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
