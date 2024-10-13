const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    {...props}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
