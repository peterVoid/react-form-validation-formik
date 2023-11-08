import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
export default function Form() {
  const registerUser = (x) => {
    x.preventDefault();
    console.log('Helo World');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: registerUser,
    validationSchema: yup.object().shape({
      username: yup.string().required().min(1).max(7),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial'
        ),
    }),
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-form">
        <FormControl isInvalid={formik.errors.username}>
          <div className="data-input">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              placeholder="input your usename"
              onChange={handleForm}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </div>
        </FormControl>
        <FormControl>
          <div className="data-input">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              placeholder="input your email"
              onChange={handleForm}
            />
             <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </div>
        </FormControl>
        <FormControl>
          <div className="data-input">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="input your password"
              onChange={handleForm}
            />
             <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </div>
        </FormControl>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
