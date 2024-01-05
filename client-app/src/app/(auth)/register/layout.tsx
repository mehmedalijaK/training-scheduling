import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

const RegisterLayout = ({children}: Props) => {
    return(
        <div>
            {children}
        </div>
    )
}

export default RegisterLayout