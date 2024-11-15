import styles from './Button.module.css'

type ButtonProps = {
    text: string,
    onClick: () => void,
    className: string,
    image: string,
}

function Button({text, onClick, className, image}: ButtonProps) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>{text}<img src={image}></img></button>
    )
}

export {
    Button,
}
