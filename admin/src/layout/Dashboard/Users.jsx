import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { FaDotCircle } from "react-icons/fa";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/users/all-users"
        );

        if (data.success) {
          setData(data.users);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
        All Users
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-orange-400"
                  src={
                    item.image
                      ? `http://localhost:4000/uploads/${item.image}`
                      : item.avatarUrl
                  }
                  alt={item.name}
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.email}</p>
                <p className="text-gray-600 text-sm">{item.phone}</p>
                <p className="text-gray-500 text-xs">
                  Joined: {moment(item.createdAt).format("YYYY-MMMM-DD")}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <FaDotCircle className="text-orange-500 text-xs" />
                  <span className="text-sm font-medium">{item.role}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
