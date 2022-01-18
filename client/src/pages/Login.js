import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).required(),
    password: Yup.string().min(7).required(),
  });

  const handleSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("accessToken", resp.data.token);
        window.location = "/";
      })
      .catch((err) => {
        if (String(err.message).includes("404")) {
          alert("User does not exist on our system");
        } else if (String(err.message).includes("401")) {
          alert("Invalid password provided.");
        } else {
          alert("Oops!!! Something went wrong.");
        }
      });
  };

  return (
    <>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputCreatePost"
              name="username"
              placeholder="Ex. Username..."
            />

            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              id="inputCreatePost"
              name="password"
              type="password"
              placeholder="Enter password..."
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
