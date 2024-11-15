import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const VARIANTS = {
  success: {
    icon: CheckCircle,
    className: "bg-green-50 text-green-800 border-green-200",
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 text-red-800 border-red-200",
  },
  info: { icon: Info, className: "bg-blue-50 text-blue-800 border-blue-200" },
};

export default function Notification({
  message,
  variant = "info",
  duration = 5000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const { icon: Icon, className } = VARIANTS[variant] || VARIANTS.info;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 border-b ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="container mx-auto max-w-4xl flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-3" />
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose && onClose();
          }}
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
