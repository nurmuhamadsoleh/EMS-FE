import React, { useState, useCallback, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { tokenHeader, url } from "../../helpers/config";
import {
  FiSave,
  FiChevronLeft,
  FiDollarSign,
  FiChevronRight,
} from "react-icons/fi";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";
import useFullPageLoader from "../hooks/useFullPageLoader";
import "./billing.css";
import { classes } from "../../data/layouts";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardTitle,
} from "reactstrap";

const Billing = () => {
  var year = 2014;
  var month = 5;
  var day = 10;
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const [time, setTime] = useState(new Date());
  const [multidataApi, setMultidata] = useState([{ value: 'duren', label: 'Belah duren' }]);
  // { value: 'strawberry', label: 'Strawberry' },
  // { value: 'vanilla', label: 'Vanilla' }]);
  const multidata = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [serial, setSerial] = useState('');
  const [meterData, setMeterData] = useState({
    meterdata: [],
    area: "",
    tarifwbp: "",
    tariflwbp: "",
  });
  const [profile, setProfile] = useState(null);
  const nav = useNavigate();
  const [update, setUpdate] = useState({
    tariflwbp: "",
    tarifwbp: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  console.log("meterdata", meterData);
  const handleBilling = (e) => {
    console.log(e);
    // setBilling.push
  };

  const getData = useCallback(async () => {
    let post = update;
    showLoader();
    await axios({
      url: `${url.api}/billing?username=${profile}`,
      method: "GET",
      headers: tokenHeader(),
    })
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.data;

          setMeterData({
            meterdata: data.meterdata,
            tarifwbp: data.tarif_wbp,
            tariflwbp: data.tarif_lwbp,
          });

          let penampungmulti = [];
          meterData.meterdata.map((val,i)=> {
            let multi = {};
            multi['label'] = val.id_name;
            multi['value'] = val.id_serial;
            return penampungmulti.push(multi);
          })
          setMultidata(penampungmulti)
          console.log('penampung multi', penampungmulti)
          hideLoader();
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
      });
  }, []);
  // const handleDate = (date) => {
  //   // console.log(date);
  //   setStartDate(date);
  // };
  useEffect(() => {
    getData();
    let profile = localStorage.getItem("profile");
    setProfile(profile);
  }, [getData]);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  console.log("start date", startDate);
  const handleAdd = async (e) => {
    e.preventDefault();
    let done = true;
    let post = update;
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
            url: `${url.api}/billing/calculate?page=1`,
            headers: tokenHeader(),
            data: {start_date: update.startDate, end_date: update.endDate, start_time: update.startDate, end_time: update.endTime, id_serial: serial},
          })
            .then((res) => {
              console.log('res calculate',res);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
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
  const DateStyled = {
    borderRadius: "4px",
    width: "10%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  // const handleCalculate = () => {

  useEffect(()=> {
    let isi = [];
    let isinya = selected.map((val,i) => {
      let isine = val.value;
      return isi.push(isine)
    })
    setSerial(JSON.stringify(isi));
  }, [multidata]);

  return (
    <>
      <Container
        className="bg-primary p-3 rounded-3"
        style={{
          width: "100%",
          marginTop: "150px",
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-3 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-3">
              <FiDollarSign /> Biling
            </h1>
          </div>
        </div>
        {loader}
        <Form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onSubmit={handleAdd}
        >
          <Row>
            <Col sm={12} md={6} lg={4}>
              <FormGroup row>
                <Row>
                  <Col>
                    <Label
                      for="tarif lwbp"
                      className="text-start text-light fw-bold"
                    >
                      Tarif LWBP/kWh (Rp.)
                    </Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      id="tarif lwbp"
                      name="tarif lwbp"
                      placeholder="Masukan Tarif LWBP"
                      type="number"
                      value={meterData.tariflwbp}
                      onChange={(t) => {
                        setUpdate({
                          ...update,
                          tariflwbp: t.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup row>
                <Row>
                  <Col>
                    <Label
                      for="tarifwbp"
                      className="text-start text-light fw-bold me-2"
                    >
                      Tarif WBP/kWh (Rp.)
                    </Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      id="tarifwbp"
                      name="tarifwbp"
                      placeholder="Masukan Tarif WBP Biling"
                      type="number"
                      value={meterData.tarifwbp}
                      onChange={(t) => {
                        setUpdate({
                          ...update,
                          tarifwbp: t.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={12}>
                    <Label
                      for="enddate"
                      className="text-start text-light fw-bold"
                    >
                      Start Date
                    </Label>
                    <input
                      type="date"
                      onChange={(t) =>
                        setUpdate({ ...update, startDate: t.target.value })
                      }
                    />
                    {/* <DatePicker
                      style={DateStyled}
                      dateFormat="dd/MM/yy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      adjustDateOnChange
                      // showTimeSelect
                      locale="es"
                      selected={startDate}
                      // value={default_value}
                      onChange={handleDate}
                    /> */}
                  </Col>
                  <Col sm={12}>
                    <Label
                      for="endtime"
                      className="text-start text-light fw-bold"
                    >
                      Start Time
                    </Label>
                    <input
                      type="time"
                      onChange={(t) =>
                        setUpdate({ ...update, startTime: t.target.value })
                      }
                    />
                    {/* <DatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      selected={time}
                      // value={default_value}
                      onChange={(e) => {
                        setTime(e);
                        genDate(e, "time");
                      }}
                    /> */}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={12}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Date
                    </Label>
                    <input
                      type="date"
                      onChange={(t) =>
                        setUpdate({ ...update, endDate: t.target.value })
                      }
                    />
                    {/* <DatePicker
                      style={DateStyled}
                      dateFormat="dd-MM-yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      adjustDateOnChange
                      selected={startDate}
                      // value={default_value}
                      onChange={(e) => {
                        setStartDate(e);
                        genDate(e, "date");
                      }}
                    /> */}
                  </Col>
                  <Col sm={12}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Time
                    </Label>
                    <input
                      type="time"
                      onChange={(t) => {
                        setUpdate({ ...update, endTime: t.target.value });
                      }}
                    />
                    {/* <DatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      selected={time}
                      // value={default_value}
                      onChange={(e) => {
                        setTime(e);
                        genDate(e, "time");
                      }}
                    /> */}
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h6 className="headine">Selectable Items</h6>
              <Card
                style={{
                  width: "18rem",
                  maxHeight: "405px",
                  overflowY: "scroll",
                  borderRadius: "20px",
                }}
              >
                <pre>{JSON.stringify(selected)}</pre>
                
                  <MultiSelect
                    options={multidata.concat(multidataApi)}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                    isCreatable={true}
                    isLoading={false}
                  />
              </Card>
              <Col sm={12} md={6} lg={4}>
                <Card
                  style={{
                    width: "18rem",
                    maxHeight: "405px",
                    overflowY: "scroll",
                    borderRadius: "20px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >
                  {selected.map((d) => (
                    <ListGroup flush>
                      <ListGroupItem>{d.label}</ListGroupItem>
                    </ListGroup>
                  ))}
                </Card>
              </Col>
              <Button
                className="btn btn-danger px-4 py-1"
                size="sm"
                type="submit"
              >
                Calculate <FiChevronRight />
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};
export default Billing;
