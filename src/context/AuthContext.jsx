import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
      console.log("user:", user);
      navigate("/");
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
  return (
    <AuthContext.Provider value={{ signUp,setUser, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
