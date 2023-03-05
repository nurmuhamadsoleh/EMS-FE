import React, { Fragment, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {url,tokenHeader} from "../../helpers/config";
import useFullPageLoader from "../hooks/useFullPageLoader";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  Form,
  Label,
  FormGroup,
  Button,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  InputGroup,
} from "reactstrap";
import { FiPrinter, FiSearch } from "react-icons/fi";
import { Line } from "react-chartjs-2";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback } from "react";
import { useEffect } from "react";
import moment from "moment";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendAndReport = () => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(1);
  const [trend, setTrend] = useState([]);
  const [selected, setSelected] = useState([]);
  const iniState = {
    id_name: "",
    datasource: "",
    graph_title: "",
    start_date: "",
    // end_date: "",
    // start_time: "",
    // end_time: "",
    // remember: "",
  }
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const today = moment().format("DD-MM-YYYY")
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      id_name: yup
        .string()
        .required("Field id name wajib di isi"),
        // .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet"),
      datasource: yup.string().required("Fild Show Data wajib di isi"),
      graph_title: yup.string().required("Fild Model Grafik wajib di isi"),
      start_date: yup.date().required("Date is required")
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
  // trend.map((item)=>(
  //   // console.log("item trennd", item)
  //   setSelected(item)
  // ))
  // console.log('select',selected)
  const report = [
    {
      label: "Hourly",
      value: "Hourly",
    },
    {
      label: "Detail",
      value: "Detail",
    },
    {
      label: "Daily",
      value: "Daily",
    }
  ]
  const modelGrafik = [
    {
      label: "--Model Grafik--",
      value: "",
    },
    {
      label: "Line",
      value: "Line",
    },
    {
      label: "Bar",
      value: "Bar"
    }
  ]
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Data Trend & Reports",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(208, 214, 15)",
        borderColor: "rgba(208, 214, 15)",
        pointBorderColor: "rgba(208, 214, 15)",
        pointBackgroundColor: "#f26711",
        yAxisID: "y",
        hoverOffset: 4,
        pointHitRadius: 40,
        pointRadius: 8,
      },
      {
        label: "Dataset 2",
        data: [50, 60, 100, 91, 58, 59, 100],
        backgroundColor: "rgba(27, 182, 224)",
        borderColor: "rgba(27, 182, 224)",
        pointBorderColor: "rgba(27, 182, 224)",
        pointBackgroundColor: "#f26711",
        pointHitRadius: 40,
        pointRadius: 8,
        yAxisID: "y",
        hoverOffset: 4,
      },
    ],
  };
  const styled = {
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const styles = {
    backgroundColor: "#FFF",
    color: "#FFF",
    marginTop: "20px",
    height: "auto",
    borderRadius: "10px",
  };
  const DateStyled = {
    borderRadius: "4px",
    width: "10%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const getAll = async () => {
    showLoader()
    let profile = localStorage.getItem("profile")
    await axios({
      url:`${url.api}/trend/datameter?username=${profile}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
    .then((res) =>{
      let data = res.data.data;
      console.log('data tren',data[0])
      setTrend(data[0])
      // let dataSelected = trend.map((d)=>(
      //   // console.log('d',d)
      //   setSelected(d)
      // ))
      hideLoader()
    })
    .catch((err)=>{
      console.log(err)
      hideLoader()
      Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
    })
  };
  useEffect(()=>{
    getAll();
  },[]);
  console.log("start date", startDate)
  console.log('state trend', trend)
  // Select Option
  trend.map((data)=>(
    console.log('data trend obj id serial', data.metergroupname)
  ))
  // {selected[0].forEach(element => {
  //   console.log('item dta',element.id_serial)
  // })}
  console.log("startDate", moment(startDate).format("L"));
  const handleInput = (data) => {
    console.log('data tred', data);
  }
  return (
    <>
      <Container>
        <div
          className="col-md-6 d-flex justify-content-start align-items-start"
          style={{ marginTop: "110px" }}
        >
          <h1 className="fw-bold fs-3">Meter Group</h1>
        </div>
        <Form className="bg-black my-3 p-2 rounded" style={{ width: "95%" }} onSubmit={handleSubmit(handleInput)}>
          <FormGroup>
            <Row>
              <Col sm={4}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  Meter (Id|Name|Group|Location-Type)
                </Label>
                {/* {selected.map((item)=>(
                  console.log('hasil selected', item)
                ))} */}
                <Input
                  id="id_name"
                  name="id_name"
                  type="select"
                  style={styled}
                  defaultValue={watch("id_name")}
                  {...register("id_name")}
                >
                  {trend?.map((data)=>(
                    <option value={data.metergroupid}>{data.id} | {data.id_name} | {data.area} | {data.lokasi} type {data.type}</option>
                  ))}
                </Input>
              </Col>
              <Col sm={2}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  Show Data
                </Label>
                <Input
                  id="datasource"
                  name="datasource"
                  type="select"
                  style={styled}
                  defaultValue={watch("datasource")}
                  {...register("datasource")}
                >
                  {report.map((item, index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                  ))}
                </Input>
              </Col>
              <Col sm={2}>
                <Label for="meterID">
                  Show Data
                </Label>
                {/* <Accordion open={open} toggle={toggle} style={{position: "relative"}}>
                  <AccordionItem>
                    <AccordionHeader targetId="1">Accordion Item 1</AccordionHeader>
                    <AccordionBody accordionId="1"  style={{position: "absolute", right: "0px", left: "0px", top: "150px", backgroundColor: "red", width: "100%", height: "50px"}}>
                      <strong>This is the first item&#39;s accordion body.</strong>
                      You can modify any of this with custom CSS or overriding our default
                      variables. It&#39;s also worth noting that just about any HTML can
                      go within the <code>.accordion-body</code>, though the transition
                      does limit overflow.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                    <AccordionBody accordionId="2">
                      <strong>This is the second item&#39;s accordion body.</strong>
                      You can modify any of this with custom CSS or overriding our default
                      variables. It&#39;s also worth noting that just about any HTML can
                      go within the <code>.accordion-body</code>, though the transition
                      does limit overflow.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                    <AccordionBody accordionId="3">
                      <strong>This is the third item&#39;s accordion body.</strong>
                      You can modify any of this with custom CSS or overriding our default
                      variables. It&#39;s also worth noting that just about any HTML can
                      go within the <code>.accordion-body</code>, though the transition
                      does limit overflow.
                    </AccordionBody>
                  </AccordionItem>
                </Accordion> */}
                {/* <Input
                  id="jurusan"
                  name="jurusan"
                  type="select"
                  style={styled}
                  // style={{width: "100%", height: 30, backgroundColor: "red"}}
                >
                  <option>Meter Variabel</option>
                  <div style={{width: "100%", height: 30, backgroundColor: "red"}}>
                  <option value="Sistem Informasi">Hourly</option>
                  <option value="Ekonomi">Month</option>
                  <option value="MultiMedia">Weekday</option>
                  </div>
                </Input> */}
              </Col>
              <Col sm={2}>
                <Label for="graph_title" className="text-start text-light fw-bold">
                  Model Grafik
                </Label>
                <Input
                  id="graph_title"
                  name="graph_title"
                  type="select"
                  style={styled}
                  defaultValue={watch('graph_title')}
                  {...register("graph_title")}
                >
                  {modelGrafik.map((item, index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                  ))}
                </Input>
              </Col>
              <Col
                sm={2}
                className="d-flex align-items-center justify-content-md-center justify-content-sm-start mt-4"
              >
                <input type="checkbox" name="show" id="show" />
                <Label
                  check
                  htmlFor="show"
                  className="text-start text-light fw-bold ms-2"
                >
                  {""}
                  Show Point Value
                </Label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <Label
                  for="meterID"
                  className="text-start text-light fw-bold"
                  style={{
                    backgroundColor: "#1804c9",
                    display: "inline-block",
                  }}
                >
                  Start Date
                </Label>
                <DatePicker
                  style={DateStyled}
                  dateFormat="dd-MM-yyyy"
                  dropdownMode="select"
                  showMonthDropdown
                  showYearDropdown
                  // adjustDateOnChange
                  filterDate={date => date.getDay() !=6}
                  selected={startDate}
                  // value={default_value}
                  // onChange={(start_date) => {
                  //   setStartDate(start_date);
                  //   setValue("start_date", start_date)
                  //   genDate(e, "date");
                  // }}
                  onChange={setStartDate}
                  {...register("start_date")}
                />
                {errors.start_date && (
                <p className="fw-bold text-danger">
                  {errors.start_date.message}
                </p>
              )}
              </Col>
              <Col sm={2}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  Start Time
                </Label>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  selected={time}
                  // value={default_value}
                  onChange={(e) => {
                    setTime(e);
                    // genDate(e, "time");
                  }}
                />
              </Col>
              <Col sm={2}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  End Date
                </Label>
                <DatePicker
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
                    // genDate(e, "date");
                  }}
                />
              </Col>
              <Col sm={2}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  End Time
                </Label>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  selected={time}
                  // value={default_value}
                  onChange={(e) => {
                    setTime(e);
                    // genDate(e, "time");
                  }}
                />
              </Col>
              <Col
                sm={2}
                className="d-flex justify-content-center align-items-center mt-3"
              >
                <Button className="btn-info d-flex align-items-center justify-content-end ms-5">
                  <FiSearch className="fs-2 text-primary" />
                  Search
                </Button>
              </Col>
              {/* <Col
                sm={2}
                className="d-flex justify-content-center align-items-center mt-3"
              >
                <Button className="btn-info d-flex align-items-center ms-auto">
                  <FiPrinter className="fs-2 text-primary pe-1" />
                  Print PDF
                </Button>
              </Col> */}
            </Row>
            <Row>
              <Col className="col-sm-12">
                <Line style={styles} options={options} data={data} />;
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default TrendAndReport;
