"use client"
import { sendLoginRequest } from "@/api/auth/route";
import IManager from "@/model/IManager";
import IUser from "@/model/IUser";
import { createContext, useState } from "react";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthResponse {
    data: any;
    response: Response;
};

export interface IAuthContext {
    authenticated: boolean;
    user: IUser | IManager |null;
    loading: boolean;
    login: (username: string, password: string) => Promise<IAuthResponse>;
    //register: (userName: string, email: string, password: string) => Promise<IAuthResponse>;
    //logout: () => void;
    token: string | null;
    //authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export const AuthProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        const response = await sendLoginRequest(username, password)
        const data = await response.json()
        if (response.ok && data.success) {
            localStorage.setItem("token", data.token);
            //const userData = await getUser(data.token);
            //console.log(userData);
            //if (userData) {
                //setUser(userData);
            console.log(data.token)
            setToken(data.token);
            //}
        }
        return {response, data};
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, login, loading, token}}>
            {loading ? <p>Loading</p> : children}
        </AuthContext.Provider>
    )
}