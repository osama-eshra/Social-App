import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type registerSchemaType,
} from "../../Schemas/auth.schemas";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // BackEnd Object
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  let { register, handleSubmit, formState } = form;
  // hanfle register function
  function handleRegister(values: registerSchemaType) {
    setIsLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
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
      <h1 className=" text-5xl font-bold text-center  mb-5">Register Now</h1>
      {/* the form */}
      {apiError && (
        <p className="bg-red-500 text-white font-bold w-75 mx-auto rounded-lg text-center py-3 mb-5 ">
          {apiError}
        </p>
      )}
      <form
        className="max-w-md mx-auto"
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("name")}
            type="text"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
          {formState.errors.name?.message && (
            <p className="text-red-500 text-[14px]">
              {formState.errors.name?.message}
            </p>
          )}
        </div>

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

        {/* Date Of Birhe Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("dateOfBirth")}
            type="date"
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Birth Date
          </label>
          {formState.errors.dateOfBirth?.message && (
            <p className="text-red-500 text-[14px]">
              {formState.errors.dateOfBirth?.message}
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

        {/* rePass Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("rePassword")}
            type="password"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Confirm Password
          </label>
          {formState.errors.rePassword?.message && (
            <p className="text-red-500 text-[14px]">
              {formState.errors.rePassword?.message}
            </p>
          )}
        </div>

        {/* Gender Field */}

        <div className="flex gap-2">
          {/* Male */}
          <div className="flex items-center mb-4">
            <input
              {...register("gender")}
              id="male"
              type="radio"
              defaultValue="male"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="male"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>

          {/* female */}
          <div className=" flex items-center mb-4">
            <input
              {...register("gender")}
              id="female"
              type="radio"
              defaultValue="female"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="female"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-gray-800 disabled:text-amber-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg transition-all w-full cursor-pointer box-border border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <div className="my-3 underline text-blue-500 hover:text-blue-700 text-center transition-all">
          <Link to="/login"> Do You Have An Account? Go Login</Link>
        </div>
      </form>
    </>
  );
}
