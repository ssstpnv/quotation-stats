import './Button.css';

const Button = ({
    children,
    onClick,
    disabled,
    className = ''
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`btn ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;