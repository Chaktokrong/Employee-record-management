import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
//components
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../src/firebase";
import "./login.scss";
import logiImage from "../Assets/logoLogin.svg";

export default function Login() {
  const navigate = useNavigate();
  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const auth = getAuth(app);
  // console.log("auth::", auth)

  // hide password hook
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be 6 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("values::", values);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("userCredential::", user);
          setOpenSuccess(true);
          setSuccesstMessage("Login successfull!");
          setTimeout(() => {
            navigate("/");
          }, 1200);
        })
        .catch((error) => {
          console.log("error::", error);
          setOpenError(true);
          setErrorMessage("Invalid Email/Passwork!");
        });

      //get User Date after login Success
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // const uid = user.uid;
          // console.log(user, "user");
        } else {
          // User is signed out
        }
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="login-page">
            <Box className="background-image" />
            <Box className="container">
              <Box className="box-logo">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  variant="square"
                  alt="logo"
                  src={logiImage}
                />
              </Box>
              <Box className="box-text" sx={{ mt: 1 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  spacing={1}
                  className="title-login"
                >
                  <Typography className="title">
                    Welcome to Human Record
                  </Typography>
                  <Typography
                    className="sub-title"
                    variant="body2"
                    align="center"
                  >
                    Sign In to continue
                  </Typography>
                </Stack>
              </Box>

              <Box className="box-login" sx={{ mt: 3 }}>
                <Stack direction="column" justifyContent="center" spacing={2}>
                  <TextField
                    className="text-field"
                    size="small"
                    placeholder="example@company.com"
                    fullWidth
                    {...getFieldProps("email")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className="text-field"
                    type={show ? "text" : "password"}
                    size="small"
                    placeholder="password"
                    {...getFieldProps("password")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="start" onClick={handleClick}>
                          {show ? (
                            <VisibilityIcon sx={{ cursor: "pointer" }} />
                          ) : (
                            <VisibilityOffIcon sx={{ cursor: "pointer" }} />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Link
                    to="/forgotpassword"
                    style={{ textDecorationColor: "#fff" }}
                  >
                    <Typography
                      variant="subtitle2"
                      align="right"
                      color="#fff"
                      fontWeight="bold"
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                  <Button className="btb-sign-in" type="submit">
                    Sign In
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Typography
              variant="body2"
              align="center"
              color="#fff"
              sx={{ mb: 3, letterSpacing: "2px" }}
            >
              @Copyright 2022, Human Record
            </Typography>
          </Box>
        </Form>
      </FormikProvider>

      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}
