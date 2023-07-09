import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import AttendancePage from './pages/AttendancePage';
import ResultPage from './pages/ResultPage';
import Protected from './components/Protected';

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/result" />, index: true },
        { path: 'result', element: <Protected title='result'><ResultPage/></Protected>},
        { path: 'attendance', element: <Protected title='attendance'><AttendancePage/></Protected> },
      ],
    },
    {
      path: 'login',
      element: <Protected title='login'><LoginPage /></Protected>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/result" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
