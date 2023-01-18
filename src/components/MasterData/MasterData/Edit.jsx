import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { classes } from "../../../data/layouts";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import Swal from "sweetalert2";
import axios from "axios";
import { FiChevronLeft, FiSave, FiZap } from "react-icons/fi";

const MasterDataEdit = () => {
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  let { id } = useParams();
  console.log('id_meter', id)
  const nav = useNavigate();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const iniState = {
    id_meter: "",
    type: "",
    id_serial: "",
    id_name: "",
    metergroupid: "",
    lokasi: "",
    v_nominal: "",
    i_nominal: "",
    p_nominal: "",
    alarm_to_yesno: "",
    alarm_to_high_limit: "",
    alarm_vt_yesno: "",
    alarm_vt_low_limit: "",
    alarm_vt_high_limit: "",
    alarm_uc_yesno: "",
    alarm_uc_high_limit: "",
    alarm_oc_yesno: "",
    alarm_oc_high_limit: "",
    alarm_pf_yesno: "",
    alarm_pf_low_limit: "",
    alarm_rp_yesno: "",
    alarm_hv_high_limit: "",
    alarm_hv_yesno: "",
    alarm_hc_high_limit: "",
    alarm_hc_yesno: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  let [meterData, setMeterData] = useState([]);
  const validationSchema = yup
    .object({
      id_meter: yup.string().required("Field Meter ID Wajib Di isi"),
      type: yup.string().required("Field Meter Type Wajib Di isi"),
      id_serial: yup.string().required("Field Meter SN Wajib Di isi"),
      id_name: yup
        .string()
        .required("Field Meter Nama Wajib Di isi"),
        // .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet"),
      metergroupid: yup.string().required("Field Meter Group Wajib Di isi"),
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
      // Fild Belum ada
      alarm_to_yesno: yup.boolean().required("Field timeout Wajib di isi"),
      alarm_to_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field timeout Wajib di isi"),
      alarm_vt_yesno: yup.boolean().required("Field voltage Wajib di isi"),
      alarm_vt_low_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field voltage Current Wajib di isi"),
      alarm_vt_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field voltage Wajib di isi"),
      alarm_uc_yesno: yup.boolean().required("Field current Wajib di isi"),
      alarm_uc_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field current Wajib di isi"),
      alarm_oc_yesno: yup.boolean().required("Field Over Wajib di isi"),
      alarm_oc_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field Over Wajib di isi"),
      alarm_pf_yesno: yup.boolean().required("Field power factor Wajib di isi"),
      alarm_pf_low_limit: yup
        .number()
        .positive()
        // .integer()
        .required("Field power factor Wajib di isi"),
      alarm_rp_yesno: yup
        .boolean()
        .required("Field harmonic voltage Wajib di isi"),
      alarm_hv_yesno: yup
        .boolean()
        .required("Field harmonic voltage Wajib di isi"),
      alarm_hv_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field harmonic voltage Wajib di isi"),
      alarm_hc_yesno: yup
        .boolean()
        .required("Field harmonic current Wajib di isi"),
      alarm_hc_high_limit: yup
        .number()
        .positive()
        .integer()
        .required("Field harmonic current Wajib di isi"),
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
  const getAll = useCallback(async () => {
    showLoader();
    await axios({
      url: `${url.api}/metergroup/alldata`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let data = res.data;
          console.log("data metergroup", data);
          setMeterData(data);
          hideLoader();
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
      });
  }, []);
  useEffect(() => {
    getAll();
  }, [getAll]);
  console.log("data meterdata", meterData);
  const getDataKaryawan = useCallback(async () => {
    showLoader();
    await axios({
      method: "GET",
      url: `${url.api}/meterdata/${id}`,
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        if (res.status == 200) {
          let data = res.data;
          console.log('data meterdata', data)
          setValue("id_meter", data?.id_meter);
          setValue("type", data?.type);
          setValue("id_serial", data?.id_serial);
          setValue("id_name", data?.id_name);
          setValue("metergroupid", data?.metergroupid);
          setValue("lokasi", data?.lokasi);
          setValue("p_nominal", data?.p_nominal);
          setValue("v_nominal", data?.v_nominal);
          setValue("i_nominal", data?.i_nominal);
          setValue("alarm_to_yesno", data?.alarm_to_yesno);
          setValue("alarm_to_high_limit", data?.alarm_to_high_limit);
          setValue("alarm_vt_yesno", data?.alarm_vt_yesno);
          setValue("alarm_vt_low_limit", data?.alarm_vt_low_limit);
          setValue("alarm_vt_high_limitt", data?.alarm_vt_high_limit);
          setValue("alarm_uc_yesno", data?.alarm_uc_yesno);
          setValue("alarm_uc_high_limit", data?.alarm_uc_high_limit);
          setValue("alarm_oc_yesno", data?.alarm_oc_yesno);
          setValue("alarm_oc_high_limit", data?.alarm_oc_high_limit);
          setValue("alarm_pf_yesno", data?.alarm_pf_yesno);
          setValue("alarm_pf_low_limit", data?.alarm_pf_low_limit);
          setValue("alarm_rp_yesno", data?.alarm_rp_yesno);
          setValue("alarm_hv_high_limit", data?.alarm_hv_high_limit);
          setValue("alarm_hv_yesno", data?.alarm_hv_yesno);
          setValue("alarm_hc_yesno", data?.alarm_hc_yesno);
          setValue("alarm_hc_high_limit", data?.alarm_hc_high_limit);
          hideLoader();
          Swal.fire("sucess", "Data Berhasil Di Tampilkan", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "warning");
      });
  }, []);
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
  const handleInputData = (data) => {
    let done = true;
    let post = data;

    console.log('data post', data)
    if (done) {
      Swal.fire({
        title: "Apakah anda yakin ingin melakukan update?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan Mater Data",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `${url.api}/meterdata/${id}`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire("Succes", "Data Berhasil di Simpan", "success");
              hideLoader();
              reset();
              nav(`${process.env.PUBLIC_URL}/dasboard/masterdata/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("Sorry", "Data Gagal Melakukan Simpan", "error");
              hideLoader();
            });
        }
      });
    }
  };
  useEffect(() => {
    getDataKaryawan();
  }, [getDataKaryawan]);
  return (
    <>
      <Container style={{ width: "80%", marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiZap /> Edit Master Data
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
                defaultValue={watch("id_meter")}
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
                defaultValue={watch("type")}
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
                defaultValue={watch("id_serial")}
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
                defaultValue={watch("id_name")}
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
              {meterData.map((item, index) => {
                  <option key={index} value={item.metergroupid}>
                    console.log('item meter',item.metergroupname)
                    {item.metergroupname}
                  </option>;
                })}
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
            <legend className="fw-bold text-light">Alarm Configuration</legend>
            <FormGroup>
              <Label for="Limit" className="text-start text-light fw-bold">
                To - Timeout: High Limit (Minute)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_to_yesno"
                    name="alarm_to_yesno"
                    type="checkbox"
                    {...register("alarm_to_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_to_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                {errors?.alarm_to_yesno && (
                  <p className="fw-bold text-danger">
                    {errors?.alarm_to_yesno.message}
                  </p>
                )}
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    type="number"
                    placeholder="High Limit (Minute)"
                    defaultValue={watch("alarm_to_high_limit")}
                    {...register("alarm_to_high_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.timeout?.message ? "is-invalid" : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_to_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_to_high_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Limit">
                VT - Voltage Tolerance:(1.0-100%) V (100.1-200%)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_vt_yesno"
                    name="alarm_vt_yesno:"
                    type="checkbox"
                    {...register("alarm_vt_yesno")}
                    defaultValue={watch("alarm_vt_yesno")}
                    // checked={true}
                    defaultChecked={true}
                  />
                </Col>
                {errors?.alarm_to_yesno && (
                  <p className="fw-bold text-danger">
                    {errors?.alarm_to_yesno.message}
                  </p>
                )}
                {/* <Col sm={2}>
                  <Label for="voltage">Low Limit</Label>
                </Col> */}
                {/* <Col sm={3}>
                  <input
                    type="number"
                    placeholder="Low Limit"
                    defaultValue={watch("alarm_vt_low_limit")}
                    {...register("alarm_vt_low_limit")}
                    style={styled}
                    className={`form-control ${
                      errors.voltageTolerance?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col> */}
                <Col sm={2}>
                  <Label for="voltage">High Limit</Label>
                </Col>
                <Col sm={4}>
                <input
                    type="number"
                    placeholder="High Limit"
                    defaultValue={watch("alarm_vt_high_limit")}
                    {...register("alarm_vt_high_limit")}
                    style={styled}
                    className={`form-control ${
                      errors.alarm_vt_high_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_vt_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_vt_high_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Current">
                UC - Current Unabalance: Low Limit (1.0 - 100%)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_uc_yesno"
                    name="alarm_uc_yesno"
                    type="checkbox"
                    {...register("alarm_uc_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_uc_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    id="alarm_uc_low_limit"
                    name="alarm_uc_low_limit"
                    placeholder="Current Unbalance"
                    defaultValue={watch("alarm_uc_high_limit")}
                    {...register("alarm_uc_high_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.alarm_uc_high_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_uc_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_uc_high_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Over Current">
                OC - Over Current: High Limit (1.0 - 100%)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_oc_yesno"
                    name="alarm_oc_yesno"
                    type="checkbox"
                    {...register("alarm_oc_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_oc_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    id="Over Current"
                    name="Over Current"
                    placeholder="Over Current"
                    defaultValue={watch("alarm_oc_high_limit")}
                    {...register("alarm_oc_high_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.alarm_oc_high_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_oc_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_oc_high_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Power">
                PF - Power Factor: Low Limit (0.01 - 1.00)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_pf_yesno"
                    name="alarm_pf_yesno"
                    type="checkbox"
                    {...register("alarm_pf_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_pf_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    id="Power"
                    name="Power"
                    type="number"
                    placeholder="Power Factor"
                    defaultValue={watch("alarm_pf_low_limit")}
                    {...register("alarm_pf_low_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.alarm_pf_low_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_pf_low_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_pf_low_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Reserve Power">RP - Reserve Power</Label>
              <Row>
                <Col>
                  <input
                    id="alarm_rp_yesno"
                    name="alarm_rp_yesno"
                    type="checkbox"
                    {...register("alarm_rp_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_rp_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    id="Reserve Power"
                    name="Reserve Power"
                    placeholder="Reserve Power"
                    value={"watt1 < 0 or watt2 < 0 or wat3< 0 or watt < 0"}
                    readOnly
                    style={styledCheck}
                  />
                </Col>
              </Row>
              {errors?.alarm_rp_yesno && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_rp_yesno.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Voltage">
                HV - Harmonic Voltage: Hight Limit (1.0-100%)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_hv_yesno"
                    name="alarm_hv_yesno"
                    type="checkbox"
                    {...register("alarm_hv_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_hv_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    type="number"
                    id="Voltage"
                    name="Voltage"
                    placeholder="Harmonic Voltage"
                    defaultValue={watch("alarm_hv_high_limit")}
                    {...register("alarm_hv_high_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.alarm_hv_high_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_hv_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_hv_high_limit.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Current">
                HC - Harmonic Current : High Limit (1.0 - 100%)
              </Label>
              <Row>
                <Col>
                  <input
                    id="alarm_hc_yesno"
                    name="alarm_hc_yesno"
                    type="checkbox"
                    {...register("alarm_hc_yesno")}
                    // value={true}
                    defaultValue={watch("alarm_hc_yesno")}
                    // checked={true}
                    // defaultChecked={true}
                  />
                </Col>
                <Col
                  sm={6}
                  md={10}
                  lg={10}
                  className="d-flex justify-content-end"
                >
                  <input
                    type="number"
                    id="Current"
                    name="Voltage"
                    placeholder="Harmonic Current"
                    defaultValue={watch("alarm_hc_high_limit")}
                    {...register("alarm_hc_high_limit")}
                    style={styledCheck}
                    className={`form-control ${
                      errors.alarm_hc_high_limit?.message
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                  />
                </Col>
              </Row>
              {errors?.alarm_hc_high_limit && (
                <p className="fw-bold text-danger">
                  {errors?.alarm_hc_high_limit.message}
                </p>
              )}
            </FormGroup>
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
export default MasterDataEdit;
