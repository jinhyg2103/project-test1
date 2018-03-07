// Pages
import RootPage from './Layout/Root';

// React
import store from './store';

const routes = [
    {
        path: '/',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/search',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/chat',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/request',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/favorite',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/myHouses',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/policies',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/house',
        strict: false,
        component: RootPage,
    },
    {
        path: '/find/house',
        strict: false,
        component: RootPage,
    },
    {
        path: '/agency',
        strict: false,
        component: RootPage,
    },
    {
        path: '/user',
        strict: false,
        component: RootPage,
    },
    {
        path: '/form',
        exact: false,
        strict: false,
        component: RootPage,
    },
];
export default routes;
