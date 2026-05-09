import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Pencil, PenIcon } from "lucide-react";
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <main
          className="border flex flex-col justify-center text-white items-center w-full min-h-screen"
          style={{
            background: `
      radial-gradient(circle at top right, #7C3AED 0%, transparent 35%),
      radial-gradient(circle at bottom left, #4C1D95 0%, transparent 30%),
      #020617
    `,
          }}
        >
          <h1 className="text-[2rem] font-bold">My Account</h1>
          <div className="bg-[#0A0F23] rounded-lg max-w-[600px] w-full py-4 flex flex-col">
            <div className="flex items-center px-6 justify-between">
              <div className="flex flex items-center gap-x-10">
                <img
                  className="w-20 rounded-full border-1"
                  src={
                    user.user_metadata.avatar_url || "/assets/user-icon2.svg"
                  }
                  alt="user"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="capitalize text-[25px] font-bold">
                    { user.user_metadata.full_name || user.user_metadata.firstName + " " + user.user_metadata.lastName }
                  </p>
                  <p className="opacity-30">{user.user_metadata.email}</p>
                </div>
              </div>
              <button className="flex gap-2 items-center border-2 border-blue-600 p-3 text-blue-600 rounded-lg">
                <Pencil /> Edit profile
              </button>
            </div>
            <div>
              <div>
                <label htmlFor="fName">
                  First Name
                </label>
                <input type="text" value={user.user_metadata.firstName} readOnly/>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
