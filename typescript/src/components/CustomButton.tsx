import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
}

function CustomButton({ id, label, loading, ...props }: ButtonProps) {
  return (
    <button
      id={id}
      className={`bg-blue-900 text-white font-bold py-2 px-4 rounded-full border border-white ${
        loading && "bg-gray-700 cursor-not-allowed"
      }`}
      disabled={loading}
      {...props}
    >
      {label}
    </button>
  );
}

export default CustomButton;
