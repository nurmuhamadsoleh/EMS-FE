import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { classes } from "../../../data/layouts";
import useFullPageLoader from "../../hooks/useFullPageLoader";
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
import Swal from "sweetalert2";
import { FiSave, FiChevronLeft, FiUser } from "react-icons/fi";
import UserProfile from "../../../assets/images/user/pms.png";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {url, tokenHeader} from "../../../helpers/config"
import { useForm } from "react-hook-form";
const Forgetpwd = () => {
  const nav = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [togglePassword, setTogglePassword] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };
  const handleShowPass = (password) => {
    setShowPass(!password);
  };
  const iniState = {
    // username: "",
    password: "",
    current: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      password: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      current: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      // username: yup
      //   .string()
      //   .required("Field Username Wajib di isi")
      //   .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
      //   .min(5, "Minimal 5 Karakter"),
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
    console.log('data chang passwrd',data);
    let done = true;
    let post = data
    if (done) {
      Swal.fire({
        title: "Apa anda yakin?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan data!",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `${url.api}/auth/me/password`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Update.",
                "success"
              );
              hideLoader();
              reset();
              localStorage.removeItem("profile")
              localStorage.removeItem("token")
              localStorage.removeItem("role")
              return window.location.href = process.env.PUBLIC_URL
            })
            .catch((err) => {
              console.log(err);
              hideLoader();
              Swal.fire(
                "Peringatan!",
                "Terjadi kesalahan saat mengupdate data user",
                "warning"
              );
            });
        }
      });
    }
  };
  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12">
          <div className="login-card mt-5">
            <div>
              <div className="d-flex justify-content-center mb-3">
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
              <div className="d-flex justify-content-center align-items-center">
                {loader}
              </div>
              <div className="login-main bg-info">
                <Form
                  className="theme-form"
                  onSubmit={handleSubmit(submitData)}
                >
                  {/* <h4>
                    <FiUser /> Change User
                  </h4> */}
                  {/* <h6 className="mt-4">{"Create Your Password"}</h6> */}
                  <FormGroup className="mb-3 position-relative">
                    <Label className="col-form-label">Password Lama</Label>
                    <input
                      type={togglePassword ? "text" : "password"}
                      name="password"
                      {...register("current")}
                      className={`form-control ${
                        errors.current?.message ? "is-invalid" : "is-valid"
                      }`}
                      placeholder="Masukan Password Anda"
                    />
                    <div className="invalid-feedback">
                      {errors.current?.message}
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
                      New Password
                    </Label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Masukan Konfirmasi Password"
                      {...register("password")}
                      className={`form-control ${
                        errors.password?.message
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
                      {errors.password?.message}
                    </div>
                  </FormGroup>
                  <FormGroup>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button
                className="btn btn-danger px-2"
                size="lg"
                onClick={() =>
                  nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`)
                }
              >
                <FiChevronLeft />
                Cancel
              </Button>
              <Button color="primary" className="px-2 ms-3" size="lg">
                <FiSave />
                Simpan
              </Button>
            </Col>
          </FormGroup>
                  {/* <FormGroup check row>
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
                  </FormGroup> */}
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
