import React, { Fragment, useEffect, useState, useCallback } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiLayout } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Swal from "sweetalert2";
import useFullPageLoader from "../../../components/hooks/useFullPageLoader";
import { tokenHeader, url } from "../../../helpers/config";
import Cards from "../../../pages/Card";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Container,
  CardFooter,
  CardHeader,
  FormGroup,
} from "reactstrap";

const OverviewAllMeters = () => {
  const { id } = useParams();
  console.log('id.id', id)
  const styleInput = {
    width: "100%",
    borderRadius: "4px",
    outline: "none",
    border: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  let [profile, setProfile] = useState("");
  let [items, setItems] = useState([]);

  useEffect(() => {
    // MeterGroup All Meters
    const MeterGrupAllMeters = async() => {
      let user = localStorage.getItem("profile")
     await axios ({
      url: `${url.api}/metergroup/allmeter/${id}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
     })
     .then((res)=>{
      if(res.status === 200){
        let data = res.data.data;
        console.log('data', data);
        setItems(data);
        
        hideLoader()
      }
      // console.log('items', items)
     })
     .catch((err)=>{
      console.log(err)
      hideLoader();
        Swal.fire("Sorry", `Data Gagal Di Tampilkan ${err.messege}`, "error");
     })
    }
    MeterGrupAllMeters()
    // MeterGroup Fetch
    const fetchData = async() => {
      let user = localStorage.getItem("profile")
     await axios ({
      url: `${url.api}/metergroup/fetch/${id}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
     })
     .then((res)=>{
      // console.log('response',res)
      if(res.status === 200){
        let data = res.data.data;
        console.log('response fetch data', data);
        setItems(data);
        hideLoader()
      }
     })
     .catch((err)=>{
      console.log(err)
      hideLoader();
        Swal.fire("Sorry", `Data Gagal Di Tampilkan ${err.messege}`, "error");
     })
    }
    fetchData()
    let user = localStorage.getItem("profile");
    setProfile(user);
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    if (!token && !role) {
      return (window.location.href = `${process.env.PUBLIC_URL}`);
    }
  }, []);
  console.log('items', items)
  // console.log('dataAll', dataAll)
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Row className="w-100">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2 className="fw-bold fs-3">
              <FiLayout /> OVERVIEW ALL METERS
            </h2>
          </div>
        </div>
        <span className="text-center">{loader}</span>
        {console.log('items data', items)}
        {items.map((item)=>(
          <Col className="col-md-4" key={item.id_meter}>
            {console.log(item)}
          <Card className="d-flex justify-content-center">
          <CardHeader className="bg-info p-1 d-flex">
              <Row className="align-items-cente justify-content-center">
                  <Col md={6} lg={6}>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                      Group
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase "
                    >
                      Nama
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase "
                    >
                      ID
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase "
                    >
                      Type
                    </CardTitle>
                  </Col>
                  <Col md={6} lg={6}>
                    <CardTitle
                      tag="p"
                      className="text-light text-text-uppercase text-start"
                    >
                      {item.metergroupid} / {item.area}
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                      {item.id_name}
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                     {item.id}
                    </CardTitle>
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                       {item.type}
                    </CardTitle> 
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-info  text-center p-1 m-0">
                <Form>
                  <FormGroup>
                  <Row className="text-center d-flex justify-content-center">
                      <Col lg={4} md={4} xs={2}>
                        <Label htmlFor="vavg">
                          V avg
                        </Label>
                      </Col>
                      <Col lg={4} md={4}>
                        <Label htmlFor="vavg">
                          {item.variable0 === null ?"*****": Math.ceil(item.variable0)}
                        </Label>
                      </Col>
                      <Col lg={4} md={4}>
                      <Label htmlFor="vavg">
                          V
                        </Label>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                  <Row className="text-center d-flex justify-content-center">
                     <Col lg={4} md={4} xs={2}>
                       <Label htmlFor="vavg">
                         I avg
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                       <Label htmlFor="vavg">
                       {item.variable1 === null ?"*****": item.variable1}
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                     <Label htmlFor="vavg">
                         A
                       </Label>
                     </Col>
                   </Row>
                   <Row className="text-center d-flex justify-content-center">
                     <Col lg={4} md={4} xs={2}>
                       <Label htmlFor="vavg">
                         S Total
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                       <Label htmlFor="vavg">
                       {item.variable2 === null ?"*****": item.variable2}
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                     <Label htmlFor="vavg">
                         KVA
                       </Label>
                     </Col>
                   </Row>
                   <Row className="text-center d-flex justify-content-center">
                     <Col lg={4} md={4} xs={2}>
                       <Label htmlFor="vavg">
                         P total
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                       <Label htmlFor="vavg">
                       {item.variable3 === null ?"*****": item.variable3}
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                     <Label htmlFor="vavg">
                         KW
                       </Label>
                     </Col>
                   </Row>
                   <FormGroup>
                   <Row className="text-center d-flex justify-content-center">
                     <Col lg={4} md={4} xs={2}>
                       <Label htmlFor="vavg">
                         Stand KWH
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                       <Label htmlFor="vavg">
                       {item.variable4 === null ?"*****" : item.variable4}
                       </Label>
                     </Col>
                     <Col lg={4} md={4}>
                     <Label htmlFor="vavg">
                         KWH
                       </Label>
                     </Col>
                   </Row>
                   </FormGroup>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter
                className="bg-black m-0 p-2 text-light"
              >
                <Row className="m-0">
                  <Col className="text-start fw-bolder m-0">
                    <span>1</span>
                  </Col>
                  <Col className="text-end fw-bolder m-0">
                    <span>Date-Time {moment().add(10, item.date_time).calendar()}</span>
                  </Col>
                </Row>
              </CardFooter>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OverviewAllMeters;
