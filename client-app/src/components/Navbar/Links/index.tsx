import Link from "next/link"

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

    return (
        <div>
            {links.map((link => (
                <Link key={link.title} href={link.path}>{link.title}</Link>
            )))}
        </div>
    )
}

export default Links;