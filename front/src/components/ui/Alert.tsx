interface AlertProps {
  type: string;
  message: string;
  isOpen: boolean;
}
function Alert({ type, message, isOpen }: AlertProps) {
  return (
    <>
      {isOpen && (
        <div
          className={`border-2 border-solid w-full p-5 ${
            type === "danger"
              ? "border-red-600 bg-red-500"
              : type === "success"
              ? "border-green-600 bg-green-500"
              : ""
          }`}
        >
          <span className="text-white">{message}</span>
        </div>
      )}
    </>
  );
}

export default Alert;
