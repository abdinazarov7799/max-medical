import React, {lazy, Suspense, useEffect} from "react";
import {useTelegram} from "../hooks/useTelegram.jsx";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// LAYOUTS
const DashboardLayout = lazy(() => import("../layouts/dashboard/DashboardLayout.jsx"));
const AuthLayout = lazy(() => import("../layouts/auth/AuthLayout.jsx"));
// LAYOUTS

// AUTH
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"));
// AUTH

// 404
const NotFoundPage = lazy(() => import("../modules/auth/pages/NotFoundPage"));
// 404

// PAGES
import OverlayLoader from "../components/OverlayLoader.jsx";
import MedicinesPage from "../modules/medicines/pages/MedicinesPage.jsx";
const UsersPage = lazy(() => import("../modules/users/pages/UsersPage.jsx"));
const PharmacyAddPage = lazy(() => import("../modules/pharmacy-add/pages/PharmacyAddPage.jsx"));
const DoctorAddAgreementPage = lazy(() => import("../modules/doctor-add-agreement/pages/DoctorAddAgreementPage.jsx"));
// PAGES


const Router = () => {
  const {tg} = useTelegram();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <Routes>
            <Route path={"/"} element={<DashboardLayout />}>
              <Route
                  path={"/medicines"}
                  element={<MedicinesPage />}
              />
              <Route
                  path={"/users"}
                  element={<UsersPage />}
              />
              <Route
                  path={"auth/*"}
                  element={<Navigate to={"/users"} replace />}
              />
              <Route
                  path={"/"}
                  element={<Navigate to={"/users"} replace />}
              />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route
                path={"/pharmacy-add/:userId"}
                element={<PharmacyAddPage />}
            />
            <Route
                path={"/doctor-add-agreement/:userId"}
                element={<DoctorAddAgreementPage />}
            />
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
