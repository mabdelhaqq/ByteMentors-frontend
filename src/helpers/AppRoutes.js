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
import MyOpportunities from '../internal/internalContent/myOpportunities/MyOpportunities';
import AddOp from '../internal/internalContent/myOpportunities/addOpportunity/AddOp';
import OppDetails from '../internal/internalContent/myOpportunities/oppDetails/OppDetails';
import { OppProvider } from './OppContext';
import ResponsePage from '../internal/internalContent/myOpportunities/oppDetails/responsePage/ResponsePage';
import AllStudents from '../internal/internalContent/allStudents/AllStudents';
import AllCompanies from '../internal/internalContent/allCompanies/AllCompanies';
import AllOpportunities from '../internal/internalContent/allOpportunities/AllOpportunities';
import EditOp from '../internal/internalContent/myOpportunities/oppDetails/editOp/EditOp';
import Plans from '../internal/internalContent/plans/Plans';
import AddPlan from '../internal/internalContent/plans/addPlan/AddPlan';
import PlanDetails from '../internal/internalContent/plans/planDetails/PlanDetails';
import EditPlan from '../internal/internalContent/plans/planDetails/editPlan/EditPlan';
import PersonalCompanyN from '../internal/internalContent/personalCompanyN/PersonalCompanyN';
import PersonalStudentN from '../internal/internalContent/personalStudentN/PersonalStudentN';
import AddAdmin from '../internal/internalContent/settings/addAdmin/AddAdmin';
import Opportunities from '../internal/internalContent/opportunities/Opportunities';
import SelectedOpportunities from '../internal/internalContent/opportunities/selectedOpportunities/SelectedOpportunities';

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
        path: '/home/personalstudent/:studentId?',
        element: <Authorize roles={['company']}><PersonalStudent /></Authorize>,
      },
      {
        path: '/home/personalcomapny',
        element: <Authorize roles={['company']}><PersonalCompany /></Authorize>,
      },
      {
        path: '/home/personalcompany/:companyId?',
        element: <Authorize roles={['student', 'admin']}><PersonalStudent /></Authorize>,
      },
      {
        path: '/home/allstudent',
        element: <Authorize roles={['admin']}><AllStudents /></Authorize>,
      },
      {
        path: '/home/allcompanies',
        element: <Authorize roles={['admin']}><AllCompanies /></Authorize>,
      },
      {
        path: '/home/allopp',
        element: <Authorize roles={['admin']}><AllOpportunities /></Authorize>,
      },
      {
        path: '/home/myopp',
        element: <Authorize roles={['company']}><MyOpportunities /></Authorize>,
      },
      {
        path: '/home/allplans',
        element: <Authorize roles={['admin', 'student']}><Plans /></Authorize>,
      },
      {
        path: '/home/myopp/addop',
        element: (
          <Authorize roles={['company']}>
            <OppProvider>
              <AddOp />
            </OppProvider>
          </Authorize>
        ),
      },
      {
        path: '/home/addplan',
        element: (
          <Authorize roles={['admin']}><AddPlan /></Authorize>
        ),
      },
      {
        path: '/home/plans/:id',
        element: <Authorize roles={['admin', 'student']}><PlanDetails /></Authorize>,
      },
      {
        path: '/home/myopp/:id',
        element: <Authorize roles={['company', 'admin', 'student']}><OppDetails /></Authorize>,
      },
      {
        path: '/home/selected',
        element: <Authorize roles={['student']}><SelectedOpportunities /></Authorize>,
      },
      {
        path: '/home/personalcompanyn/:id',
        element: <Authorize roles={['student', 'admin']}><PersonalCompanyN /></Authorize>,
      },
      {
        path: '/home/personalstudentn/:id',
        element: <Authorize roles={['company', 'admin']}><PersonalStudentN/></Authorize>,
      },
      {
        path: '/home/addadmin',
        element: <Authorize roles={['admin']}><AddAdmin/></Authorize>,
      },
      {
        path: '/home/myopp/editop/:id',
        element: (
          <Authorize roles={['company']}>
            <OppProvider>
              <EditOp />
            </OppProvider>
          </Authorize>
        ),
      },
      {
        path: '/home/allplans/edit/:id',
        element: <Authorize roles={['admin']}><EditPlan /></Authorize>,
      },
      {
        path: '/home/myopp/response/:id',
        element: <Authorize roles={['company']}><ResponsePage /></Authorize>,
      },
    
      {
        path: '/home/opp',
        element: <Authorize roles={['student']}><Opportunities /></Authorize>,
      },
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
