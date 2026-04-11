import { createContext } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
    return { data, error };
  };
  return (
    <AuthContext.Provider value={{ signUp, signIn }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
