import { BiError } from "react-icons/bi"
import style from './Error.module.css'

interface IErrorProps {
    errorMessage: string
}

const Error: React.FC<IErrorProps> = ({errorMessage}) => {
    return (
        <div className={style.error}>
            <BiError className={style.error__icon} />
            <h2>{errorMessage}</h2>
        </div>
    )
}

export default Error