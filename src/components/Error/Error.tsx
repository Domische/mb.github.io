import { BiError } from "react-icons/bi"
import style from './Error.module.css'

interface IErrorProps {
    errorName: string
}

const Error: React.FC<IErrorProps> = ({errorName}) => {
    return (
        <div className={style.error}>
            <BiError className={style.error__icon} />
            <h2>{errorName}</h2>
        </div>
    )
}

export default Error