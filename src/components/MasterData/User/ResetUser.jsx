import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { classes } from "../../../data/layouts";
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
import { FiSave, FiChevronLeft, FiUser } from "react-icons/fi";
import UserProfile from "../../../assets/images/user/pms.png";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// import {
//   NewPassword,
//   RetypePassword,
//   Done,
//   EnterMobileNumber,
//   EnterOTP,
//   Resend,
//   ResetPassword,
//   RememberPassword,
//   SignIn,
//   Send,
// } from "../../constant";

const Forgetpwd = () => {
  const nav = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [togglePassword, setTogglePassword] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };
  const handleShowPass = (password) => {
    setShowPass(!password);
  };
  const iniState = {
    username: "",
    password: "",
    newpassword: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      newpasssword: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      password: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      username: yup
        .string()
        .required("Field Username Wajib di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karakter"),
      // remember: yup.boolean().oneOf([true], "Must be Checked!"),
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
                  <h4>
                    <FiUser /> Change User
                  </h4>
                  <h6 className="mt-4">{"Create Your Password"}</h6>
                  <FormGroup>
                    <Label className="col-form-label">username</Label>
                    <input
                      type="text"
                      placeholder="Masukan username"
                      {...register("username")}
                      className={`form-control ${
                        errors.username?.message ? "is-invalid" : "is-valid"
                      }`}
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username.message}</p>
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
                  <FormGroup check row>
                    <div className="login-btn mb-0">
                      <Col className="col-sm-12 d-flex justify-content-center">
                        <Button
                          className="btn btn-danger px-2"
                          size="lg"
                          onClick={() => {
                            nav(
                              `${process.env.PUBLIC_URL}/dashboardUser/${layout}`
                            );
                          }}
                        >
                          <FiChevronLeft />
                          Cancel
                        </Button>
                        <Button color="primary" className="px-2 ms-3" size="lg">
                          <FiSave />
                          Simpan
                        </Button>
                      </Col>
                    </div>
                  </FormGroup>
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
