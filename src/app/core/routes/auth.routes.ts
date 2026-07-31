import { ForgetPassword } from "../../features/auth/pages/forget-password/forget-password";
import { Login } from "../../features/auth/pages/login/login";
import { ResetPassword } from "../../features/auth/pages/reset-password/reset-password";
import { SignUp } from "../../features/auth/pages/sign-up/sign-up";


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
