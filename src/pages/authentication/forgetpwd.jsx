import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import UserProfile from "../../assets/images/user/pms.png";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  NewPassword,
  RetypePassword,
  Done,
  EnterMobileNumber,
  EnterOTP,
  Resend,
  ResetPassword,
  RememberPassword,
  SignIn,
  Send,
} from "../../constant";

const Forgetpwd = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };
  const handleShowPass = (password) => {
    setShowPass(!password);
  };
  const iniState = {
    email: "",
    password: "",
    confirmpassword: "",
    remember: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      confirmpassword: yup
        .string()
        .required("Password Wajib Di isi")
        .oneOf([yup.ref("password")], "Password Tidak Sama!"),
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
  const submitData = (data) => {
    console.log(data);
  };
  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div className="d-flex justify-content-center mb-5">
                <img
                  className="img-fluid for-light"
                  src={UserProfile}
                  width="25%"
                  alt="ForgotPass EMS"
                />
                <img
                  className="img-fluid for-dark"
                  src={UserProfile}
                  width="25%"
                  alt="ForgotPass EMS"
                />
              </div>
              <div className="login-main">
                <Form
                  className="theme-form"
                  onSubmit={handleSubmit(submitData)}
                >
                  <h4>{ResetPassword}</h4>
                  <h6 className="mt-4">{"Create Your Password"}</h6>
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
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3 position-relative">
                    <Label className="col-form-label">Password Baru</Label>
                    <input
                      type={togglePassword ? "text" : "password"}
                      name="password"
                      {...register("password")}
                      className={`form-control ${
                        errors.password?.message ? "is-invalid" : "is-valid"
                      }`}
                      placeholder="Masukan Password Anda"
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-3 position-relative">
                    <Label className="col-form-label">
                      Konfirmasi Password
                    </Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Masukan Konfirmasi Password"
                      {...register("confirmpassword")}
                      className={`form-control ${
                        errors.confirmpassword?.message
                          ? "is-invalid"
                          : "is-valid"
                      }`}
                    />
                    <div
                      className="show-hide"
                      onClick={() => handleShowPass(showPassword)}
                    >
                      <span className={showPassword ? "" : "show"}></span>
                    </div>
                    <div className="invalid-feedback">
                      {errors.confirmpassword?.message}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <input
                      id="checkbox1"
                      type="checkbox"
                      {...register("remember")}
                    />
                    <Label className=" ms-2 text-muted" for="checkbox1">
                      {RememberPassword}
                    </Label>
                    {errors?.remember && (
                      <p className="text-danger">{errors?.remember.message}</p>
                    )}
                  </FormGroup>
                  <div className="login-btn mb-0">
                    <Button color="primary" type="submit">
                      {Done}
                    </Button>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Already have an password?"}
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/register`}
                    >
                      {SignIn}
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

export default Forgetpwd;
