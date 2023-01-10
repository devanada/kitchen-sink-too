import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

function CustomInput({ id, ...props }: Props) {
  return (
    <input
      id={id}
      className="bg-slate-200 rounded-lg text-black p-2 border focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
      {...props}
    />
  );
}

export default CustomInput;
