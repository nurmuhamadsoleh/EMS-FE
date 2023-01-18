import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiChevronLeft, FiLayers } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { classes } from "../../../data/layouts";
import { Form, Label, FormGroup, Container, Button, Col } from "reactstrap";
import { tokenHeader, url } from "../../../helpers/config";
const styleInput = {
  width: "100%",
  borderRadius: "5px",
  outline: "none",
  fontSize: "18px",
  fontWeight: "600",
};

const MeterGroupAdd = () => {
  const nav = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const iniState = {
    metergroupid: "",
    metergroupname: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      metergroupid: yup
        .string()
        .required("Field ID Meter Group Wajib di isi")
        .min(3, "Minimal 3 Karakter"),
      metergroupname: yup
        .string()
        .required("Field ID Meter Group Wajib di isi")
        .min(5, "Minimal 5 Karakter"),
    })
    .required();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const handleAdd = async (data) => {
    console.log("meter group", data);
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
            url: `${url.api}/metergroup`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Berhasil!",
                "Data Meter Group Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              reset();
              nav(`${process.env.PUBLIC_URL}/dashboardgroup/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              hideLoader();
              Swal.fire(
                "Peringatan!",
                "Terjadi kesalahan saat menambah data meter group",
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
              <FiLayers /> Add Meter Group
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {loader}
        </div>
        <Form
          className="bg-primary p-3 pt-5 rounded-3"
          onSubmit={handleSubmit(handleAdd)}
        >
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label htmlFor="metergroupid">Meter Group ID</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                type="text"
                name="metergroup"
                placeholder="Meter Group"
                style={styleInput}
                {...register("metergroupid")}
                className={`form-control ${
                  errors.metergroupid?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.metergroupid && (
                <p className="fw-bold text-danger">
                  {errors.metergroupid.message}
                </p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email" sm={6} md={6} lg={12}>
              Meter Group Name
            </Label>
            <Col sm={6} md={6} lg={12}>
              <input
                type="text"
                name="metergroupname"
                placeholder="Nama Meter Group"
                style={styleInput}
                {...register("metergroupname")}
                className={`form-control ${
                  errors.metergroupname?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.metergroupname && (
                <p className="fw-bold text-danger">
                  {errors.metergroupname.message}
                </p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button
                className="btn btn-danger px-2"
                size="lg"
                onClick={() =>
                  nav(`${process.env.PUBLIC_URL}/dasboardgroup/${layout}`)
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
        </Form>
        {loader}
      </Container>
    </>
  );
};

export default MeterGroupAdd;
