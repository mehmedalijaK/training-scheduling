import Link from "next/link"
import styles from "./links.module.css"
import NavbarLink from "./NavbarLink"

const Links = () => {

    const links = [
        {
            title: "Homepage",
            path: "/"
        },
        {
            title: "Trainings",
            path: "/trainings"
        },
        {
            title: "My profile",
            path: "/my-profile"
        },
        {
            title: "Sign out",
            path: "/sign-out"
        }
    ]

    const session = true
    const isAdmin = true

    return (
        <div className={styles.links}>
            {links.map((link => (
                <NavbarLink item={link} key={link.title}/>
            )))}{
                session ? (
                    <>
                        {isAdmin && <NavbarLink item={{title: "Admin", path: "/admin"}}/>}
                        <button className={styles.logout}>Logout</button>
                    </>
                ) : (
                    <NavbarLink item={{title: "Login", path: "/login"}}/>
                )
            }
        </div>
    )
}

export default Links;