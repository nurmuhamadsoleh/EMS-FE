import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSave,
  FiChevronLeft,
  FiUserPlus,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { classes } from "../../../data/layouts";
import axios from "axios";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { url, tokenHeader } from "../../../helpers/config";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";
const styleInput = {
  width: "100%",
  borderRadius: "5px",
  outline: "none",
  fontSize: "18px",
  fontWeight: "600",
};

const ManagementUserAdd = () => {
  const nav = useNavigate();
  let [showPass, setShowPass] = useState(false);
  let [showPassConfirm, setShowPassConfirm] = useState(false);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const iniState = {
    username: "",
    nama: "",
    password: "",
    // confirmpassword: "",
    email: "",
    level: "",
    // status: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      username: yup
        .string()
        .required("Field Username Wajib di isi")
        .min(5, "Minimal 5 Karakter"),
      nama: yup
        .string()
        .required("Field Nama Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karekter"),
      password: yup
        .string()
        .required("Password Wajib Di isi")
        .min(6, "Password minimal 6 charater"),
      // confirmpassword: yup
      //   .string()
      //   .required("Password Wajib Di isi")
      //   .oneOf([yup.ref("password")], "Password Tidak Sama!"),

      email: yup.string().email().required("Field Email Wajib di isi"),
      level: yup.string().required("Field Level Authentication Wajib di isi"),
      // status: yup.string().required("Field Status Akun Wajib di isi"),
    })
    .required();
  // const handleSubmitData = (data) => {
  //   console.log(data);
  // };
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
  const handleAdd = (data) => {
    console.log("submit data", data);
    let done = true;
    let post = data;
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
            method: "POST",
            url: `${url.api}/user`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              reset();
              nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              hideLoader();
              Swal.fire(
                "Peringatan!",
                "Terjadi kesalahan saat menambah data user",
                "warning"
              );
            });
        }
      });
    }
  };
  return (
    <>
      <Container style={{ width: "80%", marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiUserPlus /> Add User
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {loader}
        </div>
        <Form onSubmit={handleSubmit(handleAdd)}>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="UserName"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Username
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="UserName"
                name="UserName"
                placeholder="Masukan Username Anda"
                type="text"
                style={styleInput}
                {...register("username")}
                className={`form-control ${
                  errors.username?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.username && (
                <p className="fw-bold text-danger">{errors.username.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="nama"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Nama Lengkap
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="nama"
                name="nama"
                placeholder="Masukan Nama Anda"
                type="text"
                style={styleInput}
                {...register("nama")}
                className={`form-control ${
                  errors.name?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.nama && (
                <p className="fw-bold text-danger">{errors.name.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                htmlFor="Passwordlama"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Password
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="Passwordlama"
                name="Passwordlama"
                placeholder="Masukan Password Lama"
                type={showPass ? "text" : "password"}
                style={styleInput}
                {...register("password")}
                className={`form-control ${
                  errors.password?.message ? "is-invalid" : "is-valid"
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
              <span
                className="show-hide-pass"
                onClick={() => setShowPass(!showPass)}
              >
                {!showPass ? <FiEye /> : <FiEyeOff />}
              </span>
            </Col>
          </FormGroup>
          {/* <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                htmlFor="NewPassword"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Konfirmasi Password
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="NewPassword"
                name="NewPassword"
                placeholder="Masukan Password Baru"
                type={showPassConfirm ? "text" : "password"}
                style={styleInput}
                {...register("confirmpassword")}
                className={`form-control ${
                  errors.confirmpassword?.message ? "is-invalid" : "is-valid"
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmpassword?.message}
              </div>
              <span
                className="show-hide-pass"
                onClick={() => setShowPassConfirm(!showPassConfirm)}
              >
                {!showPassConfirm ? <FiEye /> : <FiEyeOff />}
              </span>
            </Col>
          </FormGroup> */}
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="email"
                sm={6}
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Email Address
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="email"
                name="email"
                placeholder="Masukan Email Anda"
                type="email"
                style={styleInput}
                {...register("email")}
                className={`form-control ${
                  errors.email?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.email && (
                <p className="fw-bold text-danger">{errors.email.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-start w-100 align-items-center">
              <Label for="level" className="text-start mb-3 text-light fw-bold">
                Level Authentication
              </Label>
              <FormGroup check>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="usr"
                  onClick={() => setValue("level", "usr")}
                  {...register("level")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">Admin</Label>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="adm"
                  onClick={() => setValue("level", "adm")}
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
          {/* <FormGroup>
            <div className="d-flex justify-content-start w-100 align-items-center">
              <Label
                for="status"
                className="text-start mb-3 text-light fw-bold me-5"
              >
                Status Akun
              </Label>
              <FormGroup check className="ms-3">
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="Y"
                  onClick={() => setValue("status", "Y")}
                  {...register("status")}
                  className="m-3 p-0"
                />

                <Label className="fw-bold text-light">Aktif</Label>
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="N"
                  onClick={() => setValue("status", "N")}
                  {...register("status")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">Non Aktif</Label>
              </FormGroup>
            </div>
            {errors?.level && (
              <p className="fw-bold text-danger text-center">
                {errors?.level.message}
              </p>
            )}
          </FormGroup> */}
          <FormGroup check row>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button
                className="btn btn-danger px-2"
                size="lg"
                onClick={() => {
                  nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`);
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
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default ManagementUserAdd;
