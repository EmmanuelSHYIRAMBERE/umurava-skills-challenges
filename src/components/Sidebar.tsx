"use client"

import { FaHome, FaUserPlus, FaRegFileAlt } from "react-icons/fa";
import log from "../../public/assets/log.svg";
import Link from "next/link";

import { TbHeadset } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
// import UserAvatar from "../admin/comp/UserAvatar"; // Import the UserAvatar component
import { LuLogOut } from "react-icons/lu";
// import ReferLink from "@/refer/ReferLink";
import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
 const router = useRouter();
 const [showConfirmation, setShowConfirmation] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const user =
   typeof window !== "undefined" && localStorage.getItem("user")
     ? JSON.parse(localStorage.getItem("user")!)
     : null;
 const isAdmin = user && user.role === "admin";

 const isActive = (path: string) => {
   return router.pathname === path ? "bg-white text-blue-500" : "";
 };

 const handleLogout = async () => {
   setIsLoading(true);
   try {
     const response = await axios.post(`api/auth/logout`);

     if (response.status === 200) {
       localStorage.clear();
       router.push("/"); // Redirect to the login page
       toast.success("Logout successful!");
     } else {
       console.error("Logout failed");
       toast.error("Logout failed. Please try again.");
     }
   } catch (error) {
     console.error("Error during logout:", error);
     toast.error("Error during logout. Please try again.");
   } finally {
     setIsLoading(false);
     setShowConfirmation(false);
   }
 };

 const confirmLogout = () => {
   setShowConfirmation(true);
 };

 const cancelLogout = () => {
   setShowConfirmation(false);
 };
  return (
    <>
      <div className="fixed bg-blue-500 text-white h-screen w-72 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <Link href="/">
              <Image src={log} alt="Logo" className="mr-2 rounded-full" />
            </Link>
          </div>
          <nav>
            <ul className="space-y-4">
              <Link href={isAdmin ? "/admin" : "/dashboard"}>
                <li
                  className={`flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500 ${isActive(
                    isAdmin ? "/admin" : "/dashboard"
                  )}`}
                >
                  <FaHome className="mr-2" />
                  Dashboard
                </li>
              </Link>
              <Link
                href={
                  isAdmin
                    ? "/admin/challenges"
                    : "/dashboard/challenge-and-hackathons"
                }
              >
                <li
                  className={`flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500 ${isActive(
                    isAdmin
                      ? "/admin/challenges"
                      : "/dashboard/challenge-and-hackathons"
                  )}`}
                >
                  <FaRegFileAlt className="mr-2" />
                  Challenges & Hackathons
                </li>
              </Link>
              <Link href={isAdmin ? "/admin/community" : "/dashboard/community"}>
                <li
                  className={`flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500 ${isActive(
                    isAdmin ? "/admin/community" : "/dashboard/community"
                  )}`}
                >
                  <FaUserPlus className="mr-2" />
                  Community
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div className="space-y-4">
          <Link href={isAdmin ? "/admin/settings" : "/dashboard/settings"}>
            <div
              className={`flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500 ${isActive(
                isAdmin ? "/admin/settings" : "/dashboard/settings"
              )}`}
            >
              <FiSettings className="mr-2" />
              Settings
            </div>
          </Link>
          <Link href={isAdmin ? "/admin/help-center" : "/dashboard/help-center"}>
            <div
              className={`flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500 ${isActive(
                isAdmin ? "/admin/help-center" : "/dashboard/help-center"
              )}`}
            >
              <TbHeadset className="mr-2" />
              Help Center
            </div>
          </Link>
          {/* <ReferLink isAdmin={isAdmin} isActive={isActive} /> */}
          <div className="flex items-center p-2 rounded-md hover:bg-white hover:text-blue-500">
            <Link
              href={isAdmin ? "/admin/settings" : "/dashboard/settings"}
              className="flex"
            >
              {/* <UserAvatar
                avatarUrl="https://via.placeholder.com/150"
                isOnline={true}
              /> */}
              <div className="flex flex-col">
                {/* <span className="ml-2 text-xs">
                  {user.name.length > 15
                    ? user.name.slice(0, 15) + "..."
                    : user.name}
                </span> */}
                {/* <span className="ml-2 text-sm">{user.email}</span> */}
              </div>
            </Link>
            <LuLogOut
              className="ml-10 cursor-pointer"
              onClick={confirmLogout}
            />
          </div>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-blue-500">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Sidebar;
