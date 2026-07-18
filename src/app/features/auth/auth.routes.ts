import { Login } from "./pages/login/login";
import { SignUp } from "./pages/sign-up/sign-up";

export const authRoutes = [
    {
        path: 'sign-up',
        component: SignUp,
    },
    {
        path: 'login',
        component: Login,
    }
];
