import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import ExternalLayout from '../external/externalLayout/ExternalLayout';
import MainPage from '../external/externalContent/main/MainPage';
import Why from '../external/externalContent/why/Why';
import About from '../external/externalContent/about/About';
import Learn from '../external/externalContent/learn/Learn';
import Help from '../external/externalContent/help/Help';
import QAndA from '../external/externalContent/qanda/QandA';
import AuthLayout from '../auth/authLayout/AuthLayout';
import Login from '../auth/authContent/login/Login';
import ForgetEmail from '../auth/authContent/forgetPassword/forgetEmail/ForgetEmail';
import Option from '../auth/authContent/option/Option';
import Registers from '../auth/authContent/registerStudent/Registers';
import Registerc from '../auth/authContent/registerCompany/Registerc';
import InternalLayout from '../internal/internalLayout/InternalLayout';
import MainInternalPage from '../internal/internalContent/mainInternalPage/MainInternalPage';
import PersonalStudent from '../internal/internalContent/personalStudent/PersonalStudent';
import PersonalCompany from '../internal/internalContent/personalCompany/PersonalCompany';
import Settings from '../internal/internalContent/settings/Settings';
import Companies from '../internal/internalContent/companies/Companies';
import Authorize from './Authorize';
import CompanyDetails from '../internal/internalContent/companyDetails/CompanyDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExternalLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/why', element: <Why /> },
      { path: '/about', element: <About /> },
      { path: '/learn', element: <Learn /> },
      { path: '/help', element: <Help /> },
      { path: '/QA', element: <QAndA/> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { path: '/login/', element: <Login /> },
      { path: '/login/forgetemail', element: <ForgetEmail /> },
      { path: '/login/option', element: <Option /> },
      { path: '/login/option/registers', element: <Registers/> },
      { path: '/login/option/registerc', element: <Registerc/> },
    ],
  },
  {
    path: '/home',
    element: <InternalLayout />,
    children: [
      {
        path: '/home/',
        element: <MainInternalPage />,
      },
      {
        path: '/home/personalstudent',
        element: <Authorize roles={['student']}><PersonalStudent /></Authorize>,
      },
      {
        path: '/home/personalcomapny',
        element: <Authorize roles={['company']}><PersonalCompany /></Authorize>,
      },
      // {
      //   path: '/opp',
      //   element: <Authorize roles={['student']}><TrainingOpportunities /></Authorize>,
      // },
      // {
      //   path: '/myopp',
      //   element: <Authorize roles={['company']}><MyOpportunities /></Authorize>,
      // },
      {
        path: '/home/companies',
        element: <Authorize roles={['student']}><Companies /></Authorize>,
      },
      {
        path: '/home/companies/:companyId',
        element: <Authorize roles={['student']}><CompanyDetails /></Authorize>,
      },

      // {
      //   path: '/plans',
      //   element: <Authorize roles={['student']}><TrainingPlans /></Authorize>,
      // },
      {
        path: '/home/settings',
        element: <Settings />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router}><Routes>{router}</Routes></RouterProvider>;
};

export default AppRoutes;
