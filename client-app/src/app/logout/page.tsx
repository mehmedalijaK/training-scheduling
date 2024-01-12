"use client"
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"

const Logout = () => {
    const {logout} = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        logout()
        router.push("/")
      }, []);
    return <>
    
    </>
}

export default Logout;