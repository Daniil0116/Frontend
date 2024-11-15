import styles from './Button.module.css'

type ButtonProps = {
    text: string,
    onClick: () => void,
    className: string,
}

function Button({text, onClick}: ButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>{text}</button>
    )
}

export {
    Button,
}