import style from './Loading.module.css'
import loading from '../../images/loading_icon.webp'

const Loading = () => {
    return (
        <div className={style.container}>
            <img className={style.loading} src={loading} alt="" />
        </div>
    )
}

export default Loading