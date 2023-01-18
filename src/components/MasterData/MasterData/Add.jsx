import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { FiSave, FiChevronLeft, FiZap } from "react-icons/fi";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { classes } from "../../../data/layouts";
import { tokenHeader, url } from "../../../helpers/config";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";

const MasterDataAdd = () => {
  const nav = useNavigate();
  const iniState = {
    id_meter: "",
    type: "",
    id_serial: "",
    id_name: "",
    // metergroupid: "",
    lokasi: "",
    v_nominal: "",
    i_nominal: "",
    p_nominal: "",
  };
  const styleInput = {
    width: "100%",
    borderRadius: "5px",
    outline: "none",
    fontSize: "18px",
    // fontWeight: "600",
  };
  const styled = {
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const styledCheck = {
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      id_meter: yup.string().required("Field Meter ID Wajib Di isi"),
      type: yup.string().required("Field Meter Type Wajib Di isi"),
      id_serial: yup.string().required("Field Meter SN Wajib Di isi"),
      id_name: yup
        .string()
        .required("Field Meter Nama Wajib Di isi"),
        // .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet"),
      // metergroupid: yup.string().required("Field Meter Group Wajib Di isi"),
      lokasi: yup
        .string()
        .required("Field Meter Location Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet"),
      v_nominal: yup
        .number()
        .positive()
        .integer()
        .required("Field Nomial Volt Wajib di isi"),
      i_nominal: yup
        .number()
        .positive()
        .integer()
        .required("Field Nomial Ampere Wajib di isi"),
      p_nominal: yup
        .number()
        .positive()
        .integer()
        .required("Field Daya Wajib di isi"),
    })
    .required();
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  // const [val, setVal] = useState(false);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  // let [meterData, setMeterData] = useState([]);
  // const getAll = useCallback(async () => {
  //   showLoader();
  //   await axios({
  //     url: `${url.api}/metergroup/alldata`,
  //     method: "GET",
  //     headers: tokenHeader(),
  //     data: {},
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         let data = res.data;
  //         console.log("data", data);
  //         // setMeterData(data);
  //         hideLoader();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       hideLoader();
  //       Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
  //     });
  // }, []);
  // console.log('meterdata', meterData)
  // useEffect(() => {
  //   getAll();
  // }, [getAll]);
  const submitAdd = (data) => {
    console.log('data add', data)
    // let done = true;
    // let post = data;
    // if (done) {
    //   Swal.fire({
    //     title: "Apa anda yakin?",
    //     text: "Data akan tersimpan di database",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Ya, Simpan data!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       showLoader();
    //       axios({
    //         url: `${url.api}/meterdata`,
    //         method: "POST",
    //         headers: tokenHeader(),
    //         data: post,
    //       })
    //         .then((res) => {
    //           console.log(res);
    //           Swal.fire(
    //             "Berhasil!",
    //             "Data Meter Group Berhasil Di Tambhakan.",
    //             "success"
    //           );
    //           hideLoader();
    //           reset();
    //           nav(`${process.env.PUBLIC_URL}/dasboard/masterdata/${layout}`);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           hideLoader();
    //           Swal.fire(
    //             "Peringatan!",
    //             "Terjadi kesalahan saat menambah data meter group",
    //             "warning"
    //           );
    //         });
    //     }
    //   });
    // }
  }
  const handleInputData = (data) =>{
    console.log('data', data)
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
            url: `${url.api}/meterdata`,
            method: "POST",
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
              nav(`${process.env.PUBLIC_URL}/dasboard/masterdata/${layout}`);
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
  }
  return (
    <>
      <Container style={{ width: "80%", marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiZap /> Add Master Data
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {loader}
        </div>
        <Form
          className="bg-primary p-3 pt-5 rounded-3"
          onSubmit={handleSubmit(handleInputData)}
        >
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label htmlFor="meterID">ID</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="meterID"
                name="meterID"
                placeholder="Masukan MeterID Anda"
                type="text"
                // defaultValue={watch("id_meter")}
                {...register("id_meter")}
                style={styleInput}
                className={`form-control ${
                  errors.id_meter?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.id_meter && (
                <p className="fw-bold text-danger">{errors.id_meter.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label htmlFor="meterType">Type</Label>
            </Col>

            <Col sm={6} md={6} lg={12}>
              <input
                id="meterType"
                name="meterType"
                placeholder="Masukan meterType Anda"
                type="text"
                // defaultValue={watch("type")}
                {...register("type")}
                style={styleInput}
                className={`form-control ${
                  errors.type?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.type && (
                <p className="fw-bold text-danger">{errors.type.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label htmlFor="meterSN">Meter SN</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="meterSN"
                name="meterSN"
                placeholder="Masukan meter SN Anda"
                type="text"
                {...register("id_serial")}
                style={styleInput}
                // defaultValue={watch("id_serial")}
                className={`form-control ${
                  errors.id_serial?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.id_serial && (
                <p className="fw-bold text-danger">
                  {errors.id_serial.message}
                </p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="meterName">Meter Nama</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="meterName"
                name="meterName"
                placeholder="Masukan meter Name Anda"
                type="text"
                {...register("id_name")}
                style={styleInput}
                // defaultValue={watch("id_name")}
                className={`form-control ${
                  errors.id_name?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.id_name && (
                <p className="fw-bold text-danger">{errors.id_name.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="meterGroup">Meter Group</Label>
            </Col>

            <Col sm={6} md={6} lg={12}>
              {/* <select
                // className={`form-control ${
                //   errors.metergroupid?.message ? "is-invalid" : "is-valid"
                // }`}
                // defaultValue={watch("metergroupid")}
                // {...register("metergroupid")}
              >
                
              </select> */}
              {/* {meterData.map((item, index) => {
                  <option key={index} value={item.metergroupid}>
                    console.log('item meter',item.metergroupname)
                    {item.metergroupname}
                  </option>;
                })} */}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="meterLocation">Meter Location</Label>
            </Col>

            <Col sm={6} md={6} lg={12}>
              <input
                id="meterLocation"
                name="meterLocation"
                placeholder="Masukan Meter Location Anda"
                type="text"
                defaultValue={watch("lokasi")}
                {...register("lokasi")}
                style={styleInput}
                className={`form-control ${
                  errors.lokasi?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.lokasi && (
                <p className="fw-bold text-danger">{errors.lokasi.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="VNominalVolt">V Nominal (Volt)</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="VNominalVolt"
                name="VNominalVolt"
                type="number"
                placeholder="V Nominal Volt"
                defaultValue={watch("v_nominal")}
                {...register("v_nominal")}
                style={styleInput}
                className={`form-control ${
                  errors.v_nominal?.message ? "is-invalid" : "is-valid"
                }`}
              />
            </Col>
            {errors?.v_nominal && (
              <p className="fw-bold text-danger">{errors?.v_nominal.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="INominalAmpere">I Nominal (Ampere)</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="INominalAmpere"
                name="INominalAmpere"
                placeholder="I Nominal Ampere"
                type="number"
                defaultValue={watch("i_nominal")}
                {...register("i_nominal")}
                style={styleInput}
                className={`form-control ${
                  errors.i_nominal?.message ? "is-invalid" : "is-valid"
                }`}
              />
            </Col>
            {errors?.i_nominal && (
              <p className="fw-bold text-danger">{errors?.i_nominal.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Col sm={6} md={6} lg={12}>
              <Label for="Daya">Daya (VA)</Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="Daya"
                name="Daya"
                placeholder="Masukan Daya (VA) Anda"
                type="number"
                defaultValue={watch("p_nominal")}
                {...register("p_nominal")}
                style={styleInput}
                className={`form-control ${
                  errors.p_nominal?.message ? "is-invalid" : "is-valid"
                }`}
              />
            </Col>
            {errors?.p_nominal && (
              <p className="fw-bold text-danger">{errors?.p_nominal.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button
                className="btn btn-danger px-2"
                size="lg"
                onClick={() =>
                  nav(`${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}`)
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
      </Container>
    </>
  );
};
export default MasterDataAdd;
