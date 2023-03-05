import React, { useState, useCallback, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import TimePicker from "react-time-picker";
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const [multidata, setMultidata] = useState([]);
  const [serial, setSerial] = useState('');
  // { value: 'strawberry', label: 'Strawberry' },
  // { value: 'vanilla', label: 'Vanilla' }]);
  // const multidata = [
  // ]
  const [update, setUpdate] = useState({
    tariflwbp: "",
    tarifwbp: "",
    var_date_from: moment(startDate).format("YYYY-MM-DD"),
    time_from: "",
    var_date_end: moment(endDate).format("YYYY-MM-DD"),
    time_end: "",
    meters: '',
  });
  let dataMeter = [];
  multidata.map((d) => {
    let object = {};
    object["label"] = d.id_name;
    object["value"] = d.id_serial;
    return dataMeter.push(object);
  })
  let resultSelected = [];
  selected.map((d) => {
    let meterGroup = d.value;
    return resultSelected.push(meterGroup);
  })
  console.log('resultselected', JSON.stringify(resultSelected))
  // setSerial(resultSelected);
  // console.log("serial", resultSelected)
  let dataJoin = resultSelected.join();
  // console.log("serial", dataJoin);
  // console.log("date", JSON.stringify(moment(startDate).format("YYYY-MM-DD")))
  // setSerial(dataJoin);
  // console.log("update serial", serial)
  useEffect(() => {
    let dataJoin = resultSelected.join();
    setSerial(dataJoin)
    console.log('serr ', serial);
    // Hanya melakukan copy semua variabel state update, tetapi value default state tidk melakuka copy, jadi perlu
    //melakukan define ulang untuk copy value yang memilki state terpisah seperti startdate dan enddate
    setUpdate({ ...update, var_date_from: moment(startDate).format("YYYY-MM-DD"), 
    var_date_end: moment(endDate).format("YYYY-MM-DD"),
    meters: JSON.stringify(resultSelected) })
  }, [selected])

  const [meterData, setMeterData] = useState({
    // meterdata: [],
    tarifwbp: "",
    tariflwbp: "",
  });
  const [profile, setProfile] = useState(null);
  const nav = useNavigate();
  // console.log("meterdata", meterData);
  //Nanti ini yang dikirim ke state e.setValue
  // console.log()
  // const handleBilling = (e) => {
  //   console.log(e);
  //   // setBilling.push
  // };

  const getData = useCallback(async () => {
    // let post = update;
    showLoader();
    await axios({
      url: `${url.api}/billing?username=${profile}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.data;
          setMultidata(data.meterdata);
          setMeterData({
            // meterdata: data.meterdata,
            tarifwbp: data.tarif_wbp,
            tariflwbp: data.tarif_lwbp,
          });

          // let penampungmulti = [];
          // meterData.meterdata.map((val,i)=> {
          //   let multi = {};
          //   multi['label'] = val.id_name;
          //   multi['value'] = val.id_serial;
          //   return penampungmulti.push(multi);
          //   // return multidata.push(multi)
          // })
          // setMultidata(penampungmulti)
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
  }, []);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );

  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  // console.log("start date", startDate);
  console.log('penampung multi', multidata)
  console.log('update', update);//hasil dari setUpdate yang akan di kirim kan ke Database
  const handleDelete = (e) => {
    e.preventDefault()
    console.log("data array", selected)
    selected.length = 0
    setSelected([])
  }
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
            data: post
            // data: {start_date: update.startDate, end_date: update.endDate, start_time: update.startDate, end_time: update.endTime, meters: resultSelected},
          })
            .then((res) => {
              console.log('res calculate',res);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              nav(`${process.env.PUBLIC_URL}/calculate/${layout}`);
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

  // useEffect(()=> {
  //   let isi = [];
  //   let isinya = selected.map((val,i) => {
  //     let isine = val.value;
  //     return isi.push(isine)
  //   })
  //   setSerial(JSON.stringify(isi));
  // }, [multidata]);
  // console.log('serial', serial)
  console.log('selected', selected)
  console.log('master data', meterData.tariflwbp)
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
          <FormGroup>
            <Row className="d-flex justify-content-between ms-3 me-3">
              <Col sm={12} lg={4} md={4}>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="tarif lwbp"
                      className="text-start text-light fw-bold"
                    >
                      Tarif LWBP/kWh (Rp.)
                    </Label>
                  </Col>
                  <Col sm={12} lg={6} md={6}>
                    <input
                      id="tarif lwbp"
                      name="tarif lwbp"
                      placeholder="Masukan Tarif LWBP"
                      type="number"
                      defaultValue={meterData.tariflwbp}
                      // value={meterData.tariflwbp}
                      onChange={(t) => {
                        console.log('event', t)
                        setUpdate({
                          ...update,
                          tariflwbp: t.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="tarifwbp"
                      className="text-start text-light fw-bold me-2"
                    >
                      Tarif WBP/kWh (Rp.)
                    </Label>
                  </Col>
                  <Col sm={12} lg={6} md={6}>
                    <input
                      id="tarifwbp"
                      name="tarifwbp"
                      placeholder="Masukan Tarif WBP Biling"
                      type="number"
                      defaultValue={meterData.tarifwbp}
                      // value={meterData.tarifwbp}
                      onChange={(t) => {
                        setUpdate({
                          ...update,
                          tarifwbp: t.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="enddate"
                      className="text-start text-light fw-bold"
                    >
                      Start Date
                    </Label>
                  </Col>
                  <Col sm={12} lg={6} md={6}>
                    {/* <input
                          type="date"
                          onChange={(t) =>
                            setUpdate({ ...update, startDate: t.target.value })
                          }
                        /> */}
                    <DatePicker
                      style={DateStyled}
                      dateFormat="dd/MM/yy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      // adjustDateOnChange
                      filterDate={date => date.getDay() != 6}
                      // showTimeSelect
                      // locale="es"
                      selected={startDate}
                      // value={default_value}
                      onChange={setStartDate}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="endtime"
                      className="text-start text-light fw-bold"
                    >
                      Start Time
                    </Label>
                  </Col>
                  <Col sm={12} lg={6} md={6}>
                    <input
                      type="time"
                      onChange={(t) => {
                        setUpdate({ ...update, time_from: t.target.value });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Date
                    </Label>
                  </Col>
                  <Col sm={12} lg={6} md={6}>
                    <DatePicker
                      style={DateStyled}
                      dateFormat="dd-MM-yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      adjustDateOnChange
                      selected={endDate}
                      // value={default_value}
                      onChange={(e) => {
                        setEndDate(e);
                        // genDate(e, "date");
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6} md={6}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Time
                    </Label>
                  </Col>
                  <Col lg={6} sm={12} md={6}>
                    <input
                      type="time"

                      onChange={(t) => {
                        setUpdate({ ...update, time_end: t.target.value });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={12} lg={4} md={4}>
                <Card
                  style={{
                    width: "22rem",
                    // maxHeight: "410px",
                    overflowY: "hidden",
                    // borderRadius: "2",

                  }}
                >
                  <MultiSelect
                    options={dataMeter}
                    value={selected}
                    onChange={setSelected}
                    // labelledBy={"Select"}
                    disableSearch={true}
                    isCreatable={true}
                    disabled={false}
                    isLoading={false}
                    debounceDuration={300}
                    hasSelectAll={true}
                    className="new-css-rule"
                  />
                  <Button type="submit" className="mt-3" color="primary" onClick={handleDelete}>Delete Selected</Button>
                  {console.log('selected', selected)}
                </Card>
              </Col>
              <Col sm={12} lg={4} md={4}>
                <Card
                  style={{
                    width: "22rem",
                    // maxHeight: "405px",
                    overflowY: "hidden",
                    // borderRadius: "20px",
                  }}
                >
                  <ListGroup flush style={{ height: "400px", backgroundColor: "white", overflowX: "hidden" }}>
                    {selected.length <= 0 ? [] : selected.map((d, index) => (
                      <div key={index}>
                        <ListGroupItem action={true} style={{ overflow: "hidden" }}>{d.label}</ListGroupItem>
                      </div>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
              <Button
                className="btn btn-danger px-4 fs-4"
                size="lg"
                type="submit"
              >
                Calculate <FiChevronRight />
              </Button>
            </Row>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};
export default Billing;
