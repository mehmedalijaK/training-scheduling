"use client"
import { sendGetMyselfManager, sendGetMyselfUser, sendLoginRequestManager, sendLoginRequestUser } from "@/api/auth/route";
import IManager from "@/model/IManager";
import IUser from "@/model/IUser";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthResponse {
    data: any;
    response: Response;
};

export interface IAuthContext {
    authenticated: boolean;
    user: IUser | IManager |null;
    loading: boolean;
    loginUser: (username: string, password: string) => Promise<IAuthResponse>;
    loginManager: (username: string, password: string) => Promise<IAuthResponse>;
    //register: (userName: string, email: string, password: string) => Promise<IAuthResponse>;
    logout: () => void;
    token: string | null;
    //authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export const AuthProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const getUser = async (token: string) => {
        const response = await sendGetMyselfUser(token);
        if (response.ok) {
            const user = (await response.json());
            console.log(user)
            user.token = token;
            return user;
        }
        return null;
    }

    
    const getManager = async (token: string) => {
        const response = await sendGetMyselfManager(token);
        if (response.ok) {
            const user = (await response.json());
            user.token = token;
            return user;
        }
        return null;
    }

    const loginUser = async (username: string, password: string) => {
        const response = await sendLoginRequestUser(username, password)
        const data = await response.json()

        if (response.ok && data) {
            localStorage.setItem("token", data.access_token);
            const userData = await getUser(data.access_token);
            console.log(userData);
            alert(userData)
            if (userData) {
                setUser(userData);
            console.log(data.access_token)
            setToken(data.access_token);
            }
        }
        return {response, data};
    }

    const loginManager = async (username: string, password: string) => {
        const response = await sendLoginRequestManager(username, password)
        const data = await response.json()
        if (response.ok && data.success) {
            localStorage.setItem("token", data.token);
            const userData = await getManager(data.token);
            console.log(userData);
            if (userData) {
                setUser(userData);
            console.log(data.token)
            setToken(data.token);
            }
        }
        return {response, data};
    }

    useEffect(() => {

        const doStuff = async () => {
            const lsToken = localStorage.getItem("token");
            setToken(lsToken);
            if (lsToken) {
                const userData = await getUser(lsToken);
                if (userData) {
                    setLoading(false);
                    setUser(userData);
                }
            }
            setLoading(false);
        };

        doStuff().then(() => {
        });
    }, []);

    const logout = (): void => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loginUser, loginManager, loading, token, logout}}>
            {loading ? <p>Loading</p> : children}
        </AuthContext.Provider>
    )
}

export const ProtectedRoute = ({children}: { children: JSX.Element | JSX.Element[] }) => {
    const {authenticated} = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!authenticated)
            router.push("/login");
    }, [authenticated]);

    return children;
};

export default AuthContext;