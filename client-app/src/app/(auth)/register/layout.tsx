import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

const RegisterLayout = ({children}: Props) => {
    return(
        <div>
            <div>Register layout</div>
            {children}
        </div>
    )
}

export default RegisterLayout