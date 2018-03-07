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
];
export default routes;
