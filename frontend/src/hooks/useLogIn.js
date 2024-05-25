import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    const success = handleInputErrors(userName, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      // if (data.error) {
      //   throw new Error(data.error);
      // }

      if (res.status !== 200) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("auth-User", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogIn;

const handleInputErrors = (userName, password) => {
  const errors = [];

  if (!userName) errors.push("Username is required.");
  if (!password) errors.push("Password is required.");

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
    return false;
  }
  return true;
};
