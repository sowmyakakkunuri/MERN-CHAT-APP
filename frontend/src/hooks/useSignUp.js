import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);
      toast.success("Registered successfully");
      // localstorage
      localStorage.setItem("auth-User", JSON.stringify(data));
      // set the user in the context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

const handleInputErrors = ({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) => {

  const errors = [];
  if (!fullName) errors.push("Full name is required.");
  if (!userName) errors.push("Username is required.");
  if (!password) errors.push("Password is required.");
  if (!confirmPassword) errors.push("Confirm password is required.");
  if (!gender) errors.push("Gender is required.");
  if (password && confirmPassword && password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }
  if (password && password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
    return false;
  }
  return true;
};

// import { useState } from "react";

// import { toast } from "react-hot-toast";

// import { useAuthContext } from "../context/AuthContext";
// const useSignUp = () => {
//   const [loading, setLoading] = useState(false);

//     const { setAuthUser } = useAuthContext();
//   const signup = async ({
//     fullName,
//     userName,
//     password,
//     confirmPassword,
//     gender,
//   }) => {
//     const success = handleInputErrors({
//       fullName,
//       userName,
//       password,
//       confirmPassword,
//       gender,
//     });

//     if (!success) {
//       return;
//     }

//     try {
//       const res = await fetch(`/api/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName,
//           userName,
//           password,
//           confirmPassword,
//           gender,
//         }),
//       });

//         const data = await res.json();

//       if (data.error) {
//         throw new Error(data.error);
//         }
//         console.log(data);
//       toast.success("Registered successfully");
//     //   localstorage
//         localStorage.setItem("auth-User", JSON.stringify(data));
//     //   set the user  in the context
//         setAuthUser(data);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, signup };
// };

// export default useSignUp;

// const handleInputErrors = ({
//   fullName,
//   userName,
//   password,
//   confirmPassword,
//   gender,
// }) => {
//   if (!fullName || !userName || !password || !confirmPassword || !gender) {
//     toast.error("Please fill in all fields");
//     return false;
//   }

//   if (password !== confirmPassword) {
//     toast.error("Passwords do not match");
//     return false;
//   }

//   if (password.length < 8) {
//     toast.error("Password must be at least 8 characters");
//     return false;
//   }
//   return true;
// };
