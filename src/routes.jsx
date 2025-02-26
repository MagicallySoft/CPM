import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import { BASE_URL } from './config/constant';
import PrivateRoute from './contexts/PrivateRoute'; // <-- import PrivateRoute

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        // If allowedRoles is provided, wrap the element with PrivateRoute.
        const RouteComponent = route.allowedRoles ? (
          <PrivateRoute element={<Element />} allowedRoles={route.allowedRoles} />
        ) : (
          <Element />
        );

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : RouteComponent}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    // Public route
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    // Public route
    path: '/register',
    element: lazy(() => import('./views/auth/signup/SignUp'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        // Protected route with role authorization.
        path: '/',
        element: lazy(() => import('./views/dashboard/index')),
        allowedRoles: [ 'admin','employee', 'superadmin', 'subadmin']
      },
      {
        path: '/customerlist',
        // Uncomment and add allowedRoles if needed:
        element: lazy(() => import('./views/customer/list/customerList')),
        allowedRoles: [ 'admin','employee', 'superadmin', 'subadmin']
      },
      {
        path: '/reminder',
        // Uncomment and add allowedRoles if needed:
        element: lazy(() => import('./components/customer/reminderList')),
        allowedRoles: [ 'admin','employee', 'superadmin', 'subadmin']
      },
      {
        path: '/addcustomer',
        // Uncomment and add allowedRoles if needed:
        element: lazy(() => import('./components/customerForm/ClientForm')),
        allowedRoles: [ 'admin', 'superadmin', 'subadmin']
      },
      {
        path: '/adminform',
        // Uncomment and add allowedRoles if needed:
        element: lazy(() => import('./components/customerForm/AdminCustomFieldsList')),
        allowedRoles: [ 'admin']
      },
      // {
      //   // Fallback route; no role-based check here.
      //   path: '*',
      //   element: <Navigate to={BASE_URL} />
      // }
    ]
  }
];

export default routes;
