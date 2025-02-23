import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "small" | "normal";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", size = "normal", className = "", children, ...props }) => {
  const baseStyles = "font-semibold transition duration-300 rounded cursor-pointer";
  const variantStyles =
    variant === "outline"
      ? "border-2 border-white bg-transparent text-white hover:bg-white hover:text-red-500"
      : "bg-red-500 text-white border-4 border-transparent shadow-lg hover:shadow-xl";
  const sizeStyles =
    size === "small"
      ? "border-2 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base"
      : "px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg";

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = (props) => <Button variant="outline" {...props} />;

export default Button;