import React, {useEffect, useRef, useCallback} from "react";
import useFullPageLoader from "../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import {BsSpeedometer2} from "react-icons/bs"
import { classes } from "../../data/layouts";
import {useNavigate} from "react-router";
import axios from "axios";
import {tokenHeader, url} from "../../helpers/config";
import { useState } from "react";
import CardMeterDigital from "../../layout/meterdigital";
import { Container, Input, Label, Row, Col, Card } from "reactstrap";

const Variabel = () =>{
  const nav = useNavigate();
  const [meterGroup, setMeterGroup] = useState([]);
  const [variabel, setVariabel] = useState({
    "id_counter": "",
        "date_time": "",
        "id": "",
        "type": "",
        "com": "",
        "modbus": "",
        "status": "",
        "v1": "",
        "v2": "",
        "v3": "",
        "v12": "",
        "v23": "",
        "v31": "",
        "i1": "",
        "i2": "",
        "i3": "",
        "inet": "",
        "watt1": "",
        "watt2": "",
        "watt3": "",
        "watt": "",
        "va1": "",
        "va2": "",
        "va3": "",
        "va": "",
        "freq": "",
        "pf1": "",
        "pf2": "",
        "pf3": "",
        "kwh_exp": "",
        "kwh_exp_satuan": "",
        "kwh_imp": "",
        "kwh_imp_satuan": "",
        "kvarh_exp": "",
        "kvarh_exp_satuan": "",
        "kvarh_imp": "",
        "kvarh_imp_satuan": "",
        "kvah": "",
        "thd_v1": "",
        "thd_v2": "",
        "thd_v3": "",
        "thd_i1": "",
        "thd_i2": "",
        "thd_i3": "",
        "kwh1": "",
        "kwh2": "",
        "kwh": "",
        "power": "",
        "v_nominal": "",
        "i_nominal": "",
        "v1_formatted": "",
        "v2_formatted": "",
        "v3_formatted": "",
        "v12_formatted": "",
        "v23_formatted": "",
        "v31_formatted": "",
        "i1_formatted": "",
        "i2_formatted": "",
        "i3_formatted": "",
        "inet_formatted": "",
        "watt1_formatted": "",
        "watt2_formatted": "",
        "watt3_formatted": "",
        "watt_formatted": "",
        "va1_formatted": "",
        "va2_formatted": "",
        "va3_formatted": "",
        "va_formatted": "",
        "freq_formatted": "",
        "pf1_formatted": "",
        "pf2_formatted": "",
        "pf3_formatted": "",
        "kwh_exp_formatted": "",
        "kwh_imp_formatted": "",
        "kvarh_exp_formatted": "",
        "kvarh_imp_formatted": "",
        "kvah_formatted": "",
        "thd_v1_formatted": "",
        "thd_v2_formatted": "",
        "thd_v3_formatted": "",
        "thd_i1_formatted": "",
        "thd_i2_formatted": "",
        "thd_i3_formatted": "",
        "kwh1_formatted": "",
        "kwh2_formatted": "",
        "kwh_formatted": "",
  })
  let [loader, showLoader, hideLoader] = useFullPageLoader();
  const getData = async () => {
    showLoader();
    await axios({
      url: `${url.api}/variabel?id=COM1_6`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
    .then((res)=>{
      // console.log('res variabel',res);
      let data = res.data.data;
      console.log('data', data)
      setVariabel({
        "id_counter": parseInt(data.id_counter),
        "date_time": data.date_time,
        "id": data.id,
        "type": data.type,
        "com": data.com,
        "modbus": data.modbus,
        "status":data.status,
        "v1": data.v1,
        "v2": data.v2,
        "v3": data.v3,
        "v12": data.v12,
        "v23": data.v23,
        "v31": data.v31,
        "i1": data.i1,
        "i2": data.i2,
        "i3": data.i3,
        "inet": data.inet,
        "watt1": data.watt1,
        "watt2": data.watt2,
        "watt3": data.watt3,
        "watt": parseInt(data.watt),
        "va1": data.va1,
        "va2": data.va2,
        "va3": data.va3,
        "va": parseInt(data.va),
        "freq": data.freq,
        "pf1": data.pf1,
        "pf2": data.pf2,
        "pf3": data.pf3,
        "kwh_exp": data.kwh_exp,
        "kwh_exp_satuan": data.kwh_exp_satuan,
        "kwh_imp": data.kwh_imp,
        "kwh_imp_satuan": data.kwh_imp_satuan,
        "kvarh_exp": data.kvarh_exp,
        "kvarh_exp_satuan": data.kvarh_exp_satuan,
        "kvarh_imp": data.kvarh_imp,
        "kvarh_imp_satuan": data.kvarh_imp_satuan,
        "kvah": data.kvah,
        "thd_v1": data.thd_v1,
        "thd_v2": data.thd_v2,
        "thd_v3": data.thd_v3,
        "thd_i1": data.thd_i1,
        "thd_i2": data.thd_i2,
        "thd_i3": data.thd_i3,
        "kwh1": data.kwh1,
        "kwh2": data.kwh2,
        "kwh": data.kwh,
        "power": data.power,
        "v_nominal": data.v_nominal,
        "i_nominal": data.i_nominal,
        "v1_formatted": data.v1_formatted,
        "v2_formatted": data.v2_formatted,
        "v3_formatted": data.v3_formatted,
        "v12_formatted": data.v12_formatted,
        "v23_formatted": data.v23_formatted,
        "v31_formatted": data.v31_formatted,
        "i1_formatted": data.i1_formatted,
        "i2_formatted": data.i2_formatted,
        "i3_formatted": data.i3_formatted,
        "inet_formatted": data.inet_formatted,
        "watt1_formatted": data.watt1_formatted,
        "watt2_formatted": data.watt2_formatted,
        "watt3_formatted": data.watt3_formatted,
        "watt_formatted": data.watt_formatted,
        "va1_formatted": data.va1_formatted,
        "va2_formatted": data.va2_formatted,
        "va3_formatted": data.va3_formatted,
        "va_formatted": data.va_formatted,
        "freq_formatted": data.freq_formatted,
        "pf1_formatted": data.pf1_formatted,
        "pf2_formatted": data.pf2_formatted,
        "pf3_formatted": data.pf3_formatted,
        "kwh_exp_formatted": data.kwh_exp_formatted,
        "kwh_imp_formatted": data.kwh_imp_formatted,
        "kvarh_exp_formatted": data.kvarh_exp_formatted,
        "kvarh_imp_formatted": data.kvarh_imp_formatted,
        "kvah_formatted": data.kvah_formatted,
        "thd_v1_formatted": data.thd_v1_formatted,
        "thd_v2_formatted": data.thd_v2_formatted,
        "thd_v3_formatted": data.thd_v3_formatted,
        "thd_i1_formatted": data.thd_i1_formatted,
        "thd_i2_formatted": data.thd_i2_formatted,
        "thd_i3_formatted": data.thd_i3_formatted,
        "kwh1_formatted": data.kwh1_formatted,
        "kwh2_formatted": data.kwh2_formatted,
        "kwh_formatted": data.kwh_formatted,
      })
      hideLoader();
    })
    .catch((err)=>{
      console.log(err);
      hideLoader();
      Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
    });
  };
  const getMeterData = useCallback(async () =>{
    showLoader();
    let profile = localStorage.getItem("profile");
    await axios({
      url: `${url.api}/trend/datameter?username=${profile}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
    .then((res)=>{
      let data = res.data.data;
      console.log("data tren", data[0])
      setMeterGroup(data[0]);
      hideLoader();
    })
    .catch((err)=>{
      console.log("err", err)
      hideLoader();
      Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
    })
  },[]);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  useEffect(()=>{
    getData();
    getMeterData();
  },[])
  const styled = {
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  console.log('variabel', variabel)
  return (
    <>
      <div className="row w-100" style={{marginTop: "180px", marginLeft: "5px"}}>
        <div className="col">
          <div className="row mb-2 bg-secondary">
            <div className="col-sm-12 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-2">
               <BsSpeedometer2 className="me-3"/> Varibel
              </h1>
            </div>
            <div className="row my-3">
              <div className="col-sm-6">
                <Label for="variabel" className="text-start text-light fw-bold">
                  Meter (ID|Name|Group|Location-Type)
                </Label>
              </div>
              <div className="col-sm-6">
                <Input id="variable" name="variabel" type="select" style={styled}>
                  {meterGroup.map((data, index)=>(
                    <option key={index} value={data.id_serial}>{data.id} | {data.id_name} | {data.area} | {data.lokasi} type {data.type}</option>
                  ))}
                </Input>
              </div>
            </div>
          </div>
          <Container fluid>
          <div className="d-flex justify-content-center align-items-center">
            {loader}
          </div>
            <Row>
            <Col md={12} lg={12}>
                <Col md={3} lg={3}>
                  <CardMeterDigital />
                </Col>
                <Col md={3} lg={3}>
                  <CardMeterDigital  />
                </Col>
                {/* <Col md={3} lg={3}>
                  <CardMeterDigital />
                </Col> */}
              </Col>
            </Row>
          </Container>
        </div>

      </div>
    </>
  )
}
export default Variabel;