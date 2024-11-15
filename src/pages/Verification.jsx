import { useEffect, useState } from "react";
import VerificationForm from "../components/VerificationForm";
import { deleteVerify, getVerify } from "../services/verify";
import { addUser } from "../services/user";
import Notification from "../components/Notification";

export default function Verification({ formData }) {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [notification, setNotification] = useState(null);
  // variant is 'success', 'error', 'info'
  const showNotification = (message, variant) => {
    setNotification({ message, variant });
  };

  useEffect(() => {
    getVerify(formData.email).then((verify) => {
      setVerifyCode(verify.verifyCode);
    });
  }, []);

  const handleVerification = async (code) => {
    if (code === verifyCode) {
      await deleteVerify(formData.email);
      addUser(formData).then(async () => {
        setIsVerified(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = "/login";
      });
    } else {
      showNotification("Mã xác thực không chính xác", "error");
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {isVerified ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                Xác thực thành công!
              </h2>
              <p>Chào mừng, {formData.fullName}</p>
            </div>
          ) : (
            <VerificationForm
              onSubmit={handleVerification}
              email={formData.email}
            />
          )}
        </div>
      </div>
    </>
  );
}
