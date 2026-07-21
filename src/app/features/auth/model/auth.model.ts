export type SignupRequest = {
    email: string;
    password: string;
    data: {
        name: string;
        department: string;
    }
}


export type LoginRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type AuthResponse = {
    access_token: string;
    refresh_token: string;
    user: {
        user_metadata: {
            department: string;
            name: string;
            email: string;
            sub: string;
        }
    }
}

export type User = {
    id: string;
    name: string;
    email: string;
    department: string;
}