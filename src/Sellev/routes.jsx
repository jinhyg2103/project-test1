// Pages
import RootPage from './Component/App/index';

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
