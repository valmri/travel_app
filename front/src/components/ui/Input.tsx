type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  type: "text" | "number" | "email" | "password";
  required: boolean;
  value: string;
};

const Input = ({
  onChange,
  name,
  placeholder,
  type = "text",
  required = false,
  value,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="border-2 border-gray-300 rounded-md px-4 py-2 w-full"
      required={required}
    />
  );
};

export default Input;
