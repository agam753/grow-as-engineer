"use client";

import { getRequest } from "@/helpers/httpHelper";
import { DashBoardUser } from "@/interfaces/Dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [user, setUser] = useState<DashBoardUser | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await getRequest("/users/current-user");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24">
          <Image
            src={"/assets/default-user.jpg"}
            alt={`${user ? user.username : "User"}'s profile`}
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            Welcome, {user ? user.username : "User"}
          </p>
          <p className="text-gray-600">
            Email: {user ? user.email : "email@gmail.com"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
