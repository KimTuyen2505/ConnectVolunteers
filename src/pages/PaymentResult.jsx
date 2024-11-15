import React, { useEffect, useState } from "react";
import { getProject, updateProject } from "../services/project";
import moment from "moment";
import Spinner from "../components/Spinner";

export default function PaymentResult() {
  const [success, setSuccess] = useState(null);
  const [project, setProject] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = queryParams.get("status");
    const amount = queryParams.get("amount");
    const userId = queryParams.get("username");
    const projectId = queryParams.get("project");

    if (vnp_ResponseCode === "success") {
      setSuccess(true);
      setProject(projectId);
      getProject(projectId).then((response) => {
        updateProject({
          ...response,
          supporters: [
            ...response.supporters,
            {
              userId: userId,
              amount: parseInt(amount),
              createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
          ],
        });
      });
    }
  }, []);

  return (
    <>
      {success === null ? (
        <Spinner />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center">
                {success ? (
                  <svg
                    className="h-16 w-16 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
                {success ? "Thanh toán thành công" : "Thanh toán thất bại"}
              </h2>
              <p className="mt-2 text-center text-gray-600">
                {success
                  ? "Thanh toán của bạn đã được xử lý thành công. Cảm ơn bạn đã ủng hộ!"
                  : "Rất tiếc, đã xảy ra sự cố khi xử lý khoản thanh toán của bạn. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out flex justify-center items-center"
                onClick={() => (window.location.href = `/projects/${project}`)}
              >
                <span className="inline-block mr-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </span>
                {success ? "Trở về dự án" : "Thử lại"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
