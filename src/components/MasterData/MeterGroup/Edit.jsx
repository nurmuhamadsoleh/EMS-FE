import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classes } from "../../../data/layouts";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Form, Label, FormGroup, Container, Button, Col } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FiChevronsLeft, FiLayers, FiSave } from "react-icons/fi";
import { tokenHeader, url } from "../../../helpers/config";

const MeterGroupEdit = () => {
  const nav = useNavigate();
  let { id } = useParams();
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
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const getDataKaryawan = useCallback(async () => {
    showLoader();
    await axios({
      method: "GET",
      url: `${url.api}/metergroup/${id}`,
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          let data = res.data;
          setValue("metergroupid", data?.metergroupid);
          setValue("metergroupname", data?.metergroupname);
          hideLoader();
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
    fontWeight: "600",
  };
  const handleInputData = (data) => {
    console.log("submit data", data);
    let done = true;
    let post = data;
    if (done) {
      Swal.fire({
        title: "Apakah anda yakin ingin melakukan update?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan Meter Group",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `${url.api}/metergroup/${id}`,
            headers: tokenHeader(),
            data: post,
          })
            .then((res) => {
              getDataKaryawan(res.data.rows.id_seq);
              Swal.fire("Succes", "Data Berhasil di Simpan", "success");
              hideLoader();
              reset();
              nav(`${process.env.PUBLIC_URL}/dashboardgroup/${layout}`);
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
    // const abortController = new AbortController();
    getDataKaryawan();
    // return () => {
    //   getDataKaryawan();
    //   abortController.abort();
    // };
  }, [getDataKaryawan]);
  return (
    <Container style={{ width: "80%", marginTop: "120px" }}>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-start align-items-start">
          <h1 className="fw-bold fs-4 mb-3">
            <FiLayers /> Edit Meter Group
          </h1>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {loader}
      </div>
      <Form
        className="bg-primary rounded-3 p-2"
        onSubmit={handleSubmit(handleInputData)}
      >
        <FormGroup row>
          <Col sm={6} md={6} lg={12}>
            <Label htmlFor="metergroupid">Meter Group ID</Label>
          </Col>
          <Col sm={6} md={6} lg={12}>
            <input
              type="text"
              name="metergroupid"
              placeholder="Meter Group"
              defaultValue={watch("metergroupid")}
              style={styleInput}
              {...register("metergroupid")}
              className={`form-control ${
                errors.metergroupid?.message ? "is-invalid" : "is-valid"
              }`}
            />
            {errors.name && (
              <p className="fw-bold text-danger">
                {errors.metergroupid.message}
              </p>
            )}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={6} md={6} lg={12}>
            <Label htmlFor="metergroupname">Meter Group Name</Label>
          </Col>
          <Col sm={6} md={6} lg={12}>
            <input
              type="text"
              name="metergroupname"
              id="metergroupname"
              placeholder="Masukan Nama Meter Group Anda"
              defaultValue={watch("metergroupname")}
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
        <FormGroup row>
          <Col className="col-sm-12 d-flex justify-content-center">
            <Button
              className="btn btn-danger px-2"
              size="lg"
              onClick={() =>
                nav(`${process.env.PUBLIC_URL}/dashboardgroup/${layout}`)
              }
            >
              <FiChevronsLeft />
              Cancel
            </Button>
            <Button color="primary" className="px-2 ms-3" size="lg">
              <FiSave className="me-2" />
              Update
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default MeterGroupEdit;
