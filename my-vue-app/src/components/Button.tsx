import './Button.module.css'

type ButtonProps = {
    text: string,
    onClick: () => void,
    className: string,
}

function Button({text, onClick, className}: ButtonProps) {
    return (
        <button className="button" onClick={onClick}>{text}</button>
    )
}

export {
    Button,
}