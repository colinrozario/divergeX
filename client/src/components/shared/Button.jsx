const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ariaLabel
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-semibold',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    dark: 'bg-slate-800 text-white hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-300 hover:text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

