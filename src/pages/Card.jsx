import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  CardFooter,
  CardHeader,
  FormGroup,
} from "reactstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Cards(props) {
  //   let [showPassConfirm, setShowPassConfirm] = useState(false);
  let [newShowPass, setNewShowPass] = useState(false);
  //   const [loader, showLoader, hideLoader] = useFullPageLoader();
  //   let [ShowPass, setShowPass] = useState(false);
  const styleInput = {
    width: "100%",
    borderRadius: "4px",
    outline: "none",
    border: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  return (
    <>
      <Col className="col-md-4" key={props.uuid}>
        <span className="text-center">{props.load}</span>
        <Card>
          <CardHeader className="bg-info p-1 d-flex justify-content-around">
            <Row className="align-items-center">
              <Col>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  Group
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  Nama
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  ID
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  Type
                </CardTitle>
              </Col>
              <Col md={6} lg={6}>
                <CardTitle
                  tag="p"
                  className="text-light text-text-uppercase text-start"
                >
                  G1 / POWER HOUSE & WWTP
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  INDUK_PLN
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  COMP1_4
                </CardTitle>
                <CardTitle
                  tag="p"
                  className="text-light text-uppercase text-start"
                >
                  ION 7750
                </CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="bg-info d-flex justify-content-between position-relative m-0 p-2">
            <Form>
              <FormGroup>
                <Row>
                  <Col lg={3} md={3} xs={2}>
                    <Label htmlFor="vavg" className="col-form-label pt-0">
                      V avg
                    </Label>
                  </Col>
                  <Col lg={6} md={6}>
                    <input
                      id="avg"
                      name="avg"
                      type={newShowPass ? "text" : "password"}
                      style={styleInput}
                      value={props.id}
                    />
                    <span
                      className="show-hide-password"
                      onClick={() => setNewShowPass(!newShowPass)}
                    >
                      {!newShowPass ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </Col>
                  <Col lg={3} md={3}>
                    <span>V</span>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col lg={3} md={3} xs={6}>
                    <Label htmlFor="lavg" className="col-form-label pt-0">
                      I avg
                    </Label>
                  </Col>
                  <Col lg-={6} md={6}>
                    <input
                      id="lavg"
                      name="lavg"
                      type={newShowPass ? "text" : "password"}
                      style={styleInput}
                      value={props.id}
                    />
                    <span
                      className="show-hide-password"
                      onClick={() => setNewShowPass(!newShowPass)}
                    >
                      {!newShowPass ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </Col>
                  <Col lg={3} md={3}>
                    <span>A</span>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col lg={3} md={3} xs={6}>
                    <Label htmlFor="stotal" className="col-form-label pt-0">
                      S Total
                    </Label>
                  </Col>
                  <Col lg={6} md={6}>
                    <input
                      id="stotal"
                      name="stotal"
                      type={newShowPass ? "text" : "password"}
                      style={styleInput}
                      value={props.id}
                    />
                    <span
                      className="show-hide-password"
                      onClick={() => setNewShowPass(!newShowPass)}
                    >
                      {!newShowPass ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </Col>
                  <Col lg={3} md={3}>
                    <span>KWA</span>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col lg={3} md={3}>
                    <Label htmlFor="ptotal" className="col-form-label pt-0">
                      P Total
                    </Label>
                  </Col>
                  <Col lg={6} md={6}>
                    <input
                      id="ptotal"
                      name="ptotal"
                      type={newShowPass ? "text" : "password"}
                      style={styleInput}
                      value={props.id}
                    />
                    <span
                      className="show-hide-password"
                      onClick={() => setNewShowPass(!newShowPass)}
                    >
                      {!newShowPass ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </Col>
                  <Col lg={3} md={3}>
                    <span>KW</span>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col lg={3} md={3}>
                    <Label htmlFor="standkwh" className="col-form-label pt-0">
                      Stand KWH
                    </Label>
                  </Col>
                  <Col sm={6} lg={6}>
                    <input
                      id="standkwh"
                      name="standkwh"
                      type={newShowPass ? "text" : "password"}
                      style={styleInput}
                      value={props.id}
                    />
                    <span
                      className="show-hide-password"
                      onClick={() => setNewShowPass(!newShowPass)}
                    >
                      {!newShowPass ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </Col>
                  <Col lg={3} md={3}>
                    <span>KWH</span>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter className="bg-black m-0 p-2 text-light">
            <Row className="m-0">
              <Col className="text-start fw-bolder m-0">
                <span>1</span>
              </Col>
              <Col className="text-end fw-bolder m-0">
                <span>Date-Time</span>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>
    </>
  );
}

export default Cards;
