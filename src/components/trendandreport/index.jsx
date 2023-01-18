import React, { Fragment, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Label,
  FormGroup,
  Button,
} from "reactstrap";
import { FiPrinter, FiSearch } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
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
  const azb = (v) => {
    // Jika Date / Tahun/Minute/Second Jika Kurang dari 1 maka tambahkan angka 0 di depannya
    if (parseInt(v) < 10) {
      v = "0" + v;
    }
    return v;
  };
  const genDate = (e, type) => {
    const d = new Date(e);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    //JIka Month yang di pilih sudah lebih dri 12 dan jika month yang di pilih terakhir/tinggal 1 maka tambahkan tahun nya.
    if (month > 12) {
      month = 1;
      ++year;
    }
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    year = azb(year);
    month = azb(month);
    date = azb(date);
    hour = azb(hour);
    minute = azb(minute);
    second = azb(second);

    if (type == "date") {
      return `${date}-${month}-${year}`;
    } else if (type == "time") {
      return `${hour}:${minute}:${second}`;
    } else if (type == "datetime") {
      return `${date}-${month}-${year} ${hour}:${minute}:${second}`;
    }
    return d;
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
  return (
    <>
      <Container>
        <div
          className="col-md-6 d-flex justify-content-start align-items-start"
          style={{ marginTop: "110px" }}
        >
          <h1 className="fw-bold fs-3">Meter Group</h1>
        </div>
        <Form className="bg-black my-3 p-2 rounded" style={{ width: "95%" }}>
          <FormGroup>
            <Row>
              <Col sm={4}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  Meter (Id|Name|Group|Location-Type)
                </Label>
                <select
                  id="jurusan"
                  name="jurusan"
                  type="select"
                  style={styled}
                >
                  <option value="Sistem Informasi">
                    Comp1_1|WWTP NEW|POWER HOUSE & WWTP | WWTP
                  </option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="MultiMedia">MultiMedia</option>
                  <option value="Sipil">Sipil</option>
                </select>
              </Col>
              <Col sm={2}>
                <Label for="meterID" className="text-start text-light fw-bold">
                  Show Data
                </Label>
                <select
                  id="jurusan"
                  name="jurusan"
                  type="select"
                  style={styled}
                >
                  <option value="Sistem Informasi">Line</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="MultiMedia">MultiMedia</option>
                  <option value="Sipil">Sipil</option>
                </select>
              </Col>
              <Col sm={2}>
                <Label for="meterID" disabled>
                  Show Data
                </Label>
                <select
                  id="jurusan"
                  name="jurusan"
                  type="select"
                  style={styled}
                >
                  <option>Meter Variabel</option>
                  <option value="Sistem Informasi">Hourly</option>
                  <option value="Ekonomi">Month</option>
                  <option value="MultiMedia">Weekday</option>
                </select>
              </Col>
              <Col sm={2}>
                <Label for="meterID" disabled>
                  Show Data
                </Label>
                <select
                  id="jurusan"
                  name="jurusan"
                  type="select"
                  style={styled}
                >
                  <option value="Line">Line</option>
                  <option value="Bar">Bar</option>
                </select>
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
                />
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
                    genDate(e, "time");
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
                    genDate(e, "date");
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
                    genDate(e, "time");
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
              <Col
                sm={2}
                className="d-flex justify-content-center align-items-center mt-3"
              >
                <Button className="btn-info d-flex align-items-center ms-auto">
                  <FiPrinter className="fs-2 text-primary pe-1" />
                  Print PDF
                </Button>
              </Col>
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
