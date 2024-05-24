import React from "react";

const Login = () => {
  return (
    <div className="flex flex-cont items-center justify-center min-w-96 mx-auto">
      <div
        className="
h-full w-full p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5
"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-400"> Chaterio</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <div className="text-base label-text">Username</div>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <div className="text-base label-text">Password</div>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
                  </div>
                  <a href="#" className="test-sm hover:underline hover:text-blue-400 inline-block">
                      Don't have an account?
                  </a>
                  <div>
                      <button className="btn btn-block btn-sm mt-2">Login</button>
            </div>
                      
        </form>
      </div>
    </div>
  );
};

export default Login;
