import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

const LoginLayout = ({children}: Props) => {
    return(
        <div>
            {children}
        </div>
    )
}

export default LoginLayout          