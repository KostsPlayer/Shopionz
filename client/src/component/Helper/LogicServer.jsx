import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";

export const validationSignUp = yup.object().shape({
  username: yup.string().required("Name input must be filled"),
  email: yup
    .string()
    .required("Email input must be filled")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password input must be filled")
    .min(8, "Password input of at least 8 characters"),
  repeatPassword: yup
    .string()
    .required("Repeat Password input must be filled")
    .oneOf([yup.ref("password"), null], "Password does not match"),
});

export const validationLogin = yup.object().shape({
  usernameEmail: yup.string().required("Username / Email input must be filled"),
  password: yup.string().required("Password input must be filled"),
});

export const validationInsertMenu = yup.object().shape({
  name: yup.string().required("Menu name is required"),
  icon: yup.string().required("Menu icon is required"),
  url: yup.string().required("Menu url is required"),
  is_active: yup.string().required("Menu active is required"),
});

export const allMessage = () => {
  const [message, setMessage] = useState("");
  const toastMessage = (type, messages, position = "bottom-right") => {
    setMessage(
      toast[type](messages, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "toast",
      })
    );
  };

  return { toastMessage, message };
};

const supabaseUrl = "https://crijtkbvmmpjdbxqqkpi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaWp0a2J2bW1wamRieHFxa3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMzkzNDcsImV4cCI6MjAxODYxNTM0N30.iO8nGzYD2kA0saijD8uHCYrTQj-U1Cf3XDaSNx7rzaA";
export const supabase = createClient(supabaseUrl, supabaseKey);
