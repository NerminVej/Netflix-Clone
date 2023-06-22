import Input from "@component/components/Input";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // State to keep track of the current variant ("login" or "register")
  const [variant, setVariant] = useState("login");

  // Function to toggle between login and register variants
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  // Function to handle the login process
  const login = useCallback(async () => {
    try {
      // Sign in using next-auth "credentials" provider
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });

      // Redirect to the home page after successful login
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  // Function to handle the registration process
  const register = useCallback(async () => {
    try {
      // Send a POST request to the "/api/register" endpoint with user information
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      // Log in the user after successful registration
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {/* Render the Input component for the username if the variant is "register" */}
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              {/* Render the Input component for the email */}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              {/* Render the Input component for the password */}
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            {/* Render the login or register button based on the variant */}
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              {/* Render the Google sign-in button */}
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
              >
                <FcGoogle size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {/* Render the text and link to switch between login and register */}
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 however:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
