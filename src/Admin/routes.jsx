// Pages
import RootPage from './Container/Root';

// React
import store from './store';

const routes = [
    {
        path: '/admin',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/user',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/house',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/sms',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/push',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/report',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/admin/gps',
        exact: true,
        strict: false,
        component: RootPage,
    },
];
export default routes;
