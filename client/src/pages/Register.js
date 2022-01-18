import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).required(),
    password: Yup.string().min(7).required(),
  });

  let navigate = useNavigate();
  const handleSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((resp) => {
      alert("it worked");
      navigate("/");
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
              type="password"
              name="password"
              placeholder="Password..."
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
