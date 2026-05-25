import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Pencil, PenIcon, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InputComp = ({ label, value, forInp, isEditing, inputRef, setValue }) => {
  return (
    <div className="w-full px-6 sm:w-9/10 sm:px-0 flex flex-col gap-2">
      <label htmlFor={forInp} className="font-mono text-sm font-semibold">
        {label}
      </label>
      <input
        type="text"
        style={{
          backgroundColor: "#1a2535",
          border: "1px solid #1e2d3d",
        }}
        className="px-4 py-3 w-full rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
        id={forInp}
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        readOnly={!isEditing}
      />
    </div>
  );
};

const ProfilePage = () => {
  const { user, signOut, updateUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const handleFocus = () => {
    inputRef.current.focus();
  };
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user_metadata?.name) {
      setNewFullName(user?.user_metadata?.full_name);
    } else {
      setNewFirstName(user?.user_metadata?.firstName);
      setNewLastName(user?.user_metadata?.lastName);
    }
  }, [user]);

  return (
    <>
      {user && (
        <main
          className="border px-4 flex flex-col gap-y-5 justify-center text-white items-center w-full min-h-screen"
          style={{
            background: `
      radial-gradient(circle at top right, #7C3AED 0%, transparent 35%),
      radial-gradient(circle at bottom left, #4C1D95 0%, transparent 30%),
      #020617
    `,
          }}
        >
          <h1 className="text-[2rem] font-bold">My Account</h1>
          <div className="bg-[#0A0F23] rounded-lg max-w-[888px] w-full py-4 flex flex-col">
            <div className="flex items-center px-6 justify-between pb-4 gap-5 flex-col sm:flex-row">
              <div className="flex flex items-center sm:gap-10  flex-col sm:flex-row">
                <img
                  className="w-20 rounded-full"
                  src={
                    user.user_metadata.avatar_url ||
                    "/assets/user-icon-white3.svg"
                  }
                  alt="user"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="capitalize text-[25px] font-bold">
                    {user.user_metadata.full_name
                      ? user.user_metadata.full_name
                      : user.user_metadata.firstName +
                        " " +
                        user.user_metadata.lastName}
                  </p>
                  <p className="opacity-30">{user.user_metadata.email}</p>
                </div>
              </div>
              <button
                className="flex gap-2 hover:backdrop-blur-xs hover:bg-white/10 items-center border-2 border-blue-600 p-3 text-blue-600 rounded-lg"
                onClick={() => {
                  setIsEditing(true);
                  handleFocus();
                }}
              >
                <Pencil /> Edit profile
              </button>
            </div>
            <div className="border-t pb-5 flex flex-col items-center">
              <div className="gap-4 w-full py-10 flex flex-col items-center justify-center">
                {user.user_metadata.full_name ? (
                  <InputComp
                    label={"Full name"}
                    inputRef={inputRef}
                    forInp={"fullName"}
                    value={newFullName}
                    isEditing={isEditing}
                    setValue={setNewFullName}
                  />
                ) : (
                  <>
                    <InputComp
                      label={"First name"}
                      inputRef={inputRef}
                      forInp={"fName"}
                      value={newFirstName}
                      isEditing={isEditing}
                      setValue={setNewFirstName}
                    />
                    <InputComp
                      label={"Last name"}
                      forInp={"lName"}
                      value={newLastName}
                      isEditing={isEditing}
                      setValue={setNewLastName}
                    />
                  </>
                )}
              </div>
              <div className="w-full px-6 sm:w-9/10 sm:px-0">
                <button
                  disabled={!isEditing}
                  onClick={() => {
                    updateUserData(newFullName, newFirstName, newLastName);
                    setIsEditing(false);
                  }}
                  className="
                  disabled:pointer-events-none
                  disabled:opacity-40
    rounded-xl
    flex
    items-center
    gap-2
    px-5
    py-3
    font-medium
    text-white
    bg-gradient-to-r
    from-violet-600
    via-purple-500
    to-violet-700
    hover:from-violet-500
    hover:via-purple-400
    hover:to-violet-600
    transition-all
    duration-300
    hover:shadow-xl
    hover:shadow-violet-500/30
    active:scale-[0.95]
  "
                >
                  <Save size={18} />
                  Save changes
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate("/");
            }}
            className="text-red-500 flex bg-[#0A0F23] w-full p-4 hover:bg-[#050810] gap-2 max-w-[888px] rounded-xl bg"
          >
            <LogOut /> Log out
          </button>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
