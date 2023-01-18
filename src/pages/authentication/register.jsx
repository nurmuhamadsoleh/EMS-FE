import React, { useState } from "react";
import UserProfile from "../../assets/images/user/pms.png";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import {
  Password,
  SignIn,
  EmailAddress,
  CreateAccount,
  YourName,
  PrivacyPolicy,
  Login,
} from "../../constant";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };
  const iniState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    remember: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      firstname: yup
        .string()
        .required("First Name Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(6, "Minimal 5 Karekter"),
      lastname: yup
        .string()
        .required("Last Name Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(6, "Minimal 5 Karekter"),
      password: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      email: yup.string().email().required("Email Wajib di isi"),
      remember: yup.boolean().oneOf([true], "Must be Checked!"),
    })
    .required();
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col lg={12} md={12} xs={12}>
          <div className="login-card">
            <div>
              <div className="d-flex justify-content-center mb-5">
                <img
                  className="img-fluid for-light"
                  src={UserProfile}
                  width="25%"
                  alt="Create Account EMS"
                />
                <img
                  className="img-fluid for-dark"
                  src={UserProfile}
                  width="25%"
                  alt="Create Account EMS"
                />
              </div>
              <div className="login-main">
                <Form className="theme-form">
                  <h4>Create your account</h4>
                  <p>Enter your personal details to create account</p>
                  <FormGroup>
                    <Row>
                      <Col lg={6} md={6} xs={6}>
                        <Label className="col-form-label pt-0">
                          First Name
                        </Label>
                        <input
                          type="text"
                          placeholder="First name"
                          {...register("firstname")}
                          className={`form-control ${
                            errors.firstname?.message
                              ? "is-invalid"
                              : "is-valid"
                          }`}
                        />
                        {errors.firstname && (
                          <p className="fw-bold text-danger">
                            {errors.firstname.message}
                          </p>
                        )}
                      </Col>
                      <Col lg={6} md={6} xs={6}>
                        <Label className="col-form-label pt-0">Last Name</Label>
                        <input
                          type="text"
                          placeholder="Last name"
                          {...register("lastname")}
                          className={`form-control ${
                            errors.lastname?.message ? "is-invalid" : "is-valid"
                          }`}
                        />
                        {errors.lastname && (
                          <p className="fw-bold text-danger">
                            {errors.lastname.message}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Alamat Email</Label>
                    <input
                      type="email"
                      placeholder="Masukan Alamat Email"
                      {...register("email")}
                      className={`form-control ${
                        errors.email?.message ? "is-invalid" : "is-valid"
                      }`}
                    />
                    {errors.email && (
                      <p className="fw-bold text-danger">
                        {errors.email.message}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3 position-relative">
                    <Label className="col-form-label">Password</Label>
                    <Input
                      type={togglePassword ? "text" : "password"}
                      name="password"
                      placeholder="Masukan Password Anda"
                      {...register("password")}
                      className={`form-control ${
                        errors.password?.message ? "is-invalid" : "is-valid"
                      }`}
                    />
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                    {errors.password && (
                      <p className="fw-bold text-danger">
                        {errors.password.message}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div className="d-flex justify-content-start w-100 align-items-center">
                      <Label
                        for="level"
                        className="text-start mb-3 text-light fw-bold"
                      >
                        Level Authentication
                      </Label>
                      <FormGroup check>
                        {/* <input
                  id="level"
                  name="level"
                  type="radio"
                  value="superadmin"
                  // defaultValue={watch("name")}
                  checked={watch("level") === "superadmin"}
                  // checked={watch("name")}
                  onClick={() => setValue("level", "superadmin")}
                  className="m-3 p-0"
                  {...register("level")}
                />
                <Label className="fw-bold text-light">Super Admin</Label> */}
                        <input
                          id="level"
                          name="level"
                          type="radio"
                          value="ADM"
                          // checked={user?.level === "admin"}
                          checked={watch("level") === "ADM"}
                          // onClick={() => {
                          //   setUser({
                          //     ...user,
                          //     level: "admin",
                          //   });
                          // }}
                          onClick={() => setValue("level", "ADM")}
                          {...register("level")}
                          className="m-3 p-0"
                        />
                        <Label className="fw-bold text-light">Admin</Label>
                        <input
                          id="level"
                          name="level"
                          type="radio"
                          value="USR"
                          // checked={user?.level === "user"}
                          checked={watch("level") === "USR"}
                          // onClick={() =>
                          //   setUser({
                          //     ...user,
                          //     level: "user",
                          //   })
                          // }
                          onClick={() => setValue("level", "USR")}
                          {...register("level")}
                          className="m-3 p-0"
                        />
                        <Label className="fw-bold text-light">User</Label>
                      </FormGroup>
                    </div>
                    {errors?.level && (
                      <p className="fw-bold text-danger text-center">
                        {errors?.level.message}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      id="checkbox1"
                      type="checkbox"
                      {...register("remember")}
                    />
                    <Label className="ms-3 text-muted" for="checkbox1">
                      Agree with
                    </Label>
                    {errors?.remember && (
                      <p className="fw-bold text-danger">
                        {errors?.remember.message}
                      </p>
                    )}
                  </FormGroup>
                  <div className="login-btn mb-0">
                    <Button color="primary" type="submit">
                      {CreateAccount}
                    </Button>
                  </div>
                  <h6 className="text-muted mt-4 or">{"Or signup with"}</h6>
                  <div className="social mt-1">
                    <div className="btn-showcase">
                      <div className="d-flex justify-content-center align-items-center">
                        <Button color="light">
                          <FcGoogle size="10em" title="Gmail" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Already have an account?"}
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/login`}
                    >
                      {Login}
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
