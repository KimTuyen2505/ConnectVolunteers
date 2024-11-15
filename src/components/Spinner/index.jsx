import React from "react";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-24 h-24" aria-label="Loading" role="status">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"
          style={{ borderTopColor: "transparent", animationDuration: "1s" }}
        ></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Đang tải...</p>
    </div>
  );
}
