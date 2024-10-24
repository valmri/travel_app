type ButtonType = {
    text: string
    type?: "button" | "submit" | "reset"
    variant?: "primary" | "danger"
}

const buttonStyle = {
    primary: "bg-violet-400 hover:bg-violet-500",
    danger: "bg-red-400 hover:bg-red-500",
}

const Button = ({ text, type = "button", variant = "primary" } : ButtonType) => {
    return ( 
        <button
            type={type}
            className={`px-6 py-4 rounded-md text-white font-bold transition-all ${buttonStyle[variant]}`}
        >
            {text}
        </button>
     );
}
 
export default Button;