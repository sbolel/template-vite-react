/**
 * Component that renders all routes in the application.
 * @module router/router
 * @see {@link dashboard/main} for usage.
 */
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import routeConfig from '@/router/routeConfig'

/**
 * The browser router that defines routes and loaders.
 * @type {React.ComponentType} router - The browser router
 * @see {@link https://reactrouter.com/web/api/BrowserRouter BrowserRouter}
 * @see {@link https://reactrouter.com/en/main/route/loader loader}
 */
const router = createBrowserRouter(createRoutesFromElements(routeConfig))

export default router
