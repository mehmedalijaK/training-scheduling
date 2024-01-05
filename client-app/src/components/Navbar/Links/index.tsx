"use client"
import Link from "next/link"
import styles from "./links.module.css"
import NavbarLink from "./NavbarLink"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/context/AuthContext"

const Links = () => {

    const links = [
        {
            title: "Homepage",
            path: "/"
        },
    ]

    const {authenticated} = useContext(AuthContext)

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
                        {isAdmin && <NavbarLink item={{title: "Admin", path: "/admin"}}/>}
                        {isManager && <NavbarLink item={{title: "Manager", path: "/manager"}}/>}
                        <NavbarLink item={{title: "My profile", path: "/my-profile"}}/>
                        <NavbarLink item={{title: "Trainings", path: "/trainings"}}/>
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