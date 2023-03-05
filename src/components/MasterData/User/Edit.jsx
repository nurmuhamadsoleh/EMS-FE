import React, { useEffect, useState, Fragment, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiSave,
  FiChevronLeft,
  FiUserCheck,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { classes } from "../../../data/layouts";
import axios from "axios";
import * as yup from "yup";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { url, tokenHeader } from "../../../helpers/config";
import Swal from "sweetalert2";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Btn,
  InputGroup,
  InputGroupText,
  Col,
  Input,
  Row,
} from "reactstrap";
// const styled = {
//   borderRadius: "4px",
//   width: "100%",
//   outline: "none",
//   border: "none",
//   height: "35px",
// };

const ManagementUserEdit = () => {
  const nav = useNavigate();
  let { id } = useParams();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const iniState = {
    username: "",
    nama: "",
    // email: "",
    level: "",
    aktif: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      username: yup
        .string()
        .required("Field Username Wajib di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karakter"),
      nama: yup
        .string()
        .required("Field Nama Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karekter"),
      // email: yup
      //   .string()
      //   .required("Field Email Wajib di isi")
      //   .email()
      //   .matches(
      //     /^[A-Z0-9._%+-]+@(?=gmail.com)[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      //     "Harus menggunakan gmail.com"
      //   ),
      // level: yup.string().required(),
    }).shape({
      level: yup.string().required("Field Level Authentication Wajib di isi").nullable(),
      aktif: yup.string().required("Field Status Akun Wajib di isi").nullable(),
    })
    .required();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const getDataUser = async () => {
    showLoader();
    await axios({
      method: "GET",
      url: `${url.api}/user/${id}`,
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log("es", res.data);
        if (res.status === 200) {
          let data = res.data;
          setValue("username", data?.username);
          setValue("nama", data?.nama);
          // setValue("email", data?.email);
          setValue("level", data?.level);
          setValue("aktif", data?.aktif);
          hideLoader();
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "warning");
      });
  };
  const styleInput = {
    width: "100%",
    borderRadius: "5px",
    outline: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  const handleInputData = (data) => {
    console.log("data", data);
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
        confirmButtonText: "Ya, Simpan data User",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `${url.api}/user/${id}`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              console.log("res", res);
              getDataUser(res.data.id_user);
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
  useEffect(() => {
    // let abortController = new AbortController();
    getDataUser();
    // return () => {
    //   getDataUser();
    //   abortController.abort();
    // };
  }, []);
  console.log('level', watch("level"))
  console.log('aktif', watch("aktif"))

  return (
    <Fragment>
      <Container style={{width: "80%", marginTop: "120px"}}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiUserCheck/> Edit User
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {loader}
        </div>
          <Form
            className="needs-validation"
            noValidate=""
            onSubmit={handleSubmit(handleInputData)}
          >
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
                  id="username"
                  type="username"
                  placeholder="Masukan Username"
                  defaultValue={watch("username")}
                  style={styleInput}
                  name="username"
                  {...register("username")}
                  className={`form-control ${
                    errors.username?.message ? "is-invalid" : "is-valid"
                  }`}
                />
                 {errors.username && (
              <p className="fw-bold text-danger">
                {errors.username.message}
              </p>
            )}
              </Col>
            </FormGroup>
            <FormGroup row>
            <Col sm={6} md={6} lg={12}>
                <Label className="form-label" for="nama">
                  Nama
                </Label>
                <input
                  id="nama"
                  type="text"
                  placeholder="Masukan Nama"
                  name="nama"
                  {...register("nama")}
              className={`form-control ${
                errors.nama?.message ? "is-invalid" : "is-valid"
              }`}
                />
               {errors.nama && (
              <p className="fw-bold text-danger">
                {errors.nama.message}
              </p>
            )}
              </Col>
            </FormGroup>
            {/* <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="email"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Email Address
              </Label>
              </Col>
              <Col sm={6} md={6} lg={12}>
                <input
                  id="email"
                  type="email"
                  placeholder="Masukan Email Anda"
                  name="email"
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
              </Col>
            </FormGroup> */}
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
                      value="USR"
                      checked={watch("level") === "USR"}
                      onClick={() => setValue("level", "USR")}
                      {...register("level")}
                      className="m-3 p-0"
                    />
                    <Label for="level">User</Label>
                    <input
                      id="level"
                      name="level"
                      type="radio"
                      value="ADM"
                      checked={watch("level") === "ADM"}
                      onClick={() => setValue("level", "ADM")}

                      {...register("level")}
                      className="m-3 p-0"
                    />
                    <Label for="level">Admin</Label>
                  </FormGroup>
              </div>
              {errors?.level && (
                  <p className="fw-bold text-danger text-center">
                    {errors?.level.message}
                  </p>
                )}
            </FormGroup>
            <FormGroup>
            <div className="d-flex justify-content-start w-100 align-items-center">
                <Label for="level" className="text-start mb-3 text-light fw-bold">
                  Status
                </Label>
                <FormGroup check>
                    <input
                      id="level"
                      name="level"
                      type="radio"
                      value="N"
                      checked={watch("aktif") === "N"}
                      onClick={() => setValue("aktif", "N")}
                      {...register("aktif")}
                      className="m-3 p-0"
                    />
                    <Label for="active">Tidak</Label>
                    <input
                      id="level"
                      name="level"
                      type="radio"
                      value="Y"
                      checked={watch("aktif") === "Y"}
                      onClick={() => setValue("aktif", "Y")}
                      {...register("aktif")}
                      className="m-3 p-0"
                    />
                    <Label for="active">Ya</Label>
                  </FormGroup>
              </div>
              {errors?.aktif && (
                  <p className="fw-bold text-danger text-center">
                    {errors?.aktif.message}
                  </p>
                )}
            </FormGroup>
           <FormGroup check row>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button  color="primary" className="px-2 me-3" size="lg"><FiSave/>  Simpan</Button>
              <Button
               className="btn btn-danger px-2"
               size="lg"
                onClick={() => {
                  nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`);
                }}
              >
                <FiChevronLeft/>
                Cancel
              </Button>
            </Col>
           </FormGroup>
          </Form>  
      </Container>
    </Fragment>
  );
};

export default ManagementUserEdit;
