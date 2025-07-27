import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick = () => {},
  className = '',
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600'
  };
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 rounded',
    md: 'text-sm px-3 py-1.5 rounded-md',
    lg: 'text-base px-4 py-2 rounded-md'
  };
  return <button className={`font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>;
};
export default Button;