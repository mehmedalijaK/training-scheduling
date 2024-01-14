"use client"
import { sendEditAdminRequest, sendEditManagerRequest, sendEditUserRequest, sendGetMyselfAdmin, sendGetMyselfManager, sendGetMyselfUser, sendLoginRequestAdmin, sendLoginRequestManager, sendLoginRequestUser, sendRegisterRequestManager, sendRegisterRequestUser } from "@/api/auth/route";
import IAdmin from "@/model/IAdmin";
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
    user: IUser | IManager | IAdmin | null;
    loading: boolean;
    role: UserRole;
    loginUser: (username: string, password: string) => Promise<IAuthResponse>;
    loginManager: (username: string, password: string) => Promise<IAuthResponse>;
    loginAdmin: (username: string, password: string) => Promise<IAuthResponse>;
    registerUser: (username: string, password: string,
        email: string, dateBirth: Date, name: string, lastName: string) => Promise<Response>;
    registerManager: (username: string, password: string,
            email: string, dateBirth: Date, name: string, lastName: string, sportsHall: string, dateEmployment: Date) => Promise<Response>;
    logout: () => void;
    token: string | null;
    editUser: (email: string, dateBirth: Date, name: string, lastName: string) => Promise<Response>;
    editAdmin: (email: string, dateBirth: Date, name: string, lastName: string) => Promise<Response>;
    editManager: (email: string, dateBirth: Date, name: string, lastName: string, sportsHall: string, dateEmployment: Date) => Promise<Response>;
    //authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export enum UserRole {
    USER = 'user',
    MANAGER = 'manager',
    ADMIN = 'admin',
}

export const AuthProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole>(UserRole.USER)

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

    const getAdmin = async (token: string) => {
        const response = await sendGetMyselfAdmin(token);
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
            if (userData) {
                setUser(userData);
            console.log(data.access_token)
            setToken(data.access_token);
            setRole(UserRole.USER)
            }
        }
        return {response, data};
    }

    const loginManager = async (username: string, password: string) => {
        const response = await sendLoginRequestManager(username, password)
        const data = await response.json()
        if (response.ok && data) {
            localStorage.setItem("token", data.access_token);
            const userData = await getManager(data.access_token);
            console.log(userData);
            if (userData) {
                setUser(userData);
            console.log(data.access_token)
            setToken(data.access_token);
            setRole(UserRole.MANAGER)
            }
        }
        return {response, data};
    }

    const editUser = async (email: string, dateBirth: Date, name: string, lastName: string) => { 
        const response = await sendEditUserRequest(email, dateBirth, name, lastName, token as string)
        if(response.ok){
            const userData = await getUser(token as string);
            if (userData) {
                setUser(userData);
            }
        }
        return response;
    }

    
    const editAdmin = async (email: string, dateBirth: Date, name: string, lastName: string) => { 
        const response = await sendEditAdminRequest(email, dateBirth, name, lastName, token as string)
        if(response.ok){
            const userData = await getAdmin(token as string);
            console.log(userData)
            if (userData) {
                setUser(userData);
            }
        }
        return response;
    }

    const editManager = async(email: string, dateBirth: Date, name: string, lastName: string, sportsHall: string, dateEmployment: Date) => {
        const response = await sendEditManagerRequest(email, dateBirth, name, lastName, sportsHall, dateEmployment, token as string)
        if(response.ok){
            const userData = await getManager(token as string);
            if (userData) {
                setUser(userData);
            }
        }
        return response;
    }

    const loginAdmin = async (username: string, password: string) => {
        const response = await sendLoginRequestAdmin(username, password)
        const data = await response.json()
        if (response.ok && data) {
            localStorage.setItem("token", data.access_token);
            const userData = await getAdmin(data.access_token);
            console.log(userData);
            if (userData) {
                setUser(userData);
            console.log(data.access_token)
            setToken(data.access_token);
            setRole(UserRole.ADMIN)
            }
        }
        return {response, data};
    }

    const registerUser = async (username: string, password: string,
        email: string, dateBirth: Date, name: string, lastName: string) => {
        const response = await sendRegisterRequestUser(username, password, email, dateBirth, name, lastName);
        return response;
    }

    const registerManager = async (username: string, password: string,
        email: string, dateBirth: Date, name: string, lastName: string, sportsHall: string, dateEmployment: Date) => {
        const response = await sendRegisterRequestManager(username, password, email, dateBirth, name, lastName, sportsHall, dateEmployment);
        return response;
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
        <AuthContext.Provider value={{authenticated: !!user, user, role, editAdmin, editUser, loginUser, loginManager, loginAdmin, loading, token, registerUser, logout, registerManager, editManager }}>
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