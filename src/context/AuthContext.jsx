import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (email, password, firstName, lastName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });
    return { error };
  };
  const googleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };
  const updateUserData = async (newFullName, newFirstName, newLastName) => {
    console.log("boyyy")
    if (user.user_metadata.full_name) {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: newFullName,
        },
      });
      console.log(error);
      console.log(data);
    } else {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          firstName: newFirstName,
          lastName: newLastName,
        },
      });
      console.log(error);
      console.log("data:", data);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
      console.log("user:", user);
    });
    return () => subscription.unsubscribe();
  }, []);
  console.log("user:", user);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <AuthContext.Provider
      value={{
        signUp,
        setUser,
        signIn,
        user,
        signOut,
        googleAuth,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
