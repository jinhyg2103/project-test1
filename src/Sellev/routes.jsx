// Pages
import RootPage from './Containers/Root';

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
        path: '/auth',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/fundingmarket',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/hashtag',
        exact: false,
        strict: false,
        component: RootPage,
    },
    {
        path: '/mypage',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/payment',
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
        path: '/sellever',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/video',
        exact: false,
        strict: false,
        component: RootPage,
    },
];
export default routes;
