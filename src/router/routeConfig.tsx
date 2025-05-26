/**
 * Centralized route configuration for the application.
 * @module router/routeConfig
 */
import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'
import NavigateToSignIn from '@/components/react-router/NavigateToSignIn'
import RootProvider from '@/Root'
import AppLayout from '@/layouts/AppLayout/AppLayout'
import authLoader from '@/router/authLoader'
import dashboardLoader from '@/views/Dashboard/Dashboard.loader'
import configureCognito from '@/utils/configureCognito'
import { RouteIds, Routes } from '@/router/constants'
import Fallback from '@/components/SimpleLoadingFallback'

const SignIn = lazy(() => import('@/views/SignIn/SignIn'))
const SignOut = lazy(() => import('@/views/SignOut/SignOut'))
const Dashboard = lazy(() => import('@/views/Dashboard/Dashboard'))

const routeConfig = (
  <>
    <Route
      id={RouteIds.ROOT}
      path={Routes.ROOT}
      element={<RootProvider />}
      loader={configureCognito}
      errorElement={<ErrorBoundary />}
    >
      <Route index element={<NavigateToSignIn />} />
      <Route
        id={RouteIds.AUTH}
        path={Routes.AUTH}
        errorElement={<ErrorBoundary />}
      >
        <Route
          id={RouteIds.LOGIN}
          path={RouteIds.LOGIN}
          element={
            <Suspense fallback={<Fallback />}>
              <SignIn />
            </Suspense>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          id={RouteIds.LOGOUT}
          path={RouteIds.LOGOUT}
          element={
            <Suspense fallback={<Fallback />}>
              <SignOut />
            </Suspense>
          }
          errorElement={<ErrorBoundary />}
        />
      </Route>
      <Route
        id={RouteIds.PROTECTED}
        path={Routes.DASHBOARD}
        element={<AppLayout />}
        loader={authLoader}
        errorElement={<ErrorBoundary />}
      >
        <Route
          index
          id={RouteIds.DASHBOARD}
          element={
            <Suspense fallback={<Fallback />}>
              <Dashboard />
            </Suspense>
          }
          loader={dashboardLoader}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    </Route>
    <Route path="*" element={<NavigateToSignIn />} />
  </>
)

export default routeConfig
