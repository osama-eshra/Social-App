import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type loginSchemaType } from "../../Schemas/auth.schemas";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userToken, setuserToken } = useContext(AuthContext);

  // BackEnd Object
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  let { register, handleSubmit, formState } = form;
  // hanfle login function
  function handleLogin(values: loginSchemaType) {
    setIsLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("userToken", res.data.data.token);
          setuserToken(res.data.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1 className=" text-5xl font-bold text-center  mb-5">Login Now</h1>
      {/* the form */}
      {apiError && (
        <p className="bg-red-500 text-white font-bold w-75 mx-auto rounded-lg text-center py-3 mb-5 ">
          {apiError}
        </p>
      )}
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(handleLogin)}>
        {/* Email Field*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("email")}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Email
          </label>
          {formState.errors.email?.message && (
            <p className="text-red-500 text-[14px]">
              {formState.errors.email?.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("password")}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Password
          </label>
          {formState.errors.password?.message && (
            <p className="text-red-500 text-[14px]">
              {formState.errors.password?.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-gray-800 disabled:text-amber-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg transition-all w-full cursor-pointer box-border border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="my-3 underline text-blue-500 hover:text-blue-700 text-center transition-all">
        <Link to="/register"> Don't You Have An Account? Go Register</Link>
      </div>
    </>
  );
}
