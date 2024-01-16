"use client"
import Link from "next/link"
import styles from "./links.module.css"
import NavbarLink from "./NavbarLink"
import { useContext, useEffect } from "react"
import { AuthContext, UserRole } from "@/context/AuthContext"

const Links = () => {

    const links = [
        {
            title: "Homepage",
            path: "/"
        },
    ]

    const {authenticated, role} = useContext(AuthContext)

    useEffect(()=>{

    }, [authenticated])

    const isAdmin = false
    const isManager = false

    return (
        <div className={styles.links}>
            {links.map((link => (
                <NavbarLink item={link} key={link.title}/>
            )))}{
                authenticated ? (
                    <>
                        {role == UserRole.ADMIN && <NavbarLink item={{title: "Admin", path: "/admin"}}/>}
                        {role == UserRole.MANAGER && <NavbarLink item={{title: "Manager", path: "/manager"}}/>}
                        {role == UserRole.MANAGER && <NavbarLink item={{title: "My gym", path: "/my-gym"}}/>}
                        <NavbarLink item={{title: "My profile", path: "/my-profile"}}/>
                        <NavbarLink item={{title: "Trainings", path: "/trainings"}}/>
                        <NavbarLink item={{title: "Notifications", path: "/notifications"}}/>
                        <NavbarLink item={{title: "Logout", path: "/logout"}}/>
                    </>
                ) : (
                    <NavbarLink item={{title: "Login", path: "/login"}}/>
                )
            }
        </div>
    )
}

export default Links;