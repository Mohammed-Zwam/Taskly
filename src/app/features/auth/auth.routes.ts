import { ForgetPassword } from "./pages/forget-password/forget-password";
import { Login } from "./pages/login/login";
import { ResetPassword } from "./pages/reset-password/reset-password";
import { SignUp } from "./pages/sign-up/sign-up";

export const authRoutes = [
    {
        path: 'sign-up',
        component: SignUp,
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'forget-password',
        component: ForgetPassword,
    },
    {
        path: 'reset-password',
        component: ResetPassword,
    }
];
