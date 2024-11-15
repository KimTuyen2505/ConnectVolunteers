import React, { useEffect } from "react";
import { FaMedal } from "react-icons/fa";
import { getUsers } from "../services/user";
import { getProjects } from "../services/project";
import { moneyString } from "../utils/moneyString";

export default function Ranking() {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    let userData = [];
    getUsers().then(async (responseUsers) => {
      getProjects().then(async (responseProjects) => {
        await Promise.all(
          responseUsers.map(async (user) => {
            let amountTotal = 0;
            await Promise.all(
              responseProjects.map(async (project) => {
                await Promise.all(
                  project.supporters.map(async (supporter) => {
                    if (supporter.userId === user.username) {
                      amountTotal += supporter.amount;
                    }
                  })
                );
              })
            );
            userData.push({
              fullName: user.fullName,
              amountTotal: amountTotal,
              avatar: user.avatar,
            });
          })
        );
        let rank = 0;
        let prevAmount = -1;
        setUsers(
          userData
            .sort((a, b) => b.amountTotal - a.amountTotal)
            .map((user, index) => {
              if (user.amountTotal != prevAmount) {
                rank = index + 1;
                prevAmount = user.amountTotal;
              }
              return { ...user, rank };
            })
        );
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-blue-600 text-5xl font-bold text-center mb-12 animate-fade-in">
          Bảng Vàng Thiện Nguyện
        </h1>

        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    user.rank === 1
                      ? "bg-yellow-400"
                      : user.rank === 2
                      ? "bg-gray-300"
                      : user.rank === 3
                      ? "bg-amber-600"
                      : "bg-blue-600"
                  }
                  text-white font-bold text-xl animate-bounce
                `}
                >
                  {user.rank <= 3 ? (
                    <FaMedal className="w-6 h-6" />
                  ) : (
                    <span>{user.rank}</span>
                  )}
                </div>

                <div>
                  <h2
                    className="text-xl font-semibold text-gray-800 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  >
                    {user.fullName}
                  </h2>
                  <p
                    className="text-gray-600 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                  >
                    {moneyString(user.amountTotal)} VNĐ
                  </p>
                </div>
              </div>

              <div
                className="relative animate-scale-in"
                style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 shadow-inner">
                  <img
                    src={user.avatar}
                    alt={`${user.fullName}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
