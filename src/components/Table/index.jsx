import React from "react";

const supporters = [
  { id: 1, name: "John Doe", amount: "$50.00", time: "2023-05-15 10:30 AM" },
  { id: 2, name: "Jane Smith", amount: "$100.00", time: "2023-05-14 3:45 PM" },
  { id: 3, name: "Bob Johnson", amount: "$25.00", time: "2023-05-13 9:15 AM" },
  { id: 4, name: "Alice Brown", amount: "$75.00", time: "2023-05-12 2:00 PM" },
  {
    id: 5,
    name: "Charlie Davis",
    amount: "$200.00",
    time: "2023-05-11 11:20 AM",
  },
];

export default function Table({ columns, data }) {
  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column} className="py-2 px-4 border-b text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={supporter.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{supporter.name}</td>
                <td className="py-2 px-4 border-b">{supporter.amount}</td>
                <td className="py-2 px-4 border-b">{supporter.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
